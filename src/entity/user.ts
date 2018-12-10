import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    UserID: number;

    @Column()
    AccauntName: string;

    @Column()
    Password: string;

    @Column()
    UserType: string;
}
