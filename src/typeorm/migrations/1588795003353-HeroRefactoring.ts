import { MigrationInterface, QueryRunner } from 'typeorm';

export default class HeroRefactoring1588795003353 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "super_hero" RENAME COLUMN "name" TO "identity"`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "super_hero" RENAME COLUMN "identity" TO "namez"`,
    );
  }
}
