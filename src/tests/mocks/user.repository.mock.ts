import { EntityRepository, Repository } from 'typeorm';

import { User } from '../../data/entities/user';

import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository  {

    findOne() {
        return null;
    }
    create(user: User) {
        return null;
    }

    save(user: User) {
        return null;
    }

    delete(user: User) {
        return null;
    }
}
