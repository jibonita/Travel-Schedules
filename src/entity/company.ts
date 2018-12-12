import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Company {

    @PrimaryColumn()
    @OneToOne(type => User, user => user.userID)
    @JoinColumn({ name: 'CompanyID' })
    CompanyID: number;

    @Column()
    Name: string;

}
