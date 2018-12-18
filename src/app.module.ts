import { Module, HttpModule } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CoreModule } from './common/core/core.module';
import { RoutesModule } from './routes/routes.module';

@Module({
  imports: [
    ConfigModule,
    HttpModule,
    AuthModule,
    DatabaseModule,
    UsersModule,
    CoreModule,
    RoutesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
