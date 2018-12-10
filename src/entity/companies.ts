import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Companies {

    @PrimaryGeneratedColumn()
    CompanyID: number;

    @Column()
    Name: string;

}
