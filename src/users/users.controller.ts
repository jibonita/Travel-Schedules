import { AddRouteDTO } from './../models/route/add-route.dto';
import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Delete, Param, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from '../models/user/get-user.dto';

@Controller('users')
export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  all() {
    return this.usersService.getAll();
  }

  @Delete()
  findOne(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))user: GetUserDTO ) {
    console.log(user);
    return this.usersService.deleteUser(user);
  }
}
