import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Zyphraa — mentor-led tech courses to become a job-ready developer";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return ogImage({
    eyebrow: "Mentor-led tech education",
    title: "Become a job-ready developer.",
    meta: "Full Stack · Python & AI/ML · Java & Spring Boot · Testing · Git",
  });
}
