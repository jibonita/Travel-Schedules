import { StopsService } from './stops.service';
import { Controller, Get, Body, Post, ValidationPipe, UseGuards, Request } from '@nestjs/common';
import { AddStopDTO } from '../models/stop/add-stop.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from 'src/common/guards/roles/roles.guard';

@Controller('stops')
@UseGuards(AuthGuard(), RolesGuard)

export class StopsController {
    constructor(
        private readonly stopsService: StopsService,
      ) { }

    @Get()
    @Roles('admin')
    all() {
        return this.stopsService.getAll();
    }

    @Post()
    @Roles('admin', 'company')
    async add(
        @Body(new ValidationPipe({
          transform: true,
          whitelist: true,
        })) stop: AddStopDTO )
        : Promise<any> {
            try {
                await this.stopsService.addStop(stop);
                return { message: `Added stop ${stop.name}`};
              } catch (error) {
                    return { message: error.message};
              }
    }
}
