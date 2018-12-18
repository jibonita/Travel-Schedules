import { IsString, Length, Matches, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Optional } from '@nestjs/common';
import { Usertype } from '../../data/entities/usertype';

export class UserRegisterDTO {

  @IsEmail()
  email: string;

  @IsString()
  // @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  password: string;

  @IsNumber()
  @IsOptional()
  // @Matches(/[0-2]/)
  usertype: Usertype;

  @Optional()
  copmanyName: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
