import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Ticket {

    @PrimaryGeneratedColumn()
    TicketID: number;

    @Column()
    UserID: number;

    @Column()
    RouteID: number;

    @Column()
    EndPoint: string;
}
