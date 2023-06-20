import type { Handle } from '@sveltejs/kit';
import { initDB } from '$lib/server/db';

export const handle: Handle = async ({ event, resolve }) => {
  event.locals.db ||= await initDB();
  return await resolve(event);
};
