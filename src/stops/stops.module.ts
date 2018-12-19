import { Module } from '@nestjs/common';
import { StopsController } from './stops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stop } from '../data/entities/stop';
import { StopsService } from './stops.service';

@Module({
  imports: [TypeOrmModule.forFeature([Stop])],
  providers: [StopsService],
  exports: [],
  controllers: [StopsController]
})
export class StopsModule {}
