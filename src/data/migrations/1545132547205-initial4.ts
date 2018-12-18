import {MigrationInterface, QueryRunner} from "typeorm";

export class initial41545132547205 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `routestops` (`routeID` int NOT NULL, `stopID` int NOT NULL, `StopOrder` int NOT NULL, PRIMARY KEY (`routeID`, `stopID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `stops` (`stopID` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`stopID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `ticket` (`ticketID` int NOT NULL AUTO_INCREMENT, `userID` int NOT NULL, `routeID` int NOT NULL, `endPoint` varchar(255) NOT NULL, PRIMARY KEY (`ticketID`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `usertype` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `users` (`userID` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `companyName` varchar(255) NULL, `firstName` varchar(255) NOT NULL, `lastName` varchar(255) NOT NULL, `usertypeId` int NULL, PRIMARY KEY (`userID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `routes` CHANGE `RouteID` `RouteID` int NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` DROP PRIMARY KEY");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `RouteID`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `StartPoint`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `EndPoint`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `Leaves`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `IsApproved`");
        await queryRunner.query("ALTER TABLE `routes` ADD `routeID` int NOT NULL PRIMARY KEY AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `routes` ADD `startPoint` int NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `endPoint` int NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `leaves` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `isApproved` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `routestops` ADD CONSTRAINT `FK_5b9c45076ee4c534b8da9282ece` FOREIGN KEY (`routeID`) REFERENCES `routes`(`routeID`)");
        await queryRunner.query("ALTER TABLE `routestops` ADD CONSTRAINT `FK_9baa52f2418f783f6856cb06b0f` FOREIGN KEY (`stopID`) REFERENCES `stops`(`stopID`)");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_0d0c538f2d78370e56a6310a3c8` FOREIGN KEY (`usertypeId`) REFERENCES `usertype`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_0d0c538f2d78370e56a6310a3c8`");
        await queryRunner.query("ALTER TABLE `routestops` DROP FOREIGN KEY `FK_9baa52f2418f783f6856cb06b0f`");
        await queryRunner.query("ALTER TABLE `routestops` DROP FOREIGN KEY `FK_5b9c45076ee4c534b8da9282ece`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `isApproved`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `leaves`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `endPoint`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `startPoint`");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `routeID`");
        await queryRunner.query("ALTER TABLE `routes` ADD `IsApproved` tinyint NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `Leaves` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `EndPoint` int NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `StartPoint` int NOT NULL");
        await queryRunner.query("ALTER TABLE `routes` ADD `RouteID` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("ALTER TABLE `routes` ADD PRIMARY KEY (`RouteID`)");
        await queryRunner.query("ALTER TABLE `routes` CHANGE `RouteID` `RouteID` int NOT NULL AUTO_INCREMENT");
        await queryRunner.query("DROP TABLE `users`");
        await queryRunner.query("DROP TABLE `usertype`");
        await queryRunner.query("DROP TABLE `ticket`");
        await queryRunner.query("DROP TABLE `stops`");
        await queryRunner.query("DROP TABLE `routestops`");
    }

}
