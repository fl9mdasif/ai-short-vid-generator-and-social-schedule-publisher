-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Drop existing tables - cleanly start over
drop table if exists "user";
drop table if exists users;

-- Create users table
create table users (
  id uuid primary key default uuid_generate_v4(),
  clerk_id varchar(255) unique not null,
  email varchar(255),
  name varchar(255),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- DISABLE Row Level Security (RLS)
-- Since we are strictly using this table from our Next.js backend (which we trust) 
-- and we are not using Supabase Auth (using Clerk instead), disabling RLS is the 
-- simplest way to allow the standard client to write to it.
alter table users disable row level security;
