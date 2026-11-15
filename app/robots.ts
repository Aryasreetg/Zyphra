import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

// Served at /robots.txt. Keeps the admin panel out of search engines.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/admin/"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
