import { Test } from "@nestjs/testing";
import { PassportModule } from "@nestjs/passport";
import { UsersService } from "../common/core/users.service";
import { GetUserDTO } from "../models/user/get-user.dto";
import { UserRegisterDTO } from "../models/user/user-register.dto";


//BUGGY !!!

describe('UserService', () => {
    describe('registerUser method should', () => {
        let userSrvc: UsersService;
        
        beforeAll(async () => {
          const module = await Test.createTestingModule({
            imports: [PassportModule.register({
              defaultStrategy: 'jwt',
            })],
            controllers: [],
            providers: [
              {
                provide: 'UserRepository',
                useValue: {
                  findOne: () => {
                    return null;
                  },
                },
              }],
          }).compile();
    
          userSrvc = module.get<UsersService>(UsersService);
        });

        it(' throw when user already exists', async () => {
            const user = new UserRegisterDTO();
            // jest.spyOn(UserRepository, 'findOne').mockImplementation(()=>{
            //     return null;
            // });
           expect(await userSrvc.registerUser(user)).toThrow();
        });

        it('call userRepository "create" method', async () => {
            
        });

        it('call userRepository "save" method', async () => {
            
        });

        it('return registerUserDTO', async () => {
            
        });
    });

});