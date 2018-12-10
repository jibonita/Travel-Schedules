import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Stops {

    @PrimaryGeneratedColumn()
    StopID: string;

    @Column()
    Name: string;
}
