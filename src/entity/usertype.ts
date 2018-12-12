import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity()
export class Usertype {

    @PrimaryGeneratedColumn()
    @OneToOne(type => User, user => user.usertypeID)
     usertypeID: number;

    @Column()
    name: string;
}
