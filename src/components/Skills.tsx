import { useLayoutEffect, useRef } from "react";
import { Boxes } from "lucide-react";
import { skills, skillNodes, skillLinks, technicalExpertise } from "../data/content";
import { gsap } from "../lib/gsap";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";

const TIER_LINE: Record<string, { stroke: string; width: number }> = {
  core: { stroke: "rgba(255, 77, 90, 0.75)", width: 2 },
  secondary: { stroke: "rgba(200, 205, 213, 0.16)", width: 1.25 },
  outer: { stroke: "rgba(255, 77, 90, 0.22)", width: 1 },
};

/**
 * 06 — SKILLS
 * Technical node constellation: Unreal Engine at the center, tiered rings
 * of core, supporting and additional systems. Desktop renders the animated
 * map; mobile renders compact stacked groups.
 */
export default function Skills() {
  const ref = useRef<HTMLElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  /* sequenced constellation reveal (desktop map only) */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const scope = mapRef.current;
      if (!scope) return;
      const q = gsap.utils.selector(scope);

      if (reduced) {
        gsap.fromTo(
          [q(".sk-center"), q(".sk-node"), q(".sk-link"), q(".sk-ring")],
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.05,
            scrollTrigger: { trigger: scope, start: "top 78%", once: true },
          }
        );
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: scope, start: "top 74%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        q(".sk-center"),
        { autoAlpha: 0, scale: 0.4 },
        { autoAlpha: 1, scale: 1, duration: 0.7, ease: "back.out(1.7)" }
      )
        .fromTo(
          q(".sk-ring"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8 },
          "-=0.3"
        )
        .fromTo(
          q(".sk-link-core"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.5, stagger: 0.1, ease: "power2.inOut" },
          "-=0.5"
        )
        .fromTo(
          q(".sk-node-core"),
          { autoAlpha: 0, scale: 0.5 },
          { autoAlpha: 1, scale: 1, duration: 0.45, stagger: 0.1, ease: "back.out(1.8)" },
          "-=0.35"
        )
        .fromTo(
          q(".sk-link-secondary"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.45, stagger: 0.07, ease: "power2.inOut" },
          "-=0.2"
        )
        .fromTo(
          q(".sk-node-secondary"),
          { autoAlpha: 0, scale: 0.6 },
          { autoAlpha: 1, scale: 1, duration: 0.4, stagger: 0.07 },
          "-=0.3"
        )
        .fromTo(
          q(".sk-link-outer"),
          { strokeDashoffset: 1 },
          { strokeDashoffset: 0, duration: 0.4, stagger: 0.06, ease: "power2.inOut" },
          "-=0.2"
        )
        .fromTo(
          q(".sk-node-outer"),
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.4, stagger: 0.07 },
          "-=0.25"
        );
    });

    return () => mm.revert();
  }, [reduced]);

  return (
    <section
      id="skills"
      ref={ref}
      aria-label="Skills"
      className="relative scroll-mt-24 border-t border-white/5"
    >
      <div className="wrap section-pad">
        <SectionHeading index="06" label="SKILLS" className="mb-10" />

        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <h2 className="font-bold leading-[0.95]" data-linegroup>
            <span className="block overflow-hidden pb-1">
              <span data-line className="block text-[clamp(2.2rem,5vw,4.4rem)]">
                UNREAL AT
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-line className="block text-[clamp(2.2rem,5vw,4.4rem)]">
                <span className="font-outline">THE CORE</span>
              </span>
            </span>
          </h2>
          <p data-reveal className="max-w-xs text-sm leading-relaxed text-fog">
            Every system connects back to the engine — gameplay, VR, simulation
            and the application layer around it.
          </p>
        </div>

        {/* ---------------- desktop constellation ---------------- */}
        <div
          ref={mapRef}
          aria-hidden="true"
          className="relative mx-auto hidden aspect-square w-[min(92vw,860px)] select-none md:block"
        >
          {/* rings */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            <circle className="sk-ring" cx="50" cy="50" r="28" fill="none" stroke="rgba(244,244,239,0.07)" strokeWidth="0.28" strokeDasharray="1.1 1.6" vectorEffect="non-scaling-stroke" />
            <circle className="sk-ring" cx="50" cy="50" r="40.5" fill="none" stroke="rgba(244,244,239,0.05)" strokeWidth="0.28" strokeDasharray="1.1 2" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* links */}
          <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
            {skillLinks.map((link, i) => {
              const style = TIER_LINE[link.tier];
              return (
                <line
                  key={i}
                  x1={link.from[0]}
                  y1={link.from[1]}
                  x2={link.to[0]}
                  y2={link.to[1]}
                  stroke={style.stroke}
                  strokeWidth={style.width}
                  vectorEffect="non-scaling-stroke"
                  pathLength={1}
                  strokeDasharray={1}
                  className={`sk-link sk-link-${link.tier}`}
                />
              );
            })}
          </svg>

          {/* center node */}
          <div
            className="sk-center absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: "50%", top: "50%" }}
          >
            <div className="grid size-36 place-items-center rounded-3xl border border-amber/40 bg-[#101010]/90 text-center shadow-[0_0_70px_-12px_rgba(255,152,0,0.4)] backdrop-blur-md lg:size-44">
              <div>
                <Boxes className="mx-auto mb-2 size-5 text-amber" />
                <p className="text-sm font-bold leading-tight tracking-[0.08em] lg:text-base">
                  UNREAL
                  <br />
                  ENGINE
                </p>
                <p className="mt-2 font-mono text-[8px] tracking-[0.28em] text-ash">
                  CORE SPECIALIZATION
                </p>
              </div>
            </div>
          </div>

          {/* tier nodes */}
          {skillNodes.map((node) => (
            <div
              key={node.label}
              className={`sk-node sk-node-${node.tier} absolute -translate-x-1/2 -translate-y-1/2 ${
                node.tier === "core"
                  ? "rounded-full border border-amber/40 bg-amber/10 px-4 py-2 text-[10.5px] font-bold tracking-[0.14em] text-paper lg:text-[11.5px]"
                  : node.tier === "secondary"
                    ? "rounded-full border border-white/12 bg-card/95 px-3.5 py-1.5 font-mono text-[9px] tracking-[0.14em] text-fog lg:text-[10px]"
                    : "flex items-center gap-2 font-mono text-[9.5px] tracking-[0.16em] text-ash lg:text-[10.5px]"
              }`}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
            >
              {node.tier === "outer" && (
                <span className="inline-block size-1.5 rounded-full bg-amber/70" />
              )}
              <span className="whitespace-nowrap uppercase">{node.label}</span>
            </div>
          ))}
        </div>

        {/* footer note — desktop */}
        <p data-reveal className="mt-12 hidden text-center font-mono text-[10px] tracking-[0.25em] text-ash md:block">
          ALSO IN THE STACK <span className="mx-2 text-amber/60">//</span>{" "}
          {skills.additional.join(" · ").toUpperCase()}
        </p>

        {/* ---------------- mobile groups ---------------- */}
        <div className="space-y-4 md:hidden" data-stagger>
          <div className="rounded-2xl border border-amber/35 bg-gradient-to-br from-amber/10 to-transparent p-6">
            <p className="mb-3 font-mono text-[9.5px] tracking-[0.3em] text-amber">
              PRIMARY EXPERTISE
            </p>
            <p className="flex items-center gap-3 text-2xl font-bold tracking-tight">
              <Boxes className="size-5 text-amber" />
              {skills.primary}
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {skills.core.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-amber/30 bg-amber/10 px-3.5 py-1.5 text-[11px] font-semibold tracking-wide text-paper"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <p className="mb-4 font-mono text-[9.5px] tracking-[0.3em] text-ash">
              CORE DEVELOPMENT
            </p>
            <ul className="space-y-3">
              {skills.supporting.map((item, i) => (
                <li key={item} className="flex items-center gap-4 border-b border-white/6 pb-3 text-[15px] font-medium text-paper last:border-0 last:pb-0">
                  <span className="font-mono text-[9px] text-amber/70">0{i + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-card p-6">
            <p className="mb-4 font-mono text-[9.5px] tracking-[0.3em] text-ash">
              ADDITIONAL TECHNICAL KNOWLEDGE
            </p>
            <ul className="flex flex-wrap gap-2">
              {skills.additional.map((item) => (
                <li
                  key={item}
                  className="rounded-full border border-white/12 px-3.5 py-1.5 font-mono text-[10.5px] tracking-[0.08em] text-fog"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ---------------- categorized technical expertise matrix ---------------- */}
        <div className="mt-20 pt-16 border-t border-white/8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <p data-reveal className="mb-3 font-mono text-[10px] tracking-[0.3em] text-amber">
                COMPREHENSIVE STACK
              </p>
              <h3 className="text-2xl font-bold tracking-tight sm:text-3xl text-paper">
                TECHNICAL EXPERTISE
              </h3>
            </div>
            <p data-reveal className="max-w-md font-mono text-[11px] tracking-[0.2em] text-ash">
              DOMAINS // 3D · VR/XR · SCRIPTING · EMBEDDED · SYSTEMS
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
            {technicalExpertise.map((cat, i) => (
              <div
                key={cat.category}
                className="rounded-2xl border border-white/8 bg-card/60 p-6 transition-all duration-300 hover:border-amber/35 hover:bg-cardhot"
              >
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span className="font-mono text-[10px] tracking-[0.25em] text-amber">
                    0{i + 1} // DOMAIN
                  </span>
                  <span className="size-1.5 rounded-full bg-amber/50" />
                </div>
                <h4 className="mt-4 text-base font-bold tracking-wide text-paper">
                  {cat.category}
                </h4>
                <ul className="mt-4 space-y-2">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 text-sm text-fog"
                    >
                      <span className="size-1 rounded-full bg-amber/60" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
