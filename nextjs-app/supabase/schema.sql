-- Supabase Schema for prompt.gallery
-- Run this in the Supabase SQL Editor

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  avatar_url text,
  stripe_account_id text,      -- For creator payouts via Stripe Connect
  stripe_customer_id text,     -- For purchases
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Profiles policies
create policy "Public profiles are viewable by everyone"
  on profiles for select
  using (true);

create policy "Users can update own profile"
  on profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'full_name'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Showcases table
create table if not exists public.showcases (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  category text default 'web',
  price_cents integer not null default 499,
  preview_messages jsonb not null default '[]'::jsonb,  -- First 3 messages (free)
  full_content_path text,                                -- Path in storage bucket
  stats jsonb default '{"prompts": 0, "iterations": 0}'::jsonb,
  is_published boolean default false,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on showcases
alter table public.showcases enable row level security;

-- Showcases policies
create policy "Published showcases are viewable by everyone"
  on showcases for select
  using (is_published = true);

create policy "Users can view their own showcases"
  on showcases for select
  using (auth.uid() = creator_id);

create policy "Users can create showcases"
  on showcases for insert
  with check (auth.uid() = creator_id);

create policy "Users can update own showcases"
  on showcases for update
  using (auth.uid() = creator_id);

create policy "Users can delete own showcases"
  on showcases for delete
  using (auth.uid() = creator_id);

-- Purchases table
create table if not exists public.purchases (
  id uuid primary key default uuid_generate_v4(),
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  showcase_id uuid references public.showcases(id) on delete cascade not null,
  stripe_payment_id text,
  amount_cents integer not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  
  -- Prevent duplicate purchases
  unique(buyer_id, showcase_id)
);

-- Enable RLS on purchases
alter table public.purchases enable row level security;

-- Purchases policies
create policy "Users can view their own purchases"
  on purchases for select
  using (auth.uid() = buyer_id);

create policy "Creators can see purchases of their showcases"
  on purchases for select
  using (
    exists (
      select 1 from showcases
      where showcases.id = purchases.showcase_id
      and showcases.creator_id = auth.uid()
    )
  );

-- Function to check if user has purchased a showcase
create or replace function public.has_purchased(showcase_id uuid)
returns boolean as $$
begin
  return exists (
    select 1 from purchases
    where purchases.showcase_id = $1
    and purchases.buyer_id = auth.uid()
  );
end;
$$ language plpgsql security definer;

-- Function to increment view count
create or replace function public.increment_view_count(showcase_id uuid)
returns void as $$
begin
  update showcases
  set view_count = view_count + 1
  where id = showcase_id;
end;
$$ language plpgsql security definer;

-- Create storage bucket for showcase content
insert into storage.buckets (id, name, public)
values ('showcases', 'showcases', false)
on conflict (id) do nothing;

-- Storage policies
create policy "Authenticated users can upload showcases"
  on storage.objects for insert
  with check (
    bucket_id = 'showcases' 
    and auth.role() = 'authenticated'
  );

create policy "Users can read their own uploads"
  on storage.objects for select
  using (
    bucket_id = 'showcases'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

create policy "Users can read purchased showcases"
  on storage.objects for select
  using (
    bucket_id = 'showcases'
    and exists (
      select 1 from purchases p
      join showcases s on s.id = p.showcase_id
      where p.buyer_id = auth.uid()
      and s.full_content_path = name
    )
  );

-- Index for faster queries
create index if not exists idx_showcases_creator on showcases(creator_id);
create index if not exists idx_showcases_published on showcases(is_published);
create index if not exists idx_showcases_category on showcases(category);
create index if not exists idx_purchases_buyer on purchases(buyer_id);
create index if not exists idx_purchases_showcase on purchases(showcase_id);

-- Updated_at trigger function
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Apply updated_at triggers
create trigger handle_profiles_updated_at
  before update on profiles
  for each row execute procedure handle_updated_at();

create trigger handle_showcases_updated_at
  before update on showcases
  for each row execute procedure handle_updated_at();

