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

-- Create generated_video_assets table to store completed video assets
-- One series can have MULTIPLE video records (scheduled generations)
create table generated_video_assets (
  id uuid primary key default uuid_generate_v4(),
  series_id uuid references video_generations(id) not null,
  
  -- Generated content
  script_json jsonb not null,
  audio_url text not null,
  captions_url text not null,
  image_urls text[] not null, -- Array of image URLs from Replicate
  
  -- Metadata
  video_number integer, -- Which video in the series (1, 2, 3, etc.)
  status varchar(50) default 'completed',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for faster queries by series (important since one series has many videos)
create index idx_generated_video_assets_series_id on generated_video_assets(series_id);

-- Index for querying by creation date
create index idx_generated_video_assets_created_at on generated_video_assets(created_at);

-- Disable RLS for trusted backend usage
-- alter table generated_video_assets disable row level security;

-- Create social_connections table (User requested schema)
create table social_connections (
  id uuid primary key default uuid_generate_v4(),
  user_id text not null, -- Stores Clerk User ID
  platform text not null, -- 'youtube', 'instagram', 'tiktok'
  
  access_token text,
  refresh_token text,
  expires_at timestamp with time zone,
  
  profile_name text,
  profile_image text,
  
  created_at timestamp with time zone default now(),
  
  -- Prevent multiple connections of same platform for same user
  unique(user_id, platform)
);

-- Enable RLS (though generally we use service role in actions, good practice to have)
alter table social_connections enable row level security;

-- Policy provided by user (Note: auth.uid() is Supabase Auth UUID, user_id is Clerk ID text. 
-- Mismatch may prevent client-side access, but we use server actions with admin client usually.)
-- create policy "Users can manage their own social connections" on social_connections for all
-- using (auth.uid()::text = user_id); 
-- Commented out strictly because we are not using Supabase Auth, so auth.uid() is null in this context.
-- We will stick to server-side admin operations for now.

-- Index for faster lookups
create index idx_social_connections_user_id on social_connections(user_id);

