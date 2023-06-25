import { json } from '@sveltejs/kit';
import { sql } from '$lib/server/types';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({
  locals,
  request,
}: RequestEvent) => {
  const form = await request.json();

  const name = form['name'];
  // TODO: regenerate this if it's not unique
  const slug = Math.random().toString(36).slice(2, 9);

  let lb = await locals.db.connect(async (c) => {
    return await c.transaction(async (txn) => {
      return await txn.one(sql.typeAlias('slug')` INSERT INTO leaderboards
        (name, slug, created_at, updated_at) VALUES (${name}, ${slug}, NOW(),
        NOW()) RETURNING slug;`);
    });
  });

  return json(lb);
};
