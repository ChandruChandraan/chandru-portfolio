import { useRef } from "react";
import { personal } from "../data/content";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  return (
    <section
      id="about"
      ref={ref}
      aria-label="About"
      data-parallax-scope
      className="relative scroll-mt-24 border-t border-white/5 bg-coal/40"
    >
      {/* slow counter-parallax decor */}
      <div
        aria-hidden="true"
        data-parallax="6"
        className="pointer-events-none absolute -top-10 right-[6%] hidden lg:block"
      >
        <svg width="260" height="260" viewBox="0 0 260 260" className="opacity-[0.13]">
          <g fill="none" stroke="#FF9800" strokeWidth="0.6">
            <circle cx="130" cy="130" r="118" strokeDasharray="4 7" />
            <circle cx="130" cy="130" r="82" strokeDasharray="2 6" />
            <path d="M130 12 L244 130 L130 248 L16 130 Z" />
            <circle cx="130" cy="130" r="3" fill="#FF9800" stroke="none" />
          </g>
        </svg>
      </div>

      <div className="wrap section-pad relative">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          {/* left — number + statement */}
          <div className="relative lg:col-span-6">
            <span
              aria-hidden="true"
              data-reveal
              className="font-outline-faint pointer-events-none absolute -top-16 left-0 select-none text-[clamp(7rem,16vw,13rem)] font-bold leading-none"
            >
              01
            </span>
            <div className="relative pt-16 sm:pt-24">
              <SectionHeading index="01" label="ABOUT" className="mb-10" />
              <h2 className="font-bold leading-[0.95] tracking-[-0.01em]" data-linegroup>
                <span className="block overflow-hidden pb-1">
                  <span data-line className="block text-[clamp(2.4rem,5.6vw,4.9rem)]">
                    BUILDING
                  </span>
                </span>
                <span className="block overflow-hidden pb-1">
                  <span data-line className="block text-[clamp(2.4rem,5.6vw,4.9rem)]">
                    REAL-TIME
                  </span>
                </span>
                <span className="block overflow-hidden pb-2">
                  <span data-line className="font-outline-amber block text-[clamp(2.4rem,5.6vw,4.9rem)]">
                    EXPERIENCES
                  </span>
                </span>
              </h2>
            </div>
          </div>

          {/* right — summary + focus */}
          <div className="lg:col-span-5 lg:col-start-8 lg:pt-28">
            <div className="space-y-5">
              {personal.summary.map((para, i) => (
                <p
                  key={i}
                  data-reveal
                  data-delay={`${i * 0.12}`}
                  className={`leading-relaxed ${
                    i === 0 ? "text-base text-paper sm:text-lg" : "text-[15px] text-fog"
                  }`}
                >
                  {para}
                </p>
              ))}
            </div>

            <div className="mt-14">
              <p data-reveal className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-ash">
                <span className="inline-block h-px w-8 bg-amber/50" />
                PRIMARY FOCUS
              </p>
              <ul data-stagger className="border-t border-white/8">
                {personal.primaryFocus.map((focus, i) => (
                  <li
                    key={focus}
                    className="group flex items-baseline justify-between gap-4 border-b border-white/8 py-4 transition-colors"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="font-mono text-[10px] text-ash">0{i + 1}</span>
                      <span
                        className={`text-lg font-semibold tracking-wide transition-colors duration-300 sm:text-xl ${
                          i === 0 ? "text-amber" : "text-paper group-hover:text-amber"
                        }`}
                      >
                        {focus}
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`size-1.5 rounded-full ${i === 0 ? "bg-amber" : "bg-white/15 group-hover:bg-amber/60"} transition-colors duration-300`}
                    />
                  </li>
                ))}
              </ul>
              <p data-reveal data-delay="0.2" className="mt-8 font-mono text-[10px] tracking-[0.25em] text-ash">
                CHENNAI, INDIA <span className="text-amber/60">//</span> 13.08° N — 80.27° E
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
