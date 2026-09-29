import { ArrowUp, MapPin } from "lucide-react";
import { personal } from "../data/content";
import { GithubIcon, LinkedinIcon } from "./icons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/8">
      <div className="wrap flex flex-col items-start justify-between gap-8 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-bold tracking-[0.14em]">
            CHANDRU <span className="text-fog">CHANDRAN</span>
          </p>
          <p className="mt-1.5 font-mono text-[9.5px] tracking-[0.22em] text-ash">
            {personal.title.toUpperCase()}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-2 font-mono text-[9.5px] tracking-[0.22em] text-ash sm:flex">
            <MapPin className="size-3.5 text-amber/70" />
            {personal.location.toUpperCase()}
          </span>
          <a
            href={personal.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="grid size-10 place-items-center rounded-full border border-white/12 text-fog transition-colors duration-300 hover:border-amber/60 hover:text-amber"
          >
            <LinkedinIcon className="size-4" />
          </a>
          <a
            href={personal.githubHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="grid size-10 place-items-center rounded-full border border-white/12 text-fog transition-colors duration-300 hover:border-amber/60 hover:text-amber"
          >
            <GithubIcon className="size-4" />
          </a>
          <a
            href="#home"
            aria-label="Back to top"
            className="grid size-10 place-items-center rounded-full border border-white/12 text-fog transition-colors duration-300 hover:border-amber/60 hover:text-amber"
          >
            <ArrowUp className="size-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/6">
        <div className="wrap flex flex-wrap items-center justify-between gap-3 py-5">
          <span className="font-mono text-[9px] tracking-[0.25em] text-ash">
            © {new Date().getFullYear()} CHANDRU CHANDRAN
          </span>
          <span className="font-mono text-[9px] tracking-[0.25em] text-ash">
            PORTFOLIO <span className="text-amber/60">//</span> REALTIME_3D
          </span>
        </div>
      </div>
    </footer>
  );
}
