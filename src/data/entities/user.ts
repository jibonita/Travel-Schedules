import { Optional } from '@nestjs/common';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Usertype } from './usertype';
import { Ticket } from './ticket';
import { Route } from './route';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    userID: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column( { nullable: true } )
    companyName: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @ManyToOne(type => Usertype, usertype => usertype.usertypeID, {eager: true})
    usertype: Usertype;

    @OneToMany(type => Ticket, ticket => ticket.user)
    ticket: Ticket[];

    @OneToMany(type => Route, route => route.company)
    company: Route[];
}
