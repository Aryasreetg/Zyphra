// schema.org structured data builders (rendered with <JsonLd />).
import type { Course } from "@/config/courses";
import { SITE, absoluteUrl, priceNumber } from "@/lib/site";

export const organization = {
  "@type": "EducationalOrganization",
  "@id": absoluteUrl("/#organization"),
  name: SITE.name,
  url: absoluteUrl("/"),
  description: SITE.description,
  slogan: SITE.tagline,
  email: SITE.email,
  areaServed: { "@type": "Country", name: "India" },
  sameAs: SITE.sameAs,
  founder: { "@type": "Person", name: SITE.founder, jobTitle: "Senior Software Developer & Team Lead", sameAs: SITE.sameAs[1] },
};

/** "3 Months" → "P3M", "1.5 Months" → "P6W", "4 Weeks" → "P4W", "7 Days" → "P7D"; null if unknown */
function isoDuration(duration: string): string | null {
  const m = duration.match(/([\d.]+)\s*(month|week|day)/i);
  if (!m) return null;
  const n = Number(m[1]);
  const unit = m[2].toLowerCase();
  if (unit === "month") return Number.isInteger(n) ? `P${n}M` : `P${Math.round(n * 4)}W`;
  if (unit === "week") return `P${n}W`;
  return `P${n}D`;
}

export function courseSchema(course: Course) {
  const price = priceNumber(course.offerPrice);
  const workload = isoDuration(course.duration);
  return {
    "@type": "Course",
    "@id": absoluteUrl(`/courses/${course.id}#course`),
    name: course.title,
    description: course.description,
    url: absoluteUrl(`/courses/${course.id}`),
    provider: { "@id": absoluteUrl("/#organization") },
    inLanguage: "en",
    ...(course.whatYouLearn ? { teaches: course.whatYouLearn } : {}),
    ...(price
      ? {
          offers: {
            "@type": "Offer",
            category: "Paid",
            price,
            priceCurrency: "INR",
            availability: "https://schema.org/InStock",
            url: absoluteUrl(`/courses/${course.id}`),
          },
        }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      ...(workload ? { courseWorkload: workload } : {}),
      instructor: { "@type": "Person", name: SITE.founder },
    },
  };
}

export const website = {
  "@type": "WebSite",
  "@id": absoluteUrl("/#website"),
  name: SITE.name,
  url: absoluteUrl("/"),
  inLanguage: "en-IN",
  publisher: { "@id": absoluteUrl("/#organization") },
};
