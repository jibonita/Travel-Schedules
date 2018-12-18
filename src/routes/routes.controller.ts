import { Controller, Get, UseGuards, Query, Param, Post, Body, ValidationPipe } from '@nestjs/common';
import { RoutesService } from './routes.service';
import bodyParser = require('body-parser');
import { AddRouteDTO } from '../models/route/add-route.dto';

@Controller('route')
export class RoutesController {

  constructor(
    private readonly routesService: RoutesService,
  ) { }

  @Get(':from/:to')
  allFromTo(@Param() params) {
    return this.routesService.getAllRoutesFromTo(params.from, params.to);
  }

  @Post(':add')
  addRoute(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))
  route: AddRouteDTO) {
    return this.routesService.addRoute(route);
  }
}
