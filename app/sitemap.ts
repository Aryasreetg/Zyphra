import type { MetadataRoute } from "next";
import { coursesData } from "@/config/courses";
import { absoluteUrl } from "@/lib/site";

// Served at /sitemap.xml. Every course page is included automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/campus"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    ...coursesData.map((c) => ({
      url: absoluteUrl(`/courses/${c.id}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.category === "flagship" ? 0.9 : 0.7,
    })),
  ];
}
