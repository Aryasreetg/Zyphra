import Home from "@/components/Home";
import About from "@/components/About";
import Courses from "@/components/courses";
import Workshop from "@/components/Workshop";

export default function Page() {
  return (
    <main className="flex flex-col gap-16">
      <Home />
      <About />
      <Courses />
      <Workshop />
    </main>
  );
}