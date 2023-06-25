import { json } from '@sveltejs/kit';
import { sql } from '$lib/server/types';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({
  locals,
  params,
  request,
}: RequestEvent) => {
  const form = await request.json();

  const id = form['id'];
  const name = form['name'];
  const slug = params['slug'];

  if (name === '') {
    return json({ name: '' });
  }

  await locals.db.connect(async (c) => {
    await c.transaction(async (txn) => {
      let lb = await txn.one(sql.typeAlias('id')`SELECT id FROM leaderboards
        WHERE id = ${id} and slug = ${slug} LIMIT 1;`);

      await txn.query(sql.typeAlias('void')`UPDATE leaderboards
        SET name = ${name}, updated_at = NOW()  WHERE id = ${id}`);
    });
  });

  return json({ name: name });
};
