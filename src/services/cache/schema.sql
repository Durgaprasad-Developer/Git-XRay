-- ==========================================
-- GitHub Xray — Supabase Caching Schema Setup
-- ==========================================
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- to create the caching table and configure Row Level Security (RLS) policies.

-- 1. Create the caching table
CREATE TABLE IF NOT EXISTS public.cached_reports (
    username text PRIMARY KEY,
    report_json jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create index on username (lowercase) for fast search lookups
CREATE INDEX IF NOT EXISTS idx_cached_reports_username_lower ON public.cached_reports (lower(username));

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.cached_reports ENABLE ROW LEVEL SECURITY;

-- 4. Create Public/Anonymous Access Policies (since we query using the Anon key)
-- Policy: Allow read access for any public client
CREATE POLICY "Allow public read access" 
ON public.cached_reports 
FOR SELECT 
USING (true);

-- Policy: Allow public upsert (INSERT & UPDATE) access
CREATE POLICY "Allow public insert access" 
ON public.cached_reports 
FOR INSERT 
WITH CHECK (true);

-- Policy: Allow public update access
CREATE POLICY "Allow public update access" 
ON public.cached_reports 
FOR UPDATE 
USING (true)
WITH CHECK (true);

-- Policy: Allow public delete access (to purge stale cache rows)
CREATE POLICY "Allow public delete access" 
ON public.cached_reports 
FOR DELETE 
USING (true);
