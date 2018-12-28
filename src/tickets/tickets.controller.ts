import { AuthGuard } from '@nestjs/passport';
import { AddTicketDTO } from './../models/ticket/add-ticket.dto';
import { Controller, Post, ValidationPipe, Body, UseGuards, Get, Param } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('tickets')

export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
    ) { }

    @Get(':user')
    @UseGuards(AuthGuard())
    @Roles('client')
    allPerUser(@Param() params) {
        try {
            return this.ticketsService.getAllUserTickets(params.user);
        } catch (error) {
            return error.message;
        }
    }


    @Post()
    // @UseGuards(AuthGuard())
    // @Roles('client')
    async addTicket(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) ticket: AddTicketDTO): Promise<string> {
            try {
               await this.ticketsService.addTicket(ticket);
               return 'Ticket successfully added to DB';
            } catch (error) {
                return error.message;
            }
    }

}
