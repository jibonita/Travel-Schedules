import { IsArray, IsNumber, IsBoolean, IsString} from 'class-validator';

export class AddRouteDTO  {
  @IsNumber()
  startPoint: number;

  @IsNumber()
  endPoint: number;

  @IsString()
  // @Matches()
  leaves: string;

  @IsBoolean()
  isApproved: boolean = true;

  @IsArray()
  stops: string[];
}
