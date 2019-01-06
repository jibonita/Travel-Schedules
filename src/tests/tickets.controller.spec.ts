import { TicketsService } from '../tickets/tickets.service';
import { TicketsController } from '../tickets/tickets.controller';

jest.mock('../tickets/tickets.service.ts');

describe('TicketsController', () => {
    const ticketsService: TicketsService = new TicketsService(null, null, null);
    const ticketsCtrl: TicketsController = new TicketsController(ticketsService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    // describe('allPerUser method should', () => {
    //     it('call ticketsService getAllUserTickets() method', async () => {
    //         jest.spyOn(ticketsService, 'getAllUserTickets').mockImplementation();

    //         await ticketsCtrl.allPerUser({}, {});

    //         expect(ticketsService.getAllUserTickets).toHaveBeenCalled();
    //     });

    // });
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
