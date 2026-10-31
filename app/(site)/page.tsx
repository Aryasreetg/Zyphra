import Home from "@/components/Home";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Courses from "@/components/courses";
import TechMarquee from "@/components/TechMarquee";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main className="flex flex-col gap-0">
      <Home />
      <TechMarquee />
      <About />
      <Achievements />
      <Courses />
      <HowItWorks />
      <FAQ />
      <Contact />
    </main>
  );
}
