// Fee maths shared by the admin pages and forms (no server-only imports, so
// client components can use it too).

export interface FeeInputs {
  fee_total: number;
  fee_paid: number;
  sessions_included: number;
  extra_session_rate: number | null;
  /** Sessions completed before attendance logging started (no dates/times needed) */
  sessions_prior?: number;
}

/** ₹ per extra session: the custom rate if set, otherwise base fee ÷ included sessions. */
export function sessionRate(s: Pick<FeeInputs, "fee_total" | "sessions_included" | "extra_session_rate">) {
  if (s.extra_session_rate !== null && s.extra_session_rate !== undefined) return s.extra_session_rate;
  if (s.sessions_included > 0 && s.fee_total > 0) return Math.round(s.fee_total / s.sessions_included);
  return 0;
}

/** `logged` = sessions recorded in the attendance log; earlier sessions are added on top */
export function feeSummary(s: FeeInputs, logged: number) {
  const prior = s.sessions_prior ?? 0;
  const attended = prior + logged;
  const tracking = s.sessions_included > 0;
  const rate = sessionRate(s);
  const extraSessions = tracking ? Math.max(0, attended - s.sessions_included) : 0;
  const remaining = tracking ? Math.max(0, s.sessions_included - attended) : 0;
  const extraFee = extraSessions * rate;
  const totalDue = s.fee_total + extraFee;
  const balance = Math.max(0, totalDue - s.fee_paid);
  const overpaid = Math.max(0, s.fee_paid - totalDue);
  const pctPaid = totalDue > 0 ? Math.min(100, Math.round((s.fee_paid / totalDue) * 100)) : 0;
  return { tracking, rate, attended, prior, logged, extraSessions, remaining, extraFee, totalDue, balance, overpaid, pctPaid };
}

/** "09:30:00" → "9:30 am" */
export function formatTime(t: string) {
  const [h, m] = t.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Minutes between two "HH:MM(:SS)" times */
export function minutesBetween(start: string, end: string) {
  const toMin = (t: string) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };
  return toMin(end) - toMin(start);
}

export function formatDuration(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return h && m ? `${h}h ${m}m` : h ? `${h}h` : `${m}m`;
}
