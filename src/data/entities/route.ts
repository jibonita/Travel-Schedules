import { Column, OneToOne, ManyToMany, OneToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Stop } from './stop';
import { RouteStop } from './routestop';

@Entity()
export class Route {

    @PrimaryGeneratedColumn()
    @OneToMany(type => RouteStop, rstop => rstop.routeID)
    RouteID: number;

    @Column()
    @OneToMany(type => Stop, stop => stop.StopID)
    StartPoint: number;

    @Column()
    @OneToMany(type => Stop, stop => stop.StopID)
    EndPoint: number;

    @Column()
    Leaves: Date;

    @Column()
    IsApproved: boolean;
}
