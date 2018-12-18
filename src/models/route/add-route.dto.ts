import { IsString, Length, Matches } from 'class-validator';

export class AddRouteDTO {

  startPoint: string;

  endPoint: string;

  stops: string[];
}
