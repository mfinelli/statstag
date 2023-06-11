import type { Handle } from '@sveltejs/kit';
import { pool } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db = pool;
  return await resolve(event);
}
