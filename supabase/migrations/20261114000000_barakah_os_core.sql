-- Barakah OS core schema (Supabase/PostgreSQL) — mirrors apps/platform Laravel tables.
-- Money is NUMERIC(19,4), never float. Every tenant table carries user_id and RLS
-- so a user can only see their own rows (tenant isolation, verified in policies).
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text, plan text not null default 'Free',
  created_at timestamptz not null default now()
);
create table if not exists public.accounts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, type text not null default 'Bank',
  balance numeric(19,4) not null default 0, currency text not null default 'PKR',
  created_at timestamptz not null default now()
);
create table if not exists public.transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  account_id uuid references public.accounts(id) on delete set null,
  family_member_id uuid, date date not null default current_date,
  description text not null, category text not null default 'General',
  type text not null check (type in ('income','expense','transfer')),
  amount numeric(19,4) not null, created_at timestamptz not null default now()
);
create table if not exists public.budgets (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null, monthly_limit numeric(19,4) not null
);
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, target numeric(19,4) not null, saved numeric(19,4) not null default 0,
  deadline date
);
create table if not exists public.businesses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, revenue numeric(19,4) not null default 0, expenses numeric(19,4) not null default 0
);
create table if not exists public.holdings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  symbol text not null, qty numeric(19,4) not null, price numeric(19,4) not null, avg_cost numeric(19,4) not null
);
create table if not exists public.family_members (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, relation text not null default 'Family'
);
create table if not exists public.habits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, target text not null default 'Daily', days date[] not null default '{}'
);
create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, status text not null default 'todo' check (status in ('todo','doing','done')),
  due date, priority text not null default 'Medium'
);
create table if not exists public.journal_entries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date, text text not null
);
create table if not exists public.readings (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null, progress int not null default 0 check (progress between 0 and 100)
);
create table if not exists public.skills (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null, level int not null default 0 check (level between 0 and 100)
);
create table if not exists public.health_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  date date not null default current_date, metric text not null, value text not null
);
create table if not exists public.qard_loans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  person text not null, amount numeric(19,4) not null, due date
);

-- Row Level Security: tenant isolation on every table.
do $$
declare t text;
begin
  foreach t in array array['profiles','accounts','transactions','budgets','goals','businesses','holdings','family_members','habits','tasks','journal_entries','readings','skills','health_logs','qard_loans']
  loop
    execute format('alter table public.%I enable row level security', t);
    execute format('drop policy if exists "own rows" on public.%I', t);
    if t = 'profiles' then
      execute format('create policy "own rows" on public.%I for all using (auth.uid() = id) with check (auth.uid() = id)', t);
    else
      execute format('create policy "own rows" on public.%I for all using (auth.uid() = user_id) with check (auth.uid() = user_id)', t);
    end if;
  end loop;
end $$;
