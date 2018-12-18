import { Column, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Stop } from './stop';
import { RouteStop } from './routestop';

@Entity('routes')
export class Route {

    @PrimaryGeneratedColumn()
    @OneToMany(type => RouteStop, rstop => rstop.routeID)
    routeID: number;

    @Column()
    @OneToMany(type => Stop, stop => stop.stopID)
    startPoint: number;

    @Column()
    @OneToMany(type => Stop, stop => stop.stopID)
    endPoint: number;

    @Column()
    leaves: Date;

    @Column()
    isApproved: boolean;
}
