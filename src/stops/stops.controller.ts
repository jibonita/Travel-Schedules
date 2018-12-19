import { StopsService } from './stops.service';
import { Controller, Get, Body, Post, ValidationPipe } from '@nestjs/common';
import { AddStopDTO } from '../models/stop/add-stop.dto';

@Controller('stops')
export class StopsController {
    constructor(
        private readonly stopsService: StopsService,
      ) { }

    @Get()
    all() {
        return this.stopsService.getAll();
    }

    @Post()
    async add(
        @Body(new ValidationPipe({
          transform: true,
          whitelist: true,
        })) stop: AddStopDTO )
        : Promise<string> {
            try {
                await this.stopsService.addStop(stop);
                return `Added stop ${stop.name}`;
              } catch (error) {
                await new Promise((resolve, reject) => {
                       resolve();
                });

                return (error.message);
              }
    }
}
