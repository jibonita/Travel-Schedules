import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { User } from './user';

//@Entity('customers')
export class Customer {
    @PrimaryColumn({ name: 'CustomerID' })
    @OneToOne(type => User, user => user.userID)
    customerID: number;

    @Column({ name: 'FirstName' })
    firstName: string;

    @Column({ name: 'LastName' })
    lastName: string;
}
