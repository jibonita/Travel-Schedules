import { Controller, Get, UseGuards, Query, Param, Post, Body, ValidationPipe, Delete } from '@nestjs/common';
import { RoutesService } from './routes.service';
import bodyParser = require('body-parser');
import { AddRouteDTO } from '../models/route/add-route.dto';

@Controller('routes')
export class RoutesController {

  constructor(
    private readonly routesService: RoutesService,
  ) { }

  
  @Get()
  all(@Query() query) {
    try {
      if(query.from && query.to){
        return this.routesService.getAllRoutesFromTo(query.from, query.to);
      }
      else {
        return this.routesService.getAllRoutes();
      }
    } catch (error) {
      return (error.message);
    }
  }

  @Get(':id')
  getOne(@Param() params) {
    try {
      return this.routesService.getRouteById(params.id);
    } catch (error) {
      return (error.message);
    }
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
