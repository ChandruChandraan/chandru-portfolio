import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/hooks";

type VideoTarget = {
  n?: string;
  title: string;
  sub?: string;
  videoId: string;
};

type Props = {
  video: VideoTarget;
  onClose: () => void;
};

/** Cinematic lazy-loaded YouTube viewer. Portaled to <body>. */
export default function VideoModal({ video, onClose }: Props) {
  const reduced = useReducedMotion();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const previousFocus = useRef<Element | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement;

    gsap.fromTo(
      backdropRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: reduced ? 0.15 : 0.35, ease: "power2.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: reduced ? 0 : 42, scale: reduced ? 1 : 0.965 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduced ? 0.2 : 0.55,
        ease: "power4.out",
        delay: reduced ? 0 : 0.06,
      }
    );

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
      if (e.key === "Tab" && panelRef.current) {
        /* light focus trap */
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "button, [href], iframe, [tabindex]:not([tabindex='-1'])"
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      (previousFocus.current as HTMLElement | null)?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    gsap.to([panelRef.current, backdropRef.current], {
      autoAlpha: 0,
      y: reduced ? 0 : 24,
      duration: reduced ? 0.15 : 0.3,
      ease: "power2.in",
      onComplete: onClose,
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${video.title} — video player`}
    >
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-ink/90 backdrop-blur-md"
        onClick={requestClose}
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-[1060px] overflow-hidden rounded-2xl border border-white/12 bg-coal shadow-[0_60px_140px_-30px_rgba(0,0,0,0.95)]"
      >
        <div className="flex items-center justify-between gap-4 border-b border-white/8 px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-baseline gap-4">
            <span className="font-mono text-xs text-amber">{video.n}</span>
            <h3 className="truncate text-sm font-bold tracking-[0.08em] sm:text-base">
              {video.title}
              {video.sub && (
                <span className="ml-3 hidden font-mono text-[10px] font-normal tracking-[0.2em] text-ash sm:inline">
                  {video.sub}
                </span>
              )}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={requestClose}
            aria-label="Close video player"
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/12 text-fog transition-colors hover:border-amber/60 hover:text-amber"
          >
            <X className="size-4.5" />
          </button>
        </div>

        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&mute=1&rel=0&modestbranding=1`}
            title={`${video.title} — YouTube video`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-7">
          <span className="font-mono text-[9.5px] tracking-[0.25em] text-ash">
            PROFESSIONAL WORK // DEO VERSE
          </span>
          <span className="font-mono text-[9.5px] tracking-[0.25em] text-ash">
            SRC // YOUTUBE
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
