import {MigrationInterface, QueryRunner} from "typeorm";

export class initial61545557340629 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `routestops` DROP FOREIGN KEY `FK_5b9c45076ee4c534b8da9282ece`");
        await queryRunner.query("CREATE TABLE `tickets` (`ticketID` int NOT NULL AUTO_INCREMENT, `user` int NULL, `route` int NULL, `endStop` int NULL, PRIMARY KEY (`ticketID`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `routes` ADD `company` int NOT NULL");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_0d0c538f2d78370e56a6310a3c8`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `companyName` `companyName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `usertypeId` `usertypeId` int NULL");
        await queryRunner.query("ALTER TABLE `routestops` ADD CONSTRAINT `FK_5b9c45076ee4c534b8da9282ece` FOREIGN KEY (`routeID`) REFERENCES `routes`(`routeID`) ON DELETE CASCADE");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_0d0c538f2d78370e56a6310a3c8` FOREIGN KEY (`usertypeId`) REFERENCES `usertype`(`id`)");
        await queryRunner.query("ALTER TABLE `tickets` ADD CONSTRAINT `FK_e9125ee933e21e2374ee27481d0` FOREIGN KEY (`user`) REFERENCES `users`(`userID`)");
        await queryRunner.query("ALTER TABLE `tickets` ADD CONSTRAINT `FK_779d0ae4769ba9628767a818ece` FOREIGN KEY (`route`) REFERENCES `routes`(`routeID`)");
        await queryRunner.query("ALTER TABLE `tickets` ADD CONSTRAINT `FK_eb9d4a73d8a17e625eb2a8018b2` FOREIGN KEY (`endStop`) REFERENCES `stops`(`stopID`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `tickets` DROP FOREIGN KEY `FK_eb9d4a73d8a17e625eb2a8018b2`");
        await queryRunner.query("ALTER TABLE `tickets` DROP FOREIGN KEY `FK_779d0ae4769ba9628767a818ece`");
        await queryRunner.query("ALTER TABLE `tickets` DROP FOREIGN KEY `FK_e9125ee933e21e2374ee27481d0`");
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_0d0c538f2d78370e56a6310a3c8`");
        await queryRunner.query("ALTER TABLE `routestops` DROP FOREIGN KEY `FK_5b9c45076ee4c534b8da9282ece`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `usertypeId` `usertypeId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `companyName` `companyName` varchar(255) NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_0d0c538f2d78370e56a6310a3c8` FOREIGN KEY (`usertypeId`) REFERENCES `usertype`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
        await queryRunner.query("ALTER TABLE `routes` DROP COLUMN `company`");
        await queryRunner.query("DROP TABLE `tickets`");
        await queryRunner.query("ALTER TABLE `routestops` ADD CONSTRAINT `FK_5b9c45076ee4c534b8da9282ece` FOREIGN KEY (`routeID`) REFERENCES `routes`(`routeID`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
