import { User } from './user';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Route } from './route';
import { Stop } from './stop';

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    ticketID: number;

    @Column()
    @OneToOne(type => User, user => user.userID)
    userID: number;

    @Column()
    @OneToOne(type => Route, route => route.routeID)
    routeID: number;

    @Column()
    @OneToOne(type => Stop, stop => stop.stopID)
    endPoint: number;
}
