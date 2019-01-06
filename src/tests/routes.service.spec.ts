import { RoutesService } from '../routes/routes.service';
import { RoutesController } from '../routes/routes.controller';
import { Repository } from 'typeorm';
import { Route } from '../data/entities/route';
import { Stop } from '../data/entities/stop';
import { RouteStop } from '../data/entities/routestop';
import { AddRouteDTO } from '../models/route/add-route.dto';
import { User } from '../data/entities/user';

describe('RoutesService', () => {
    const routesRepository: Repository<Route> = new Repository<Route>();
    const stopsRepository: Repository<Stop> = new Repository<Stop>();
    const routeStopsRepository: Repository<RouteStop> = new Repository<RouteStop>();

    const routesService: RoutesService = new RoutesService(routesRepository, stopsRepository, routeStopsRepository);
    const routeCtrl: RoutesController = new RoutesController(routesService);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('addRoute method should', () => {
        const dto = new AddRouteDTO();

        it('call routeService verifyStopsExist() method', async () => {
            dto.stops = [];
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return false;
            });

            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {}

            expect(routesService.verifyStopsExist).toHaveBeenCalled();
        });

        it('throw error message if some of the route stops does not exist', async () => {
            dto.stops = [];
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return false;
            });

            let result = null;
            const message = 'message';
            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {
                result = error.message;
            }
            expect(result).toContain('Could not find');
        });
        it('create new Route object to pass to repository methods', async () => {
            dto.stops = [];
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return true;
            });
            jest.spyOn(routesRepository, 'create').mockImplementation((a) => {
                return a.constructor.name;
            });

            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {}
            
            expect(routesRepository.create).toHaveReturnedWith('Route');
        });

        it('fill new Route with data from the dto', async () => {
            dto.stops = [];
            dto.leaves = '15:00';
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return true;
            });
            jest.spyOn(routesRepository, 'create').mockImplementation((a) => {
                return a.leaves;
            });

            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {}

            expect(routesRepository.create).toHaveReturnedWith('15:00');
        });

        it('call the routeRepository create() method', async () => {
            dto.stops = [];
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return true;
            });
            jest.spyOn(routesRepository, 'create').mockImplementation(() => {
                return null;
            });

            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {}

            expect(routesRepository.create).toHaveBeenCalled();
        });

        it('call the routeRepository save() method', async () => {
            dto.stops = [];
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return true;
            });
            jest.spyOn(routesRepository, 'create').mockImplementation(() => {
                return null;
            });
            jest.spyOn(routesRepository, 'save').mockImplementation(() => {
                return null;
            });

            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {}

            expect(routesRepository.save).toHaveBeenCalledTimes(1);
        });

        it('call the routeService addRouteStops() method', async () => {
            dto.stops = [];
            jest.spyOn(routesService, 'verifyStopsExist').mockImplementation(() => {
                return true;
            });
            jest.spyOn(routesRepository, 'create').mockImplementation(() => {
                return null;
            });
            jest.spyOn(routesRepository, 'save').mockImplementation(() => {
                return null;
            });
            jest.spyOn(routesService, 'addRouteStops').mockImplementation(() => {
                return null;
            });

            try {
                await routesService.addRoute(dto, new User());
            } catch (error) {}

            expect(routesService.addRouteStops).toHaveBeenCalled();
        });
    });

});
