import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1782900353812 implements MigrationInterface {
    name = 'AutoMigration1782900353812'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "status" character varying NOT NULL DEFAULT 'PENDING'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
    }

}
