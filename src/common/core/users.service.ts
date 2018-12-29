import { UserLoginDTO } from '../../models/user/user-login.dto';
import { UserRegisterDTO } from '../../models/user/user-register.dto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Repository, TransactionManager, EntityManager, Transaction } from 'typeorm';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './../../interfaces/jwt-payload';
import { validate } from 'class-validator';
import { User } from '../../data/entities/user';
import { GetUserDTO } from '../../models/user/get-user.dto';
import { GetUserEmailDTO } from '../../models/user/user-email.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    ) { }

  async registerUser(user: UserRegisterDTO) {
    const userFound = await this.usersRepository.findOne({ where: { email: user.email } });

    if (userFound) {
      throw new Error('Could not register: Email already exists!');
    }

    user.password = await bcrypt.hash(user.password, 10);
    await this.usersRepository.create(user);

    const result = await this.usersRepository.save([user]);

    return result;
  }

  async validateUser(payload: JwtPayload): Promise<GetUserDTO> {
    const userFound: any = await this.usersRepository.findOne({ where: { email: payload.email } });

    return userFound;
  }

  async signIn(user: UserLoginDTO): Promise<GetUserDTO> {
    const userFound: GetUserDTO = await this.usersRepository
        .findOne({ select: ['email', 'password', 'usertype'],
                  where: { email: user.email } });
    if (userFound) {
      const result = await bcrypt.compare(user.password, userFound.password);
      if (result) {
        return userFound;
      }
    }

    return null;
  }

  async getAll() {
    return this.usersRepository.find({});
  }

  async getClients() {
    return this.usersRepository.find({
      usertype: {
        id: 1,
      },
    });
  }

  async getCompanies() {
    return this.usersRepository.find({
      usertype: {
        id: 2,
      },
    });
  }

  async deleteUser(user: GetUserEmailDTO) {
    const userFound = await this.usersRepository
        .findOne({ select: ['email'],
        where: { email: user.email } });
    if (!userFound) {
      throw new BadRequestException('This user doesnt exist in DB!');
    }
    await this.usersRepository.delete(userFound);
  }
}
