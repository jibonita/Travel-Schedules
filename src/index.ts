import 'reflect-metadata';
import {createConnection} from 'typeorm';
import { Usertype } from './data/entities/usertype';

createConnection().then(async connection => {

    const client = new Usertype();
    client.name = 'Client';
    await connection.manager.save(client);

    const company = new Usertype();
    company.name = 'Company';
    await connection.manager.save(company);

    const admin = new Usertype();
    admin.name = 'Admin';
    await connection.manager.save(admin);
});
