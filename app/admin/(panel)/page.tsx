import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { db, type Enquiry } from "@/lib/db";
import { coursesData, topicLabel } from "@/config/courses";
import { feeSummary } from "@/lib/fees";
import { C } from "@/lib/theme";
import { Panel, PageTitle, StatCard, StatusBadge, formatDate, formatRupees } from "@/components/admin/ui";


export default async function AdminDashboard() {
  await requireAdmin();
  const sql = await db();

  const [[enq], [stu], recent, byCourse, feeRows, [week]] = await Promise.all([
    sql<{ total: number; new: number; week: number; converted: number }[]>`
      select
        count(*)::int as total,
        count(*) filter (where status = 'new')::int as new,
        count(*) filter (where created_at > now() - interval '7 days')::int as week,
        count(*) filter (where status = 'converted')::int as converted
      from enquiries`,
    sql<{ total: number; active: number; completed: number; fee_total: number; fee_paid: number }[]>`
      select
        count(*)::int as total,
        count(*) filter (where status = 'active')::int as active,
        count(*) filter (where status = 'completed')::int as completed,
        coalesce(sum(fee_total) filter (where status <> 'dropped'), 0)::int as fee_total,
        coalesce(sum(fee_paid), 0)::int as fee_paid
      from students`,
    sql<Enquiry[]>`select * from enquiries order by created_at desc limit 6`,
    sql<{ course_id: string | null; n: number }[]>`
      select course_id, count(*)::int as n from students
      where status in ('active', 'paused')
      group by course_id order by n desc`,
    sql<{ status: string; fee_total: number; fee_paid: number; sessions_included: number; extra_session_rate: number | null; attended: number }[]>`
      select s.status, s.fee_total, s.fee_paid, s.sessions_included, s.extra_session_rate, coalesce(a.n, 0)::int as attended
      from students s
      left join (select student_id, count(*) as n from attendance group by student_id) a on a.student_id = s.id`,
    sql<{ n: number }[]>`select count(*)::int as n from attendance where session_date > current_date - 7`,
  ]);

  // Pending includes fees for extra sessions beyond each student's included sessions
  const pending = feeRows
    .filter((r) => r.status !== "dropped")
    .reduce((sum, r) => sum + feeSummary(r, r.attended).balance, 0);
  const conversion = enq.total ? Math.round((enq.converted / enq.total) * 100) : 0;
  const maxCourse = Math.max(1, ...byCourse.map((c) => c.n));

  return (
    <div className="pop-in">
      <PageTitle title="Dashboard" subtitle="A quick look at enquiries, students and fees." />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard label="New enquiries" value={enq.new} hint={`${enq.week} received this week`} accent={enq.new ? C.bronze : C.primary} />
        <StatCard label="Total enquiries" value={enq.total} hint={`${conversion}% converted to students`} />
        <StatCard label="Active students" value={stu.active} hint={`${stu.total} total · ${week.n} sessions this week`} />
        <StatCard label="Fees collected" value={formatRupees(stu.fee_paid)} hint={`${formatRupees(pending)} pending`} />
      </div>

      <div className="grid lg:grid-cols-5 gap-6">
        <Panel className="lg:col-span-3 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-xl mb-0" style={{ color: C.primary }}>Latest enquiries</h2>
            <Link href="/admin/enquiries" className="text-xs font-semibold hover:underline" style={{ color: C.bronze }}>View all →</Link>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm" style={{ color: C.brownLight }}>No enquiries yet. They&rsquo;ll appear here when someone uses the contact form.</p>
          ) : (
            <ul className="divide-y" style={{ borderColor: C.sand }}>
              {recent.map((e) => (
                <li key={e.id} className="py-3 mb-0 flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold mb-0.5 truncate" style={{ color: C.primary }}>{e.name}</p>
                    <p className="text-xs mb-0.5" style={{ color: C.bronze }}>{topicLabel(e.course_interest)}</p>
                    <p className="text-xs mb-0 truncate" style={{ color: C.brownMid }}>{e.message}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <StatusBadge status={e.status} />
                    <span className="text-[11px]" style={{ color: C.brownLight }}>{formatDate(e.created_at)}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel className="lg:col-span-2 p-5 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif font-bold text-xl mb-0" style={{ color: C.primary }}>Students by course</h2>
            <Link href="/admin/students" className="text-xs font-semibold hover:underline" style={{ color: C.bronze }}>Manage →</Link>
          </div>
          {byCourse.length === 0 ? (
            <p className="text-sm" style={{ color: C.brownLight }}>No active students yet.</p>
          ) : (
            <ul className="space-y-3">
              {byCourse.map((c) => (
                <li key={c.course_id ?? "none"} className="mb-0">
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: C.brown }}>{coursesData.find((x) => x.id === c.course_id)?.title ?? "No course set"}</span>
                    <span className="font-semibold" style={{ color: C.primary }}>{c.n}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: C.sand }}>
                    <div className="h-full rounded-full" style={{ width: `${(c.n / maxCourse) * 100}%`, backgroundColor: C.primary }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
