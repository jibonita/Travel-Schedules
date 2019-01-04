import { Module } from '@nestjs/common';
import { Ticket } from '../data/entities/ticket';
import { TicketsService } from './tickets.service';
import { TicketsController } from './tickets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { User } from '../data/entities/user';
import { Route } from '../data/entities/route';

@Module({
    imports: [
        TypeOrmModule.forFeature([Ticket]),
        TypeOrmModule.forFeature([User]),
        TypeOrmModule.forFeature([Route]),
    AuthModule],
    providers: [TicketsService],
    exports: [],
    controllers: [TicketsController],
})

export class TicketsModules {}
