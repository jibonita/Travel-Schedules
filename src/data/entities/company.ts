import { Entity, Column, OneToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { User } from './user';

//@Entity('companies')
export class Company {

    @PrimaryColumn()
    @OneToOne(type => User, user => user.userID)
    @JoinColumn({ name: 'CompanyID' })
    companyID: number;

    @Column( { name: 'Name' } )
    name: string;

}
