import {MigrationInterface, QueryRunner} from "typeorm";

export class initial21545130937857 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `usertype` (`id` int NOT NULL AUTO_INCREMENT, `Name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`userID` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `CompanyName` varchar(255) NOT NULL, `FirstName` varchar(255) NOT NULL, `LastName` varchar(255) NOT NULL, `usertypeId` int NULL, PRIMARY KEY (`userID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `routestops` (`routeID` int NOT NULL, `stopID` int NOT NULL, `StopOrder` int NOT NULL, PRIMARY KEY (`routeID`, `stopID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stops` (`StopID` int NOT NULL AUTO_INCREMENT, `Name` varchar(255) NOT NULL, PRIMARY KEY (`StopID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `routes` (`RouteID` int NOT NULL AUTO_INCREMENT, `StartPoint` int NOT NULL, `EndPoint` int NOT NULL, `Leaves` datetime NOT NULL, `IsApproved` tinyint NOT NULL, PRIMARY KEY (`RouteID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_0d0c538f2d78370e56a6310a3c8` FOREIGN KEY (`usertypeId`) REFERENCES `usertype`(`id`)");
        await queryRunner.query("ALTER TABLE `routestops` ADD CONSTRAINT `FK_5b9c45076ee4c534b8da9282ece` FOREIGN KEY (`routeID`) REFERENCES `routes`(`RouteID`)");
        await queryRunner.query("ALTER TABLE `routestops` ADD CONSTRAINT `FK_9baa52f2418f783f6856cb06b0f` FOREIGN KEY (`stopID`) REFERENCES `stops`(`StopID`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `routestops` DROP FOREIGN KEY `FK_9baa52f2418f783f6856cb06b0f`");
        await queryRunner.query("ALTER TABLE `routestops` DROP FOREIGN KEY `FK_5b9c45076ee4c534b8da9282ece`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_0d0c538f2d78370e56a6310a3c8`");
        await queryRunner.query("DROP TABLE `routes`");
        await queryRunner.query("DROP TABLE `stops`");
        await queryRunner.query("DROP TABLE `routestops`");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `usertype`");
    }

}
