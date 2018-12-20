import { User } from './user';
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Route } from './route';
import { Stop } from './stop';

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    ticketID: number;

    @Column()
    @OneToOne(type => User)
    userID: number;

    @Column()
    @OneToOne(type => Route)
    routeID: number;

    @Column()
    @OneToOne(type => Stop)
    endPoint: string;
}
