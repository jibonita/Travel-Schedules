
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from '../data/entities/route';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
  private readonly routesRepository: Repository<Route>,
  ) { }

  async getAllRoutesFromTo(from, to) {
    return `From ${from} to ${to}`;
    // return this.usersRepository.find({});
  }
}
