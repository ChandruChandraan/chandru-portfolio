import { useLayoutEffect, useRef, useState } from "react";
import { Plus, Play } from "lucide-react";
import { projects } from "../data/content";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";
import VideoModal from "./VideoModal";

/**
 * 03 — PROJECTS
 * Vertical selector: one project active at a time, GSAP-driven expansion,
 * ambient glow follows the active row.
 */
export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  const [active, setActive] = useState(0);
  const [video, setVideo] = useState<{ n?: string; title: string; sub?: string; videoId: string } | null>(null);
  const panelsRef = useRef<Array<HTMLDivElement | null>>([]);
  const rowsRef = useRef<Array<HTMLDivElement | null>>([]);
  const glowRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    panelsRef.current.forEach((panel, i) => {
      if (!panel) return;
      const open = i === active;
      gsap.to(panel, {
        height: open ? "auto" : 0,
        autoAlpha: open ? 1 : 0,
        duration: reduced ? 0.25 : open ? 0.75 : 0.55,
        ease: "power3.inOut",
      });
    });

    const row = rowsRef.current[active];
    const glow = glowRef.current;
    if (row && glow) {
      gsap.to(glow, {
        top: row.offsetTop,
        height: row.offsetHeight,
        autoAlpha: 1,
        duration: reduced ? 0.25 : 0.7,
        ease: "power3.out",
      });
    }

    /* re-measure scroll positions after the accordion settles */
    const t = window.setTimeout(() => ScrollTrigger.refresh(), reduced ? 300 : 820);
    return () => window.clearTimeout(t);
  }, [active, reduced]);

  return (
    <section
      id="projects"
      ref={ref}
      aria-label="Projects"
      className="relative scroll-mt-24 border-t border-white/5 bg-coal/40"
    >
      <div className="wrap section-pad relative">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-6">
          <SectionHeading index="03" label="PROJECTS" />
          <p data-reveal className="hidden font-mono text-[10px] tracking-[0.3em] text-ash sm:block">
            SELECT // APPLICATION_SYS
          </p>
        </div>

        <h2 className="mb-12 font-bold leading-[0.95]" data-linegroup>
          <span className="block overflow-hidden pb-2">
            <span data-line className="block text-[clamp(2.2rem,5vw,4.4rem)]">
              BUILD <span className="font-outline">QUEUE</span>
              <span className="ml-4 align-top font-mono text-sm text-amber">[{projects.length.toString().padStart(2, "0")}]</span>
            </span>
          </span>
        </h2>

        <div data-reveal className="relative border-b border-white/8">
          {/* ambient glow that follows the active project */}
          <div
            ref={glowRef}
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-24 h-40 w-full opacity-0"
            style={{
              background:
                "radial-gradient(60% 120% at 70% 50%, rgba(201,106,0,0.10), transparent 65%)",
            }}
          />
          {projects.map((project, i) => {
            const isActive = i === active;
            return (
              <div
                key={project.n}
                ref={(el) => {
                  rowsRef.current[i] = el;
                }}
                className="relative border-t border-white/8"
              >
                {/* active edge */}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 top-0 h-full w-[2px] bg-amber transition-opacity duration-500 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <button
                  type="button"
                  id={`project-tab-${project.n}`}
                  aria-expanded={isActive}
                  aria-controls={`project-panel-${project.n}`}
                  onClick={() => setActive(i)}
                  className="group flex w-full items-center gap-5 py-7 text-left sm:gap-9 sm:py-9"
                >
                  <span
                    aria-hidden="true"
                    className={`font-mono text-sm transition-colors duration-300 ${
                      isActive ? "text-amber" : "text-ash group-hover:text-fog"
                    }`}
                  >
                    {project.n}
                  </span>

                  <span className="flex-1">
                    <span
                      className={`block text-xl font-bold tracking-[0.02em] transition-colors duration-300 sm:text-3xl lg:text-4xl ${
                        isActive ? "text-paper" : "text-fog group-hover:text-paper"
                      }`}
                    >
                      {project.title}
                    </span>
                    <span className="mt-1.5 block font-mono text-[10px] tracking-[0.25em] text-ash">
                      {project.tag}
                    </span>
                  </span>

                  <span
                    aria-hidden="true"
                    className={`grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 sm:size-12 ${
                      isActive
                        ? "rotate-45 border-amber/60 bg-amber/10 text-amber"
                        : "border-white/15 text-fog group-hover:border-amber/40 group-hover:text-paper"
                    }`}
                  >
                    <Plus className="size-4" />
                  </span>
                </button>

                <div
                  ref={(el) => {
                    panelsRef.current[i] = el;
                  }}
                  id={`project-panel-${project.n}`}
                  role="region"
                  aria-labelledby={`project-tab-${project.n}`}
                  aria-hidden={!isActive}
                  className="h-0 overflow-hidden opacity-0"
                >
                  <div className="grid gap-8 pb-10 pl-0 sm:pl-[4.5rem] lg:grid-cols-2 lg:gap-12">
                    <div className="flex flex-col justify-between">
                      <div>
                        <p className="max-w-xl text-base leading-relaxed text-fog sm:text-lg">
                          {project.desc}
                        </p>
                        {project.highlights && project.highlights.length > 0 && (
                          <ul className="mt-5 space-y-2 max-w-xl">
                            {project.highlights.map((h, hIdx) => (
                              <li key={hIdx} className="flex items-start gap-2.5 text-xs leading-relaxed text-fog/90">
                                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber shadow-[0_0_8px_rgba(255,77,90,0.6)]" />
                                <span>{h}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        <ul className="mt-6 flex flex-wrap gap-2">
                          {project.stack.map((chip) => (
                            <li
                              key={chip}
                              className="rounded-full border border-white/10 bg-card px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-fog"
                            >
                              {chip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {project.videoId && (
                        <div className="mt-7">
                          <button
                            type="button"
                            onClick={() =>
                              setVideo({
                                n: project.n,
                                title: project.title,
                                sub: project.sub,
                                videoId: project.videoId!,
                              })
                            }
                            className="group/btn inline-flex items-center gap-2.5 rounded-full border border-amber/40 bg-amber/10 px-5 py-2.5 font-mono text-[11px] font-bold tracking-[0.16em] text-amber transition-all duration-300 hover:border-amber hover:bg-amber hover:text-ink"
                          >
                            <Play className="size-3.5 fill-current transition-transform duration-300 group-hover/btn:scale-110" />
                            WATCH PROJECT DEMO
                          </button>
                        </div>
                      )}
                    </div>

                    <div
                      className={`group/img relative overflow-hidden rounded-2xl border border-white/8 ${
                        project.videoId ? "cursor-pointer" : ""
                      }`}
                      onClick={() => {
                        if (project.videoId) {
                          setVideo({
                            n: project.n,
                            title: project.title,
                            sub: project.sub,
                            videoId: project.videoId,
                          });
                        }
                      }}
                    >
                      <img
                        src={project.image}
                        alt={project.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-[1.04]"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent transition-opacity duration-300 group-hover/img:via-ink/10" />

                      {project.videoId && (
                        <span
                          className="absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-300 group-hover/img:opacity-100"
                          aria-hidden="true"
                        >
                          <span className="grid size-14 place-items-center rounded-full border border-amber/70 bg-ink/80 text-amber shadow-[0_0_30px_rgba(201,106,0,0.35)] backdrop-blur-md transition-transform duration-300 group-hover/img:scale-110">
                            <Play className="ml-0.5 size-6 fill-amber" />
                          </span>
                        </span>
                      )}

                      <span className="absolute bottom-3 right-4 font-mono text-[9px] tracking-[0.25em] text-fog/90">
                        {project.videoId ? "CLICK TO WATCH // " : "PREVIEW // "}
                        {project.n}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {video && <VideoModal video={video} onClose={() => setVideo(null)} />}
    </section>
  );
}
