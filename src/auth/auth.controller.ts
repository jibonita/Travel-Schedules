import { RolesGuard } from './../common/guards/roles/roles.guard';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { UsersService } from '../common/core/users.service';
import { AuthService } from './auth.service';
import { Get, Controller, UseGuards, Post, Body, ValidationPipe, BadRequestException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { Usertype } from '../data/entities/usertype';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Controller('auth')
export class AuthController {

  constructor(
    @InjectRepository(Usertype)
    private readonly usersRepository: Repository<Usertype>,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,

  ) { }

  @Get()
  @Roles('admin')
  @UseGuards(AuthGuard(), RolesGuard)
  root(): string {
    return 'root';
  }

  @Post('login')
  async sign(@Body(new ValidationPipe({
    transform: true,
    whitelist: true,
  })) user: UserLoginDTO): Promise<string> {

    const token = await this.authService.signIn(user);

    if (!token) {
      throw new BadRequestException('Wrong credentials!');
    }

    return token;
  }

  @Post('register')
  async register(
    @Body(new ValidationPipe({
      transform: true,
      whitelist: true,
    }))
    user: UserRegisterDTO ): Promise<string> {

    try {
      const usertype = await this.usersRepository
          .findOne({ where: {id: user.companyName ? 2 : 1 } });
      user.usertype = usertype;
      await this.usersService.registerUser(user);
      return 'user successfully added to DB';
    } catch (error) {
        return (error.message);
    }
  }
}
