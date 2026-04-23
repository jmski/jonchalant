-- Migration: create ikigai_results table
-- Results are additive (users can retake). Never UPDATE or DELETE rows; only INSERT.
-- pattern is nullable — only set when three quadrants are strong and one is weak.

CREATE TABLE ikigai_results (
  id                 uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  passion_score      integer     NOT NULL CHECK (passion_score >= 0),
  mission_score      integer     NOT NULL CHECK (mission_score >= 0),
  vocation_score     integer     NOT NULL CHECK (vocation_score >= 0),
  profession_score   integer     NOT NULL CHECK (profession_score >= 0),
  strongest_quadrant text        NOT NULL CHECK (strongest_quadrant IN ('passion', 'mission', 'vocation', 'profession')),
  pattern            text        CHECK (pattern IN ('delight-no-wealth', 'delight-uncertain', 'comfortable-empty', 'useful-unexcited')),
  created_at         timestamptz NOT NULL DEFAULT now()
);

-- Row Level Security
ALTER TABLE ikigai_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own results"
  ON ikigai_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own results"
  ON ikigai_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index for fast "latest result" queries
CREATE INDEX idx_ikigai_results_user_created
  ON ikigai_results(user_id, created_at DESC);
