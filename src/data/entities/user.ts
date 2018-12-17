import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { Usertype } from './usertype';

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    //@OneToOne(type => User)
    userID: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToOne(type => Usertype, usertype => usertype.usertypeID)
    @JoinColumn({ name: 'usertype' })
    usertypeID: number;
}
