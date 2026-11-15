"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { checkPassword, createAdminSession, destroyAdminSession, isAdminConfigured, requireAdmin } from "@/lib/admin-auth";
import { db, ENQUIRY_STATUSES, STUDENT_STATUSES, type Enquiry } from "@/lib/db";
import { coursesData } from "@/config/courses";
import { feeSummary, minutesBetween } from "@/lib/fees";

// ── Auth ────────────────────────────────────────────────────────────────────

export async function login(_prev: { error?: string }, formData: FormData): Promise<{ error?: string }> {
  if (!isAdminConfigured()) {
    return { error: "ADMIN_PASSWORD is not set. Add it in Netlify → Site configuration → Environment variables." };
  }
  const password = String(formData.get("password") ?? "");
  if (!checkPassword(password)) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "Incorrect password." };
  }
  await createAdminSession();
  redirect("/admin");
}

export async function logout() {
  await destroyAdminSession();
  redirect("/admin/login");
}

function refresh() {
  revalidatePath("/admin", "layout");
}

const idSchema = z.coerce.number().int().positive();

// ── Enquiries ───────────────────────────────────────────────────────────────

export async function updateEnquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const status = z.enum(ENQUIRY_STATUSES).parse(formData.get("status"));
  const sql = await db();
  await sql`update enquiries set status = ${status} where id = ${id}`;
  refresh();
}

export async function saveEnquiryNotes(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const notes = z.string().max(5000).parse(String(formData.get("notes") ?? "")).trim();
  const sql = await db();
  await sql`update enquiries set admin_notes = ${notes || null} where id = ${id}`;
  refresh();
}

export async function deleteEnquiry(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const sql = await db();
  await sql`delete from enquiries where id = ${id}`;
  refresh();
}

/** "₹30,000" → 30000; anything without digits → 0 */
function priceToNumber(price: string | null | undefined) {
  const digits = (price ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : 0;
}

export async function convertEnquiryToStudent(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const sql = await db();

  const [enquiry] = await sql<Enquiry[]>`select * from enquiries where id = ${id}`;
  if (!enquiry) redirect("/admin/enquiries");

  const course = coursesData.find((c) => c.id === enquiry.course_interest);
  const [student] = await sql<{ id: number }[]>`
    insert into students (name, email, phone, course_id, fee_total, enquiry_id, start_date)
    values (
      ${enquiry.name}, ${enquiry.email}, ${enquiry.phone}, ${course?.id ?? null},
      ${priceToNumber(course?.offerPrice)}, ${enquiry.id}, current_date
    )
    returning id
  `;
  await sql`update enquiries set status = 'converted' where id = ${id}`;
  refresh();
  redirect(`/admin/students/${student.id}?created=1`);
}

// ── Students ────────────────────────────────────────────────────────────────

export type StudentFormState = {
  error?: string;
  fieldErrors?: Record<string, string>;
  saved?: boolean;
  /** Echoed back on error so the form keeps what was typed */
  values?: Record<string, string>;
};

const studentSchema = z
  .object({
    name: z.string().trim().min(2, "Name is required").max(100),
    email: z.string().trim().email("Enter a valid email").max(200),
    phone: z.string().trim().max(20).optional(),
    course_id: z.string().trim().max(100).optional(),
    batch: z.string().trim().max(100).optional(),
    status: z.enum(STUDENT_STATUSES),
    fee_total: z.coerce.number().int("Whole rupees only").min(0, "Can't be negative"),
    fee_paid: z.coerce.number().int("Whole rupees only").min(0, "Can't be negative"),
    start_date: z
      .string()
      .regex(/^(\d{4}-\d{2}-\d{2})?$/, "Invalid date")
      .optional(),
    notes: z.string().max(5000).optional(),
    sessions_included: z.coerce.number().int("Whole number only").min(0, "Can't be negative").max(1000),
    sessions_prior: z.coerce.number().int("Whole number only").min(0, "Can't be negative").max(1000),
    // Empty = use the default (total fee ÷ sessions)
    extra_session_rate: z
      .union([z.literal(""), z.coerce.number().int("Whole rupees only").min(0, "Can't be negative")])
      .optional(),
  });

function parseStudent(formData: FormData) {
  const get = (k: string) => {
    const v = formData.get(k);
    return v === null ? undefined : String(v);
  };
  return studentSchema.safeParse({
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    course_id: get("course_id"),
    batch: get("batch"),
    status: get("status"),
    fee_total: get("fee_total") || 0,
    fee_paid: get("fee_paid") || 0,
    start_date: get("start_date"),
    notes: get("notes"),
    sessions_included: get("sessions_included") || 0,
    sessions_prior: get("sessions_prior") || 0,
    extra_session_rate: get("extra_session_rate") ?? "",
  });
}

function toFieldErrors(error: z.ZodError) {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0]);
    if (!out[key]) out[key] = issue.message;
  }
  return out;
}

export async function saveStudent(_prev: StudentFormState, formData: FormData): Promise<StudentFormState> {
  await requireAdmin();
  const idRaw = formData.get("id");
  const parsed = parseStudent(formData);
  if (!parsed.success) {
    const values: Record<string, string> = {};
    formData.forEach((val, key) => {
      if (typeof val === "string") values[key] = val;
    });
    return { error: "Please fix the highlighted fields.", fieldErrors: toFieldErrors(parsed.error), values };
  }

  const s = parsed.data;
  const values = {
    name: s.name,
    email: s.email,
    phone: s.phone || null,
    course_id: s.course_id || null,
    batch: s.batch || null,
    status: s.status,
    fee_total: s.fee_total,
    fee_paid: s.fee_paid,
    start_date: s.start_date || null,
    notes: s.notes?.trim() || null,
    sessions_included: s.sessions_included,
    sessions_prior: s.sessions_prior,
    extra_session_rate: s.extra_session_rate === "" || s.extra_session_rate === undefined ? null : s.extra_session_rate,
  };

  const sql = await db();
  const echo = () => {
    const out: Record<string, string> = {};
    formData.forEach((val, key) => {
      if (typeof val === "string") out[key] = val;
    });
    return out;
  };

  if (idRaw) {
    const id = idSchema.parse(idRaw);
    // Paid can't exceed what's due, including fees for extra sessions already attended
    const [{ n: attended }] = await sql<{ n: number }[]>`select count(*)::int as n from attendance where student_id = ${id}`;
    const due = feeSummary(values, attended).totalDue;
    if (values.fee_total > 0 && values.fee_paid > due) {
      return {
        error: "Please fix the highlighted fields.",
        fieldErrors: { fee_paid: `Paid amount is more than the total due (₹${due.toLocaleString("en-IN")})` },
        values: echo(),
      };
    }
    await sql`
      update students set
        name = ${values.name}, email = ${values.email}, phone = ${values.phone},
        course_id = ${values.course_id}, batch = ${values.batch}, status = ${values.status},
        fee_total = ${values.fee_total}, fee_paid = ${values.fee_paid},
        start_date = ${values.start_date}, notes = ${values.notes},
        sessions_included = ${values.sessions_included}, extra_session_rate = ${values.extra_session_rate},
        sessions_prior = ${values.sessions_prior},
        updated_at = now()
      where id = ${id}
    `;
    refresh();
    return { saved: true };
  }

  const dueNew = feeSummary(values, 0).totalDue;
  if (values.fee_total > 0 && values.fee_paid > dueNew) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: { fee_paid: `Paid amount is more than the total due (₹${dueNew.toLocaleString("en-IN")})` },
      values: echo(),
    };
  }
  const [created] = await sql<{ id: number }[]>`
    insert into students (name, email, phone, course_id, batch, status, fee_total, fee_paid, start_date, notes, sessions_included, extra_session_rate, sessions_prior)
    values (
      ${values.name}, ${values.email}, ${values.phone}, ${values.course_id}, ${values.batch},
      ${values.status}, ${values.fee_total}, ${values.fee_paid}, ${values.start_date}, ${values.notes},
      ${values.sessions_included}, ${values.extra_session_rate}, ${values.sessions_prior}
    )
    returning id
  `;
  refresh();
  redirect(`/admin/students/${created.id}?created=1`);
}

export async function deleteStudent(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const sql = await db();
  await sql`delete from students where id = ${id}`;
  refresh();
  redirect("/admin/students");
}

// ── Attendance ──────────────────────────────────────────────────────────────

export type AttendanceState = { error?: string; fieldErrors?: Record<string, string>; added?: number };

const attendanceSchema = z
  .object({
    student_id: idSchema,
    session_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Choose a date"),
    start_time: z.string().regex(/^\d{2}:\d{2}$/, "Enter a start time"),
    end_time: z.string().regex(/^\d{2}:\d{2}$/, "Enter an end time"),
    topic: z.string().trim().max(300).optional(),
  })
  .refine((a) => minutesBetween(a.start_time, a.end_time) > 0, {
    message: "End time must be after the start time",
    path: ["end_time"],
  });

export async function addAttendance(_prev: AttendanceState, formData: FormData): Promise<AttendanceState> {
  await requireAdmin();
  const parsed = attendanceSchema.safeParse({
    student_id: formData.get("student_id"),
    session_date: String(formData.get("session_date") ?? ""),
    start_time: String(formData.get("start_time") ?? ""),
    end_time: String(formData.get("end_time") ?? ""),
    topic: String(formData.get("topic") ?? ""),
  });
  if (!parsed.success) return { error: "Please fix the highlighted fields.", fieldErrors: toFieldErrors(parsed.error) };

  const a = parsed.data;
  const sql = await db();
  await sql`
    insert into attendance (student_id, session_date, start_time, end_time, topic)
    values (${a.student_id}, ${a.session_date}, ${a.start_time}, ${a.end_time}, ${a.topic || null})
  `;
  await sql`update students set updated_at = now() where id = ${a.student_id}`;
  refresh();
  return { added: Date.now() };
}

export async function deleteAttendance(formData: FormData) {
  await requireAdmin();
  const id = idSchema.parse(formData.get("id"));
  const sql = await db();
  await sql`delete from attendance where id = ${id}`;
  refresh();
}
