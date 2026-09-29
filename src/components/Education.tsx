import { useRef } from "react";
import { BadgeCheck, GraduationCap } from "lucide-react";
import { education } from "../data/content";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";

/**
 * 07 — EDUCATION
 * Horizontal development timeline on desktop, vertical on mobile.
 */
export default function Education() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  return (
    <section
      id="education"
      ref={ref}
      aria-label="Education"
      className="relative scroll-mt-24 border-t border-white/5 bg-coal/40"
    >
      <div className="wrap section-pad">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionHeading index="07" label="EDUCATION" className="mb-9" />
            <h2 className="font-bold leading-[0.95]" data-linegroup>
              <span className="block overflow-hidden pb-2">
                <span data-line className="block text-[clamp(2.2rem,5vw,4.2rem)]">
                  ACADEMIC <span className="font-outline">RECORD</span>
                </span>
              </span>
            </h2>
          </div>
          <p data-reveal className="hidden font-mono text-[10px] tracking-[0.3em] text-ash sm:block">
            PATH // 2020 → PRESENT
          </p>
        </div>

        <div data-draw-scope className="relative">
          {/* desktop horizontal track */}
          <span
            aria-hidden="true"
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-white/10 md:block"
          />
          <span
            aria-hidden="true"
            data-drawx
            className="absolute left-0 right-0 top-[7px] hidden h-px bg-gradient-to-r from-flare via-amber to-rust md:block"
          />

          <ol className="grid gap-12 md:grid-cols-2 md:gap-16" data-stagger>
            {education.map((entry) => (
              <li
                key={entry.year}
                className="relative border-l border-white/12 pl-7 md:border-l-0 md:pl-0 md:pt-14"
              >
                {/* node */}
                <span
                  aria-hidden="true"
                  className={`absolute left-[-6px] top-[9px] size-[11px] rounded-full border-2 border-ink md:left-[1px] md:top-[2px] ${
                    entry.current
                      ? "bg-amber shadow-[0_0_16px_rgba(255,152,0,0.75)]"
                      : "bg-ash"
                  }`}
                />

                <p className="flex items-center gap-2.5 font-mono text-xs tracking-[0.25em] text-amber">
                  <GraduationCap className="size-4" />
                  {entry.year}
                </p>

                <h3 className="mt-4 max-w-md text-xl font-bold leading-snug tracking-wide sm:text-2xl">
                  {entry.title}
                </h3>

                {'institution' in entry && entry.institution && (
                  <p className="mt-2 text-sm font-semibold tracking-wide text-amber/90">
                    {entry.institution}
                  </p>
                )}

                {entry.note && (
                  <p className="mt-1 font-mono text-[11px] tracking-[0.25em] text-ash">
                    {entry.note}
                  </p>
                )}

                <span
                  className={`mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 font-mono text-[10px] tracking-[0.24em] ${
                    entry.current
                      ? "border-amber/50 bg-amber/10 text-amber"
                      : "border-white/15 text-fog"
                  }`}
                >
                  {entry.current ? (
                    <span className="size-1.5 rounded-full bg-amber animate-pulse-soft" />
                  ) : (
                    <BadgeCheck className="size-3.5" />
                  )}
                  {entry.status}
                </span>

                {entry.current && (
                  <p className="mt-4 font-mono text-[9.5px] tracking-[0.28em] text-ash">
                    CURRENTLY PURSUING
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
