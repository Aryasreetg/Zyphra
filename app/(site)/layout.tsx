import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollExtras from "@/components/ScrollExtras";

// Layout for the public website (home, courses, campus). The admin panel has its own.
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ScrollExtras />
      <Navbar />
      <div className="min-h-screen">{children}</div>
      <Footer />
    </>
  );
}
