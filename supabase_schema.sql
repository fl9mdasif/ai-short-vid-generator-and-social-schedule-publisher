-- Enable UUID extension if not already enabled
create extension if not exists "uuid-ossp";

-- Drop existing tables - cleanly start over
-- drop table if exists "user";
-- drop table if exists users;

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

-- Create video_generations table
create table video_generations (
  id uuid primary key default uuid_generate_v4(),
  user_clerk_id varchar(255) not null,
  
  -- Niche
  niche_type varchar(50) not null,
  selected_niche varchar(255),
  custom_niche varchar(255),
  custom_niche_description text,
  
  -- Language
  language_name varchar(100),
  language_country_code varchar(50),
  language_flag varchar(50),
  language_model_name varchar(100),
  language_model_code varchar(100),
  
  -- Voice
  voice_model varchar(100),
  voice_model_name varchar(100),
  voice_preview_url text,
  voice_gender varchar(20),
  
  -- Music & Style
  selected_bg_music text[], -- Array of URLs
  selected_video_style_id varchar(100),
  selected_caption_style_id varchar(100),
  
  -- Series Details
  series_name varchar(255),
  description text, -- Optional description to guide script generation
  duration varchar(50),
  platform varchar(50)[], -- Array of platform names
  publish_time varchar(50),
  
  -- Metadata
  status varchar(50) default 'pending', -- pending, processing, completed, failed
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster queries by user
create index idx_video_generations_user_clerk_id on video_generations(user_clerk_id);

-- Disable RLS for now (trusted backend usage)
alter table video_generations disable row level security;
