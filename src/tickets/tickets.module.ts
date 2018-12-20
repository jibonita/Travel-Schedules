import { Module } from '@nestjs/common';
import { Ticket } from '../data/entities/ticket';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoreModule } from '../common/core/core.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [TypeOrmModule.forFeature([Ticket]), CoreModule, AuthModule],
    providers: [TicketsService],
    exports: [],
    controllers: [TicketsController],
})

export class TicketsModules {}
