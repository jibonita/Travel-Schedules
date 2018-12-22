import { Controller, Get, UseGuards, Query, Param, Post, Body, ValidationPipe, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import bodyParser = require('body-parser');
import { AddRouteDTO } from '../models/route/add-route.dto';

@Controller('routes')
export class RoutesController {

  constructor(
    private readonly routesService: RoutesService,
  ) { }

  @Get(':id')
  getOne(@Param() params) {
    try {
      return this.routesService.getRouteById(params.id);
    } catch (error) {
      return (error.message);
    }

  }

  @Get(':from/:to')
  allFromTo(@Param() params) {
    return this.routesService.getAllRoutesFromTo(params.from, params.to);
  }

  @Post()
  async addRoute(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))  route: AddRouteDTO)
  : Promise<string> {
      try {
        await this.routesService.addRoute(route);
        return 'Route added';
      } catch (error) {
        await new Promise((resolve, reject) => {
              resolve();
        });

        return (error.message);
      }
  }

  @Delete(':id')
  delete(@Param() params) {
    try {
      this.routesService.deleteRoute(params.id);
      return 'route deleted';
    } catch (error) { 
      return (error.message);
    }
  }
}
