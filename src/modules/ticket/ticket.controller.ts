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
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { TicketService } from './ticket.service';
import {
  UpdateTicketBodyDto,
  UpdateTicketParamsDto,
} from './dto/update-ticket.dto';
import { AuthGuard } from '../../presentation/guards/auth.guard';
import { ResponseInterceptor } from '../../presentation/interceptors/response.interceptor';
import { FindTicketsByProjectIdQueryDto } from './dto/find-tickets-by-project-id.dto';
import { LoggerService } from '../../infrastructure/logger/logger.service';
import { FindTicketByIdParamsDto } from './dto/find-ticket-by-task-id.dto';

@Controller('tickets')
@UseInterceptors(ResponseInterceptor)
export class TicketController {
  constructor(
    private readonly ticketService: TicketService,
    private readonly logger: LoggerService,
  ) {}

  @Get()
  @UseGuards(AuthGuard)
  async findByProjectId(
    @Query() { projectId, listType = 0 }: FindTicketsByProjectIdQueryDto,
    @Res() res: Response,
  ) {
    try {
      const tickets = await this.ticketService.findManyByProjectId(
        projectId,
        listType,
      );
      return { tickets };
    } catch (error) {
      this.logger.log('ticketController.findByProjectId');
      this.logger.log(error);
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  async findOneById(
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
  @UseGuards(AuthGuard)
  async update(
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
      this.logger.log('ticketController.update');
      this.logger.log(error);
      throw new InternalServerErrorException();
    }
  }
}
