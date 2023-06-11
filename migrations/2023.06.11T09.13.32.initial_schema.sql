CREATE TABLE leaderboards (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  name VARCHAR NOT NULL,
  slug VARCHAR NOT NULL,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT leaderboards_pkey PRIMARY KEY (id),
  CONSTRAINT leaderboards_slug_key UNIQUE (slug)
);

CREATE TABLE scores (
  id BIGINT GENERATED ALWAYS AS IDENTITY,
  leaderboard_id BIGINT NOT NULL,
  label VARCHAR NOT NULL,
  score BIGINT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL,
  CONSTRAINT scores_pkey PRIMARY KEY (id),
  CONSTRAINT fk_scores_leaderboard FOREIGN KEY (leaderboard_id)
    REFERENCES leaderboards (id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE INDEX scores_leaderboard_id_idx ON scores (leaderboard_id);
