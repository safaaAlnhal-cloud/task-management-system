import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveTitleUnique1777554988613 implements MigrationInterface {
    name = 'RemoveTitleUnique1777554988613'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP CONSTRAINT "UQ_3399e2710196ea4bf734751558f"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD CONSTRAINT "UQ_3399e2710196ea4bf734751558f" UNIQUE ("title")`);
    }

}
