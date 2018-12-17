import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usertype } from './usertype';
import { Company } from './company';
import { Customer } from './customer';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userID: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToOne(type => Usertype, usertype => usertype.usertypeID)
    @JoinColumn({ name: 'Usertype' })
    usertype: number;

    @Column( { name: 'CompanyName' } )
    companyName: string;

    @Column({ name: 'FirstName' })
    firstName: string;

    @Column({ name: 'LastName' })
    lastName: string;

}
