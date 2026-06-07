-- IDLE iktah 工具箱：Supabase 雲端同步與權限系統
-- 請用 SQL Editor 右下角 Role: postgres 執行

create extension if not exists pgcrypto;

create table if not exists public.app_admins (
  email text primary key,
  created_at timestamptz not null default now()
);

-- 請把下面 email 換成你的管理者 Email 後執行一次
-- insert into public.app_admins (email)
-- values ('你的管理者Email@example.com')
-- on conflict (email) do nothing;

create table if not exists public.iktah_notes (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.iktah_recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  base_weight numeric not null default 500,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.iktah_recipe_ingredients (
  id uuid primary key default gen_random_uuid(),
  recipe_id uuid not null references public.iktah_recipes(id) on delete cascade,
  name text not null default '',
  amount numeric not null default 0,
  unit text not null default '克',
  sort_order integer not null default 0
);

alter table public.app_admins enable row level security;
alter table public.iktah_notes enable row level security;
alter table public.iktah_recipes enable row level security;
alter table public.iktah_recipe_ingredients enable row level security;

create or replace function public.is_iktah_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.app_admins
    where email = auth.jwt() ->> 'email'
  );
$$;

drop policy if exists "admins can read admins" on public.app_admins;
create policy "admins can read admins"
on public.app_admins
for select
to authenticated
using (public.is_iktah_admin());

drop policy if exists "public can read notes" on public.iktah_notes;
create policy "public can read notes"
on public.iktah_notes
for select
to anon, authenticated
using (true);

drop policy if exists "admins can insert notes" on public.iktah_notes;
create policy "admins can insert notes"
on public.iktah_notes
for insert
to authenticated
with check (public.is_iktah_admin());

drop policy if exists "admins can update notes" on public.iktah_notes;
create policy "admins can update notes"
on public.iktah_notes
for update
to authenticated
using (public.is_iktah_admin())
with check (public.is_iktah_admin());

drop policy if exists "admins can delete notes" on public.iktah_notes;
create policy "admins can delete notes"
on public.iktah_notes
for delete
to authenticated
using (public.is_iktah_admin());

drop policy if exists "public can read recipes" on public.iktah_recipes;
create policy "public can read recipes"
on public.iktah_recipes
for select
to anon, authenticated
using (true);

drop policy if exists "admins can insert recipes" on public.iktah_recipes;
create policy "admins can insert recipes"
on public.iktah_recipes
for insert
to authenticated
with check (public.is_iktah_admin());

drop policy if exists "admins can update recipes" on public.iktah_recipes;
create policy "admins can update recipes"
on public.iktah_recipes
for update
to authenticated
using (public.is_iktah_admin())
with check (public.is_iktah_admin());

drop policy if exists "admins can delete recipes" on public.iktah_recipes;
create policy "admins can delete recipes"
on public.iktah_recipes
for delete
to authenticated
using (public.is_iktah_admin());

drop policy if exists "public can read ingredients" on public.iktah_recipe_ingredients;
create policy "public can read ingredients"
on public.iktah_recipe_ingredients
for select
to anon, authenticated
using (true);

drop policy if exists "admins can insert ingredients" on public.iktah_recipe_ingredients;
create policy "admins can insert ingredients"
on public.iktah_recipe_ingredients
for insert
to authenticated
with check (public.is_iktah_admin());

drop policy if exists "admins can update ingredients" on public.iktah_recipe_ingredients;
create policy "admins can update ingredients"
on public.iktah_recipe_ingredients
for update
to authenticated
using (public.is_iktah_admin())
with check (public.is_iktah_admin());

drop policy if exists "admins can delete ingredients" on public.iktah_recipe_ingredients;
create policy "admins can delete ingredients"
on public.iktah_recipe_ingredients
for delete
to authenticated
using (public.is_iktah_admin());
