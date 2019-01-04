import { User } from './../data/entities/user';
import { Controller, Get, UseGuards, Query, Param, Post, Body, ValidationPipe, Delete, Request, Req } from '@nestjs/common';
import { RoutesService } from './routes.service';
import bodyParser = require('body-parser');
import { AddRouteDTO } from '../models/route/add-route.dto';
import { AuthGuard } from '@nestjs/passport';
import { allow } from 'joi';
import { UserRoles } from 'nest-access-control';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('routes')
export class RoutesController {

  constructor(
    private readonly routesService: RoutesService,
  ) { }

  @Get()
  @UseGuards(AuthGuard())
  @Roles('admin', 'company')
  listAllUsers(@Request() req) {
    try {
      let companyId: number = 0;
      if (req.user.usertype.name === 'company') {
        companyId = req.user.userID;
      }
      return this.routesService.getAllRoutes(companyId);
    } catch (error) {
        return (error.message);
    }
  }

  @Get('search')
  searchRoutes(@Query() query ) {  // ,
    try {
        if (query.from && query.to) {
          return this.routesService.getAllRoutesFromTo(query.from, query.to);
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

  @Get(':id/details')
  @UseGuards(AuthGuard())
  getOneDetails(@Param() params) {
    try {
      return this.routesService.getRouteById(params.id, true);
    } catch (error) {
      return (error.message);
    }
  }

  @Post()
  @UseGuards(AuthGuard())
  @Roles('company')
  async addRoute(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))  route: AddRouteDTO,
                 @Request() req): Promise<string> {
      console.log(req.user);
      try {
        await this.routesService.addRoute(route, req.user.userID);
        return 'Route added';
      } catch (error) {
        await new Promise((resolve, reject) => {
              resolve();
        });

        return (error.message);
      }
  }

  @Delete(':id')
  @UseGuards(AuthGuard())
  @Roles('company')
  delete(@Param() params) {
    try {
      this.routesService.deleteRoute(params.id);
      return 'route deleted';
    } catch (error) {
      return (error.message);
    }
  }
}
