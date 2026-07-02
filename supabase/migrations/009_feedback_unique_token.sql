-- Migration: 009_feedback_unique_token.sql
-- Run: (pending — not yet applied to the live database, see note below)
-- Purpose: Prevent duplicate / spam feedback submissions against the
--          same feedback_token.
--
-- Before this migration, both feedback entry points — the public
-- rating link (RatingPage.jsx, reached via the WhatsApp message) and
-- the in-person feedback modal (FeedbackModal.jsx) — wrote to
-- `feedback` with no server-side limit on how many times a given
-- token could be submitted. A leaked, guessed, or simply revisited
-- link could be POSTed to repeatedly — e.g. to inflate a rating, or
-- to pile on 1-star reviews against a specific stylist.
--
-- This adds a UNIQUE constraint on feedback_token, so a second insert
-- for the same token is rejected by Postgres (surfaced as a 409 by
-- PostgREST) instead of silently creating another row. Existing rows
-- with a NULL token are unaffected — Postgres UNIQUE constraints
-- permit multiple NULLs by design.
--
-- Safety: if any duplicate (feedback_token, feedback_token) pairs
-- already exist on the live table, a plain ALTER ... ADD CONSTRAINT
-- would fail outright. This migration first removes exact duplicates
-- — keeping only the earliest row per token — before adding the
-- constraint, so it is safe to run against the table as it exists
-- today. The constraint creation itself is also guarded so this file
-- can be safely re-run without erroring if already applied.
--
-- NOTE: this file has been added to the repo but has NOT been run
-- against the live Supabase project yet. Per this folder's own
-- README, it needs to be pasted into Supabase → SQL Editor and run
-- once before it takes effect. The frontend fixes in this same batch
-- (feedback date format, list ordering, write-result checks) do not
-- depend on this migration and already work without it — this
-- migration is the remaining, separate hardening step against
-- duplicate/spam submissions specifically.

BEGIN;

-- Keep only the earliest row per non-null feedback_token.
-- No-op if there are no duplicates yet.
DELETE FROM feedback a
USING feedback b
WHERE a.feedback_token IS NOT NULL
  AND a.feedback_token = b.feedback_token
  AND a.ctid > b.ctid;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'feedback_token_unique'
  ) THEN
    ALTER TABLE feedback ADD CONSTRAINT feedback_token_unique UNIQUE (feedback_token);
  END IF;
END $$;

COMMIT;
