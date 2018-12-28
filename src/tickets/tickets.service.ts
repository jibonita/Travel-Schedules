import { AddTicketDTO } from './../models/ticket/add-ticket.dto';

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../data/entities/ticket';
import { User } from '../data/entities/user';
import { Repository } from 'typeorm';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketsRepository: Repository<Ticket>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        ) { }

    async addTicket(ticketDTO: AddTicketDTO) {
        const ticket = new Ticket();
        ticket.user = ticketDTO.userID;
        ticket.route = ticketDTO.routeID;
        ticket.endStop = ticketDTO.endStop;

        await this.ticketsRepository.create(ticket);
        const result = await this.ticketsRepository.save([ticket]);

        return result;
    }

    async getAllUserTickets(userid: number) {
        const userFound: any = await this.usersRepository.findOne({ where: { userID: userid } });
        if (userFound) {
            return this.ticketsRepository.find({ where: {user: userid} });
            
        }
    }
}
