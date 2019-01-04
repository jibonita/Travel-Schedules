import { IsString } from 'class-validator';

export class UserLoginDTO {

  @IsString()
  // @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  email: string;

  @IsString()
  password: string;
}
