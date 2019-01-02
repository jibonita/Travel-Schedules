import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../common/core/users.service';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { User } from '../data/entities/user';

// BUGGY !!!

describe('UserService', () => {
    describe('registerUser method should', () => {
        let userSrvc: UsersService;
        let testingModule: TestingModule;

        beforeEach(async () => {
          testingModule = await Test.createTestingModule({
            imports: [PassportModule.register({
              defaultStrategy: 'jwt',
            })],
            controllers: [],
            providers: [UsersService,
              {
                provide: 'UserRepository',
                useValue: {
                  findOne: () => {
                    return null;
                  },
                },
              }],
          }).compile();

          userSrvc = testingModule.get<UsersService>(UsersService);
        });

        it.only(' throw when user already exists', async () => {
            const user = new UserRegisterDTO();
            testingModule = await Test.createTestingModule({
              imports: [PassportModule.register({
                defaultStrategy: 'jwt',
              })],
              controllers: [],
              providers: [UsersService,
                {
                  provide: 'UserRepository',
                  useValue: {
                    findOne: () => {
                      return new User();
                    },
                  },
                }],
            }).compile();
            userSrvc = testingModule.get<UsersService>(UsersService);

            // jest.mock('./mocks/userRepo.mock', () => {
            //   return jest.fn().mockImplementation(() => {
            //     return {findOne: () => {
            //       return new User();
            //     }};
            //   });
            // });

            await userSrvc.registerUser(user)
              .catch((error) => {
                  expect(error).toBeInstanceOf(Error);
                  expect(error.message).toBe('Could not register: Email already exists!');
              });
        });

        // tslint:disable-next-line:no-empty
        it('call userRepository "create" method', async () => {
          const user = new UserRegisterDTO();
          await userSrvc.registerUser(user);
          // ...
        });

        // tslint:disable-next-line:no-empty
        it('call userRepository "save" method', async () => {

        });

        // tslint:disable-next-line:no-empty
        it('return registerUserDTO', async () => {

        });
    });

});
