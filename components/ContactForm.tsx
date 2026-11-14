"use client";

import React, { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";
import { submitEnquiry, type ContactState } from "@/app/actions/contact";
import { coursesData, enquiryTopics as ENQUIRY_TOPICS } from "@/config/courses";
import { GraduationCap } from "lucide-react";
import { C } from "@/lib/theme";

const initialState: ContactState = { status: "idle" };

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="pop-in text-xs mt-1.5 mb-0" style={{ color: C.red }}>
      {msg}
    </p>
  );
}

const ContactForm = () => {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);
  const searchParams = useSearchParams();
  // Lets the visitor go back to an empty form after a successful send
  const [dismissed, setDismissed] = useState<ContactState | null>(null);

  // Pre-select the course when arriving from an "Ask a Question" button (/?course=<id>#contact)
  const fromUrl = searchParams.get("course") ?? "";
  const urlCourse = ENQUIRY_TOPICS.some((t) => t.value === fromUrl) ? fromUrl : "";

  // "Enrol Now" buttons add &enrol=1: show which course they're enrolling in and pre-fill the message
  const enrolCourse = searchParams.get("enrol") === "1" ? coursesData.find((c) => c.id === urlCourse) : undefined;
  const enrolMessage = enrolCourse
    ? `Hi, I'd like to enrol in ${enrolCourse.title} (${enrolCourse.offerPrice}). Please share the next batch dates and payment details.`
    : "";

  // Character count: follows typing, and resets to the echoed/pre-filled message after each submit
  const [typed, setTyped] = useState<{ forState: ContactState; len: number } | null>(null);

  if (state.status === "success" && dismissed !== state) {
    return (
      <div className="pop-in flex flex-col items-center justify-center text-center h-full py-10">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ backgroundColor: C.green }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={C.cream} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path className="draw-check" d="M5 12.5l4.5 4.5L19 7.5" />
          </svg>
        </div>
        <h3 className="font-serif font-bold text-2xl mb-2" style={{ color: C.green }}>Message sent!</h3>
        <p className="text-sm max-w-sm" style={{ color: C.brownMid }}>{state.message}</p>
        <button
          type="button"
          onClick={() => {
            setDismissed(state);
          }}
          className="mt-4 text-sm font-semibold underline underline-offset-4"
          style={{ color: C.gold }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};
  // React clears form fields after an action; refill them from the last submission on error
  const v = state.status === "error" ? state.values ?? {} : {};
  const initialCourse = v.course ?? urlCourse;
  const initialMessage = v.message ?? enrolMessage;
  const messageLen = typed && typed.forState === state ? typed.len : initialMessage.length;

  return (
    <form action={formAction} noValidate className="space-y-4">
      {/* Honeypot — hidden from humans */}
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {enrolCourse && (
        <div className="pop-in flex items-center gap-3 rounded-xl px-4 py-3" style={{ backgroundColor: "#DDEFE3", border: "1px solid #B9DCC5" }}>
          <span className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ backgroundColor: C.green }}>
            <GraduationCap className="w-5 h-5" style={{ color: C.cream }} />
          </span>
          <p className="text-sm mb-0" style={{ color: C.green }}>
            You&rsquo;re enrolling in <strong>{enrolCourse.title}</strong> — {enrolCourse.offerPrice}.
            <span className="block text-xs" style={{ color: C.brownMid }}>
              Fill in your details and we&rsquo;ll send batch dates and payment details within 24 hours.
            </span>
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: C.green }}>
            Full name *
          </label>
          <input id="name" name="name" defaultValue={v.name} required autoComplete="name" placeholder="Your name" className="field" aria-invalid={Boolean(err.name)} />
          <FieldError msg={err.name} />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: C.green }}>
            Email *
          </label>
          <input id="email" name="email" defaultValue={v.email} type="email" required autoComplete="email" placeholder="you@example.com" className="field" aria-invalid={Boolean(err.email)} />
          <FieldError msg={err.email} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: C.green }}>
            Phone / WhatsApp
          </label>
          <input id="phone" name="phone" defaultValue={v.phone} type="tel" autoComplete="tel" placeholder="+91 98765 43210" className="field" aria-invalid={Boolean(err.phone)} />
          <FieldError msg={err.phone} />
        </div>
        <div>
          <label htmlFor="course" className="block text-xs font-semibold mb-1.5 tracking-wide" style={{ color: C.green }}>
            Interested in
          </label>
          <select key={initialCourse} id="course" name="course" className="field" defaultValue={initialCourse}>
            <option value="">Select a course (optional)</option>
            {ENQUIRY_TOPICS.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="flex justify-between text-xs font-semibold mb-1.5 tracking-wide" style={{ color: C.green }}>
          <span>{enrolCourse ? "Message *" : "Your question *"}</span>
          <span className="font-normal" style={{ color: messageLen > 2000 ? C.red : C.brownLight }}>{messageLen}/2000</span>
        </label>
        <textarea
          key={initialMessage}
          id="message"
          name="message"
          required
          rows={5}
          maxLength={2000}
          defaultValue={initialMessage}
          placeholder="Tell us about your background, goals, or anything you'd like to know…"
          className="field resize-y"
          aria-invalid={Boolean(err.message)}
          onChange={(e) => setTyped({ forState: state, len: e.target.value.length })}
        />
        <FieldError msg={err.message} />
      </div>

      {state.status === "error" && state.message && (
        <div className="pop-in rounded-xl px-4 py-3 text-sm" style={{ backgroundColor: "#FBEAE5", color: C.red, border: "1px solid #F0C4B8" }}>
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="btn-shine w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-semibold text-sm tracking-wide hover:-translate-y-0.5 shadow-md disabled:opacity-70 disabled:cursor-wait"
        style={{ backgroundColor: C.green, color: C.cream }}
      >
        {pending ? (
          <>
            <span className="spin w-4 h-4 rounded-full border-2 border-t-transparent" style={{ borderColor: C.cream, borderTopColor: "transparent" }} />
            Sending…
          </>
        ) : (
          <>{enrolCourse ? "Send Enrolment Request ✦" : "Send Message ✦"}</>
        )}
      </button>
      <p className="text-[11px] mb-0" style={{ color: C.brownLight }}>
        We only use your details to reply to your query. No spam, ever.
      </p>
    </form>
  );
};

export default ContactForm;
