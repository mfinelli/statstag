import { redirect } from '@sveltejs/kit';
import { z } from 'zod';
import { sql } from '$lib/server/types';

import type { PageServerLoad } from './$types';

type Score = {
  id: number;
  label: string;
  score: number;
};

type Leaderboard = {
  id: number;
  name: string;
  slug: string;
  scores: Score[];
};

export const load: PageServerLoad<Leaderboard> = async ({ locals, params }) => {
  let leaderboard;
  let scores;

  await locals.db.connect(async (c) => {
    return await c.transaction(async (txn) => {
      leaderboard = await txn.maybeOne(sql.typeAlias('leaderboard')`SELECT
        id, name, slug FROM leaderboards WHERE slug = ${params.slug} LIMIT 1;`);

      if (leaderboard === null) {
        throw redirect(307, '/not-found');
      }

      scores = await txn.any(sql.typeAlias('score')`SELECT id, label, score
        FROM scores WHERE leaderboard_id = ${leaderboard.id}`);
    });
  });

  return {
    id: leaderboard === undefined ? 0 : leaderboard['id'],
    name: leaderboard === undefined ? '' : leaderboard['name'],
    slug: leaderboard === undefined ? '' : leaderboard['slug'],
    scores: scores === undefined ? [] : scores,
  };
};
