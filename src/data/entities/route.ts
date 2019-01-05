import { Column, OneToOne, ManyToMany, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Stop } from './stop';
import { RouteStop } from './routestop';
import { User } from './user';
import { Ticket } from './ticket';

@Entity('routes')
export class Route {

    @PrimaryGeneratedColumn()
    @OneToMany(type => RouteStop, rstop => rstop.routeID)
    routeID: RouteStop[];

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

    @JoinColumn({name: 'company'})
    @ManyToOne(type => User, user => user.userID, {eager: true})
    company: User;

    @OneToMany(type => Ticket, ticket => ticket.route)
    ticket: Ticket[];
}
