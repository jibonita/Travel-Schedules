import { AddStopDTO } from './../models/stop/add-stop.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stop } from '../data/entities/stop';
import { Repository } from 'typeorm';

@Injectable()
export class StopsService {
    constructor(
        @InjectRepository(Stop)
        private readonly stopsRepository: Repository<Stop>,
   ) { }

    async getAll() {
        return this.stopsRepository.find({});
    }

    async addStop(stop: AddStopDTO) {
        const stopFound = await this.stopsRepository.findOne({ where: { name: stop.name } });

        if (stopFound) {
        throw new Error(`Could not add: Stop ${stop.name} already exists!`);
        }
        const newStop = new Stop();
        newStop.name = stop.name;

        await this.stopsRepository.create(newStop);

        const result = await this.stopsRepository.save(newStop);

        return result;
    }
}
