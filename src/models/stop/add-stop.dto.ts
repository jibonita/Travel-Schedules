import { IsString, Length } from 'class-validator';

export class AddStopDTO {

  @IsString()
  @Length(3)
  name: string;

}
