import { IsString } from 'class-validator';
import { Usertype } from '../../data/entities/usertype';

export class GetUserDTO {

  @IsString()
  email: string;

  password: string;

  usertype: Usertype;
}
