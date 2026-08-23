import Home from "@/components/Home";
import About from "@/components/About";
import Achievements from "@/components/Achievements";
import Courses from "@/components/courses";
import Workshop from "@/components/Workshop";

export default function Page() {
  return (
    <main className="flex flex-col gap-0">
      <Home />
      <About />
      <Achievements />
      <Courses />
      {/* <Workshop /> */}
    </main>
  );
}