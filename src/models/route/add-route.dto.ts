import { DBRouteDTO } from './db-route.dto';
import { IsArray } from 'class-validator';

export class AddRouteDTO extends DBRouteDTO {
  @IsArray()
  stops: string[];
}
