import { AuthGuard } from '@nestjs/passport';
import { AddTicketDTO } from './../models/ticket/add-ticket.dto';
import { Controller, Post, ValidationPipe, Body, UseGuards, Get, Param, ExecutionContext, Request, BadRequestException, Delete } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('tickets')
@UseGuards(AuthGuard())

export class TicketsController {
    constructor(
        private readonly ticketsService: TicketsService,
    ) { }

    @Get(':user')
    @Roles('client')
    async allPerUser(@Param() params, @Request() req) {
        try {
           if ( +req.user.userID === +params.user) {
                return this.ticketsService.getAllUserTickets(params.user);
            }
           throw new BadRequestException('User trying to access somebody else\'s data');
        } catch (error) {
            return error.message;
        }
    }

    @Get('route/:id')
    @Roles('company')
    getAllTicketsForRoute(@Param() params, @Request() req) {
        return this.ticketsService.getAllTicketsForRoute(params.id, req.user.userID);
    }

    @Post()
    @Roles('client')
    async addTicket(@Body(new ValidationPipe({
        transform: true,
        whitelist: true,
    })) ticket: AddTicketDTO,
                    @Request() req): Promise<string> {
            try {
               await this.ticketsService.addTicket(ticket, req.user);
               return 'Ticket successfully added to DB';
            } catch (error) {
                return error.message;
            }
    }

    @Delete(':id')
    @Roles('client', 'company')
    async deleteTicket(@Param() params) {
        try {
          await this.ticketsService.deleteTicket(params.id);
          return {
            message: 'Ticket deleted',
          };
        } catch (error) {
          return {
          message: error.message};
        }
      }
}
