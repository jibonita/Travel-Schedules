import { IsNumber, IsString } from 'class-validator';
import { User } from '../../data/entities/user';
import { Route } from '../../data/entities/route';
import { Stop } from '../../data/entities/stop';

export class AddTicketDTO {

    @IsNumber()
    routeID: Route;

    @IsNumber()
    endStop: Stop;

}
