import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user';

@Entity('usertype')
export class Usertype {

    @PrimaryGeneratedColumn({name: 'UsertypeID'})
    @OneToOne(type => User, user => user.usertype)
     usertypeID: number;

    @Column( { name: 'Name' } )
    name: string;
}
