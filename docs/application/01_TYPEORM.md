# TypeORM Usage

## Migrations

Migrations are setup as follows:

```
/src/typeorm/migrations
#### _enabled-migrations.ts <== only these will be ran
#### 1588795003353-HeroRefactoring.ts <== example migration
```

Migrations will not run unless added to the "Enabled Migrations" file, to avoid any potential mistakes from auto-migrations. An environment variable determines if migrations are automatically ran after connection. Alternatively, migrations can be ran from NPM scripts.

### Creating a Migration

#### Step 1

Create file named "**`{timestamp}-FeatureName.ts`**"

#### Step 2

Copy the code from a prior migration. It should look like this:

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class HeroRefactoring1588795003353 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "super_hero" RENAME COLUMN "name" TO "identity"`,
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "super_hero" RENAME COLUMN "identity" TO "name"`,
    );
  }
}
```

Note the class name should be "**`FeatureName{timestamp}`**"

### Enabling Migrations

The **`_enabled-migrations.ts`** file looks like this:

```typescript
import { HeroRefactoring1588795003353 } from './1588795003353-HeroRefactoring';

const enabledMigrations: Function[] = [
  HeroRefactoring1588795003353,
];

export default enabledMigrations;
```

### Cleanup Migrations

Don't forget to cleanup migrations once in a while, after ensuring they've ran in all environments.
