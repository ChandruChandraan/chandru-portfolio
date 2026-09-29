import { lazy, Suspense, useLayoutEffect, useRef } from "react";
import { ArrowDownRight, Boxes, FileText } from "lucide-react";
import { personal } from "../data/content";
import { gsap } from "../lib/gsap";
import { useOnScreen, useReducedMotion, useWebGLSupport, useMediaQuery } from "../lib/hooks";
import SceneFallback from "../three/SceneFallback";
import Magnetic from "./Magnetic";

const HeroScene = lazy(() => import("../three/HeroScene"));

export default function Hero() {
  const reduced = useReducedMotion();
  const webgl = useWebGLSupport();
  const low = useMediaQuery("(max-width: 820px)");
  const { ref: sectionRef, onScreen } = useOnScreen<HTMLElement>("120px");

  const sceneWrapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  /* intro sequence + scroll transition */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* reduced motion — simple staggered fade only */
      if (reduced) {
        gsap
          .timeline({ delay: 0.05, defaults: { ease: "power2.out" } })
          .fromTo(
            sceneWrapRef.current,
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.7 }
          )
          .fromTo(
            "[data-hero]",
            { autoAlpha: 0 },
            { autoAlpha: 1, duration: 0.5, stagger: 0.05 },
            "-=0.3"
          );
        return;
      }

      const tl = gsap.timeline({ delay: 0.1, defaults: { ease: "power4.out" } });

      tl.fromTo(
        sceneWrapRef.current,
        { autoAlpha: 0, scale: 1.06 },
        { autoAlpha: 1, scale: 1, duration: 1.4, ease: "power2.out" }
      )
        .fromTo(
          "[data-hero='label']",
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.6 },
          "-=1.0"
        )
        .fromTo(
          "[data-hero='name-line']",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.05, stagger: 0.14 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero='roles']",
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.55"
        )
        .fromTo(
          "[data-hero='desc']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.45"
        )
        .fromTo(
          "[data-hero='cta']",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='meta']",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.6 },
          "-=0.3"
        )
        .fromTo(
          "[data-hero='hud']",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.8, stagger: 0.07 },
          "-=0.5"
        );

      /* scroll transition — environment recedes, type settles back */
      gsap.to(contentRef.current, {
        y: -110,
        autoAlpha: 0.12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom 22%",
          scrub: 0.5,
        },
      });
      gsap.to(sceneWrapRef.current, {
        y: 130,
        scale: 0.94,
        autoAlpha: 0.45,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced, sectionRef]);

  const frameloop: "always" | "demand" | "never" = reduced
    ? "demand"
    : onScreen
      ? "always"
      : "never";

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-label="Introduction"
      className="relative min-h-[100svh] overflow-clip"
    >
      {/* 3D environment / fallback */}
      <div ref={sceneWrapRef} className="absolute inset-0" aria-hidden="true">
        {webgl !== true && <SceneFallback label="HOME_LEVEL" />}
        {webgl === true && (
          <Suspense fallback={<SceneFallback label="HOME_LEVEL" hint="LOADING 3D" />}>
            <HeroScene reduced={reduced} low={low} frameloop={frameloop} />
          </Suspense>
        )}
        {/* readability scrims */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(9,9,9,0.92)_0%,rgba(9,9,9,0.55)_38%,transparent_62%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* HUD frame */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden sm:block" aria-hidden="true">
        <span data-hero="hud" className="absolute left-6 top-24 font-mono text-[10px] tracking-[0.2em] text-ash lg:left-10">
          SCENE://HOME_LEVEL<span className="text-amber/70">.UM</span>
        </span>
        <span data-hero="hud" className="absolute right-6 top-24 font-mono text-[10px] tracking-[0.2em] text-ash lg:right-10">
          CAM_01 · ORBIT <span className="ml-1 inline-block size-1 rounded-full bg-amber animate-blink" />
        </span>
        <span data-hero="hud" className="absolute bottom-8 right-6 font-mono text-[10px] tracking-[0.2em] text-ash lg:right-10">
          ENGINE // REALTIME_3D
        </span>
        <span data-hero="hud" className="absolute left-6 top-1/2 hidden -translate-y-1/2 -rotate-90 font-mono text-[10px] tracking-[0.35em] text-ash/70 lg:left-8 lg:block">
          UNREAL&nbsp;ENGINE&nbsp;·&nbsp;VR&nbsp;·&nbsp;SIMULATION
        </span>
      </div>

      {/* content */}
      <div ref={contentRef} className="wrap relative z-10 flex min-h-[100svh] flex-col justify-center pb-24 pt-32 sm:pt-36">
        <div className="max-w-3xl">
          <p data-hero="label" className="mb-6 flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] text-amber">
            <span className="inline-block size-1.5 rounded-full bg-amber animate-pulse-soft" />
            GAME DEVELOPER / VR DEVELOPER
          </p>

          <h1 className="font-bold leading-[0.88] tracking-[-0.02em]">
            <span className="block overflow-hidden pb-1">
              <span data-hero="name-line" className="block text-[clamp(3.4rem,11vw,9.5rem)]">
                {personal.firstName}
              </span>
            </span>
            <span className="block overflow-hidden pb-2">
              <span data-hero="name-line" className="font-outline block text-[clamp(3.4rem,11vw,9.5rem)]">
                {personal.lastName}
              </span>
            </span>
          </h1>

          <div data-hero="roles" className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] tracking-[0.22em] text-fog sm:text-xs">
            {personal.roles.map((role, i) => (
              <span key={role} className="flex items-center gap-4">
                {i > 0 && <span className="text-amber/60">/</span>}
                {role}
              </span>
            ))}
          </div>

          <p data-hero="desc" className="mt-6 max-w-md text-[15px] leading-relaxed text-fog sm:text-base">
            {personal.heroIntro}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic>
              <a
                href="#work"
                data-hero="cta"
                className="group inline-flex items-center gap-2.5 rounded-full bg-amber px-7 py-4 text-[12px] font-bold tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-flare"
              >
                VIEW SELECTED WORK
                <ArrowDownRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href="#unreal"
                data-hero="cta"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[12px] font-semibold tracking-[0.14em] text-paper transition-colors duration-300 hover:border-amber/60 hover:text-amber"
              >
                <Boxes className="size-4 text-amber transition-transform duration-500 group-hover:rotate-12" />
                EXPLORE UNREAL ENGINE
              </a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <a
                href={personal.resumeHref}
                target="_blank"
                rel="noopener noreferrer"
                data-hero="cta"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/15 px-7 py-4 text-[12px] font-semibold tracking-[0.14em] text-paper transition-colors duration-300 hover:border-amber/60 hover:text-amber"
              >
                <FileText className="size-4 text-amber transition-transform duration-300 group-hover:scale-110" />
                RESUME (PDF)
              </a>
            </Magnetic>
          </div>

          <div data-hero="meta" className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-2 font-mono text-[10px] tracking-[0.25em] text-ash">
            <span>LOCATION // {personal.location.toUpperCase()}</span>
            <span className="text-amber/80">STACK // UNREAL ENGINE</span>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div data-hero="hud" className="absolute bottom-8 left-5 z-10 flex items-center gap-4 sm:left-8 lg:left-12" aria-hidden="true">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ash">SCROLL // ENTER</span>
        <span className="block h-10 w-px overflow-hidden bg-white/10">
          <span className="block h-full w-full bg-amber animate-scroll-cue" />
        </span>
      </div>
    </section>
  );
}
