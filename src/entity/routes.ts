import { Column } from 'typeorm';
import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Routes {

    @PrimaryGeneratedColumn()
    RouteID: number;

    @Column()
    StartPoint: string;

    @Column()
    EndPoint: string;
    @Column()
    Leaves: Date;

    @Column()
    IsApproved: boolean;
}
