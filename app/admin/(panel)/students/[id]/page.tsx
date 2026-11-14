import Link from "next/link";
import { notFound } from "next/navigation";
import { requireAdmin } from "@/lib/admin-auth";
import { db, type Enquiry, type Student } from "@/lib/db";
import { C } from "@/lib/theme";
import { Panel, PageTitle, StatusBadge, formatDate, whatsappLink } from "@/components/admin/ui";
import { ConfirmSubmit } from "@/components/admin/client";
import StudentForm from "@/components/admin/StudentForm";
import { deleteStudent } from "../../../actions";

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
          <StudentForm student={student} />
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
    </div>
  );
}
