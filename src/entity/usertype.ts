import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class Usertype {

    @PrimaryGeneratedColumn()
    UserTypeID: number;

    @Column()
    Name: string;
}
