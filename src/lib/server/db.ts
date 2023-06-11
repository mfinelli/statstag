import { env } from '$env/dynamic/private';
import { createPool } from 'slonik';
const pool = await createPool(env.DATABASE_URL);
import { migrateDB } from '$lib/server/migrate';

await migrateDB(pool);
export { pool };
