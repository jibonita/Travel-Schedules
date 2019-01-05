import { Controller, Get, UseGuards, Query, Param, Post, Body, ValidationPipe, Delete, Request, Req, BadRequestException } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { AddRouteDTO } from '../models/route/add-route.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles/roles.guard';

@Controller('routes')
export class RoutesController {

  constructor(
    private readonly routesService: RoutesService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('admin', 'company')
  async listAllRoutes(@Request() req) {
    try {
      let company: number = 0;
      if (req.user.usertype.name.toLowerCase() === 'company') {
        company = req.user;
      }
      return await this.routesService.getAllRoutes(company);
    } catch (error) {
        throw new BadRequestException ('Unable to list routes');
    }
  }

  @Get('search')
  async searchRoutes(@Query() query ) {
    try {
        return await this.routesService.getAllRoutesFromTo(query);
      } catch (error) {
        throw new BadRequestException(error.message);
      }
  }

  @Get(':id')
  getOne(@Param() params) {
    try {
      return this.routesService.getRouteById(params.id);
    } catch (error) {
      return {
        message: error.message};
    }
  }

  @Get(':id/details')
  @UseGuards(AuthGuard())
  getOneDetails(@Param() params) {
    try {
      return this.routesService.getRouteById(params.id, true);
    } catch (error) {
      return {
        message: error.message};
    }
  }

  @Post()
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('company')
  async addRoute(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))  route: AddRouteDTO,
                 @Request() req): Promise<{}> {
      try {
        await this.routesService.addRoute(route, req.user);
        return {
          message: 'Route added',
        };
      } catch (error) {
        return {
          message: error.message,
        };
      }
  }

  @Delete(':id')
  @UseGuards(AuthGuard(), RolesGuard)
  @Roles('company')
  async deleteRoute(@Param() params, @Request() req): Promise<{}>  {
    try {
      await this.routesService.deleteRoute(params.id, req.user);
      return  {
        message: 'Route deleted',
      };
    } catch (error) {
      return {
        message: error.message};
    }
  }
}
