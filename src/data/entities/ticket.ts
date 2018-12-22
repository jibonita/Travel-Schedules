import { User } from './user';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Route } from './route';
import { Stop } from './stop';

@Entity('tickets')
export class Ticket {

    @PrimaryGeneratedColumn()
    ticketID: number;

    @JoinColumn({name: 'user'})
    @ManyToOne(type => User, user => user.userID, {eager: true})
    user: User;

    @JoinColumn({name: 'route'})
    @ManyToOne(type => Route, route => route.routeID, {eager: true})
    route: Route;

    @JoinColumn({name: 'endStop'})
    @ManyToOne(type => Stop, stop => stop.stopID, {eager: true})
    endStop: Stop;
}
