import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateActivityLog1777590781444 implements MigrationInterface {
  name = 'UpdateActivityLog1777590781444';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity_log" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(`ALTER TABLE "activity_log" ADD "metadata" json`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "activity_log" DROP COLUMN "metadata"`,
    );
    await queryRunner.query(
      `ALTER TABLE "activity_log" ADD "metadata" character varying`,
    );
  }
}
