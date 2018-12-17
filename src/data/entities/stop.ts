import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { RouteStop } from './routestop';
import { Route } from './route';

@Entity('stops')
export class Stop {

    @PrimaryGeneratedColumn()
    @OneToMany(type => RouteStop, rstop => rstop.stopID)
    @OneToMany(type => Route, route => route.StartPoint)
    @OneToMany(type => Route, route => route.EndPoint)
    StopID: string;

    @Column()
    Name: string;
}
