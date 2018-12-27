import { StopsService } from './stops.service';
import { Controller, Get, Body, Post, ValidationPipe, UseGuards } from '@nestjs/common';
import { AddStopDTO } from '../models/stop/add-stop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('stops')
@UseGuards(AuthGuard())

export class StopsController {
    constructor(
        private readonly stopsService: StopsService,
      ) { }

    @Get()
    @Roles('admin')
    all() {
        return this.stopsService.getAll();
    }

    @Roles('admin', 'company')
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
