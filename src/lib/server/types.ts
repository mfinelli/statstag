import { createSqlTag } from 'slonik';
import { z } from 'zod';

export const sql = createSqlTag({
  typeAliases: {
    leaderboard: z
      .object({
        id: z.number(),
        name: z.string(),
        slug: z.string(),
      })
      .strict(),
    score: z
      .object({
        id: z.number(),
        label: z.string(),
        score: z.number(),
      })
      .strict(),
    void: z.object({}).strict(),
  },
});
