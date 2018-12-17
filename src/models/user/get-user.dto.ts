import { IsString, Length, Matches, IsOptional } from 'class-validator';

export class GetUserDTO {

  @IsString()
  email: string;

  password: string;

  usertype: number;
}
