import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from '../common/core/users.service';
import { UserRegisterDTO } from '../models/user/user-register.dto';
import { User } from '../data/entities/user';
import { UserRepository } from './mocks/user.repository.mock';
import * as bcrypt from 'bcrypt';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { GetUserEmailDTO } from '../models/user/user-email.dto';

describe('UserService', () => {
    describe('registerUser method should', () => {
        let userSrvc: UsersService;
        let testingModule: TestingModule;
        let userRepo: UserRepository;

        beforeEach(async () => {
          testingModule = await Test.createTestingModule({
            imports: [PassportModule.register({
              defaultStrategy: 'jwt',
            })],
            controllers: [],
            providers: [UsersService, UserRepository,
              // {
              //   provide: UserRepository,
              //   useValue: {
              //     findOne: () => {
              //       return null;
              //     },
              //   },
              // }
            ],
          }).compile();

          userSrvc = testingModule.get<UsersService>(UsersService);
          userRepo = testingModule.get<UserRepository>(UserRepository);
        });

        it('throw when user already exists', async () => {
            const user = new UserRegisterDTO();
            // testingModule = await Test.createTestingModule({
            //   imports: [PassportModule.register({
            //     defaultStrategy: 'jwt',
            //   })],
            //   controllers: [],
            //   providers: [UsersService,
            //     {
            //       provide: UserRepository,
            //       useValue: {
            //         findOne: () => {
            //           return new User();
            //         },
            //       },
            //     }],
            // }).compile();
            // userSrvc = testingModule.get<UsersService>(UsersService);

            jest.spyOn(userRepo, 'findOne').mockImplementation(() => {
              return new User();
            });

            await userSrvc.registerUser(user)
              .catch((error) => {
                  expect(error).toBeInstanceOf(Error);
                  expect(error.message).toBe('Could not register: Email already exists!');
              });
        });

        it('call userRepository "create" method', async () => {
          const user = new UserRegisterDTO();
          user.email = 'test';
          user.password =  'pwd';
          jest.spyOn(userRepo, 'create').mockImplementation();
          await userSrvc.registerUser(user);

          expect(userRepo.create).toHaveBeenCalledTimes(1);
        });

        it('call userRepository "save" method', async () => {
          const user = new UserRegisterDTO();
          user.email = 'test';
          user.password =  'pwd';
          jest.spyOn(userRepo, 'save').mockImplementation();
          await userSrvc.registerUser(user);

          expect(userRepo.save).toHaveBeenCalledTimes(1);
        });

        it('retrun the created user', async () => {
          const userDto = new UserRegisterDTO();
          userDto.email = 'test';
          userDto.password =  'pwd';

          jest.spyOn(userRepo, 'save').mockImplementation(() => {
            return {email: 'test'};
          });
          const user = await userSrvc.registerUser(userDto);

          expect(user.email).toEqual(userDto.email);
        });
    });

    describe('signIn method should', () => {
        let userSrvc: UsersService;
        let testingModule: TestingModule;
        let userRepo: UserRepository;
        const userDto = new UserLoginDTO();

        beforeEach(async () => {
          testingModule = await Test.createTestingModule({
            imports: [PassportModule.register({
              defaultStrategy: 'jwt',
            })],
            controllers: [],
            providers: [UsersService,
              {
                provide: UserRepository,
                useValue: {
                  findOne: () => {
                    const user = new User();
                    user.email = 'test';
                    user.password = 'pwd';
                    return user;
                  },
                },
            }],
          }).compile();

          userSrvc = testingModule.get<UsersService>(UsersService);
          userRepo = testingModule.get<UserRepository>(UserRepository);
        });

        it('check password if user exists', async () => {
          jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
          });
          await userSrvc.signIn(userDto);

          expect(bcrypt.compare).toHaveBeenCalled();
        });

        it('return user if password is valid', async () => {
          jest.spyOn(bcrypt, 'compare').mockImplementation(() => {
            return true;
          });
          const user = await userSrvc.signIn(userDto);

          expect(user.email).toBe('test');
        });

        it('return null if user does NOT exist', async () => {
          jest.spyOn(userRepo, 'findOne').mockImplementation(() => {
            return null;
          });
          const user = await userSrvc.signIn(userDto);

          expect(user).toBeNull();
        });
    });

    describe.only('deleteUser method should', () => {
      let userSrvc: UsersService;
      //let testingModule: TestingModule;
      let userRepo: UserRepository;
      const userDto = new GetUserEmailDTO();

      beforeEach(async () => {
          const testingModule = await Test.createTestingModule({
            imports: [PassportModule.register({
              defaultStrategy: 'jwt',
            })],
            controllers: [],
            providers: [UsersService,
              {
                provide: UserRepository,
                useValue: {
                  findOne: () => {
                    return new User();
                  },
                },
            }],
          }).compile();

          userSrvc = testingModule.get<UsersService>(UsersService);
          userRepo = testingModule.get<UserRepository>(UserRepository);
        });

      it('throw error when user does not exist', async () => {
        jest.spyOn(userRepo, 'findOne').mockImplementation(() => {
          return null;
        });

        try {
          await userSrvc.deleteUser(userDto);
        } catch (error) {
          expect(error).toBeInstanceOf(BadRequestException);
          expect(error.message.message).toBe('This user doesn\'t exist in DB!');
        }
      });
// BUGGY
      it('call repository delete method if user exists', async () => {
        userDto.email = 'test';
        jest.spyOn(userRepo, 'delete').mockImplementation();
        await userSrvc.deleteUser(userDto);

        expect(userRepo.delete).toHaveBeenCalled();
      });
    });
});
