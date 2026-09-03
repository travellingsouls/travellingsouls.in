-- Enquiries: the lead capture table behind the public enquiry form.
--
-- SECURITY MODEL
-- Rows here contain customer personal data: name, phone, email, travel dates.
-- Row Level Security is enabled and NO policies are created, which means the
-- anon and authenticated roles have no access of any kind - not select, not
-- insert. That is deliberate.
--
-- Writes happen server-side only, through a Next.js Server Action using the
-- service role key, which bypasses RLS. The anon key that ships to the browser
-- therefore cannot read a single enquiry even if someone extracts it from the
-- bundle, which they can, because it is public by design.
--
-- When the admin dashboard arrives (PHASE 14) it authenticates as a real user
-- and gets an explicit policy then. Until that exists, no policy is safer than
-- a permissive one.

create extension if not exists pgcrypto;

do $$ begin
  create type public.enquiry_status as enum (
    'new', 'contacted', 'follow_up', 'confirmed', 'cancelled', 'closed'
  );
exception when duplicate_object then null;
end $$;

do $$ begin
  create type public.travel_type as enum (
    'group_tour', 'private_tour', 'customized_tour',
    'family_trip', 'adventure_trip', 'spiritual_trip', 'other'
  );
exception when duplicate_object then null;
end $$;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),

  name text not null
    constraint enquiries_name_length check (char_length(btrim(name)) between 2 and 100),

  -- Stored as submitted rather than normalised to E.164. Indian numbers arrive
  -- in many shapes and a rejected enquiry is worse than an untidy one.
  phone text not null
    constraint enquiries_phone_length check (char_length(btrim(phone)) between 6 and 20),

  email text
    constraint enquiries_email_shape check (
      email is null or email ~* '^[^@[:space:]]+@[^@[:space:]]+\.[^@[:space:]]+$'
    ),

  destination text
    constraint enquiries_destination_length check (destination is null or char_length(destination) <= 120),

  travel_date date,

  travellers integer
    constraint enquiries_travellers_range check (travellers is null or (travellers > 0 and travellers <= 100)),

  travel_type public.travel_type not null default 'other',

  budget text
    constraint enquiries_budget_length check (budget is null or char_length(budget) <= 60),

  message text
    constraint enquiries_message_length check (message is null or char_length(message) <= 2000),

  -- Which tour page the enquiry came from, when it came from one.
  tour_slug text
    constraint enquiries_tour_slug_length check (tour_slug is null or char_length(tour_slug) <= 120),

  status public.enquiry_status not null default 'new',

  -- Free-form provenance, e.g. "contact-page" or "tour:spiti-valley-expedition".
  source text
    constraint enquiries_source_length check (source is null or char_length(source) <= 120),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- The admin list is ordered newest-first and filtered by status, so those are
-- the two indexes that will actually be used.
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at
  before update on public.enquiries
  for each row execute function public.set_updated_at();

alter table public.enquiries enable row level security;

-- Belt and braces: revoke the default grants Supabase hands the public roles,
-- so access does not depend on RLS alone.
revoke all on public.enquiries from anon, authenticated;

comment on table public.enquiries is
  'Customer enquiries from the public form. Contains PII. RLS enabled with no policies: server-side service-role access only.';
