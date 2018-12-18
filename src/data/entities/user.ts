import { Optional } from '@nestjs/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Usertype } from './usertype';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userID: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToOne(type => Usertype, usertype => usertype.usertypeID, {eager: true})
    usertype: Usertype;

    @Column( { nullable: true } )
    companyName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

}
