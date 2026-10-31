-- Reference schema. The app creates these tables automatically on first use
-- (see lib/db.ts), so you don't need to run this by hand. It's here so you can
-- inspect or recreate the database from any Postgres client if needed.

create table if not exists enquiries (
  id serial primary key,
  name text not null,
  email text not null,
  phone text,
  course_interest text,
  message text not null,
  status text not null default 'new',        -- new | contacted | converted | closed
  admin_notes text,
  created_at timestamptz not null default now()
);

create table if not exists students (
  id serial primary key,
  name text not null,
  email text not null,
  phone text,
  course_id text,                             -- matches an id in config/courses.ts
  batch text,
  status text not null default 'active',      -- active | paused | completed | dropped
  fee_total integer not null default 0,       -- in rupees
  fee_paid integer not null default 0,        -- in rupees
  start_date date,
  notes text,
  enquiry_id integer references enquiries(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on enquiries (created_at desc);
create index if not exists students_created_at_idx on students (created_at desc);
