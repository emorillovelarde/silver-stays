-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES Table
create table profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text,
  full_name text,
  role text check (role in ('guest', 'owner')),
  questionnaire_data text,
  mobility_level int check (mobility_level between 1 and 5),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table profiles enable row level security;

-- Profiles Policies
create policy "Users can view their own profile" 
  on profiles for select 
  using ( auth.uid() = id );

create policy "Users can update their own profile" 
  on profiles for update 
  using ( auth.uid() = id );

create policy "Users can insert their own profile" 
  on profiles for insert 
  with check ( auth.uid() = id );

-- 2. PROPERTIES Table
create table properties (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  price_per_month numeric,
  location text,
  accessibility_rating int,
  clima_data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table properties enable row level security;

-- Properties Policies
create policy "Properties are public to read" 
  on properties for select 
  using ( true );

-- Note: No update/insert policies means only Service Role (Admin) can modify properties.

-- 3. BOOKINGS Table
create table bookings (
  id uuid default uuid_generate_v4() primary key,
  guest_id uuid references profiles(id) not null,
  property_id uuid references properties(id) not null,
  start_date date not null,
  end_date date not null,
  days_total int,
  status text check (status in ('pending', 'confirmed', 'cancelled')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table bookings enable row level security;

-- Bookings Policies
create policy "Users can view their own bookings" 
  on bookings for select 
  using ( auth.uid() = guest_id );

create policy "Users can create bookings for themselves" 
  on bookings for insert 
  with check ( auth.uid() = guest_id );

-- 4. LEADS Table (CRM)
create table leads (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  full_name text,
  phone text,
  data jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Turn on RLS
alter table leads enable row level security;

-- Leads Policies
create policy "Anyone can insert leads" 
  on leads for insert 
  with check ( true );

create policy "Admins can view leads" 
  on leads for select 
  using ( auth.role() = 'service_role' ); 
-- Note: In a real app, you'd have an 'admin' role check or similar. 
-- For development simplification, if you are reading this from a client app without service role, 
-- you might need to adjust this policy or use the dashboard.
