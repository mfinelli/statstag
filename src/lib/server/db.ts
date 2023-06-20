import { env } from '$env/dynamic/private';
import { createPool, type DatabasePool } from 'slonik';
import { migrateDB } from '$lib/server/migrate';

export async function initDB(): Promise<DatabasePool> {
  const pool = await createPool(env.DATABASE_URL);
  await migrateDB(pool);
  return pool;
}
