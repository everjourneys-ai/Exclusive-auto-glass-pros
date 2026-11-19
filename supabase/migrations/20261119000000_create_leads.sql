-- Leads captured from the landing page quote form.
-- Written only by the server (/api/leads) using the secret key, which bypasses RLS.
-- RLS is enabled with NO policies, so the public (anon/publishable) key can
-- neither read nor write leads — customer contact details are never exposed.

create table if not exists public.leads (
  id              uuid primary key default gen_random_uuid(),
  created_at      timestamptz not null default now(),

  damage_type     text not null check (damage_type in ('chip', 'crack', 'replace', 'window')),
  contact_method  text not null check (contact_method in ('call', 'text', 'email')),
  first_name      text not null check (char_length(first_name) between 1 and 80),
  phone           text check (char_length(phone) <= 30),
  email           text check (char_length(email) <= 200),
  vehicle         text check (char_length(vehicle) <= 120),
  zip             text check (zip ~ '^\d{5}$'),

  -- Ad attribution (which campaign/click produced the lead)
  utm_source      text,
  utm_medium      text,
  utm_campaign    text,
  utm_term        text,
  utm_content     text,
  gclid           text,
  fbclid          text,
  landing_page    text,
  referrer        text,

  -- Follow-up workflow for the shop
  status          text not null default 'new' check (status in ('new', 'contacted', 'booked', 'lost', 'spam')),
  notes           text,

  constraint leads_has_contact check (phone is not null or email is not null)
);

comment on table public.leads is 'Quote requests from exclusiveautoglasspros.com. Server-write only.';

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

alter table public.leads enable row level security;
-- Intentionally no policies: only the server (secret key) can access this table.
