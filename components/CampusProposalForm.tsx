"use client";

import React, { useActionState, useState } from "react";
import { submitCampusProposal, type CampusState } from "@/app/actions/contact";
import { STUDENT_COUNT_OPTIONS } from "@/config/campus";
import { C } from "@/lib/theme";

const initial: CampusState = { status: "idle" };

function Field({
  id,
  label,
  error,
  children,
  optional = false,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex justify-between text-[11px] font-semibold mb-2 tracking-[0.14em] uppercase" style={{ color: C.primary }}>
        {label}
        {optional && <span className="normal-case tracking-normal font-normal" style={{ color: C.brownLight }}>Optional</span>}
      </label>
      {children}
      {error && <p className="pop-in text-xs mt-1.5 mb-0" style={{ color: C.red }}>{error}</p>}
    </div>
  );
}

export default function CampusProposalForm() {
  const [state, action, pending] = useActionState(submitCampusProposal, initial);
  const [dismissed, setDismissed] = useState<CampusState | null>(null);

  if (state.status === "success" && dismissed !== state) {
    return (
      <div className="pop-in py-6">
        <p className="text-[11px] tracking-[0.18em] uppercase font-semibold mb-4" style={{ color: C.bronze }}>Request received</p>
        <p className="display text-[2.2rem] mb-4" style={{ color: C.primary }}>Thank you.</p>
        <p className="text-[15.5px] leading-relaxed mb-8" style={{ color: C.brown }}>{state.message}</p>
        <button type="button" onClick={() => setDismissed(state)} className="ulink on text-[14px]" style={{ color: C.primary }}>
          Send another request
        </button>
      </div>
    );
  }

  const err = state.fieldErrors ?? {};
  const v = state.status === "error" ? state.values ?? {} : {};

  return (
    <form action={action} noValidate className="space-y-5">
      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <Field id="institution" label="Institution name *" error={err.institution}>
        <input id="institution" name="institution" defaultValue={v.institution} required autoComplete="organization" placeholder="e.g. ABC College of Engineering" className="field" aria-invalid={Boolean(err.institution)} />
      </Field>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="coordinator" label="Your name *" error={err.coordinator}>
          <input id="coordinator" name="coordinator" defaultValue={v.coordinator} required autoComplete="name" placeholder="Placement coordinator / HOD" className="field" aria-invalid={Boolean(err.coordinator)} />
        </Field>
        <Field id="department" label="Department" optional>
          <input id="department" name="department" defaultValue={v.department} placeholder="e.g. Computer Science" className="field" />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field id="p-email" label="Email *" error={err.email}>
          <input id="p-email" name="email" type="email" defaultValue={v.email} required autoComplete="email" placeholder="you@institution.edu" className="field" aria-invalid={Boolean(err.email)} />
        </Field>
        <Field id="p-phone" label="Contact number *" error={err.phone}>
          <input id="p-phone" name="phone" type="tel" defaultValue={v.phone} required autoComplete="tel" placeholder="+91 98765 43210" className="field" aria-invalid={Boolean(err.phone)} />
        </Field>
      </div>

      <Field id="students" label="Estimated number of students *" error={err.students}>
        <select key={v.students ?? ""} id="students" name="students" defaultValue={v.students ?? ""} required className="field" aria-invalid={Boolean(err.students)}>
          <option value="" disabled>Select a range</option>
          {STUDENT_COUNT_OPTIONS.map((o) => (
            <option key={o} value={o}>{o === "Not sure yet" ? o : `${o} students`}</option>
          ))}
        </select>
      </Field>

      {state.status === "error" && state.message && (
        <div className="pop-in px-4 py-3 text-sm border-l-2" style={{ backgroundColor: "#FBEAE5", color: C.red, borderColor: C.red }}>
          {state.message}
        </div>
      )}

      <div className="pt-2">
        <button type="submit" disabled={pending} className="btn-z btn-solid w-full disabled:opacity-70 disabled:cursor-wait">
          {pending ? "Sending…" : <>Request proposal <span className="arr" aria-hidden>→</span></>}
        </button>
        <p className="text-[12px] mt-4 mb-0" style={{ color: C.brownLight }}>
          No obligation. We reply within 24 hours with the full catalogue, syllabus and pricing for your batch size.
        </p>
      </div>
    </form>
  );
}
