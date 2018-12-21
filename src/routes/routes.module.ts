import { StopsModule } from './../stops/stops.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '../data/entities/user';
import { RoutesController } from './routes.controller';
import { Route } from '../data/entities/route';
import { RoutesService } from './routes.service';
import { Stop } from '../data/entities/stop';
import { StopsService } from '../stops/stops.service';
import { RouteStop } from '../data/entities/routestop';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route]),
    TypeOrmModule.forFeature([Stop]),
    TypeOrmModule.forFeature([RouteStop]),
   ],
  providers: [RoutesService],
  exports: [],
  controllers: [RoutesController],

})
export class RoutesModule {}
