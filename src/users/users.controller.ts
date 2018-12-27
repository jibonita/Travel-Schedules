import { AdminGuard } from './../common/guards/roles/admin.guard';
import { AuthGuard } from '@nestjs/passport';
import { Controller, Get, UseGuards, Delete, Body, ValidationPipe, Request } from '@nestjs/common';
import { UsersService } from './../common/core/users.service';
import { GetUserDTO } from '../models/user/get-user.dto';

@Controller('users')
@UseGuards(AuthGuard(), AdminGuard)

export class UsersController {

  constructor(
    private readonly usersService: UsersService,
  ) { }

  @Get()
  async root(): Promise<any> {

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
