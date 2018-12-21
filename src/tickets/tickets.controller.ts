import { AddTicketDTO } from './../models/ticket/add-ticket.dto';
import { Controller, Post, ValidationPipe, Body } from '@nestjs/common';
import { TicketsService } from './tickets.service';

@Controller('tickets')

export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
    ) { }
@Post()
async addticket(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) ticket: AddTicketDTO): Promise<string> {
        console.log(ticket);
        await this.ticketsService.addTicket(ticket);
        return 'Ticket successfully added to DB';
  }

}
