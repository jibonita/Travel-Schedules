import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './user';

@Entity('usertype')
export class Usertype {
    @PrimaryGeneratedColumn()
    id: number;
    @OneToMany(type => User, user => user.usertype)
     usertypeID: User;

    @Column()
    name: string;
}
