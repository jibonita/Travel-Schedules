import { IsString, Length, Matches } from 'class-validator';

export class UserRegisterDTO {

  @Length(6)
  username: string;

  @IsString()
  @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;

  @Matches(/[0-2]/)
  usertype: number;
}
