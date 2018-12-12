import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stop {

    @PrimaryGeneratedColumn()
    StopID: string;

    @Column()
    Name: string;
}
