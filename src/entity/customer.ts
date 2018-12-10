import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Customer {
    @PrimaryGeneratedColumn()
    CustomerID: number;

    @Column()
    Name: string;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;
}
