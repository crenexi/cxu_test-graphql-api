import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveShipTable1589324771750 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "ship"`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "ship"`);
  }
}
