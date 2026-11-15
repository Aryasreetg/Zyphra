"use client";

import React, { useActionState, useEffect, useRef } from "react";
import { addAttendance, type AttendanceState } from "@/app/admin/actions";
import { C } from "@/lib/theme";

/** Quick form to log one attended session. */
export default function AttendanceForm({
  studentId,
  today,
  lastStart,
  lastEnd,
}: {
  studentId: number;
  /** "YYYY-MM-DD" in India time, used as the default date */
  today: string;
  /** Times of the most recent session, so regular class times are pre-filled */
  lastStart?: string;
  lastEnd?: string;
}) {
  const [state, action, pending] = useActionState<AttendanceState, FormData>(addAttendance, {});
  const topicRef = useRef<HTMLInputElement>(null);
  const err = state.fieldErrors ?? {};

  // After a successful add, clear the topic and keep date/times for quick repeat entries
  useEffect(() => {
    if (state.added && topicRef.current) topicRef.current.value = "";
  }, [state.added]);

  return (
    <form action={action} className="space-y-3">
      <input type="hidden" name="student_id" value={studentId} />
      <div className="grid grid-cols-2 gap-3">
        <label className="col-span-2 block text-xs font-semibold" style={{ color: C.primary }}>
          Date
          <input name="session_date" type="date" defaultValue={today} max={today} required className="field mt-1.5 font-normal" />
          {err.session_date && <span className="block mt-1 font-normal" style={{ color: C.red }}>{err.session_date}</span>}
        </label>
        <label className="block text-xs font-semibold" style={{ color: C.primary }}>
          Start time
          <input name="start_time" type="time" defaultValue={lastStart?.slice(0, 5)} required className="field mt-1.5 font-normal" />
          {err.start_time && <span className="block mt-1 font-normal" style={{ color: C.red }}>{err.start_time}</span>}
        </label>
        <label className="block text-xs font-semibold" style={{ color: C.primary }}>
          End time
          <input name="end_time" type="time" defaultValue={lastEnd?.slice(0, 5)} required className="field mt-1.5 font-normal" />
          {err.end_time && <span className="block mt-1 font-normal" style={{ color: C.red }}>{err.end_time}</span>}
        </label>
      </div>
      <label className="block text-xs font-semibold" style={{ color: C.primary }}>
        Topic covered <span className="font-normal" style={{ color: C.brownLight }}>(optional)</span>
        <input ref={topicRef} name="topic" maxLength={300} placeholder="e.g. React hooks — useState & useEffect" className="field mt-1.5 font-normal" />
      </label>
      <div className="flex items-center gap-4">
        <button
          type="submit"
          disabled={pending}
          className="px-5 py-2.5 rounded-full text-sm font-semibold disabled:opacity-60"
          style={{ backgroundColor: C.primary, color: C.cream }}
        >
          {pending ? "Adding…" : "+ Add session"}
        </button>
        {state.added && !pending && (
          <span key={state.added} className="pop-in text-xs" style={{ color: C.primary }}>✓ Session added</span>
        )}
        {state.error && <span className="text-xs" style={{ color: C.red }}>{state.error}</span>}
      </div>
    </form>
  );
}
