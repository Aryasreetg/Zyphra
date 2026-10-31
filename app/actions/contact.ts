"use server";

import { z } from "zod";
import { db, isDbConfigured } from "@/lib/db";

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
