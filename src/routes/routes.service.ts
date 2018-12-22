
import { Injectable } from '@nestjs/common';
import { Repository, getRepository, getConnection, createQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../data/entities/route';
import { AddRouteDTO } from '../models/route/add-route.dto';
import { Stop } from '../data/entities/stop';
import { RouteStop } from '../data/entities/routestop';
import { DBRouteDTO } from '../models/route/db-route.dto';
import { User } from '../data/entities/user';

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

  async addRoute(route: AddRouteDTO ) {
    const allStopsSet = new Set([route.startPoint, ...route.stops, route.endPoint]);
    const allStopsArray =  [...allStopsSet];

    if (!this.verifyStopsExist(allStopsArray)) {
      throw new Error(`Could not find some of the stops: It does not exist!`);
    }

    const newRoute: DBRouteDTO = route as DBRouteDTO;

    await this.routesRepository.create(newRoute);

    await this.routesRepository.save(newRoute);

    await this.addRouteStops((newRoute as Route).routeID, allStopsArray);

  }

  async verifyStopsExist(allStopsArray: Array<string | number>): Promise<any> {
    const stopsFound = await this.stopsRepository.findByIds(allStopsArray);
    return (stopsFound.length === allStopsArray.length);
  }

  async addRouteStops(routeID: any, allStopsArray: Array<string | number>): Promise<any> {
      let orderIndex = 1;
      for (const stop of allStopsArray) {
        const routeStop = new RouteStop();
        routeStop.routeID = +routeID;
        routeStop.stopID = +stop;
        routeStop.StopOrder = orderIndex++;

        await this.routeStopsRepository.save(routeStop);
      }
  }

  async getRouteById(id: string): Promise<any> {
    const routeFound = await this.routesRepository.findOne({ where: { routeID: id } });
    if (!routeFound) {
      throw new Error(`Route ID:${id} does not exist`);
    }

    // NB!! this is temp until the Roles are added
    const isLogged = false;

    if (isLogged) {
      // display route with inner stops
      const routeQB = await createQueryBuilder(Route, 'route')
        .innerJoinAndSelect(RouteStop, 'routestop', 'routestop.routeID = route.routeID')
        .innerJoinAndSelect(Stop, 'stop', 'routestop.stopID = stop.stopID')
        .innerJoinAndSelect(User, 'user', 'user.userID = route.company')
        .where('route.routeID = :routeID', { routeID : id })
        .select([
          'stop.name',
          'routestop.stopOrder',
          'leaves',
          'companyName',
        ])
        .orderBy('stopOrder', 'ASC')
        .getRawMany();

      return routeQB;



    } else {
      // display route only with start and end stop
      const routeQB = await getConnection()
      .createQueryBuilder()
      .select([
          'route.leaves',
      ])
      .addSelect(subQuery => {
          return subQuery
              .select('stop.name', 'name')
              .from(Stop, 'stop')
              .where(`stop.stopID = route.startPoint`);
       }, 'from')
      .addSelect(subQuery => {
        return subQuery
            .select('stop.name', 'name')
            .from(Stop, 'stop')
            .where(`stop.stopID = route.endPoint`);
     }, 'to')
     .addSelect(subQuery => {
      return subQuery
          .select('user.companyName', 'name')
          .from(User, 'user')
          .where(`user.userID = route.company`);
      }, 'company')
      .from(Route, 'route')
      .where('route.routeID = :routeID', { routeID : id })
       .getRawMany();

      return routeQB;
    }

  }

  async getAllRoutesFromTo(from, to) {
    return `From ${from} to ${to}`;
    // return this.usersRepository.find({});
  }

  async deleteRoute(id) {

  }
}
