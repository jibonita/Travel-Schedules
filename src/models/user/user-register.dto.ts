import { IsString, Length, Matches, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';
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
