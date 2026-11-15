import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { db, type Attendance, type Enquiry, type Student } from "@/lib/db";
import { C } from "@/lib/theme";
import { Panel, PageTitle, StatusBadge, formatDate, whatsappLink } from "@/components/admin/ui";
import { ConfirmSubmit } from "@/components/admin/client";
import StudentForm from "@/components/admin/StudentForm";
import AttendanceForm from "@/components/admin/AttendanceForm";
import { feeSummary, formatDuration, formatTime, minutesBetween } from "@/lib/fees";
import { deleteAttendance, deleteStudent } from "../../../actions";

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;
/** Today's date in India as "YYYY-MM-DD" */
const todayIST = () => new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

type Props = { params: Promise<{ id: string }>; searchParams: Promise<{ created?: string }> };

export default async function EditStudentPage({ params, searchParams }: Props) {
  await requireAdmin();
  const { id } = await params;
  const { created } = await searchParams;
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) notFound();

  const sql = await db();
  const [student] = await sql<Student[]>`select * from students where id = ${numericId}`;
  if (!student) notFound();

  const [enquiry] = student.enquiry_id
    ? await sql<Enquiry[]>`select * from enquiries where id = ${student.enquiry_id}`
    : [];
  const wa = whatsappLink(student.phone);

  // Oldest first so each session gets its running number (1, 2, 3…); shown newest first
  const sessionsAsc = await sql<Attendance[]>`
    select * from attendance where student_id = ${student.id}
    order by session_date asc, start_time asc, id asc
  `;
  const attended = sessionsAsc.length;
  const fees = feeSummary(student, attended);
  const totalMinutes = sessionsAsc.reduce((m, a) => m + minutesBetween(a.start_time, a.end_time), 0);
  const numbered = sessionsAsc.map((a, i) => ({ ...a, n: i + 1 })).reverse();
  const last = numbered[0];

  return (
    <div className="pop-in">
      <Link href="/admin/students" className="text-xs hover:underline" style={{ color: C.bronze }}>← All students</Link>
      <PageTitle
        title={student.name}
        subtitle={`Student #${student.id} · added ${formatDate(student.created_at)} · last updated ${formatDate(student.updated_at, true)}`}
        action={<StatusBadge status={student.status} />}
      />

      {created && (
        <div className="pop-in rounded-xl px-4 py-3 mb-6 text-sm" style={{ backgroundColor: "#E4E9F1", color: "#1B2A41" }}>
          ✓ Student created. Fill in the batch and fee details below.
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <Panel className="lg:col-span-2 p-6 sm:p-8">
          <StudentForm student={student} attended={attended} />
        </Panel>

        <div className="space-y-6">
          <Panel className="p-5">
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-3" style={{ color: C.bronze }}>Quick contact</p>
            <div className="flex flex-col gap-2 text-sm">
              <a href={`mailto:${student.email}`} className="hover:underline" style={{ color: C.primary }}>✉️ {student.email}</a>
              {student.phone && <a href={`tel:${student.phone}`} className="hover:underline" style={{ color: C.primary }}>📞 {student.phone}</a>}
              {wa && <a href={wa} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: C.primary }}>💬 WhatsApp</a>}
            </div>
          </Panel>

          {enquiry && (
            <Panel className="p-5">
              <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: C.bronze }}>Original enquiry</p>
              <p className="text-xs mb-2" style={{ color: C.brownLight }}>{formatDate(enquiry.created_at, true)}</p>
              <p className="text-sm whitespace-pre-wrap mb-0" style={{ color: C.brown }}>{enquiry.message}</p>
            </Panel>
          )}

          <Panel className="p-5" style={{ borderColor: "#F0C4B8" }}>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-2" style={{ color: C.red }}>Danger zone</p>
            <p className="text-xs mb-3" style={{ color: C.brownMid }}>Tip: set status to &ldquo;Dropped&rdquo; instead if you want to keep their history.</p>
            <form action={deleteStudent}>
              <input type="hidden" name="id" value={student.id} />
              <ConfirmSubmit message={`Permanently delete ${student.name}? This can't be undone.`} className="px-4 py-2 rounded-full text-xs font-semibold" style={{ color: C.red, border: "1px solid #F0C4B8" }}>
                Delete student
              </ConfirmSubmit>
            </form>
          </Panel>
        </div>
      </div>

      {/* ── Sessions & attendance ─────────────────────────────── */}
      <Panel className="mt-6 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6">
          <div>
            <p className="text-[10px] tracking-[0.2em] uppercase font-semibold mb-1" style={{ color: C.bronze }}>Attendance</p>
            <h2 className="font-serif text-2xl mb-0" style={{ color: C.primary }}>Sessions &amp; extra fees</h2>
          </div>
          <a href={`/admin/export/attendance?student=${student.id}`} className="text-xs font-semibold hover:underline" style={{ color: C.bronze }}>
            ⬇ Export attendance CSV
          </a>
        </div>

        {/* Summary */}
        <dl className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {[
            { k: "Attended", v: fees.tracking ? `${attended} / ${student.sessions_included}` : String(attended), hint: formatDuration(totalMinutes) + " total" },
            { k: "Remaining", v: fees.tracking ? String(fees.remaining) : "—", hint: "included sessions" },
            { k: "Extra sessions", v: fees.tracking ? String(fees.extraSessions) : "—", hint: "beyond included", warn: fees.extraSessions > 0 },
            { k: "Rate / extra", v: fees.tracking ? rupees(fees.rate) : "—", hint: student.extra_session_rate != null ? "custom rate" : "fee ÷ sessions" },
            { k: "Extra fee", v: rupees(fees.extraFee), hint: "auto-calculated", warn: fees.extraFee > 0 },
            { k: "Total due", v: rupees(fees.totalDue), hint: `${rupees(student.fee_total)} + extras` },
            { k: "Balance", v: rupees(fees.balance), hint: fees.overpaid ? `Overpaid ${rupees(fees.overpaid)}` : `${rupees(student.fee_paid)} paid`, warn: fees.balance > 0 },
          ].map((x) => (
            <div key={x.k} className="rounded-xl px-4 py-3" style={{ backgroundColor: x.warn ? "#F6EBDD" : C.cream, border: `1px solid ${x.warn ? "#E3C9A4" : C.border}` }}>
              <dt className="text-[10px] tracking-[0.14em] uppercase font-semibold" style={{ color: C.bronze }}>{x.k}</dt>
              <dd className="font-serif text-xl mb-0" style={{ color: C.primary }}>{x.v}</dd>
              <p className="text-[11px] mb-0" style={{ color: C.brownLight }}>{x.hint}</p>
            </div>
          ))}
        </dl>
        {!fees.tracking && (
          <p className="text-sm mb-6 px-4 py-3 rounded-xl" style={{ backgroundColor: C.amber, color: C.amberText }}>
            Set <strong>Sessions included in fee</strong> above to track remaining sessions and calculate extra fees automatically.
          </p>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Add session */}
          <div className="min-w-0 lg:col-span-2">
            <h3 className="text-sm font-semibold mb-3" style={{ color: C.primary }}>Log a session</h3>
            <AttendanceForm studentId={student.id} today={todayIST()} lastStart={last?.start_time} lastEnd={last?.end_time} />
          </div>

          {/* History */}
          <div className="min-w-0 lg:col-span-3">
            <h3 className="text-sm font-semibold mb-3" style={{ color: C.primary }}>History</h3>
            {numbered.length === 0 ? (
              <p className="text-sm" style={{ color: C.brownLight }}>No sessions logged yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-[13px]">
                  <thead>
                    <tr style={{ backgroundColor: C.parchment }}>
                      {["#", "Date", "Time", "Duration", "Topic", ""].map((h) => (
                        <th key={h} className="text-left px-3 py-2 text-xs font-semibold whitespace-nowrap" style={{ color: C.primary }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {numbered.map((a) => {
                      const extra = fees.tracking && a.n > student.sessions_included;
                      return (
                        <tr key={a.id} className="border-t" style={{ borderColor: C.sand }}>
                          <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: C.brownMid }}>
                            {a.n}
                            {extra && (
                              <span className="ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ backgroundColor: "#F6EBDD", color: C.bronze }}>Extra</span>
                            )}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: C.brown }}>{formatDate(a.session_date)}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: C.brown }}>{formatTime(a.start_time)} – {formatTime(a.end_time)}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap" style={{ color: C.brownMid }}>{formatDuration(minutesBetween(a.start_time, a.end_time))}</td>
                          <td className="px-3 py-2.5 min-w-32" style={{ color: C.brownMid }}>{a.topic ?? "—"}</td>
                          <td className="pl-2 pr-1 py-2.5 text-right whitespace-nowrap">
                            <form action={deleteAttendance}>
                              <input type="hidden" name="id" value={a.id} />
                              <ConfirmSubmit message={`Delete session #${a.n} on ${formatDate(a.session_date)}?`} className="text-xs font-semibold hover:underline" style={{ color: C.red }}>
                                Delete
                              </ConfirmSubmit>
                            </form>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Panel>
    </div>
  );
}
