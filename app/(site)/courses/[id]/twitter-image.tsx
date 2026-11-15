import { coursesData } from "@/config/courses";
import { ogImage, OG_SIZE } from "@/lib/og";

export const alt = "Zyphraa course";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return coursesData.map((c) => ({ id: c.id }));
}

export default async function Image({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const course = coursesData.find((c) => c.id === id);
  if (!course) return ogImage({ eyebrow: "Zyphraa", title: "Mentor-led tech courses" });
  const price = course.offerPrice === "Contact Us" ? "Personalised pricing" : course.offerPrice;
  const duration = course.duration === "Flexible" ? "Flexible schedule" : course.duration;
  return ogImage({ eyebrow: "Online course", title: course.title, meta: `${duration} · ${price} · Live & project-based` });
}
