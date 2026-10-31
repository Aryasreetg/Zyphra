import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { db, STUDENT_STATUSES, type Student } from "@/lib/db";
import { coursesData } from "@/config/courses";
import { C } from "@/lib/theme";
import { Panel, PageTitle, StatusBadge, STATUS_STYLES, formatDate, formatRupees, btnPrimary, btnPrimaryStyle, btnOutline, btnOutlineStyle } from "@/components/admin/ui";

type SearchParams = Promise<{ status?: string; course?: string; q?: string }>;

export default async function StudentsPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const status = (STUDENT_STATUSES as readonly string[]).includes(params.status ?? "") ? params.status! : null;
  const course = coursesData.some((c) => c.id === params.course) ? params.course! : null;
  const q = params.q?.trim() || null;
  const like = q ? `%${q}%` : null;

  const sql = await db();
  const students = await sql<Student[]>`
    select * from students
    where (${status}::text is null or status = ${status}::text)
      and (${course}::text is null or course_id = ${course}::text)
      and (${like}::text is null
           or name ilike ${like}::text or email ilike ${like}::text
           or phone ilike ${like}::text or batch ilike ${like}::text)
    order by created_at desc
    limit 500`;

  const totals = students.reduce(
    (a, s) => ({ fee: a.fee + (s.status === "dropped" ? 0 : s.fee_total), paid: a.paid + s.fee_paid }),
    { fee: 0, paid: 0 }
  );
  const filtered = Boolean(status || course || q);

  return (
    <div className="pop-in">
      <PageTitle
        title="Students"
        subtitle={`${students.length} ${filtered ? "matching" : "total"} · ${formatRupees(totals.paid)} collected · ${formatRupees(Math.max(0, totals.fee - totals.paid))} pending`}
        action={
          <div className="flex gap-2">
            {/* Plain <a>: this is a file download, not a page */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/admin/export/students" className={btnOutline} style={btnOutlineStyle}>⬇ Export CSV</a>
            <Link href="/admin/students/new" className={btnPrimary} style={btnPrimaryStyle}>+ Add student</Link>
          </div>
        }
      />

      <form action="/admin/students" className="flex flex-col md:flex-row gap-2 mb-6">
        <input name="q" defaultValue={q ?? ""} placeholder="Search name, email, phone, batch…" className="field py-2 text-sm md:flex-1" />
        <select name="course" defaultValue={course ?? ""} className="field py-2 text-sm md:w-64">
          <option value="">All courses</option>
          {coursesData.map((c) => (
            <option key={c.id} value={c.id}>{c.title}</option>
          ))}
        </select>
        <select name="status" defaultValue={status ?? ""} className="field py-2 text-sm md:w-40">
          <option value="">All statuses</option>
          {STUDENT_STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_STYLES[s].label}</option>
          ))}
        </select>
        <button className="px-5 py-2 rounded-full text-sm font-semibold" style={{ backgroundColor: C.green, color: C.cream }}>Filter</button>
        {filtered && (
          <Link href="/admin/students" className="px-4 py-2 text-sm text-center" style={{ color: C.gold }}>Clear</Link>
        )}
      </form>

      {students.length === 0 ? (
        <Panel className="p-10 text-center">
          <p className="text-4xl mb-2">🎓</p>
          <p className="text-sm mb-4" style={{ color: C.brownMid }}>
            {filtered ? "No students match these filters." : "No students yet. Add one, or convert an enquiry into a student."}
          </p>
          {!filtered && <Link href="/admin/students/new" className={btnPrimary} style={btnPrimaryStyle}>+ Add your first student</Link>}
        </Panel>
      ) : (
        <Panel className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: C.parchment }}>
                  {["Student", "Course / Batch", "Status", "Fees", "Started", ""].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-semibold tracking-wide whitespace-nowrap" style={{ color: C.green }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s) => {
                  const pct = s.fee_total > 0 ? Math.min(100, Math.round((s.fee_paid / s.fee_total) * 100)) : 0;
                  return (
                    <tr key={s.id} className="admin-row border-t" style={{ borderColor: C.sand }}>
                      <td className="px-4 py-3">
                        <Link href={`/admin/students/${s.id}`} className="font-semibold hover:underline" style={{ color: C.green }}>{s.name}</Link>
                        <div className="text-xs" style={{ color: C.brownLight }}>{s.email}{s.phone ? ` · ${s.phone}` : ""}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-xs" style={{ color: C.brown }}>{coursesData.find((c) => c.id === s.course_id)?.title ?? "—"}</div>
                        {s.batch && <div className="text-[11px]" style={{ color: C.gold }}>{s.batch}</div>}
                      </td>
                      <td className="px-4 py-3"><StatusBadge status={s.status} /></td>
                      <td className="px-4 py-3 min-w-36">
                        <div className="text-xs mb-1" style={{ color: C.brown }}>
                          {formatRupees(s.fee_paid)} <span style={{ color: C.brownLight }}>/ {formatRupees(s.fee_total)}</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: C.sand }}>
                          <div className="h-full rounded-full" style={{ width: `${pct}%`, backgroundColor: pct >= 100 ? "#2D6A4F" : C.gold }} />
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: C.brownMid }}>{formatDate(s.start_date)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link href={`/admin/students/${s.id}`} className="text-xs font-semibold hover:underline" style={{ color: C.gold }}>Edit →</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <style>{`.admin-row:hover { background-color: ${C.cream}; }`}</style>
          </div>
        </Panel>
      )}
    </div>
  );
}
