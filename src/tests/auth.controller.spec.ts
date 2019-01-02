import { JwtServiceMock } from './mocks/jwt.service.mock';
import { UserLoginDTO } from '../models/user/user-login.dto';
import { AuthController } from '../auth/auth.controller';
import { UsersService } from '../common/core/users.service';
import { Test } from '@nestjs/testing';
import { AuthService } from '../auth/auth.service';
import { PassportModule } from '@nestjs/passport';
import { BadRequestException } from '@nestjs/common';
import { UserRegisterDTO } from '../models/user/user-register.dto';

jest.mock('../auth/auth.service');
jest.mock('../common/core/users.service');

describe('AuthController', () => {

  describe('sign method', () => {
    const authService: AuthService = new AuthService(null, null);
    let authCtrl: AuthController;
    let jwtServiceMock: JwtServiceMock;

    beforeAll(async () => {
      jwtServiceMock = new JwtServiceMock({});
      const module = await Test.createTestingModule({
        imports: [PassportModule.register({
          defaultStrategy: 'jwt',
        })],
        controllers: [AuthController],
        providers: [UsersService,
          {
            provide: AuthService,
            useValue: authService,
          },
          {
            provide: 'UsertypeRepository',
            useValue: {
              findOne: () => {
                return 'user';
              },
            },
          }],
      }).compile();

      authCtrl = module.get<AuthController>(AuthController);
    });

    it('should call AuthService signIn method', async () => {
      const user = new UserLoginDTO();
      jest.spyOn(authService, 'signIn').mockImplementation(() => {
        return 'token';
      });
      await authCtrl.sign(user);
      expect(authService.signIn).toHaveBeenCalledTimes(1);
    });
    {
    // it.skip('should call AuthService signIn method', async () => {
    //   // Arrange
    //   const userService = new UsersService(null);
    //   const authenticationService = new AuthService(userService, null);
    //   const ctrl = new AuthController(null, authenticationService, userService );
    //   const user = new UserLoginDTO();

    //   jest.spyOn(authenticationService, 'signIn').mockImplementation(() => {
    //     return 'token';
    //   });

    //   // Act
    //   await ctrl.sign(user);

    //   // Assert
    //   expect(authenticationService.signIn).toHaveBeenCalledTimes(1);
    // });
  }

    it('should return the token it received from AuthService signIn method', async () => {
      const user = new UserLoginDTO();
      jest.spyOn(authService, 'signIn').mockImplementation(() => {
        return 'custom-token';
      });
      const result = await authCtrl.sign(user);
      expect(result).toBe('custom-token');

    });

    it('should display exception message thrown when AuthService does not return a token', async () => {
      const user = new UserLoginDTO();
      jest.spyOn(authService, 'signIn').mockImplementation(() => {
        return null;
      });

      await authCtrl.sign(user)
        .catch((error) => {
            expect(error).toBeInstanceOf(BadRequestException);
            expect(error.message.message).toBe('Wrong credentials!');
            },
      );

    });
  });

  describe('register method', () => {
    const authService: AuthService = new AuthService(null, null);
    const userService: UsersService = new UsersService(null);
    let authCtrl: AuthController;

    beforeAll(async () => {
      const module = await Test.createTestingModule({
        imports: [PassportModule.register({
          defaultStrategy: 'jwt',
        })],
        controllers: [AuthController],
        providers: [
          {
            provide: UsersService,
            useValue: userService,
          },
          {
            provide: AuthService,
            useValue: authService,
          },
          {
            provide: 'UsertypeRepository',
            useValue: {
              findOne: () => {
                return 5;
              },
            },
          },
          {
            provide: 'UserRepository',
            useValue: {
              findOne: () => {
                return 'user';
              },
            },
          }],
      }).compile();

      authCtrl = module.get<AuthController>(AuthController);
    });

    it('should call UserService registerUser method', async () => {
      const user = new UserRegisterDTO();
      jest.spyOn(userService, 'registerUser').mockImplementation(() => {
        return 'registered-mock';
      });
      await authCtrl.register(user);
      expect(userService.registerUser).toHaveBeenCalledTimes(1);
    });

    it('should return message on success', async () => {
      const user = new UserRegisterDTO();
      jest.spyOn(userService, 'registerUser').mockImplementation(() => {
        return 'registered-mock';
      });

      expect(await authCtrl.register(user)).toBe('user successfully added to DB');
    });

    it('should return thrown error message on UserService registerUser fail', async () => {
      const user = new UserRegisterDTO();
      jest.spyOn(userService, 'registerUser').mockImplementation(() => {
        throw new Error('reg-failed');
      });

      expect(await authCtrl.register(user)).toBe('reg-failed');
    });

  });
});
