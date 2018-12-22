import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Route } from './route';
import { Stop } from './stop';

@Entity('routestops')
export class RouteStop {

// @PrimaryGeneratedColumn()
// RoutesStopsID: number;

// @PrimaryColumn({ name: 'RouteID' })
// @ManyToOne(type => Route, route => route.RouteID)
// routeID: number;

// @PrimaryColumn({ name: 'StopID' })
// @ManyToOne(type => Stop, stop => stop.StopID)
// stopID: number;

@PrimaryColumn()
routeID: number;

@ManyToOne(() => Route, route => route.routeID, {eager: true, onDelete: 'CASCADE'})
@JoinColumn({ name: 'routeID' })
route: Route;

@PrimaryColumn()
stopID: number;

@ManyToOne(() => Stop, stop => stop.stopID, {eager: true})
@JoinColumn({ name: 'stopID' })
stop: Stop;

@Column()
StopOrder: number;
}
