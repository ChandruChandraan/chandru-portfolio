import { useRef } from "react";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { personal } from "../data/content";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import { GithubIcon } from "./icons";

/**
 * 09 — CONTACT
 * Minimal endpoint: identity, channels and three direct actions.
 */
export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Contact"
      data-parallax-scope
      className="relative scroll-mt-24 overflow-clip border-t border-white/5 bg-coal/40"
    >
      {/* exiting environment glow */}
      <div
        aria-hidden="true"
        data-parallax="8"
        className="pointer-events-none absolute -bottom-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-amber/[0.07] blur-[120px]"
      />

      <div className="wrap section-pad relative">
        <SectionHeading index="09" label="CONTACT" className="mb-10" />

        <h2 className="max-w-5xl font-bold leading-[0.92]" data-linegroup>
          <span className="block overflow-hidden pb-1">
            <span data-line className="block text-[clamp(2.6rem,7.5vw,7rem)]">
              LET'S BUILD
            </span>
          </span>
          <span className="block overflow-hidden pb-2">
            <span data-line className="block text-[clamp(2.6rem,7.5vw,7rem)]">
              SOMETHING <span className="text-amber">REAL</span>
            </span>
          </span>
        </h2>

        <div className="mt-16 grid gap-14 lg:grid-cols-12">
          {/* identity block */}
          <div className="lg:col-span-5">
            <p data-reveal className="text-xl font-bold tracking-wide">
              {personal.name.toUpperCase()}
            </p>
            <p data-reveal data-delay="0.05" className="mt-1.5 font-mono text-[10.5px] tracking-[0.25em] text-amber">
              {personal.title.toUpperCase()}
            </p>

            <div className="mt-8 space-y-5" data-stagger>
              <p className="flex items-start gap-4 text-sm leading-relaxed text-fog">
                <MapPin className="mt-0.5 size-4 shrink-0 text-amber" />
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.28em] text-ash">
                    CURRENT LOCATION
                  </span>
                  <span className="mt-1 block text-base text-paper">{personal.location}</span>
                </span>
              </p>
              <p className="flex items-start gap-4 text-sm leading-relaxed text-fog">
                <MapPin className="mt-0.5 size-4 shrink-0 text-ash" />
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.28em] text-ash">
                    NATIVE PLACE
                  </span>
                  <span className="mt-1 block text-base text-paper">{personal.nativePlace}</span>
                </span>
              </p>
            </div>

            <p data-reveal data-delay="0.15" className="mt-10 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-ash">
              <span className="size-1.5 rounded-full bg-amber animate-pulse-soft" />
              CONNECTION // READY
            </p>
          </div>

          {/* channels + actions */}
          <div className="lg:col-span-6 lg:col-start-7">
            <div data-stagger className="border-t border-white/8">
              <a
                href={personal.emailHref}
                className="group flex items-center justify-between gap-4 border-b border-white/8 py-5"
              >
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.28em] text-ash">
                    EMAIL
                  </span>
                  <span className="mt-1 block break-all text-base font-semibold text-paper transition-colors group-hover:text-amber sm:text-lg">
                    {personal.email}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber" />
              </a>

              <a
                href={personal.phoneHref}
                className="group flex items-center justify-between gap-4 border-b border-white/8 py-5"
              >
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.28em] text-ash">
                    PHONE
                  </span>
                  <span className="mt-1 block text-base font-semibold text-paper transition-colors group-hover:text-amber sm:text-lg">
                    {personal.phone}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber" />
              </a>

              <a
                href={personal.githubHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border-b border-white/8 py-5"
              >
                <span>
                  <span className="block font-mono text-[9.5px] tracking-[0.28em] text-ash">
                    GITHUB
                  </span>
                  <span className="mt-1 block text-base font-semibold text-paper transition-colors group-hover:text-amber sm:text-lg">
                    {personal.githubLabel}
                  </span>
                </span>
                <ArrowUpRight className="size-5 shrink-0 text-ash transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-amber" />
              </a>
            </div>

            <div className="mt-10 flex flex-wrap gap-4" data-stagger>
              <Magnetic>
                <a
                  href={personal.phoneHref}
                  className="inline-flex items-center gap-2.5 rounded-full bg-amber px-7 py-4 text-[12px] font-bold tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-flare"
                >
                  <Phone className="size-4" />
                  CALL
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href={personal.emailHref}
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[12px] font-semibold tracking-[0.14em] text-paper transition-colors duration-300 hover:border-amber/60 hover:text-amber"
                >
                  <Mail className="size-4 text-amber" />
                  EMAIL
                </a>
              </Magnetic>
              <Magnetic strength={0.22}>
                <a
                  href={personal.githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[12px] font-semibold tracking-[0.14em] text-paper transition-colors duration-300 hover:border-amber/60 hover:text-amber"
                >
                  <GithubIcon className="size-4 text-amber" />
                  GITHUB
                </a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>

      {/* ghost exit type */}
      <div
        aria-hidden="true"
        data-parallax="6"
        className="pointer-events-none relative -mb-[0.32em] select-none overflow-hidden text-center"
      >
        <span className="font-outline-faint block text-[clamp(4rem,15vw,15rem)] font-bold leading-[0.8] tracking-tight">
          CHANDRU
        </span>
      </div>
    </section>
  );
}
