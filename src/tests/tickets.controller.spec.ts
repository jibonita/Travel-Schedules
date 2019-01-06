import { TicketsService } from '../tickets/tickets.service';
import { TicketsController } from '../tickets/tickets.controller';
import { AddTicketDTO } from './../models/ticket/add-ticket.dto';

jest.mock('../tickets/tickets.service.ts');

describe('TicketsController', () => {
    const ticketsService: TicketsService = new TicketsService(null, null, null);
    const ticketsCtrl: TicketsController = new TicketsController(ticketsService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('allPerUser method should', () => {
        it('call ticketsService getAllUserTickets() method', async () => {
            const req = {
                user: {
                        userID: 1,
                    }};

            const param = {
                user: 1,
            };

            jest.spyOn(ticketsService, 'getAllUserTickets').mockImplementation();

            await ticketsCtrl.allPerUser(param, req);

            expect(ticketsService.getAllUserTickets).toHaveBeenCalled();
        });

        it('throw error message when user trying to access somebody elses data', async () => {
            const req = {
                user: {
                        userID: 2,
                    }};

            const param = {
                user: 1,
            };

            const result = await ticketsCtrl.allPerUser(param, req);

            expect(result.message).toBe('User trying to access somebody else\'s data');

        });
    });

    describe('getAllTicketsForRoute should', () => {
        it('call ticketsService getAllTicketsForRoute() method', async () => {
            const req = {
                user: {
                    userID: 1,
            }};
            jest.spyOn(ticketsService, 'getAllTicketsForRoute').mockImplementation();

            await ticketsCtrl.getAllTicketsForRoute(req, req);

            expect(ticketsService.getAllTicketsForRoute).toHaveBeenCalled();
        });
    });

    describe('addTicket method should', () => {
        it('call ticketsService addTicket() method', async () => {
            jest.spyOn(ticketsService, 'addTicket').mockImplementation();

            await ticketsCtrl.addTicket(new AddTicketDTO(), {});

            expect(ticketsService.addTicket).toHaveBeenCalled();
        });

        it('return success message', async () => {

            jest.spyOn(ticketsService, 'addTicket').mockImplementation();

            const result = await ticketsCtrl.addTicket(new AddTicketDTO(), {});

            expect(result).toBe('Ticket successfully added to DB');
        });

        it('return error message when addTicket method fails', async () => {

            jest.spyOn(ticketsService, 'addTicket').mockImplementation(() =>  {
                throw new Error('add-ticket-error');
            });

            const result = await ticketsCtrl.addTicket(new AddTicketDTO(), {});

            expect(result).toBe('add-ticket-error');
        });
    });

    describe('deleteTicket method should', () => {
        it('call ticketsService deleteTicket() method', async () => {
            jest.spyOn(ticketsService, 'deleteTicket').mockImplementation();

            await ticketsCtrl.deleteTicket({});

            expect(ticketsService.deleteTicket).toHaveBeenCalled();
        });

        it('return success message', async () => {
            jest.spyOn(ticketsService, 'deleteTicket').mockImplementation();

            const result = await ticketsCtrl.deleteTicket({});
            const message = 'message';

            expect(result[message]).toBe('Ticket deleted');
        });

        it('throw errot message when delete ticket method fails', async () => {
            jest.spyOn(ticketsService, 'deleteTicket').mockImplementation(() =>  {
                throw new Error('delete-ticket-error');
            });

            const result = await ticketsCtrl.deleteTicket({});
            const message = 'message';

            expect(result[message]).toBe('delete-ticket-error');
        });
    });
});
