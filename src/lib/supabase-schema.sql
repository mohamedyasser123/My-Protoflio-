-- ================================================================
-- Portfolio CMS — Supabase Schema
-- Run this in your Supabase SQL Editor (Project → SQL Editor → New query)
-- ================================================================

-- ─── Projects Table ──────────────────────────────────────────────
create table if not exists projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text unique not null,
  short_description text not null default '',
  long_description text not null default '',
  technologies text[] not null default '{}',
  github_url text,
  live_demo_url text,
  video_url text,
  thumbnail_url text not null default '',
  gallery_urls text[] not null default '{}',
  featured boolean not null default false,
  visible boolean not null default true,
  status text not null default 'Draft',
  display_order integer not null default 0,
  category text not null default 'Web App',
  role text,
  challenges text,
  solutions text,
  project_date date,
  github_repo_id integer unique,
  github_stars integer not null default 0,
  github_forks integer not null default 0,
  github_deleted boolean not null default false,
  last_sync_time timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ─── Updated_at Trigger ──────────────────────────────────────────
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists update_projects_updated_at on projects;
create trigger update_projects_updated_at
  before update on projects
  for each row execute function update_updated_at_column();

-- ─── Row Level Security ───────────────────────────────────────────
alter table projects enable row level security;

-- Drop existing policies to avoid conflicts
drop policy if exists "Public can read visible projects" on projects;
drop policy if exists "Authenticated users have full access" on projects;

-- Visitors can only read visible projects
create policy "Public can read visible projects"
  on projects for select
  using (visible = true);

-- Authenticated admin has full access (insert, update, delete, select all)
create policy "Authenticated users have full access"
  on projects for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ─── Storage Bucket ───────────────────────────────────────────────
-- Run this separately in the Storage section of your Supabase dashboard,
-- OR run this SQL:

insert into storage.buckets (id, name, public)
values ('project-images', 'project-images', true)
on conflict (id) do nothing;

-- Allow public to read images
drop policy if exists "Public can view images" on storage.objects;
create policy "Public can view images"
  on storage.objects for select
  using (bucket_id = 'project-images');

-- Allow authenticated users to upload images
drop policy if exists "Auth users can upload images" on storage.objects;
create policy "Auth users can upload images"
  on storage.objects for insert
  with check (bucket_id = 'project-images' and auth.role() = 'authenticated');

-- Allow authenticated users to delete their images
drop policy if exists "Auth users can delete images" on storage.objects;
create policy "Auth users can delete images"
  on storage.objects for delete
  using (bucket_id = 'project-images' and auth.role() = 'authenticated');

-- ─── Sample Data (optional) ───────────────────────────────────────
-- Uncomment and run this to seed your first project:
/*
insert into projects (title, slug, short_description, long_description, technologies, category, featured, visible, display_order, thumbnail_url)
values (
  'My Portfolio',
  'my-portfolio',
  'A modern portfolio website built with React, TypeScript and Supabase.',
  '<p>Full-stack portfolio site with a hidden admin CMS powered by Supabase.</p>',
  array['React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
  'Web App',
  true,
  true,
  1,
  ''
);
*/
