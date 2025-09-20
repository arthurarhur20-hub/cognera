
-- Enable extensions
create extension if not exists "uuid-ossp";
create extension if not exists "pgcrypto";

-- PROFILES
create table if not exists profiles(
  id uuid primary key default gen_random_uuid(),
  tg_id text,
  username text,
  avatar_url text,
  created_at timestamptz default now()
);

-- BALANCES
create table if not exists balances(
  user_id uuid primary key references profiles(id) on delete cascade,
  real_cents int default 0,
  bonus_cents int default 0,
  updated_at timestamptz default now()
);

-- PAYMENTS
create table if not exists payments(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete set null,
  provider text,
  amount_cents int,
  status text,
  payload jsonb,
  created_at timestamptz default now()
);

-- SUBSCRIPTIONS
create table if not exists subscriptions(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  plan text check (plan in ('free','standard','pro')),
  status text check (status in ('active','expired','canceled')),
  started_at timestamptz,
  expires_at timestamptz
);

-- SUBSCRIPTION USAGE
create table if not exists subscription_usage(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  period text,
  op_type text check (op_type in ('text','image','video','audio')),
  used_count int default 0
);

-- SERVICES
create table if not exists services(
  code text primary key,
  name text,
  category text check (category in ('Ассистенты','Изображения','Видео','Аудио')),
  about text,
  tags text[],
  tier text check (tier in ('free','standard','pro','balance_only'))
);

-- SERVICE PRICES
create table if not exists service_prices(
  service_code text references services(code) on delete cascade,
  op_type text,
  price_cents int,
  primary key (service_code, op_type)
);

-- USER SERVICES
create table if not exists user_services(
  user_id uuid references profiles(id) on delete cascade,
  service_code text references services(code) on delete cascade,
  enabled boolean default true,
  created_at timestamptz default now(),
  primary key (user_id, service_code)
);

-- THREADS / MESSAGES
create table if not exists threads(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  service_code text references services(code) on delete set null,
  title text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists messages(
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  role text check (role in ('user','assistant','system')),
  content text,
  meta jsonb,
  created_at timestamptz default now()
);

create table if not exists files(
  id uuid primary key default gen_random_uuid(),
  thread_id uuid references threads(id) on delete cascade,
  message_id uuid references messages(id) on delete cascade,
  url text,
  mime text,
  size_bytes int,
  width int,
  height int,
  duration_seconds numeric,
  created_at timestamptz default now()
);

-- REFERRALS
create table if not exists referrals(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  code text,
  invited_user_id uuid references profiles(id) on delete set null,
  bonus_cents int,
  created_at timestamptz default now()
);

-- TICKETS
create table if not exists tickets(
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) on delete cascade,
  subject text,
  body text,
  status text default 'open',
  created_at timestamptz default now()
);

-- ADMINS
create table if not exists admins(
  user_id uuid primary key references profiles(id) on delete cascade,
  role text check (role in ('owner','manager','support'))
);

-- RLS (skeleton: enable; real policies must be tuned in studio)
alter table profiles enable row level security;
alter table balances enable row level security;
alter table payments enable row level security;
alter table subscriptions enable row level security;
alter table subscription_usage enable row level security;
alter table threads enable row level security;
alter table messages enable row level security;
alter table files enable row level security;
alter table referrals enable row level security;
alter table tickets enable row level security;
alter table user_services enable row level security;

-- Basic owner policies (replace with JWT claims in app)
create policy "own_profile" on profiles for select using (true);
