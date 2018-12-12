import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { ForeignKeyMetadata } from 'typeorm/metadata/ForeignKeyMetadata';
import { User } from './user';

@Entity()
export class Customer {
    @PrimaryColumn()
    @OneToOne(type => User, user => user.userID)
    @JoinColumn({ name: 'CustomerID' })
    CustomerID: number;

    @Column()
    FirstName: string;

    @Column()
    LastName: string;
}
