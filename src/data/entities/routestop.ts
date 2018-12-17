import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Route } from './route';
import { Stop } from './stop';

@Entity()
export class RouteStop {

@PrimaryGeneratedColumn()
RoutesStopsID: number;

// @PrimaryColumn({ name: 'RouteID' })
@ManyToOne(type => Route, route => route.RouteID)
routeID: number;

// @PrimaryColumn({ name: 'StopID' })
@ManyToOne(type => Stop, stop => stop.StopID)
stopID: number;

@Column()
StopOrder: number;
}
