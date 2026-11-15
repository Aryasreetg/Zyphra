"use client";

import React, { useActionState, useState } from "react";
import Link from "next/link";
import { saveStudent, type StudentFormState } from "@/app/admin/actions";
import { coursesData } from "@/config/courses";
import type { Student } from "@/lib/db";
import { C } from "@/lib/theme";
import { feeSummary, sessionRate } from "@/lib/fees";

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "paused", label: "Paused" },
  { value: "completed", label: "Completed" },
  { value: "dropped", label: "Dropped" },
];

function Field({ label, error, children, hint }: { label: string; error?: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: C.primary }}>
        {label}
        {children}
      </label>
      {hint && !error && <p className="text-[11px] mt-1 mb-0" style={{ color: C.brownLight }}>{hint}</p>}
      {error && <p className="pop-in text-xs mt-1 mb-0" style={{ color: C.red }}>{error}</p>}
    </div>
  );
}

/** Course prices are strings like "₹30,000"; turn them into a number for the fee field. */
function priceOf(courseId: string) {
  const c = coursesData.find((x) => x.id === courseId);
  const digits = (c?.offerPrice ?? "").replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** `attended` = sessions logged so far (edit page only), used for the live fee summary */
export default function StudentForm({ student, attended = 0 }: { student?: Student; attended?: number }) {
  const [state, action, pending] = useActionState<StudentFormState, FormData>(saveStudent, {});
  const [feeTotal, setFeeTotal] = useState(String(student?.fee_total ?? ""));
  const [feePaid, setFeePaid] = useState(String(student?.fee_paid ?? ""));
  const [sessions, setSessions] = useState(String(student?.sessions_included ?? ""));
  const [rate, setRate] = useState(student?.extra_session_rate != null ? String(student.extra_session_rate) : "");
  const [prior, setPrior] = useState(String(student?.sessions_prior ?? ""));
  const err = state.fieldErrors ?? {};

  const total = Number(feeTotal) || 0;
  const paid = Number(feePaid) || 0;
  const feeInputs = {
    fee_total: total,
    fee_paid: paid,
    sessions_included: Number(sessions) || 0,
    extra_session_rate: rate === "" ? null : Number(rate) || 0,
    sessions_prior: Number(prior) || 0,
  };
  const sum = feeSummary(feeInputs, attended);
  const defaultRate = sessionRate({ ...feeInputs, extra_session_rate: null });
  const pct = sum.pctPaid;

  // React clears uncontrolled inputs after an action, so on error refill them
  // from what was just submitted rather than the saved record.
  const v = (k: string, fallback: string | null | undefined) => state.values?.[k] ?? fallback ?? "";

  return (
    <form action={action} className="space-y-5">
      {student && <input type="hidden" name="id" value={student.id} />}

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name *" error={err.name}>
          <input name="name" required defaultValue={v("name", student?.name)} className="field mt-1.5 font-normal" />
        </Field>
        <Field label="Email *" error={err.email}>
          <input name="email" type="email" required defaultValue={v("email", student?.email)} className="field mt-1.5 font-normal" />
        </Field>
        <Field label="Phone / WhatsApp" error={err.phone}>
          <input name="phone" type="tel" defaultValue={v("phone", student?.phone ?? "")} className="field mt-1.5 font-normal" />
        </Field>
        <Field label="Status">
          <select name="status" defaultValue={v("status", student?.status ?? "active")} className="field mt-1.5 font-normal">
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </Field>
        <Field label="Course" hint="Choosing a course fills in its current fee if the fee is empty.">
          <select
            name="course_id"
            // Uncontrolled + keyed so it shows the right value after React resets the form
            key={`${String(student?.updated_at ?? "")}-${v("course_id", student?.course_id)}`}
            defaultValue={v("course_id", student?.course_id)}
            onChange={(e) => {
              const p = priceOf(e.target.value);
              if (p !== null && (!feeTotal || feeTotal === "0")) setFeeTotal(String(p));
            }}
            className="field mt-1.5 font-normal"
          >
            <option value="">— Not set —</option>
            {coursesData.map((c) => (
              <option key={c.id} value={c.id}>{c.title}</option>
            ))}
          </select>
        </Field>
        <Field label="Batch" error={err.batch} hint="e.g. Jan 2027 Weekend">
          <input name="batch" defaultValue={v("batch", student?.batch ?? "")} className="field mt-1.5 font-normal" />
        </Field>
        <Field label="Start date" error={err.start_date}>
          <input name="start_date" type="date" defaultValue={v("start_date", student?.start_date ?? "")} className="field mt-1.5 font-normal" />
        </Field>
      </div>

      {/* Sessions */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}>
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.bronze }}>Sessions</p>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Sessions included in fee" error={err.sessions_included} hint="How many classes the course fee covers. Leave 0 to skip session tracking.">
            <input name="sessions_included" type="number" min={0} step={1} value={sessions} onChange={(e) => setSessions(e.target.value)} placeholder="e.g. 24" className="field mt-1.5 font-normal" />
          </Field>
          <Field
            label="Sessions already completed"
            error={err.sessions_prior}
            hint="For ongoing students: classes done before you started logging. No dates or times needed."
          >
            <input name="sessions_prior" type="number" min={0} step={1} value={prior} onChange={(e) => setPrior(e.target.value)} placeholder="e.g. 8" className="field mt-1.5 font-normal" />
          </Field>
          <Field
            label="Fee per extra session (₹)"
            error={err.extra_session_rate}
            hint={defaultRate > 0 ? `Leave empty to use the default: ${rupees(defaultRate)} (total fee ÷ sessions)` : "Leave empty to use total fee ÷ sessions"}
          >
            <input name="extra_session_rate" type="number" min={0} step={1} value={rate} onChange={(e) => setRate(e.target.value)} placeholder={defaultRate > 0 ? String(defaultRate) : "Default"} className="field mt-1.5 font-normal" />
          </Field>
        </div>
      </div>

      {/* Fees */}
      <div className="rounded-2xl p-5" style={{ backgroundColor: C.cream, border: `1px solid ${C.border}` }}>
        <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.bronze }}>Fees (₹)</p>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <Field label="Course fee (base)" error={err.fee_total}>
            <input name="fee_total" type="number" min={0} step={1} value={feeTotal} onChange={(e) => setFeeTotal(e.target.value)} className="field mt-1.5 font-normal" />
          </Field>
          <Field label="Amount paid" error={err.fee_paid}>
            <input name="fee_paid" type="number" min={0} step={1} value={feePaid} onChange={(e) => setFeePaid(e.target.value)} className="field mt-1.5 font-normal" />
          </Field>
        </div>
        {(student || feeInputs.sessions_prior > 0) && sum.tracking && (
          <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
            {[
              { k: "Attended", v: `${sum.attended} / ${feeInputs.sessions_included}` },
              { k: "Extra sessions", v: String(sum.extraSessions) },
              { k: "Extra fee", v: rupees(sum.extraFee) },
              { k: "Total due", v: rupees(sum.totalDue) },
            ].map((x) => (
              <div key={x.k} className="rounded-lg px-3 py-2" style={{ backgroundColor: C.paper, border: `1px solid ${C.border}` }}>
                <dt style={{ color: C.brownLight }}>{x.k}</dt>
                <dd className="font-semibold mb-0" style={{ color: C.primary }}>{x.v}</dd>
              </div>
            ))}
          </dl>
        )}
        <div className="flex justify-between text-xs mb-1.5" style={{ color: C.brownMid }}>
          <span>{pct}% paid</span>
          <span>Balance: {rupees(sum.balance)}{sum.extraFee > 0 ? " (incl. extra sessions)" : ""}</span>
        </div>
        <div className="h-2.5 rounded-full overflow-hidden" style={{ backgroundColor: C.sand }}>
          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? C.primary : C.bronze, transition: "width 400ms ease" }} />
        </div>
      </div>

      <Field label="Notes">
        <textarea name="notes" rows={4} defaultValue={v("notes", student?.notes ?? "")} placeholder="Progress, payment reminders…" className="field mt-1.5 font-normal" />
      </Field>

      {state.error && (
        <p className="pop-in text-sm rounded-xl px-4 py-3 mb-0" style={{ backgroundColor: "#FBEAE5", color: C.red }}>{state.error}</p>
      )}
      {state.saved && (
        <p className="pop-in text-sm rounded-xl px-4 py-3 mb-0" style={{ backgroundColor: "#E4E9F1", color: "#1B2A41" }}>✓ Changes saved</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={pending}
          className="btn-shine px-6 py-3 rounded-full text-sm font-semibold hover:-translate-y-0.5 disabled:opacity-60"
          style={{ backgroundColor: C.primary, color: C.cream }}
        >
          {pending ? "Saving…" : student ? "Save changes" : "Add student"}
        </button>
        <Link href="/admin/students" className="px-6 py-3 rounded-full text-sm font-semibold" style={{ border: `1.5px solid ${C.primary}`, color: C.primary }}>
          {student ? "Back to list" : "Cancel"}
        </Link>
      </div>
    </form>
  );
}
