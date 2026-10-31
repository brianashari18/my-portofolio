create table public.portfolio_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.portfolio_admins enable row level security;
revoke all on table public.portfolio_admins from anon, authenticated;
grant select on public.portfolio_admins to authenticated;

create policy "admins can read their own membership"
  on public.portfolio_admins
  for select
  to authenticated
  using ((select auth.uid()) = user_id);

create table public.portfolio_content (
  id text primary key check (id = 'main'),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.portfolio_content enable row level security;
revoke all on table public.portfolio_content from anon, authenticated;
grant select on public.portfolio_content to anon, authenticated;
grant insert, update on public.portfolio_content to authenticated;

create or replace function public.is_portfolio_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.portfolio_admins
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_portfolio_admin() from public;
grant execute on function public.is_portfolio_admin() to authenticated;

create policy "portfolio content is publicly readable"
  on public.portfolio_content
  for select
  to anon, authenticated
  using (id = 'main');

create policy "portfolio admins can initialize content"
  on public.portfolio_content
  for insert
  to authenticated
  with check (id = 'main' and (select public.is_portfolio_admin()));

create policy "portfolio admins can update content"
  on public.portfolio_content
  for update
  to authenticated
  using (id = 'main' and (select public.is_portfolio_admin()))
  with check (id = 'main' and (select public.is_portfolio_admin()));

create or replace function public.set_portfolio_content_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger portfolio_content_updated_at
  before update on public.portfolio_content
  for each row
  execute function public.set_portfolio_content_updated_at();
