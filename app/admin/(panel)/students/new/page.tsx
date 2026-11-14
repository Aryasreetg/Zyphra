import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { C } from "@/lib/theme";
import { Panel, PageTitle } from "@/components/admin/ui";
import StudentForm from "@/components/admin/StudentForm";

export default async function NewStudentPage() {
  await requireAdmin();
  return (
    <div className="pop-in max-w-3xl">
      <Link href="/admin/students" className="text-xs hover:underline" style={{ color: C.bronze }}>← All students</Link>
      <PageTitle title="Add student" subtitle="Create a record for a new learner." />
      <Panel className="p-6 sm:p-8">
        <StudentForm />
      </Panel>
    </div>
  );
}
