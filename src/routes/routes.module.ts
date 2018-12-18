import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { CoreModule } from '../common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from '../data/entities/user';
import { RoutesController } from './routes.controller';
import { Route } from '../data/entities/route';
import { RoutesService } from './routes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Route])],
  providers: [RoutesService],
  exports: [],
  controllers: [RoutesController],
})
export class RoutesModule {}
