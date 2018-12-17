import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user';

//@Entity('companies')
export class Company {

    @PrimaryColumn({ name: 'CompanyID' })
    @OneToOne(type => User, user => user.userID)
    companyID: number;

    @Column( { name: 'Name' } )
    name: string;

}
