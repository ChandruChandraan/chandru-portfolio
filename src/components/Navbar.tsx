import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail, FileText, Eye, Download } from "lucide-react";
import { nav, personal } from "../data/content";
import { gsap } from "../lib/gsap";
import Magnetic from "./Magnetic";
import { GithubIcon, LinkedinIcon } from "./icons";
import { useDocumentModal } from "../context/DocumentModalContext";

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const { openDoc } = useDocumentModal();

  /* entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { yPercent: -150, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.9, delay: 1.15, ease: "power4.out" }
      );
    });
    return () => ctx.revert();
  }, []);

  /* scroll spy — retries while lazy sections mount */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-38% 0px -56% 0px" }
    );

    const observed = new Set<string>();
    let timer: number;
    let tries = 0;
    const attach = () => {
      nav.forEach(({ id }) => {
        if (observed.has(id)) return;
        const el = document.getElementById(id);
        if (el) {
          io.observe(el);
          observed.add(id);
        }
      });
      tries += 1;
      if (observed.size < nav.length && tries < 40) {
        timer = window.setTimeout(attach, 350);
      }
    };
    timer = window.setTimeout(attach, 120);

    return () => {
      window.clearTimeout(timer);
      io.disconnect();
    };
  }, []);

  /* mobile menu lifecycle */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-3 z-[80] flex justify-center px-3 sm:top-4 sm:px-5">
        <div
          ref={barRef}
          className="pointer-events-auto flex w-full max-w-[1420px] items-center justify-between gap-2 rounded-2xl border border-fog/20 bg-ink/90 py-2 pl-3 pr-2.5 shadow-[0_22px_60px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl sm:gap-3 sm:pr-3"
        >
          {/* left — identity */}
          <a
            href="#home"
            className="group flex shrink-0 items-center gap-2 sm:gap-2.5"
            aria-label="Chandru Chandran — back to top"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-md border border-amber/40 bg-amber/10">
              <span className="size-1.5 rounded-full bg-amber transition-transform duration-300 group-hover:scale-150" />
            </span>
            <span className="whitespace-nowrap text-[12px] font-semibold tracking-[0.12em] sm:text-[12.5px] sm:tracking-[0.14em]">
              CHANDRU <span className="text-fog hidden min-[360px]:inline">CHANDRAN</span>
            </span>
          </a>

          {/* center — sections (desktop only) */}
          <nav className="hidden items-center lg:flex" aria-label="Primary">
            {nav.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-2 py-2.5 font-mono text-[10.5px] tracking-[0.14em] transition-colors duration-300 xl:px-3 ${
                    isActive ? "text-amber" : "text-fog hover:text-paper"
                  }`}
                >
                  <span className="hidden xl:inline">{item.label}</span>
                  <span className="xl:hidden">{item.short}</span>
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-[1px] left-1/2 size-1 -translate-x-1/2 rounded-full bg-amber transition-all duration-300 ${
                      isActive ? "opacity-100 scale-100" : "opacity-0 scale-0"
                    }`}
                  />
                </a>
              );
            })}
          </nav>

          {/* right — CTA + menu */}
          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
            {/* Desktop & Tablet Resume button (inline preview modal) */}
            <Magnetic className="hidden md:inline-flex" strength={0.22}>
              <button
                type="button"
                onClick={() => openDoc("resume")}
                title="Preview Resume"
                className="group flex items-center gap-1.5 rounded-xl border border-amber/40 bg-amber/10 px-3.5 py-2 text-[11px] font-bold tracking-[0.14em] text-amber transition-all duration-300 hover:border-amber hover:bg-amber hover:text-ink"
              >
                <FileText className="size-3.5" />
                RESUME
              </button>
            </Magnetic>

            {/* Desktop & Tablet CV button (inline preview modal) */}
            <Magnetic className="hidden md:inline-flex" strength={0.22}>
              <button
                type="button"
                onClick={() => openDoc("cv")}
                title="Preview Curriculum Vitae"
                className="group flex items-center gap-1.5 rounded-xl border border-white/12 px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] text-fog transition-colors duration-300 hover:border-white/30 hover:text-paper"
              >
                CV
              </button>
            </Magnetic>

            {/* Mobile quick inline preview button (hidden on md+ where full buttons show) */}
            <button
              type="button"
              onClick={() => openDoc("resume")}
              title="Preview Resume & CV inline"
              className="flex items-center gap-1.5 rounded-xl border border-amber/40 bg-amber/10 px-2.5 py-1.5 text-[10.5px] font-bold tracking-[0.12em] text-amber transition-all duration-300 hover:border-amber hover:bg-amber hover:text-ink md:hidden"
            >
              <FileText className="size-3.5" />
              <span>RESUME</span>
            </button>

            {/* Desktop-only Contact CTA */}
            <Magnetic className="hidden lg:inline-flex" strength={0.22}>
              <a
                href="#contact"
                className="group flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2 text-[11px] font-bold tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-flare"
              >
                LET'S TALK
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>

            {/* Mobile & Tablet Drawer Trigger */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/10 text-paper transition-colors hover:border-amber/50 hover:text-amber sm:size-10 lg:hidden"
            >
              {open ? <X className="size-4 sm:size-4.5" /> : <Menu className="size-4 sm:size-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[75] flex flex-col overflow-y-auto bg-ink/95 backdrop-blur-2xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mt-20 flex flex-1 flex-col justify-between px-6 pb-8 pt-4 sm:px-8">
          {/* Navigation links */}
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${60 + i * 35}ms` : "0ms" }}
                className={`group flex items-baseline gap-4 border-b border-white/8 py-3 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="font-mono text-[10px] text-amber/70">
                  0{i === nav.length - 1 ? 9 : Math.min(i, 8)}
                </span>
                <span
                  className={`text-xl font-bold tracking-wide sm:text-2xl ${
                    active === item.id ? "text-amber" : "text-paper group-hover:text-amber"
                  }`}
                >
                  {item.label}
                </span>
                {active === item.id && (
                  <span className="ml-auto size-1.5 rounded-full bg-amber" aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>

          {/* Document Preview & Download Cards */}
          <div
            style={{ transitionDelay: open ? "400ms" : "0ms" }}
            className={`mt-6 flex flex-col gap-3 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between border-b border-white/8 pb-2">
              <span className="font-mono text-[9.5px] tracking-[0.22em] text-ash">
                VERIFIED CREDENTIALS
              </span>
              <span className="font-mono text-[9px] text-amber">OFFICIAL PDFS</span>
            </div>

            {/* Resume Card */}
            <div className="flex flex-col gap-2 rounded-xl border border-amber/40 bg-amber/10 p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] font-bold text-amber">
                  <FileText className="size-4" /> RESUME (1-PAGE)
                </span>
                <span className="font-mono text-[9px] text-ash">30 KB</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openDoc("resume");
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-amber py-2 text-[11px] font-bold text-ink transition-colors hover:bg-flare"
                >
                  <Eye className="size-3.5" /> PREVIEW INLINE
                </button>
                <a
                  href={personal.resumeHref}
                  download="Chandru_Chandran_Resume.pdf"
                  title="Download Resume"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-amber/40 px-3.5 py-2 font-mono text-[10.5px] text-amber hover:bg-amber/20"
                >
                  <Download className="size-3.5" />
                </a>
              </div>
            </div>

            {/* CV Card */}
            <div className="flex flex-col gap-2 rounded-xl border border-white/12 bg-white/5 p-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono text-[11px] font-bold text-paper">
                  <FileText className="size-4 text-fog" /> CURRICULUM VITAE (CV)
                </span>
                <span className="font-mono text-[9px] text-ash">63 KB</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openDoc("cv");
                  }}
                  className="flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-white/20 bg-white/10 py-2 text-[11px] font-bold text-paper transition-colors hover:bg-white/20"
                >
                  <Eye className="size-3.5 text-amber" /> PREVIEW INLINE
                </button>
                <a
                  href={personal.cvHref}
                  download="Chandru_Chandran_CV.pdf"
                  title="Download CV"
                  className="flex items-center justify-center gap-1.5 rounded-lg border border-white/15 px-3.5 py-2 font-mono text-[10.5px] text-fog hover:text-paper"
                >
                  <Download className="size-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Social / Contact Links */}
          <div
            style={{ transitionDelay: open ? "520ms" : "0ms" }}
            className={`mt-6 flex flex-wrap gap-2 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href={personal.phoneHref}
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2 font-mono text-[10.5px] text-fog"
            >
              <Phone className="size-3 text-amber" /> {personal.phone}
            </a>
            <a
              href={personal.emailHref}
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2 font-mono text-[10.5px] text-fog"
            >
              <Mail className="size-3 text-amber" /> EMAIL
            </a>
            <a
              href={personal.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2 font-mono text-[10.5px] text-fog"
            >
              <LinkedinIcon className="size-3 text-amber" /> LINKEDIN
            </a>
            <a
              href={personal.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/12 px-3.5 py-2 font-mono text-[10.5px] text-fog"
            >
              <GithubIcon className="size-3 text-amber" /> GITHUB
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
