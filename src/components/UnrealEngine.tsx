import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { Boxes } from "lucide-react";
import { skills } from "../data/content";
import { gsap } from "../lib/gsap";
import { useReveals } from "../lib/anim";
import {
  useMediaQuery,
  useNearViewport,
  useOnScreen,
  useReducedMotion,
  useWebGLSupport,
} from "../lib/hooks";
import SceneFallback from "../three/SceneFallback";
import SectionHeading from "./SectionHeading";

const UnrealScene = lazy(() => import("../three/UnrealScene"));

const CHIPS = [
  { code: "BP // BLUEPRINTS", desc: "Gameplay logic & interaction systems" },
  { code: "LD // LEVEL DESIGN", desc: "Environments, blockouts & flow" },
  { code: "VR // RUNTIME", desc: "Immersive PC & headset experiences" },
  { code: "OPT // PERFORMANCE", desc: "Real-time rendering optimization" },
];

/**
 * 05 — UNREAL ENGINE
 * Pinned cinematic stage: the miniature dev world rotates into place while
 * blueprint-style chips connect around it. Released after ~130% scroll.
 */
export default function UnrealEngine() {
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const low = useMediaQuery("(max-width: 820px)");
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { ref: screenRef, onScreen } = useOnScreen<HTMLDivElement>("160px");
  const { ref: nearRef, near } = useNearViewport<HTMLDivElement>("900px");

  /* scene motion driven by the pinned timeline */
  const motion = useRef({
    ry:
      typeof window !== "undefined" && window.innerWidth >= 1024 && !reduced
        ? -0.85
        : -0.25,
    drift: 0,
  });

  useReveals(sectionRef, reduced);

  /* pinned cinematic sequence — desktop + full motion only */
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      const q = gsap.utils.selector(stageRef.current);

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "+=135%",
          scrub: 0.8,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.fromTo(motion.current, { ry: -0.85 }, { ry: 0.25, duration: 3 }, 0)
        .fromTo(
          q(".ue-title-wrap"),
          { x: 0 },
          { x: -46, duration: 3 },
          0
        )
        .fromTo(
          q(".ue-chip"),
          { autoAlpha: 0, y: 38 },
          { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.42, ease: "power2.out" },
          0.9
        )
        .fromTo(
          q(".ue-progress-fill"),
          { scaleX: 0 },
          { scaleX: 1, duration: 3 },
          0
        );

      return () => {
        motion.current.ry = -0.25;
      };
    });

    return () => mm.revert();
  }, [reduced]);

  const frameloop: "always" | "demand" | "never" = reduced
    ? "demand"
    : onScreen
      ? "always"
      : "never";

  return (
    <section
      id="unreal"
      ref={sectionRef}
      aria-label="Unreal Engine specialization"
      className="relative scroll-mt-24 border-t border-white/5 bg-coal/30"
      data-draw-scope
    >
      {/* -------------------- pinned stage -------------------- */}
      <div ref={nearRef}>
        <div ref={screenRef}>
          <div
            ref={stageRef}
            className="relative flex min-h-[100svh] items-center overflow-clip"
          >
            {/* 3D layer */}
            <div className="absolute inset-0" aria-hidden="true">
              {(!near || webgl !== true) && <SceneFallback label="UNREAL_ENV" hint="STANDBY" />}
              {near && webgl === true && (
                <Suspense fallback={<SceneFallback label="UNREAL_ENV" hint="LOADING 3D" />}>
                  <UnrealScene reduced={reduced} low={low} frameloop={frameloop} motion={motion} />
                </Suspense>
              )}
              <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(9,9,9,0.94)_0%,rgba(9,9,9,0.55)_42%,rgba(9,9,9,0.15)_70%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(9,9,9,0.9)_0%,transparent_42%)] lg:hidden" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
            </div>

            {/* content */}
            <div className="wrap relative z-10 grid w-full gap-10 py-28 lg:grid-cols-12">
              <div className="ue-title-wrap lg:col-span-7">
                <SectionHeading index="05" label="UNREAL ENGINE" className="mb-8" />
                <p data-reveal className="mb-5 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber">
                  <Boxes className="size-4" />
                  PRIMARY DEVELOPMENT SPECIALIZATION
                </p>
                <h2 className="font-bold leading-[0.88]" data-linegroup>
                  <span className="block overflow-hidden pb-1">
                    <span data-line className="block text-[clamp(3rem,8.5vw,7.5rem)]">
                      UNREAL
                    </span>
                  </span>
                  <span className="block overflow-hidden pb-2">
                    <span data-line className="font-outline-amber block text-[clamp(3rem,8.5vw,7.5rem)]">
                      ENGINE
                    </span>
                  </span>
                </h2>
                <p data-reveal data-delay="0.15" className="mt-7 max-w-md text-[15px] leading-relaxed text-fog sm:text-base">
                  Real-time development focused on interactive environments, VR
                  experiences, gameplay systems, and performance-conscious
                  applications.
                </p>
              </div>

              {/* blueprint chips */}
              <div className="grid content-center gap-4 sm:grid-cols-2 lg:col-span-4 lg:col-start-9 lg:grid-cols-1">
                {CHIPS.map((chip) => (
                  <div
                    key={chip.code}
                    className="ue-chip rounded-xl border border-white/10 bg-[#0e0e0e]/85 p-4 backdrop-blur-md"
                  >
                    <p className="font-mono text-[10.5px] tracking-[0.18em] text-amber">
                      {chip.code}
                    </p>
                    <p className="mt-1.5 text-[13px] text-fog">{chip.desc}</p>
                    <span className="mt-3 block h-px w-full bg-gradient-to-r from-amber/40 to-transparent" />
                  </div>
                ))}
              </div>
            </div>

            {/* pinned sequence progress */}
            <div
              aria-hidden="true"
              className="absolute bottom-8 left-1/2 z-10 hidden w-56 -translate-x-1/2 lg:block"
            >
              <p className="mb-2 text-center font-mono text-[9px] tracking-[0.3em] text-ash">
                SEQUENCE // SCROLL TO RUN
              </p>
              <span className="block h-px w-full bg-white/10">
                <span className="ue-progress-fill block h-full w-full origin-left bg-amber" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* -------------------- skill hierarchy -------------------- */}
      <div className="wrap pb-24 pt-16 sm:pb-32 lg:pb-36">
        <p data-reveal className="mb-4 flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-ash">
          <span className="inline-block h-px w-8 bg-amber/50" />
          DEVELOPER // SKILL HIERARCHY
        </p>

        <div data-stagger>
          <div className="grid gap-3 border-t border-white/8 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ash lg:col-span-3">
              PRIMARY
            </span>
            <span className="text-[clamp(1.9rem,4.2vw,3.6rem)] font-bold leading-none tracking-tight text-amber lg:col-span-9">
              {skills.primary}
            </span>
          </div>

          <div className="grid gap-4 border-t border-white/8 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ash lg:col-span-3">
              CORE
            </span>
            <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[clamp(1.3rem,2.6vw,2.2rem)] font-bold leading-tight text-paper lg:col-span-9">
              {skills.core.map((item, i) => (
                <span key={item} className="flex items-baseline gap-5">
                  {i > 0 && <span className="text-amber/60">/</span>}
                  {item}
                </span>
              ))}
            </span>
          </div>

          <div className="grid gap-4 border-y border-white/8 py-8 sm:py-10 lg:grid-cols-12 lg:items-baseline">
            <span className="font-mono text-[10px] tracking-[0.3em] text-ash lg:col-span-3">
              SUPPORTING
            </span>
            <span className="flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[clamp(1rem,1.8vw,1.5rem)] font-medium leading-snug text-fog lg:col-span-9">
              {skills.supporting.map((item, i) => (
                <span key={item} className="flex items-baseline gap-5">
                  {i > 0 && <span className="text-amber/50">·</span>}
                  {item}
                </span>
              ))}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
