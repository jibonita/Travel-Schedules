import { Column, OneToOne, ManyToMany } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Stop } from './stop';

@Entity()
export class Route {

    @PrimaryGeneratedColumn()
    RouteID: number;

    @Column()
    @ManyToMany(type => Stop, stop => stop.StopID)
    StartPoint: number;

    @Column()
    @ManyToMany(type => Stop, stop => stop.StopID)
    EndPoint: number;

    @Column()
    Leaves: Date;

    @Column()
    IsApproved: boolean;
}
