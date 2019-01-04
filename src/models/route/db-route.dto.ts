import { IsNumber, IsBoolean, IsString } from 'class-validator';

export class DBRouteDTO {
    @IsNumber()
    startPoint: number;

    @IsNumber()
    endPoint: number;

    @IsString()
    // @Matches()
    leaves: string;

    @IsBoolean()
    isApproved: boolean = true;

}
