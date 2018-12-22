import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { RouteStop } from './routestop';
import { Route } from './route';
import { Ticket } from './ticket';
import { number } from 'joi';

@Entity('stops')
export class Stop {

    @PrimaryGeneratedColumn()
     @OneToOne(type => Route, route => route.startPoint)
    @OneToOne(type => Route, route => route.endPoint)
    stopID: number;

    @Column()
    name: string;

    @OneToMany(type => RouteStop, rstop => rstop.stopID)
    routestop: RouteStop[];
    
    @OneToMany(type => Ticket, ticket => ticket.endStop)
    ticket: Ticket[];

}
