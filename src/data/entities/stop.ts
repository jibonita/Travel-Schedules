import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne } from 'typeorm';
import { RouteStop } from './routestop';
import { Route } from './route';
import { Ticket } from './ticket';

@Entity('stops')
export class Stop {

    @PrimaryGeneratedColumn()
    @OneToMany(type => RouteStop, rstop => rstop.stopID)
    //@OneToMany(type => Route, route => route.startPoint)
    // @OneToMany(type => Route, route => route.endPoint)
    @OneToOne(type => Route, route => route.startPoint)
    @OneToOne(type => Route, route => route.endPoint)
    @OneToOne(type => Ticket, ticket => ticket.ticketID)
    stopID: number;

    @Column()
    name: string;
}
