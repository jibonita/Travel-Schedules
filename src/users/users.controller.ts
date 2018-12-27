import { Usertype } from './../data/entities/usertype';
import { AddRouteDTO } from './../models/route/add-route.dto';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Delete, Param, Body, ValidationPipe, Request, BadRequestException, HttpStatus, Res } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from '../models/user/get-user.dto';
import { RolesGuard } from '../common/guards/roles/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('users')
// @Roles('admin')
// @UseGuards(AuthGuard(), RolesGuard)

export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  @UseGuards(AuthGuard(), AdminGuard)
   async root(@Request() req): Promise<any> {

    // if (req.user.usertype.id !== 3) {
    //   throw new BadRequestException('no access');
    // }
     return this.usersService.getAll();
  }

  @Get('clients')
  allclients() {
    return this.usersService.getClients();
  }

  @Get('companies')
  allcompanies() {
    return this.usersService.getCompanies();
  }

  @Delete()
  findOne(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))user: GetUserDTO ) {
    return this.usersService.deleteUser(user);
  }

}
