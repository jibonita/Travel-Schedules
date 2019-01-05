import { AddRouteDTO } from './../models/route/add-route.dto';
import { RoutesService } from '../routes/routes.service';
import { RoutesController } from '../routes/routes.controller';

jest.mock('../routes/routes.service');

describe('RouteController', () => {
    const routesService: RoutesService = new RoutesService(null, null, null);
    const routeCtrl: RoutesController = new RoutesController(routesService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('listAllRoutes method should', () => {
        it('assign value company=user when user is company', async () => {
            const req = {
                user:
                    {usertype:
                        {name: 'company',
            }}};
            jest.spyOn(routesService, 'getAllRoutes').mockImplementation();

            await routeCtrl.listAllRoutes(req);

            expect(routesService.getAllRoutes).toHaveBeenCalledWith(req.user);
        });

        it('assign value company=0 when user is not company', async () => {
            const req = {
                user:
                    {usertype:
                        {name: 'admin',
            }}};
            jest.spyOn(routesService, 'getAllRoutes').mockImplementation();

            await routeCtrl.listAllRoutes(req);

            expect(routesService.getAllRoutes).toHaveBeenCalledWith(0);
        });

        it('return error message when routesService getAllRoutes() method threw an error', async () => {
            const req = {};
            let result = null;
            try {
                await routeCtrl.listAllRoutes(req);
            } catch (error) {
                result = error.message;
            }
            expect(result.message).toBe('Unable to list routes');
        });
     });

    describe('searchRoutes method should', () => {
         it('call routesService getAllRoutesFromTo() method', async () => {
            jest.spyOn(routesService, 'getAllRoutesFromTo').mockImplementation();

            await routeCtrl.searchRoutes({});

            expect(routesService.getAllRoutesFromTo).toHaveBeenCalled();
        });

         it('return error message when routesService getAllRoutesFromTo() method threw an error', async () => {
            jest.spyOn(routesService, 'getAllRoutesFromTo').mockImplementation(() =>            {
                throw new Error('error-in-from-to');
            });

            let result = null;
            try {
                 await routeCtrl.searchRoutes({});
            } catch (error) {
                result = error.message;
            }

            expect(result.message).toBe('error-in-from-to');
        });
     });

    describe('getOne method should', () => {
        it('call routesService getRouteById() method', async () => {
            jest.spyOn(routesService, 'getRouteById').mockImplementation();

            await routeCtrl.getOne({});

            expect(routesService.getRouteById).toHaveBeenCalled();
        });

        it('return error message when routesService getRouteById() method threw an error', async () => {
            jest.spyOn(routesService, 'getRouteById').mockImplementation(() =>            {
                throw new Error('error-in-get-by-id');
            });

            const result =  await routeCtrl.getOne({});

            expect(result.message).toBe('error-in-get-by-id');
        });
     });

    describe('getOneDetails method should', () => {
        it('call routesService getRouteById() method', async () => {
            jest.spyOn(routesService, 'getRouteById').mockImplementation();

            await routeCtrl.getOneDetails({});

            expect(routesService.getRouteById).toHaveBeenCalled();
        });

        it('call routesService getRouteById() method with second parameter TRUE', async () => {
            jest.spyOn(routesService, 'getRouteById').mockImplementation((a, b) => {
                 return `called w/ ${b}`;
            });

            const result = await routeCtrl.getOneDetails({});

            expect(result).toBe('called w/ true');
        });

        it('return error message when routesService getRouteById() method threw an error', async () => {
            jest.spyOn(routesService, 'getRouteById').mockImplementation(() =>            {
                throw new Error('error-in-get-by-id');
            });

            const result =  await routeCtrl.getOneDetails({});

            expect(result.message).toBe('error-in-get-by-id');
        });
     });

    describe('addRoute method should', () => {
        it('call routesService addRoute() method', async () => {
            jest.spyOn(routesService, 'addRoute').mockImplementation();

            await routeCtrl.addRoute(new AddRouteDTO(), {});

            expect(routesService.addRoute).toHaveBeenCalled();
        });

        it('return success message', async () => {
            jest.spyOn(routesService, 'addRoute').mockImplementation();

            const result = await routeCtrl.addRoute(new AddRouteDTO(), {});
            const message = 'message';

            expect(result[message]).toBe('Route added');
        });

        it('return error message on routeService.addRoute fail', async () => {
            jest.spyOn(routesService, 'addRoute').mockImplementation(() =>  {
                throw new Error('add-route-error');
            });

            const result = await routeCtrl.addRoute(new AddRouteDTO(), {});
            const message = 'message';

            expect(result[message]).toBe('add-route-error');
        });
    });

    describe('deleteRoute method should', () => {
        it('call routesService deleteRoute() method', async () => {
            jest.spyOn(routesService, 'deleteRoute').mockImplementation();

            await routeCtrl.deleteRoute({}, {});

            expect(routesService.deleteRoute).toHaveBeenCalled();
        });

        it('return success message', async () => {
            jest.spyOn(routesService, 'deleteRoute').mockImplementation();

            const result = await routeCtrl.deleteRoute({}, {});
            const message = 'message';

            expect(result[message]).toBe('Route deleted');
        });

        it('return error message on routeService.deleteRoute fail', async () => {
            jest.spyOn(routesService, 'deleteRoute').mockImplementation(() =>  {
                throw new Error('delete-route-error');
            });

            const result = await routeCtrl.deleteRoute({}, {});
            const message = 'message';

            expect(result[message]).toBe('delete-route-error');
        });
    });

});
