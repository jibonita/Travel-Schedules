import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    ticketID: number;

    @Column()
    userID: number;

    @Column()
    routeID: number;

    @Column()
    endPoint: string;
}
