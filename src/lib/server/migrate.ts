import * as fs from 'fs';
import * as path from 'path';

import type { DatabasePool } from 'slonik';
import { createSqlTag } from 'slonik';
import { raw } from 'slonik-sql-tag-raw';
import { z } from 'zod';

const sql = createSqlTag({
  typeAliases: {
    migration: z.string(),
    void: z.object({}).strict(),
  },
});

const migrationsDir = 'migrations';
const migrationsTableCreate = sql.typeAlias('void')`
CREATE TABLE IF NOT EXISTS schema_migrations (
  name VARCHAR NOT NULL,
  CONSTRAINT schema_migrations_pkey PRIMARY KEY (name)
);`;

export async function migrateDB(pool: DatabasePool): Promise<void> {
  return await pool.connect(async (c) => {
    // TODO: get an advisory lock

    // create the schema_migrations table if it doesn't exist
    await c.transaction(async (txn) => {
      return await txn.query(migrationsTableCreate);
    });

    // now loop through the migration files and apply any that are needed
    fs.readdirSync(migrationsDir, { withFileTypes: true })
      .filter((f) => f.isFile() && f.name.endsWith('.sql'))
      .forEach(async (f) => {
        return await c.transaction(async (txn) => {
          const m = await txn.maybeOneFirst(
            sql.typeAlias('migration')`
              SELECT name FROM schema_migrations
              WHERE name = ${f.name} LIMIT 1;`
          );

          if (m === null) {
            const fp = fs.readFileSync(path.join(migrationsDir, f.name));
            await txn.query(sql.typeAlias('void')`${raw(fp.toString())}`);
            await txn.query(sql.typeAlias('void')`
              INSERT INTO schema_migrations VALUES (${f.name});`);
          }
        });
      });

    // TODO: release advisory lock
  });
}
