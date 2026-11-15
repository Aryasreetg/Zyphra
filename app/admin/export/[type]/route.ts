import { isAdmin } from "@/lib/admin-auth";
import { db, type Student } from "@/lib/db";
import { feeSummary } from "@/lib/fees";

// Downloads enquiries or students as a CSV file (opens in Excel / Google Sheets).

function toCsv(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const escape = (v: unknown) => {
    if (v === null || v === undefined) return "";
    let s = v instanceof Date ? v.toISOString() : String(v);
    // Stop spreadsheet apps from treating cell text as a formula
    if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  return [headers.join(","), ...rows.map((r) => headers.map((h) => escape(r[h])).join(","))].join("\r\n");
}

export async function GET(req: Request, { params }: { params: Promise<{ type: string }> }) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const { type } = await params;
  const sql = await db();
  let rows: Record<string, unknown>[];
  if (type === "enquiries") {
    rows = await sql`select * from enquiries order by created_at desc`;
  } else if (type === "students") {
    const students = await sql<(Student & { attended: number })[]>`
      select s.*, coalesce(a.n, 0)::int as attended
      from students s
      left join (select student_id, count(*) as n from attendance group by student_id) a on a.student_id = s.id
      order by s.created_at desc`;
    // Add the calculated fee columns so the spreadsheet matches the admin panel
    rows = students.map((s) => {
      const f = feeSummary(s, s.attended);
      return { ...s, logged_sessions: s.attended, total_attended: f.attended, extra_sessions: f.extraSessions, extra_fee: f.extraFee, total_due: f.totalDue, balance: f.balance };
    });
  } else if (type === "attendance") {
    const studentId = Number(new URL(req.url).searchParams.get("student")) || null;
    rows = await sql`
      select a.id, s.name as student, s.email, a.session_date, a.start_time, a.end_time, a.topic, a.created_at
      from attendance a join students s on s.id = a.student_id
      where (${studentId}::int is null or a.student_id = ${studentId}::int)
      order by s.name, a.session_date, a.start_time`;
  } else {
    return new Response("Not found", { status: 404 });
  }

  const date = new Date().toISOString().slice(0, 10);
  return new Response("﻿" + toCsv(rows), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="zyphraa-${type}-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
