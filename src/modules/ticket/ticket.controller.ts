import {
  Controller,
  Get,
  Body,
  Param,
  UseGuards,
  Res,
  Put,
  UseInterceptors,
  Query,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { TicketService } from './ticket.service';
import {
  UpdateTicketBodyDto,
  UpdateTicketParamsDto,
} from './dto/update-ticket.dto';
import { ResponseInterceptor } from '../../presentation/interceptors/response.interceptor';
import { FindTicketsByProjectIdQueryDto } from './dto/find-tickets-by-project-id.dto';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { GetUserInfo } from '../../presentation/guards/get-user-info.guard';
import { Me } from '../../presentation/decorators/me';
import { User } from '../../domain/schema/user/user.interface';
import { RequestExceptionEnum } from '../../common/enum/exception';
import { FindTicketByIdParamsDto } from './dto/find-ticket-by-task-id.dto';

@Controller('tickets')
@UseInterceptors(ResponseInterceptor)
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), GetUserInfo)
  async findByProjectId(
    @Me() me: User,
    @Query() { projectId, listType = 0 }: FindTicketsByProjectIdQueryDto,
    @Res() res: Response,
  ) {
    try {
      const isAuthorized = await this.ticketService.validateUserInProject(
        me._id,
        projectId,
      );
      if (!isAuthorized) {
        throw new UnauthorizedException(
          RequestExceptionEnum.USER_NOT_IN_PROJECT,
        );
      }

      const tickets = await this.ticketService.findManyByProjectId(
        projectId,
        listType,
      );
      return { tickets };
    } catch (error) {
      this.logger.log('ticketController.findByProjectId', error);
      throw error;
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), GetUserInfo)
  async findOneById(
    @Me() me: User,
    @Param() { id }: FindTicketByIdParamsDto,
    @Res() res: Response,
  ) {
    try {
      const ticket = await this.ticketService.findById(id);
      return { ticket };
    } catch (error) {
      this.logger.log('ticketController.findOneById', error);
      throw error;
    }
  }

  @Put(':projectId/:ticketId')
  @UseGuards(AuthGuard('jwt'), GetUserInfo)
  async update(
    @Me() me: User,
    @Param() { projectId, ticketId }: UpdateTicketParamsDto,
    @Body() updateTicketDto: UpdateTicketBodyDto,
    @Res() res: Response,
  ) {
    const { asigneeId, reporterId, requestTypeId, stageId } = updateTicketDto;

    try {
      const errorMessage = await this.ticketService.validateUpdatePayload({
        projectId,
        ticketId,
        asigneeId,
        reporterId,
        requestTypeId,
        stageId,
      });
      if (!!errorMessage) {
        throw new BadRequestException(errorMessage);
      }

      const result = await this.ticketService.update(ticketId, updateTicketDto);
      return result;
    } catch (error) {
      this.logger.log('ticketController.update', error);
      throw error;
    }
  }
}
