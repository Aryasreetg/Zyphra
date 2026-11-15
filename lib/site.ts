// Site-wide details used for SEO (metadata, sitemap, structured data).
// On Netlify, `URL` is set automatically to the site's main address (your
// custom domain once you add one), so links stay correct without changes.
export const SITE = {
  name: "Zyphraa",
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "https://zyphraa.netlify.app").replace(/\/$/, ""),
  title: "Zyphraa — Mentor-led Tech Courses & Job-Ready Developer Training",
  description:
    "Live, mentor-led courses in Full Stack Development, Python & AI/ML, Java & Spring Boot, Frontend, Testing and Git. Build real projects, practise mock interviews and become a job-ready developer.",
  tagline: "A space for skills & growth",
  email: "aryasree.zyphraa@gmail.com",
  founder: "Aryasree TG",
  sameAs: ["https://www.instagram.com/zyphraa.arya", "https://linkedin.com/in/aryasree-tg-027461201"],
  keywords: [
    "full stack developer course",
    "online coding classes India",
    "Python AI ML course",
    "Java Spring Boot course",
    "React Next.js course",
    "software testing course",
    "Git version control course",
    "mock interview practice",
    "job-ready developer training",
    "campus workshops for colleges",
    "mentor-led programming courses",
  ],
};

export const absoluteUrl = (path = "/") => `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;

/** "₹40,000" → "40000" (for structured data prices) */
export const priceNumber = (price: string) => price.replace(/[^\d]/g, "");
