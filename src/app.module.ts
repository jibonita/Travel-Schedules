import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './common/core/core.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { RoutesModule } from './routes/routes.module';
import { StopsService } from './stops/stops.service';
import { StopsModule } from './stops/stops.module';
import { TicketsModules } from './tickets/tickets.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.dbType as any,
        host: configService.dbHost,
        port: configService.dbPort,
        username: configService.dbUsername,
        password: configService.dbPassword,
        database: configService.dbName,
        entities: ['./src/data/entities/*.ts'],
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    CoreModule,
    RoutesModule,
    StopsModule,
    TicketsModules,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
