import { json } from '@sveltejs/kit';
import { sql } from '$lib/server/types';
import type { RequestEvent, RequestHandler } from './$types';

export const POST: RequestHandler = async ({
  locals,
  params,
  request,
}: RequestEvent) => {
  const form = await request.json();

  const slug = params['slug'];
  let returnScores = [];

  await locals.db.connect(async (c) => {
    await c.transaction(async (txn) => {
      const lb = await txn.one(sql.typeAlias('id')`SELECT id FROM leaderboards
        WHERE slug = ${slug} LIMIT 1;`);

      const scores = await txn.any(sql.typeAlias('score')`SELECT id, label,
        score FROM scores WHERE leaderboard_id = ${lb.id};`);

      const ids = scores.map((s) => s.id);

      form.forEach(async (score) => {
        if (Object.hasOwn(score, 'id') && ids.includes(score['id'])) {
          const old = scores.filter((s) => s['id'] === score['id'])[0];
          if (
            old['score'] !== score['score'] ||
            old['label'] !== score['label']
          ) {
            await txn.query(sql.typeAlias('void')`UPDATE scores
              SET label = ${score['label']}, score = ${score['score']},
              updated_at = NOW() WHERE id = ${score['id']} AND
              leaderboard_id = ${lb.id};`);
          }

          returnScores = [
            ...returnScores,
            { id: score['id'], label: score['label'], score: score['score'] },
          ];
        } else {
          const id = await txn.one(sql.typeAlias('id')`INSERT INTO scores (
            leaderboard_id, label, score, created_at, updated_at) VALUES
            (${lb.id}, ${score['label']}, ${score['score']}, NOW(), NOW())
            RETURNING id;`);

          returnScores = [
            ...returnScores,
            { id: id.id, label: score['label'], score: score['score'] },
          ];
        }
      });
    });
  });

  return json(returnScores.sort((a, b) => b.score - a.score));
};
