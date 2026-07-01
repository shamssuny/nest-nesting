import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1782900643385 implements MigrationInterface {
    name = 'AutoMigration1782900643385'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "note" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "note"`);
    }

}
