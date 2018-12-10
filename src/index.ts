import 'reflect-metadata';
import {createConnection} from 'typeorm';
import {Usertype} from './entity/usertype';

createConnection().then(async connection => {

    // const user = new UserType();
    // user.name = 'Admin';
    // await connection.manager.save(user);
    // console.log('Saved a new user with id: ' + user.UserTypeID);
    // const users = await connection.manager.find(UserType);
    // console.log('Loaded users: ', users);

}).catch(error => console.log(error));
