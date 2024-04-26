import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Res,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { TicketService } from './ticket.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { AuthGuard } from '../../presentation/guards/auth.guard';
import { ResponseInterceptor } from '../../presentation/interceptors/response.interceptor';

@Controller('tickets')
@UseInterceptors(ResponseInterceptor)
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get()
  @UseGuards(AuthGuard)
  findAll(@Res() res: Response) {
    return { message: 'hello world' };
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  patchUpdate(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @Res() res,
  ) {
    return;
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  update(
    @Param('id') id: string,
    @Body() updateTicketDto: UpdateTicketDto,
    @Res() res: Response,
  ) {
    return;
  }
}
