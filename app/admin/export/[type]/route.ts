import { isAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";

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

export async function GET(_req: Request, { params }: { params: Promise<{ type: string }> }) {
  if (!(await isAdmin())) return new Response("Unauthorized", { status: 401 });

  const { type } = await params;
  const sql = await db();
  let rows: Record<string, unknown>[];
  if (type === "enquiries") {
    rows = await sql`select * from enquiries order by created_at desc`;
  } else if (type === "students") {
    rows = await sql`select * from students order by created_at desc`;
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
