import { IsString, IsEmail, IsOptional } from 'class-validator';
import { Usertype } from '../../data/entities/usertype';

export class UserRegisterDTO {

  @IsEmail()
  email: string;

  @IsString()
  // @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;

  // @IsNumber()
  // @Matches(/[1-2]/)
  @IsOptional()
  usertype: Usertype;

  @IsOptional()
  companyName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
