import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class RoutesStops {

@PrimaryGeneratedColumn()
RoutesStopsID: number;

@Column()
RouteID: number;

@Column()
StopID: number;

@Column()
StopOrder: number;
}
