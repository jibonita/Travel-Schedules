import {MigrationInterface, QueryRunner} from "typeorm";

export class initial31545131414448 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_0d0c538f2d78370e56a6310a3c8`");
        await queryRunner.query("ALTER TABLE `users` CHANGE `CompanyName` `CompanyName` varchar(255) NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `usertypeId` `usertypeId` int NULL");
        await queryRunner.query("ALTER TABLE `routes` CHANGE `Leaves` `Leaves` datetime NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_0d0c538f2d78370e56a6310a3c8` FOREIGN KEY (`usertypeId`) REFERENCES `usertype`(`id`)");
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `users` DROP FOREIGN KEY `FK_0d0c538f2d78370e56a6310a3c8`");
        await queryRunner.query("ALTER TABLE `routes` CHANGE `Leaves` `Leaves` datetime(0) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` CHANGE `usertypeId` `usertypeId` int NULL DEFAULT 'NULL'");
        await queryRunner.query("ALTER TABLE `users` CHANGE `CompanyName` `CompanyName` varchar(255) NOT NULL");
        await queryRunner.query("ALTER TABLE `users` ADD CONSTRAINT `FK_0d0c538f2d78370e56a6310a3c8` FOREIGN KEY (`usertypeId`) REFERENCES `usertype`(`id`) ON DELETE RESTRICT ON UPDATE RESTRICT");
    }

}
