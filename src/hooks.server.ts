// import type Handle from '@sveltejs/kit';
import { pool } from '$lib/server/db';

export async function handle({ event, resolve }) {
  event.locals.db = pool;
  return await resolve(event);
}
