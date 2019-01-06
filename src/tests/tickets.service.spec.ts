import { Stop } from './../data/entities/stop';
import { AddTicketDTO } from './../models/ticket/add-ticket.dto';
import { Repository } from 'typeorm';
import { Ticket } from '../data/entities/ticket';
import { User } from '../data/entities/user';
import { Route } from '../data/entities/route';
import { TicketsService } from '../tickets/tickets.service';

describe('TicketsService', () => {
    const ticketsRepository: Repository<Ticket> = new Repository<Ticket>();
    const usersRepository: Repository<User> = new Repository<User>();
    const routeRepository: Repository<Route> = new Repository<Route>();
    const ticketsService: TicketsService = new TicketsService(ticketsRepository, usersRepository, routeRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addTicket method should', () => {
        const dto = new AddTicketDTO();

        it('call routesRepository findOne() method', async () => {
            jest.spyOn(routeRepository, 'findOne').mockImplementation();

            try {
                await ticketsService.addTicket(dto, new User());
            } catch (error) {}

            expect(routeRepository.findOne).toHaveBeenCalled();
        });

        it('throw error message when route is invalid', async () => {
            jest.spyOn(routeRepository, 'findOne').mockImplementation(() => {
                return false;
            });

            let result = null;

            try {
                await ticketsService.addTicket(dto, new User());
            } catch (error) {
                result = error.message;
            }

            expect(result.message).toContain('invalid route');
        });

        // it('throw error when start point and end point are the same', async () => {
        //     let routeFound = {startPoint: 1,
        //      };
        //     const dtoFound: AddTicketDTO = {stopID: 1,
        //     };
        //     jest.spyOn(routeRepository, 'findOne').mockImplementation(() => {
        //         return routeFound = {startPoint: 1,
        //         };
        //     });

        //     let result = null;
        //     try {
        //         await ticketsService.addTicket(dtoFound, new User());
        //     } catch (error) {
        //         result = error.message;
        //     }

        //     expect(result.message).toContain('startpoint and endpoint cant be the same ');
        // });

        it('create new Ticket object to pass to repository methods', async () => {
            jest.spyOn(routeRepository, 'findOne').mockImplementation(() => {
                return true;
            });
            jest.spyOn(ticketsRepository, 'create').mockImplementation((a) => {
                return a.constructor.name;
            });

            try {
                await ticketsService.addTicket(dto, new User());
            } catch (error) {}

            expect(ticketsRepository.create).toHaveReturned();
        });

        it('call the ticketsRepository create() method', async () => {
            jest.spyOn(routeRepository, 'findOne').mockImplementation(() => {
                return true;
            });

            jest.spyOn(ticketsRepository, 'create').mockImplementation((a) => {
                return null;
            });

            try {
                await ticketsService.addTicket(dto, new User());
            } catch (error) {}

            expect(ticketsRepository.create).toHaveBeenCalled();
        });

        it('call the ticketsRepository save() method', async () => {
            jest.spyOn(routeRepository, 'findOne').mockImplementation(() => {
                return true;
            });

            jest.spyOn(ticketsRepository, 'create').mockImplementation((a) => {
                return null;
            });

            jest.spyOn(ticketsRepository, 'save').mockImplementation((a) => {
                return null;
            });

            try {
                await ticketsService.addTicket(dto, new User());
            } catch (error) {}

            expect(ticketsRepository.save).toHaveBeenCalled();
        });

        it('ticketsRepository save method to correctly return result', async () => {
            jest.spyOn(routeRepository, 'findOne').mockImplementation(() => {
                return true;
            });

            jest.spyOn(ticketsRepository, 'create').mockImplementation((a) => {
                return null;
            });

            jest.spyOn(ticketsRepository, 'save').mockImplementation((a) => {
                return null;
            });

            try {
                await ticketsService.addTicket(dto, new User());
            } catch (error) {}

            expect(ticketsRepository.save).toHaveReturned();
        });
    });
});
