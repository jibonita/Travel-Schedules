import { IsString, Length, Matches, IsOptional } from 'class-validator';

export class GetUserDTO {

  @IsString()
  username: string;

  password: string;

  usertype: number;
}
