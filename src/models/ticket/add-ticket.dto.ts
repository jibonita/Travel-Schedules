import { IsNumber, IsString } from 'class-validator';

export class AddTicketDTO {

    @IsNumber()
    userID: number;

    @IsNumber()
    routeID: number;

    @IsNumber()
    endPoint: number;

}
