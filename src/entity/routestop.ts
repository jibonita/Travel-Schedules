import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinColumn } from 'typeorm';
import { Route } from './route';
import { Stop } from './stop';

@Entity()
export class RouteStop {

@PrimaryGeneratedColumn()
RoutesStopsID: number;

@ManyToMany(type => Route)
@JoinColumn({ name: 'RouteID' })
routeID: number;

@ManyToMany(type => Stop)
@JoinColumn( { name: 'StopID' } )
stopID: number;

@Column()
StopOrder: number;
}
