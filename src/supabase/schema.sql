-- ============================================================
-- ITS Elabram Developer Showcase — Supabase Schema
-- Jalankan file ini sekali di Supabase SQL Editor
-- ============================================================

-- Aktifkan UUID extension
create extension if not exists "pgcrypto";

-- ── PROJECTS ──
create table public.projects (
  id          uuid primary key default gen_random_uuid(),
  emoji       text not null default '🚀',
  name        text not null,
  featured    boolean not null default false,
  tagline     text not null,
  description text not null,
  category    text not null,
  status      text not null check (status in ('live', 'beta', 'dev')),
  team        text not null default 'IT Team',
  url         text,
  members     text[] not null default '{}',
  tech        text[] not null default '{}',
  tags        text[] not null default '{}',
  created_at  timestamptz not null default now()
);

-- ── COMMENTS ──
create table public.comments (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  author      text not null,
  avatar      text not null,
  color       text not null,
  body        text not null,
  created_at  timestamptz not null default now()
);

-- ── VOTES ──
create table public.votes (
  id          uuid primary key default gen_random_uuid(),
  project_id  uuid not null references public.projects(id) on delete cascade,
  user_token  uuid not null,
  created_at  timestamptz not null default now(),
  unique (project_id, user_token)
);

-- ── ACTIVITIES ──
create table public.activities (
  id         uuid primary key default gen_random_uuid(),
  text       text not null,
  created_at timestamptz not null default now()
);

-- ── VIEW: projects dengan vote count dan comment count ──
create or replace view public.projects_with_stats as
select
  p.*,
  coalesce(v.vote_count, 0)::int as votes,
  coalesce(c.comment_count, 0)::int as comment_count
from public.projects p
left join (
  select project_id, count(*) as vote_count
  from public.votes
  group by project_id
) v on v.project_id = p.id
left join (
  select project_id, count(*) as comment_count
  from public.comments
  group by project_id
) c on c.project_id = p.id;

-- ── TRIGGER: activity saat project baru di-submit ──
create or replace function public.activity_on_project_insert()
returns trigger language plpgsql security definer as $$
begin
  insert into public.activities (text) values (
    '<span class="activity-bold">' || coalesce(new.members[1], 'Developer') ||
    '</span> submit project baru: <span class="activity-bold">' || new.name || '</span>'
  );
  return new;
end;
$$;

create trigger trg_activity_project
after insert on public.projects
for each row execute function public.activity_on_project_insert();

-- ── TRIGGER: activity saat komentar baru ──
create or replace function public.activity_on_comment_insert()
returns trigger language plpgsql security definer as $$
declare pname text;
begin
  select name into pname from public.projects where id = new.project_id;
  insert into public.activities (text) values (
    '<span class="activity-bold">' || new.author ||
    '</span> comment di <span class="activity-bold">' || pname || '</span>'
  );
  return new;
end;
$$;

create trigger trg_activity_comment
after insert on public.comments
for each row execute function public.activity_on_comment_insert();

-- ── ROW LEVEL SECURITY ──
alter table public.projects   enable row level security;
alter table public.comments   enable row level security;
alter table public.votes      enable row level security;
alter table public.activities enable row level security;

-- Projects: siapapun bisa baca dan submit
create policy "projects_select" on public.projects for select using (true);
create policy "projects_insert" on public.projects for insert with check (true);

-- Comments: siapapun bisa baca dan tambah
create policy "comments_select" on public.comments for select using (true);
create policy "comments_insert" on public.comments for insert with check (true);

-- Votes: baca, tambah, hapus (deduplication via unique constraint)
create policy "votes_select" on public.votes for select using (true);
create policy "votes_insert" on public.votes for insert with check (true);
create policy "votes_delete" on public.votes for delete using (true);

-- Activities: read-only dari client
create policy "activities_select" on public.activities for select using (true);

-- ── AKTIFKAN REALTIME ──
-- Jalankan ini untuk mengaktifkan realtime subscription:
-- alter publication supabase_realtime add table public.votes;
-- alter publication supabase_realtime add table public.activities;
