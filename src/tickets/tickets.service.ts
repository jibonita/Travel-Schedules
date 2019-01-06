import { AddTicketDTO } from './../models/ticket/add-ticket.dto';

import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from '../data/entities/ticket';
import { User } from '../data/entities/user';
import { Repository } from 'typeorm';
import { Route } from '../data/entities/route';

@Injectable()
export class TicketsService {
    constructor(
        @InjectRepository(Ticket)
        private readonly ticketsRepository: Repository<Ticket>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(Route)
        private readonly routeRepository: Repository<Route>,
        ) { }

    async addTicket(ticketDTO: AddTicketDTO, user: User) {
        const routeFound: any = await this.routeRepository.findOne({ where: { routeID: ticketDTO.routeID } });
        if (!routeFound) {
            throw new BadRequestException('invalid route');
        }

        if (+routeFound.startPoint === +ticketDTO.endStop) {
            throw new BadRequestException('startpoint and endpoint cant be the same ');
        }
        const ticket = new Ticket();
        ticket.user = user;
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
    async deleteTicket(id): Promise<any> {
        const ticketFound = await this.ticketsRepository
            .findOne({ select: ['ticketID'],
            where: { ticketID: id } });
        if (!ticketFound) {
          throw new BadRequestException('This ticket doesnt exist in DB!');
        }
        await this.ticketsRepository.delete(ticketFound);
      }
      async getAllTicketsForRoute(routeId, companyID) {
        const routeFound = await this.routeRepository.findOne({routeID: routeId, company: companyID});

        if (!routeFound) {
            throw new BadRequestException('You dont have access to this route');
        }
        return this.ticketsRepository.find({route: routeId, company: companyID});
      }
}
