import { AddTicketDTO } from './../models/ticket/add-ticket.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../data/entities/ticket';
import { Repository } from 'typeorm';

@Injectable()

export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketRepository: Repository<Ticket>,
        ) { }

    async addTicket(ticket: AddTicketDTO) {
        console.log(ticket);
        await this.ticketRepository.create(ticket);

        const result = await this.ticketRepository.save([ticket]);

        return result;
    }
}
