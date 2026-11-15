import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Zyphraa campus tech workshops for colleges";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogImage({
    eyebrow: "For colleges & universities",
    title: "Industry-ready tech training for your campus.",
    meta: "Workshops · Bootcamps · Custom institutional programs",
  });
}
