import { useRef } from "react";
import { Languages as LanguagesIcon } from "lucide-react";
import { languages } from "../data/content";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";

/** 08 — LANGUAGES (compact) */
export default function Languages() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  return (
    <section
      id="languages"
      ref={ref}
      aria-label="Languages"
      className="relative border-t border-white/5"
    >
      <div className="wrap py-16 sm:py-20">
        <SectionHeading index="08" label="LANGUAGES" className="mb-9" />

        <div className="grid max-w-3xl gap-4 sm:grid-cols-2" data-stagger>
          {languages.map((language) => (
            <div
              key={language.name}
              className="group flex items-center justify-between rounded-2xl border border-white/8 bg-card/60 px-6 py-5 transition-colors duration-300 hover:border-amber/30 hover:bg-cardhot"
            >
              <span className="flex items-center gap-4">
                <LanguagesIcon className="size-4.5 text-amber" />
                <span className="text-lg font-bold tracking-[0.06em]">{language.name}</span>
              </span>
              <span className="rounded-full border border-white/12 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.25em] text-fog transition-colors duration-300 group-hover:border-amber/40 group-hover:text-amber">
                {language.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
