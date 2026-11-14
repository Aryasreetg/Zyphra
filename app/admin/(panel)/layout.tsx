import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { db, isDbConfigured } from "@/lib/db";
import { logout } from "../actions";
import AdminNav from "@/components/admin/AdminNav";
import { C } from "@/lib/theme";

export const metadata = { title: "Admin | Zyphraa", robots: { index: false, follow: false } };

export default async function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();

  let newCount = 0;
  let dbError: string | null = null;
  if (!isDbConfigured()) {
    dbError = "No database connected. Attach Netlify Database to this site (or set DATABASE_URL) and redeploy.";
  } else {
    try {
      const sql = await db();
      const [row] = await sql<{ n: number }[]>`select count(*)::int as n from enquiries where status = 'new'`;
      newCount = row?.n ?? 0;
    } catch (err) {
      console.error(err);
      dbError = "Couldn't connect to the database. Check the database in Netlify → Data & storage → Database.";
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.parchment }}>
      <header className="sticky top-0 z-40 shadow-md" style={{ backgroundColor: C.primary }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
          <div className="flex items-center justify-between gap-6">
            <Link href="/admin" className="leading-none">
              <span className="block text-xl font-serif font-bold" style={{ color: C.cream }}>Zyphraa</span>
              <span className="text-[9px] tracking-[0.25em] uppercase" style={{ color: C.bronzeLight }}>Admin</span>
            </Link>
            <div className="flex items-center gap-3 md:hidden">
              <Link href="/" className="text-xs" style={{ color: C.bronzeLight }}>View site ↗</Link>
              <form action={logout}>
                <button className="text-xs font-semibold" style={{ color: C.cream }}>Log out</button>
              </form>
            </div>
          </div>
          <AdminNav newCount={newCount} />
          <div className="hidden md:flex items-center gap-4">
            <Link href="/" target="_blank" className="text-xs hover:underline" style={{ color: C.bronzeLight }}>View site ↗</Link>
            <form action={logout}>
              <button className="text-xs font-semibold px-3 py-1.5 rounded-full" style={{ color: C.cream, border: "1px solid rgba(248,243,234,0.3)" }}>
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {dbError ? (
          <div className="rounded-2xl p-6" style={{ backgroundColor: C.amber, border: `1px solid ${C.amberBorder}`, color: C.amberText }}>
            <p className="font-semibold mb-1">Database not available</p>
            <p className="text-sm mb-0">{dbError}</p>
          </div>
        ) : (
          children
        )}
      </main>
    </div>
  );
}
