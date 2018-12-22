import { Column, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Stop } from './stop';
import { RouteStop } from './routestop';
import { User } from './user';
import { Ticket } from './ticket';

@Entity('routes')
export class Route {

    @PrimaryGeneratedColumn()
    @OneToMany(type => RouteStop, rstop => rstop.routeID)
    routeID: RouteStop[];//number;

    @Column()
    @OneToOne(type => Stop, stop => stop.stopID)
    startPoint: number;

    @Column()
    @OneToOne(type => Stop, stop => stop.stopID)
    endPoint: number;

    @Column()
    leaves: string;

    @Column()
    isApproved: boolean;

    @Column()
    @OneToOne(type => User)
    company: number;

    @OneToMany(type => Ticket, ticket => ticket.route)
    ticket: Ticket[];
}
