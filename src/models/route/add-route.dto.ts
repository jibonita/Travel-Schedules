import { DBRouteDTO } from './db-route.dto';
import { IsString, Length, Matches, IsNumber, MinLength, IsArray, IsBoolean, IsOptional } from 'class-validator';
import { number } from 'joi';

export class AddRouteDTO extends DBRouteDTO {
  // @IsNumber()
  // startPoint: number;

  // @IsNumber()
  // endPoint: number;

  // @IsString()
  // // TODO: some match for datetime
  // leaves: string;

  // @IsOptional()
  // @IsBoolean()
  // isApproved: boolean;

  // @IsNumber()
  // company: number;

  @IsArray()
  stops: string[];
}
