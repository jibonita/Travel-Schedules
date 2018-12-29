import { IsString } from 'class-validator';

export class GetUserEmailDTO {

  @IsString()
  // @Matches(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/)
  email: string;
}