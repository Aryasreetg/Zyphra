import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { db, ENQUIRY_STATUSES, type Enquiry } from "@/lib/db";
import { topicLabel } from "@/config/courses";
import { C } from "@/lib/theme";
import { Panel, PageTitle, StatusBadge, STATUS_STYLES, formatDate, whatsappLink, btnOutline, btnOutlineStyle } from "@/components/admin/ui";
import { AutoSubmitSelect, ConfirmSubmit, PendingSubmit } from "@/components/admin/client";
import { convertEnquiryToStudent, deleteEnquiry, saveEnquiryNotes, updateEnquiryStatus } from "../../actions";

type SearchParams = Promise<{ status?: string; q?: string }>;

export default async function EnquiriesPage({ searchParams }: { searchParams: SearchParams }) {
  await requireAdmin();
  const params = await searchParams;
  const status = (ENQUIRY_STATUSES as readonly string[]).includes(params.status ?? "") ? params.status! : null;
  const q = params.q?.trim() || null;
  const like = q ? `%${q}%` : null;

  const sql = await db();
  const [rows, counts] = await Promise.all([
    sql<Enquiry[]>`
      select * from enquiries
      where (${status}::text is null or status = ${status}::text)
        and (${like}::text is null
             or name ilike ${like}::text or email ilike ${like}::text
             or phone ilike ${like}::text or message ilike ${like}::text)
      order by created_at desc
      limit 300`,
    sql<{ status: string; n: number }[]>`select status, count(*)::int as n from enquiries group by status`,
  ]);

  const countFor = (s: string | null) =>
    s === null ? counts.reduce((a, c) => a + c.n, 0) : counts.find((c) => c.status === s)?.n ?? 0;

  const tabHref = (s: string | null) => {
    const p = new URLSearchParams();
    if (s) p.set("status", s);
    if (q) p.set("q", q);
    const qs = p.toString();
    return `/admin/enquiries${qs ? `?${qs}` : ""}`;
  };

  return (
    <div className="pop-in">
      <PageTitle
        title="Enquiries"
        subtitle="Messages sent through the website contact form."
        action={
          <>
            {/* Plain <a>: this is a file download, not a page */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/admin/export/enquiries" className={btnOutline} style={btnOutlineStyle}>
              ⬇ Export CSV
            </a>
          </>
        }
      />

      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-3 lg:items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {[null, ...ENQUIRY_STATUSES].map((s) => {
            const active = status === s;
            return (
              <Link
                key={s ?? "all"}
                href={tabHref(s)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold"
                style={{
                  backgroundColor: active ? C.green : "#FFFDF9",
                  color: active ? C.cream : C.brown,
                  border: `1px solid ${active ? C.green : C.border}`,
                }}
              >
                {s ? STATUS_STYLES[s].label : "All"} <span className="opacity-70">({countFor(s)})</span>
              </Link>
            );
          })}
        </div>
        <form className="flex gap-2" action="/admin/enquiries">
          {status && <input type="hidden" name="status" value={status} />}
          <input name="q" defaultValue={q ?? ""} placeholder="Search name, email, phone, message…" className="field py-2 text-sm lg:w-72" />
          <button className="px-4 rounded-full text-sm font-semibold" style={{ backgroundColor: C.green, color: C.cream }}>Search</button>
        </form>
      </div>

      {rows.length === 0 ? (
        <Panel className="p-10 text-center">
          <p className="text-4xl mb-2">📭</p>
          <p className="text-sm mb-0" style={{ color: C.brownMid }}>
            {q || status ? "No enquiries match these filters." : "No enquiries yet. Share your website and they'll show up here."}
          </p>
        </Panel>
      ) : (
        <div className="space-y-4">
          {rows.map((e) => {
            const wa = whatsappLink(e.phone);
            return (
              <Panel key={e.id} className="p-5 sm:p-6" style={e.status === "new" ? { borderLeft: `4px solid ${C.gold}` } : undefined}>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="font-serif font-bold text-lg mb-0" style={{ color: C.green }}>{e.name}</h3>
                      <StatusBadge status={e.status} />
                    </div>
                    <p className="text-xs mb-0" style={{ color: C.brownLight }}>
                      #{e.id} · {formatDate(e.created_at, true)} · Interested in{" "}
                      <span className="font-semibold" style={{ color: C.gold }}>{topicLabel(e.course_interest)}</span>
                    </p>
                  </div>
                  <form key={e.status} action={updateEnquiryStatus} className="flex items-center gap-2 flex-shrink-0">
                    <input type="hidden" name="id" value={e.id} />
                    <span className="text-xs" style={{ color: C.brownLight }}>Status</span>
                    <AutoSubmitSelect
                      name="status"
                      defaultValue={e.status}
                      options={ENQUIRY_STATUSES.map((s) => ({ value: s, label: STATUS_STYLES[s].label }))}
                      className="field py-1.5 text-sm w-auto"
                    />
                  </form>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                  <a href={`mailto:${e.email}?subject=${encodeURIComponent("Re: Your Zyphraa enquiry")}`} className="px-3 py-1.5 rounded-full hover:underline" style={{ backgroundColor: C.parchment, color: C.green }}>
                    ✉️ {e.email}
                  </a>
                  {e.phone && (
                    <a href={`tel:${e.phone}`} className="px-3 py-1.5 rounded-full hover:underline" style={{ backgroundColor: C.parchment, color: C.green }}>
                      📞 {e.phone}
                    </a>
                  )}
                  {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full hover:underline" style={{ backgroundColor: "#DDEFE3", color: "#2D6A4F" }}>
                      💬 WhatsApp
                    </a>
                  )}
                </div>

                <p className="text-sm leading-relaxed whitespace-pre-wrap rounded-xl p-4 mb-4" style={{ backgroundColor: C.cream, color: C.brown }}>
                  {e.message}
                </p>

                <details className="group mb-4">
                  <summary className="cursor-pointer text-xs font-semibold select-none" style={{ color: C.gold }}>
                    {e.admin_notes ? "📝 Notes (click to edit)" : "📝 Add private notes"}
                  </summary>
                  <form action={saveEnquiryNotes} className="mt-3 space-y-2">
                    <input type="hidden" name="id" value={e.id} />
                    <textarea name="notes" rows={3} defaultValue={e.admin_notes ?? ""} placeholder="e.g. Called on 2 Nov, will join next batch…" className="field text-sm" />
                    <PendingSubmit className="px-4 py-1.5 rounded-full text-xs font-semibold" style={{ backgroundColor: C.green, color: C.cream }}>
                      Save notes
                    </PendingSubmit>
                  </form>
                </details>
                {e.admin_notes && (
                  <p className="text-xs italic mb-4 -mt-2" style={{ color: C.brownMid }}>“{e.admin_notes}”</p>
                )}

                <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: C.sand }}>
                  {e.status !== "converted" && (
                    <form action={convertEnquiryToStudent}>
                      <input type="hidden" name="id" value={e.id} />
                      <PendingSubmit pendingText="Creating…" className="px-4 py-2 rounded-full text-xs font-semibold hover:-translate-y-0.5" style={{ backgroundColor: C.green, color: C.cream }}>
                        🎓 Convert to student
                      </PendingSubmit>
                    </form>
                  )}
                  <form action={deleteEnquiry} className="ml-auto">
                    <input type="hidden" name="id" value={e.id} />
                    <ConfirmSubmit message={`Delete the enquiry from ${e.name}? This can't be undone.`} className="px-4 py-2 rounded-full text-xs font-semibold" style={{ color: C.red, border: `1px solid #F0C4B8` }}>
                      Delete
                    </ConfirmSubmit>
                  </form>
                </div>
              </Panel>
            );
          })}
        </div>
      )}
    </div>
  );
}
