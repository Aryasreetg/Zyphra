import "server-only";
import postgres from "postgres";
import { getConnectionString } from "@netlify/database";

/**
 * Postgres connection shared by server actions and admin pages.
 *
 * - If DATABASE_URL is set (any Postgres: Neon, Supabase, local…), it's used.
 * - Otherwise on Netlify, the Netlify Database connection is provided by the
 *   platform and read through @netlify/database. It points at the production
 *   database for live deploys and a separate copy for deploy previews.
 */
function resolveConnectionString(): string | null {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;
  try {
    return getConnectionString();
  } catch {
    return null; // not running on Netlify with a database attached
  }
}

type Sql = ReturnType<typeof postgres>;

const globalForDb = globalThis as unknown as {
  __zyphraaSql?: Sql;
  __zyphraaUrl?: string;
  __zyphraaSchema?: Promise<void>;
};

function createClient(connectionString: string): Sql {
  // Hosted databases need SSL. Respect an explicit sslmode in the URL; otherwise
  // require SSL for anything that isn't a local database.
  const isLocal = /@(localhost|127\.0\.0\.1)[:/]/.test(connectionString);
  const ssl = /sslmode=/.test(connectionString) || isLocal ? {} : { ssl: "require" as const };
  return postgres(connectionString, {
    ...ssl,
    max: 3, // serverless functions are short-lived; keep the pool small
    idle_timeout: 20,
    connect_timeout: 15,
    prepare: false, // required for transaction-mode poolers (Neon / Supabase pooled URLs)
    onnotice: () => {},
    types: {
      // Return plain `date` columns as "YYYY-MM-DD" strings (avoids timezone shifts)
      dateOnly: { to: 1082, from: [1082], serialize: (x: string) => x, parse: (x: string) => x },
    },
  });
}

export function isDbConfigured() {
  return Boolean(resolveConnectionString());
}

function getSql(): Sql {
  const url = resolveConnectionString();
  if (!url) {
    throw new Error("Database is not configured. Attach Netlify Database to the site, or set DATABASE_URL.");
  }
  // Netlify can rotate the connection string; reconnect if it changed.
  if (!globalForDb.__zyphraaSql || globalForDb.__zyphraaUrl !== url) {
    const old = globalForDb.__zyphraaSql;
    globalForDb.__zyphraaSql = createClient(url);
    globalForDb.__zyphraaUrl = url;
    if (old) void old.end({ timeout: 5 }).catch(() => {});
  }
  return globalForDb.__zyphraaSql;
}

// Tables are created automatically on first use, so there's no separate
// migration step. The same SQL lives in db/schema.sql for reference.
const SCHEMA = [
  `create table if not exists enquiries (
    id serial primary key,
    name text not null,
    email text not null,
    phone text,
    course_interest text,
    message text not null,
    status text not null default 'new',
    admin_notes text,
    created_at timestamptz not null default now()
  )`,
  `create table if not exists students (
    id serial primary key,
    name text not null,
    email text not null,
    phone text,
    course_id text,
    batch text,
    status text not null default 'active',
    fee_total integer not null default 0,
    fee_paid integer not null default 0,
    start_date date,
    notes text,
    enquiry_id integer references enquiries(id) on delete set null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  )`,
  `create index if not exists enquiries_created_at_idx on enquiries (created_at desc)`,
  `create index if not exists students_created_at_idx on students (created_at desc)`,
];

async function ensureSchema(sql: Sql) {
  for (const statement of SCHEMA) await sql.unsafe(statement);
}

/** Returns a ready-to-use client, creating tables the first time it's called. */
export async function db(): Promise<Sql> {
  const sql = getSql();
  if (!globalForDb.__zyphraaSchema) {
    globalForDb.__zyphraaSchema = ensureSchema(sql).catch((err) => {
      globalForDb.__zyphraaSchema = undefined; // retry on next request
      throw err;
    });
  }
  await globalForDb.__zyphraaSchema;
  return sql;
}

// ── Shared types ────────────────────────────────────────────────────────────

export const ENQUIRY_STATUSES = ["new", "contacted", "converted", "closed"] as const;
export type EnquiryStatus = (typeof ENQUIRY_STATUSES)[number];

export const STUDENT_STATUSES = ["active", "paused", "completed", "dropped"] as const;
export type StudentStatus = (typeof STUDENT_STATUSES)[number];

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  course_interest: string | null;
  message: string;
  status: EnquiryStatus;
  admin_notes: string | null;
  created_at: Date;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  course_id: string | null;
  batch: string | null;
  status: StudentStatus;
  fee_total: number;
  fee_paid: number;
  start_date: string | null;
  notes: string | null;
  enquiry_id: number | null;
  created_at: Date;
  updated_at: Date;
}
