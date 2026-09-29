import { useRef } from "react";
import { experience } from "../data/content";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  return (
    <section
      id="experience"
      ref={ref}
      aria-label="Experience"
      className="relative scroll-mt-24 border-t border-white/5"
    >
      <div className="wrap section-pad">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="02" label="EXPERIENCE" />
          <p data-reveal className="hidden font-mono text-[10px] tracking-[0.3em] text-ash sm:block">
            CAREER // TIMELINE
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-12">
          {/* left — role identity */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <p data-reveal className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-amber/40 bg-amber/10 px-4 py-2 font-mono text-[10.5px] tracking-[0.2em] text-amber">
                <span className="size-1.5 rounded-full bg-amber animate-pulse-soft" />
                {experience.period}
              </p>

              <h3 className="font-bold leading-[0.95]" data-linegroup>
                <span className="block overflow-hidden pb-1">
                  <span data-line className="block text-[clamp(2.2rem,4.5vw,4rem)]">
                    GAME / VR
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span data-line className="font-outline block text-[clamp(2.2rem,4.5vw,4rem)]">
                    DEVELOPER
                  </span>
                </span>
              </h3>

              <p data-reveal className="mt-6 flex items-center gap-4">
                <span className="h-px w-10 bg-amber/60" />
                <span className="font-mono text-sm tracking-[0.35em] text-amber">DEO VERSE</span>
              </p>

              <p data-reveal data-delay="0.1" className="mt-6 max-w-sm text-sm leading-relaxed text-fog">
                {experience.tagline}
              </p>

              <p data-reveal data-delay="0.15" className="mt-8 font-mono text-[10px] tracking-[0.3em] text-ash">
                STATUS // <span className="text-paper">ACTIVE ROLE</span>
              </p>
            </div>
          </div>

          {/* right — progressive timeline */}
          <div className="lg:col-span-7" data-draw-scope>
            <div className="relative pl-7 sm:pl-10">
              {/* base line + drawing line */}
              <span aria-hidden="true" className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px bg-white/10" />
              <span
                aria-hidden="true"
                data-drawy
                className="absolute left-[5px] top-2 h-[calc(100%-16px)] w-px bg-gradient-to-b from-flare via-amber to-rust"
              />

              <ol data-stagger className="space-y-5">
                {experience.items.map((item) => (
                  <li key={item.id} className="relative">
                    {/* node */}
                    <span
                      aria-hidden="true"
                      className="absolute -left-7 top-6 grid size-[13px] -translate-x-[1.5px] place-items-center sm:-left-10"
                    >
                      <span className="absolute inline-flex size-[13px] rounded-full bg-amber/25" />
                      <span className="relative inline-flex size-[7px] rounded-full bg-amber" />
                    </span>

                    <article className="group rounded-2xl border border-white/6 bg-card/60 p-5 transition-all duration-300 hover:border-amber/25 hover:bg-cardhot sm:p-6">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h4 className="text-[15px] font-bold tracking-[0.08em] text-paper transition-colors duration-300 group-hover:text-amber sm:text-base">
                          {item.title}
                        </h4>
                        <span className="font-mono text-[10px] tracking-[0.2em] text-ash">
                          {item.id}
                        </span>
                      </div>
                      <p className="mt-2.5 text-sm leading-relaxed text-fog">{item.desc}</p>
                    </article>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
