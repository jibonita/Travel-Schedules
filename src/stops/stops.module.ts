import { Module } from '@nestjs/common';
import { StopsController } from './stops.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stop } from '../data/entities/stop';
import { StopsService } from './stops.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Stop]), AuthModule],
  providers: [StopsService],
  exports: [],
  controllers: [StopsController],
})
export class StopsModule {}
