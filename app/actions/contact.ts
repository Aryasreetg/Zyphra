"use server";

import { z } from "zod";
import { db, isDbConfigured } from "@/lib/db";
import { STUDENT_COUNT_OPTIONS } from "@/config/campus";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<"name" | "email" | "phone" | "message", string>>;
  /** Echoed back on error so the form can keep what the visitor typed */
  values?: Partial<Record<"name" | "email" | "phone" | "course" | "message", string>>;
};

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .max(20)
    .regex(/^[+\d\s()-]*$/, "Please enter a valid phone number")
    .optional()
    .or(z.literal("")),
  course: z.string().trim().max(100).optional(),
  message: z.string().trim().min(10, "Tell us a little more (at least 10 characters)").max(2000),
});

export async function submitEnquiry(_prev: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field; bots usually do.
  if (formData.get("website")) return { status: "success", message: "Thanks! We'll be in touch soon." };

  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    course: String(formData.get("course") ?? ""),
    message: String(formData.get("message") ?? ""),
  };
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: ContactState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof NonNullable<ContactState["fieldErrors"]>;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors, values: raw };
  }

  if (!isDbConfigured()) {
    console.error("Contact form submitted but no database is configured.");
    return {
      status: "error",
      message: "Our form is temporarily unavailable. Please email aryasree.zyphraa@gmail.com instead.",
      values: raw,
    };
  }

  const { name, email, phone, course, message } = parsed.data;
  try {
    const sql = await db();
    await sql`
      insert into enquiries (name, email, phone, course_interest, message)
      values (${name}, ${email}, ${phone || null}, ${course || null}, ${message})
    `;
  } catch (err) {
    console.error("Failed to save enquiry", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again or email aryasree.zyphraa@gmail.com.",
      values: raw,
    };
  }

  return {
    status: "success",
    message: `Thanks ${name.split(" ")[0]}! Your query has been received — we'll get back to you within 24 hours.`,
  };
}

// ── Campus workshop proposal requests (from /campus) ───────────────────────

type CampusField = "institution" | "coordinator" | "email" | "phone" | "students" | "department";

export type CampusState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Partial<Record<CampusField, string>>;
  values?: Partial<Record<CampusField, string>>;
};

const campusSchema = z.object({
  institution: z.string().trim().min(2, "Please enter your institution's name").max(150),
  coordinator: z.string().trim().min(2, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(200),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a contact number")
    .max(20)
    .regex(/^[+\d\s()-]+$/, "Please enter a valid contact number"),
  students: z.enum(STUDENT_COUNT_OPTIONS, { message: "Please choose an estimated student count" }),
  department: z.string().trim().max(150).optional(),
});

export async function submitCampusProposal(_prev: CampusState, formData: FormData): Promise<CampusState> {
  if (formData.get("website")) return { status: "success", message: "Thank you — we'll be in touch shortly." };

  const raw = {
    institution: String(formData.get("institution") ?? ""),
    coordinator: String(formData.get("coordinator") ?? ""),
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    students: String(formData.get("students") ?? ""),
    department: String(formData.get("department") ?? ""),
  };
  const parsed = campusSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: CampusState["fieldErrors"] = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as CampusField;
      if (!fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors, values: raw };
  }

  if (!isDbConfigured()) {
    return {
      status: "error",
      message: "Our form is temporarily unavailable. Please email aryasree.zyphraa@gmail.com instead.",
      values: raw,
    };
  }

  const d = parsed.data;
  // Stored as a regular enquiry so it appears in /admin → Enquiries, tagged as a campus workshop
  const message = [
    "Campus workshop proposal request",
    `Institution: ${d.institution}`,
    d.department ? `Department: ${d.department}` : null,
    `Estimated students: ${d.students}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const sql = await db();
    await sql`
      insert into enquiries (name, email, phone, course_interest, message)
      values (${d.coordinator}, ${d.email}, ${d.phone}, ${"campus-workshop"}, ${message})
    `;
  } catch (err) {
    console.error("Failed to save campus proposal", err);
    return {
      status: "error",
      message: "Something went wrong. Please try again or email aryasree.zyphraa@gmail.com.",
      values: raw,
    };
  }

  return {
    status: "success",
    message: `Thank you, ${d.coordinator.split(" ")[0]}. We'll send a tailored proposal for ${d.institution} — with the full workshop catalogue, syllabus and institutional pricing — within 24 hours.`,
  };
}
