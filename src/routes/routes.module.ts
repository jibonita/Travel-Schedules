
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { Route } from '../data/entities/route';
import { RoutesService } from './routes.service';
import { Stop } from '../data/entities/stop';
import { RouteStop } from '../data/entities/routestop';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route]),
    TypeOrmModule.forFeature([Stop]),
    TypeOrmModule.forFeature([RouteStop]),
    AuthModule,
   ],
  providers: [RoutesService],
  exports: [],
  controllers: [RoutesController],

})
export class RoutesModule {}
