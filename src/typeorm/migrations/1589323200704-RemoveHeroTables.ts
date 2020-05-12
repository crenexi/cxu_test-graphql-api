import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RemoveHeroTable1589323200704 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "super_power"`);
    await queryRunner.query(`DROP TABLE "super_hero"`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "super_power"`);
    await queryRunner.query(`CREATE TABLE "super_hero"`);
  }
}
