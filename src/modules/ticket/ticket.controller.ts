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
import { FindTicketByIdParamsDto } from './dto/find-ticket-by-task-id.dto';
import { UserIsProjectMemberRule } from '../../presentation/guards/user-is-project-member.guard';

@Controller('tickets')
@UseInterceptors(ResponseInterceptor)
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @UseGuards(AuthGuard('jwt'), GetUserInfo, UserIsProjectMemberRule)
  async findByProjectId(
    @Query() { projectId, listType = 0 }: FindTicketsByProjectIdQueryDto,
    @Res() _res: Response,
  ) {
    try {
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

  @Get(':projectId/:ticketId')
  @UseGuards(AuthGuard('jwt'), GetUserInfo, UserIsProjectMemberRule)
  async findOneById(
    @Param() { ticketId }: FindTicketByIdParamsDto,
    @Res() _res: Response,
  ) {
    try {
      const ticket = await this.ticketService.findById(ticketId);
      return { ticket };
    } catch (error) {
      this.logger.log('ticketController.findOneById', error);
      throw error;
    }
  }

  @Put(':projectId/:ticketId')
  @UseGuards(AuthGuard('jwt'), GetUserInfo, UserIsProjectMemberRule)
  async update(
    @Param() { projectId, ticketId }: UpdateTicketParamsDto,
    @Body() updateTicketDto: UpdateTicketBodyDto,
    @Res() _res: Response,
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
