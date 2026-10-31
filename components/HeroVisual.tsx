import React from "react";
import { Rocket, Mic, Video, CheckCircle2, GitBranch } from "lucide-react";
import { C } from "@/lib/theme";

// Syntax colours for the code card
const K = "#C4A96A"; // keyword
const F = "#9FD3B5"; // function
const S = "#E8B98A"; // string
const M = "rgba(245,239,230,0.45)"; // comment / muted
const T = "#F5EFE6"; // text

const LINES: React.ReactNode[] = [
  <><span style={{ color: K }}>const</span> you = <span style={{ color: K }}>new</span> <span style={{ color: F }}>Developer</span>(<span style={{ color: S }}>&quot;You&quot;</span>);</>,
  <>you.<span style={{ color: F }}>learn</span>([<span style={{ color: S }}>&quot;React&quot;</span>, <span style={{ color: S }}>&quot;Spring Boot&quot;</span>, <span style={{ color: S }}>&quot;Python&quot;</span>]);</>,
  <>you.<span style={{ color: F }}>build</span>(realWorldProjects);</>,
  <><span style={{ color: K }}>await</span> you.<span style={{ color: F }}>deploy</span>(<span style={{ color: S }}>&quot;cloud&quot;</span>);</>,
  <>you.<span style={{ color: F }}>practise</span>(mockInterviews);</>,
  <><span style={{ color: M }}>{"// ✓ job-ready"}</span></>,
];

/** Decorative code-editor card with floating badges, shown beside the hero text. */
export default function HeroVisual() {
  return (
    <div aria-hidden className="relative w-full max-w-lg mx-auto select-none">
      {/* Tilted card behind */}
      <div className="absolute inset-0 rounded-3xl rotate-6 scale-95" style={{ backgroundColor: C.goldLight, opacity: 0.35 }} />
      <div className="absolute inset-0 rounded-3xl -rotate-3" style={{ backgroundColor: C.sand }} />

      {/* Editor window */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl" style={{ backgroundColor: C.greenDark, border: "1px solid rgba(245,239,230,0.1)" }}>
        <div className="flex items-center gap-2 px-5 py-3.5" style={{ backgroundColor: "rgba(0,0,0,0.18)" }}>
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#E26D5A" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#E8B44A" }} />
          <span className="w-3 h-3 rounded-full" style={{ backgroundColor: "#6CBF7F" }} />
          <span className="ml-3 px-3 py-1 rounded-md text-[11px] font-mono" style={{ backgroundColor: "rgba(245,239,230,0.08)", color: T }}>
            career.ts
          </span>
          <GitBranch className="ml-auto w-4 h-4" style={{ color: M }} />
          <span className="text-[11px] font-mono" style={{ color: M }}>main</span>
        </div>
        <div className="px-4 sm:px-6 py-6 font-mono text-[10.5px] sm:text-[13px] leading-7 text-left overflow-hidden">
          {LINES.map((line, i) => (
            <div key={i} className="flex gap-4 type-line" style={{ animationDelay: `${0.5 + i * 0.55}s` }}>
              <span className="w-4 text-right flex-shrink-0" style={{ color: M }}>{i + 1}</span>
              <span className="whitespace-nowrap" style={{ color: T }}>
                {line}
                {i === LINES.length - 1 && <span className="caret ml-1 inline-block w-2 h-4 align-middle" style={{ backgroundColor: C.goldLight }} />}
              </span>
            </div>
          ))}
        </div>
        {/* Fake terminal output */}
        <div className="mx-5 sm:mx-6 mb-6 rounded-xl px-4 py-3 font-mono text-[11px] flex items-center gap-2 type-line" style={{ backgroundColor: "rgba(0,0,0,0.25)", color: "#9FD3B5", animationDelay: "4s" }}>
          <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
          Build succeeded · deployed to production
        </div>
      </div>

      {/* Floating badges */}
      <Badge className="-left-6 sm:-left-10 -top-7" delay="0s" icon={<Video className="w-4 h-4" />} title="Live classes" sub="Interactive & hands-on" />
      <Badge className="-right-4 sm:-right-10 top-1/2" delay="1.4s" icon={<Rocket className="w-4 h-4" />} title="Real projects" sub="Deployed to the cloud" />
      <Badge className="left-6 -bottom-6" delay="0.7s" icon={<Mic className="w-4 h-4" />} title="Mock interviews" sub="Included in every course" />
    </div>
  );
}

function Badge({ className, delay, icon, title, sub }: { className: string; delay: string; icon: React.ReactNode; title: string; sub: string }) {
  return (
    <div
      className={`absolute float-slow hidden sm:flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg ${className}`}
      style={{ backgroundColor: "#FFFDF9", border: `1px solid ${C.border}`, animationDelay: delay }}
    >
      <span className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ backgroundColor: C.green, color: C.cream }}>
        {icon}
      </span>
      <span className="leading-tight">
        <span className="block text-xs font-bold" style={{ color: C.green }}>{title}</span>
        <span className="block text-[10px]" style={{ color: C.brownLight }}>{sub}</span>
      </span>
    </div>
  );
}
