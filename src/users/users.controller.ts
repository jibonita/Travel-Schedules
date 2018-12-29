import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Delete, Body, ValidationPipe, Request } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from '../models/user/get-user.dto';
import { GetUserEmailDTO } from '../models/user/user-email.dto';

@Controller('users')
@UseGuards(AuthGuard(), AdminGuard)

export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async root(): Promise<any> {
    return this.usersService.getAll();
  }

  @Get('clients')
  allClients() {
    return this.usersService.getClients();
  }

  @Get('companies')
  allCompanies() {
    return this.usersService.getCompanies();
  }

  @Delete()
  findOne(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  }))user: GetUserEmailDTO ) {
    return this.usersService.deleteUser(user);
  }

}
