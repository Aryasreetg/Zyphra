import Home from "@/components/Home";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Courses from "@/components/courses";
import TechMarquee from "@/components/TechMarquee";
import HowItWorks from "@/components/HowItWorks";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import JsonLd from "@/components/JsonLd";
import { coursesData } from "@/config/courses";
import { FAQS } from "@/config/faq";
import { courseSchema, organization, website } from "@/lib/schema";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    organization,
    website,
    {
      "@type": "ItemList",
      name: "Zyphraa courses",
      itemListElement: coursesData
        .filter((c) => c.category !== "mentorship")
        .map((c, i) => ({ "@type": "ListItem", position: i + 1, item: courseSchema(c) })),
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Page() {
  return (
    <main className="flex flex-col gap-0">
      <JsonLd data={structuredData} />
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
