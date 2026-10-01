import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Play, Pause, VolumeX } from "lucide-react";
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

/** Cinematic lazy-loaded video viewer with clean viewport and zero platform watermarks. */
export default function VideoModal({ video, onClose }: Props) {
  const reduced = useReducedMotion();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const closing = useRef(false);
  const previousFocus = useRef<Element | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [showIndicator, setShowIndicator] = useState(false);
  const indicatorTimer = useRef<number | null>(null);

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
      if (e.key === "Escape") {
        requestClose();
      } else if (e.code === "Space" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        togglePlay();
      } else if (e.key === "Tab" && panelRef.current) {
        /* light focus trap */
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          "button, [href], [tabindex]:not([tabindex='-1'])"
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
      if (indicatorTimer.current) window.clearTimeout(indicatorTimer.current);
      (previousFocus.current as HTMLElement | null)?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  const togglePlay = () => {
    if (!iframeRef.current?.contentWindow) return;
    const next = !isPlaying;
    setIsPlaying(next);

    // Send play/pause and keep muted
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: next ? "playVideo" : "pauseVideo",
        args: "",
      }),
      "*"
    );
    iframeRef.current.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: "mute",
        args: "",
      }),
      "*"
    );

    setShowIndicator(true);
    if (indicatorTimer.current) window.clearTimeout(indicatorTimer.current);
    indicatorTimer.current = window.setTimeout(() => setShowIndicator(false), 900);
  };

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

  const originParam =
    typeof window !== "undefined" && window.location.origin
      ? `&origin=${encodeURIComponent(window.location.origin)}`
      : "";

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
        {/* Header */}
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

        {/* Clean Viewport with Overscan Crop & Click Shield */}
        <div className="relative aspect-video w-full overflow-hidden bg-black select-none">
          <iframe
            ref={iframeRef}
            src={`https://www.youtube-nocookie.com/embed/${video.videoId}?autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&disablekb=1&fs=0&iv_load_policy=3&playsinline=1&enablejsapi=1&cc_load_policy=0${originParam}`}
            title={`${video.title} — video preview`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            tabIndex={-1}
            className="pointer-events-none absolute inset-0 h-full w-full scale-[1.32] origin-center border-0 select-none"
          />

          {/* Interactive Click Shield: intercepts all hover & clicks to prevent YouTube overlays */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            className="group/player absolute inset-0 z-10 flex items-center justify-center cursor-pointer bg-transparent focus:outline-none"
          >
            <div
              className={`grid size-16 place-items-center rounded-full border border-amber/60 bg-ink/85 text-amber shadow-[0_0_35px_rgba(255,77,90,0.5)] backdrop-blur-md transition-all duration-300 ${
                !isPlaying || showIndicator
                  ? "scale-100 opacity-100"
                  : "scale-75 opacity-0 group-hover/player:opacity-40 group-hover/player:scale-90"
              }`}
            >
              {isPlaying ? (
                <Pause className="size-6 fill-amber text-amber" />
              ) : (
                <Play className="ml-1 size-6 fill-amber text-amber" />
              )}
            </div>
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 sm:px-7 border-t border-white/6">
          <span className="font-mono text-[9.5px] tracking-[0.25em] text-ash">
            PROFESSIONAL WORK // DEO VERSE
          </span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 font-mono text-[9.5px] tracking-[0.2em] text-amber">
              <VolumeX className="size-3" />
              MUTED
            </span>
            <span className="hidden font-mono text-[9.5px] tracking-[0.2em] text-fog/70 sm:inline">
              CLICK VIDEO TO {isPlaying ? "PAUSE" : "PLAY"}
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
