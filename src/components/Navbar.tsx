import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight, Phone, Mail } from "lucide-react";
import { nav, personal } from "../data/content";
import { gsap } from "../lib/gsap";
import Magnetic from "./Magnetic";
import { GithubIcon } from "./icons";

export default function Navbar() {
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

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
          className="pointer-events-auto flex w-full max-w-[1420px] items-center justify-between gap-3 rounded-2xl border border-fog/20 bg-ink/90 py-2 pl-3 pr-2 shadow-[0_22px_60px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl"
        >
          {/* left — identity */}
          <a
            href="#home"
            className="group flex items-center gap-2.5"
            aria-label="Chandru Chandran — back to top"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-md border border-amber/40 bg-amber/10">
              <span className="size-1.5 rounded-full bg-amber transition-transform duration-300 group-hover:scale-150" />
            </span>
            <span className="whitespace-nowrap text-[12.5px] font-semibold tracking-[0.14em]">
              CHANDRU <span className="text-fog">CHANDRAN</span>
            </span>
          </a>

          {/* center — sections */}
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
          <div className="flex items-center gap-2">
            <Magnetic className="hidden sm:block" strength={0.22}>
              <a
                href="#contact"
                className="group flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2.5 text-[11px] font-bold tracking-[0.14em] text-ink transition-colors duration-300 hover:bg-flare"
              >
                LET'S TALK
                <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              className="grid size-10 place-items-center rounded-xl border border-white/10 text-paper transition-colors hover:border-amber/50 hover:text-amber lg:hidden"
            >
              {open ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile overlay menu */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[75] flex flex-col bg-ink/95 backdrop-blur-2xl transition-[opacity,visibility] duration-500 lg:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="mt-24 flex flex-1 flex-col justify-center px-8 pb-8">
          <nav aria-label="Mobile" className="flex flex-col">
            {nav.map((item, i) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                className={`group flex items-baseline gap-4 border-b border-white/8 py-3.5 transition-all duration-500 ${
                  open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                }`}
              >
                <span className="font-mono text-[10px] text-amber/70">
                  0{i === nav.length - 1 ? 9 : Math.min(i, 8)}
                </span>
                <span
                  className={`text-2xl font-bold tracking-wide ${
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

          <div
            style={{ transitionDelay: open ? "520ms" : "0ms" }}
            className={`mt-8 flex flex-wrap gap-3 transition-all duration-500 ${
              open ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
            <a
              href={personal.phoneHref}
              className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 font-mono text-[11px] text-fog"
            >
              <Phone className="size-3.5 text-amber" /> {personal.phone}
            </a>
            <a
              href={personal.emailHref}
              className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 font-mono text-[11px] text-fog"
            >
              <Mail className="size-3.5 text-amber" /> EMAIL
            </a>
            <a
              href={personal.githubHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 font-mono text-[11px] text-fog"
            >
              <GithubIcon className="size-3.5 text-amber" /> GITHUB
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
