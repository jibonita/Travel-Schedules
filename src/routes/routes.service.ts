
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../data/entities/route';
import { AddRouteDTO } from '../models/route/add-route.dto';
import { Stop } from '../data/entities/stop';
import { RouteStop } from '../data/entities/routestop';
import { DBRouteDTO } from '../models/route/db-route.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
      private readonly routesRepository: Repository<Route>,
    @InjectRepository(Stop)
      private readonly stopsRepository: Repository<Stop>,
    @InjectRepository(RouteStop)
      private readonly routeStopsRepository: Repository<RouteStop>,
    ) { }

  async getAllRoutesFromTo(from, to) {
    return `From ${from} to ${to}`;
    // return this.usersRepository.find({});
  }

  async addRoute(route: AddRouteDTO ) {
    const allStopsSet = new Set([route.startPoint, ...route.stops, route.endPoint]);
    const allStopsArray =  [...allStopsSet];

    if (!this.verifyStopsExist(allStopsArray)) {
      throw new Error(`Could not find some of the stops: It does not exist!`);
    }

    const newRoute: DBRouteDTO = route as DBRouteDTO;
    // const newRoute = new Route();
    // newRoute.startPoint = +allStopsArray[0];
    // newRoute.endPoint = +allStopsArray[allStopsArray.length - 1];
    // newRoute.leaves = route.leaves;
    // newRoute.isApproved = true;
    // newRoute.company = route.company;

    await this.routesRepository.create(newRoute);

    await this.routesRepository.save(newRoute);

    await this.addRouteStops((newRoute as Route).routeID, allStopsArray);

  }

  async verifyStopsExist(allStopsArray: Array<string | number>): Promise<any> {
    const stopsFound = await this.stopsRepository.findByIds(allStopsArray);
    return (stopsFound.length === allStopsArray.length);
  }

  async addRouteStops(routeID: number, allStopsArray: Array<string | number>): Promise<any> {
      let orderIndex = 1;
      for (const stop of allStopsArray) {
        const routeStop = new RouteStop();
        routeStop.routeID = +routeID;
        routeStop.stopID = +stop;
        routeStop.StopOrder = orderIndex++;

        await this.routeStopsRepository.save(routeStop);
      }
  }

}
