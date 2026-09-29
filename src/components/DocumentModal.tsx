import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X, Download, ExternalLink, FileText, ArrowLeftRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { useDocumentModal, type DocType } from "../context/DocumentModalContext";
import { personal } from "../data/content";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/hooks";

const DOCS: Record<
  DocType,
  {
    title: string;
    sub: string;
    fileName: string;
    url: string;
    size: string;
    pages: string;
  }
> = {
  resume: {
    title: "RESUME",
    sub: "1-PAGE PROFESSIONAL SUMMARY",
    fileName: "Chandru_Chandran_Resume.pdf",
    url: personal.resumeHref,
    size: "30 KB",
    pages: "1 PAGE",
  },
  cv: {
    title: "CURRICULUM VITAE",
    sub: "FULL ACADEMIC & TECHNICAL CV",
    fileName: "Chandru_Chandran_CV.pdf",
    url: personal.cvHref,
    size: "63 KB",
    pages: "2 PAGES",
  },
};

export default function DocumentModal() {
  const { isOpen, activeDoc, setActiveDoc, closeDoc } = useDocumentModal();
  const reduced = useReducedMotion();
  const backdropRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const closing = useRef(false);
  const previousFocus = useRef<Element | null>(null);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const doc = DOCS[activeDoc];

  useEffect(() => {
    setIframeLoaded(false);
  }, [activeDoc]);

  useEffect(() => {
    if (!isOpen) return;

    closing.current = false;
    previousFocus.current = document.activeElement;

    gsap.fromTo(
      backdropRef.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: reduced ? 0.15 : 0.3, ease: "power2.out" }
    );
    gsap.fromTo(
      panelRef.current,
      { autoAlpha: 0, y: reduced ? 0 : 35, scale: reduced ? 1 : 0.97 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: reduced ? 0.2 : 0.45,
        ease: "power4.out",
        delay: reduced ? 0 : 0.05,
      }
    );

    closeRef.current?.focus();
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") requestClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      (previousFocus.current as HTMLElement | null)?.focus?.();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const requestClose = () => {
    if (closing.current) return;
    closing.current = true;
    gsap.to([panelRef.current, backdropRef.current], {
      autoAlpha: 0,
      y: reduced ? 0 : 20,
      duration: reduced ? 0.15 : 0.25,
      ease: "power2.in",
      onComplete: () => {
        closeDoc();
        closing.current = false;
      },
    });
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-5 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={`${doc.title} — Document Preview Studio`}
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-ink/90 backdrop-blur-2xl"
        onClick={requestClose}
      />

      {/* Main Modal Panel with Cyberpunk / HUD Framing */}
      <div
        ref={panelRef}
        className="relative flex h-[92vh] sm:h-[88vh] w-full max-w-[1200px] flex-col overflow-hidden rounded-3xl border border-white/15 bg-ink/95 shadow-[0_40px_140px_-20px_rgba(0,0,0,0.98)] backdrop-blur-2xl"
      >
        {/* Tech Corner Accents */}
        <div className="pointer-events-none absolute left-0 top-0 z-20 size-4 border-l-2 border-t-2 border-amber/70" />
        <div className="pointer-events-none absolute right-0 top-0 z-20 size-4 border-r-2 border-t-2 border-amber/70" />
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 size-4 border-b-2 border-l-2 border-amber/70" />
        <div className="pointer-events-none absolute bottom-0 right-0 z-20 size-4 border-b-2 border-r-2 border-amber/70" />

        {/* Top Header / Switcher Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-4 py-3 sm:px-6">
          {/* Document Tabs */}
          <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-coal/80 p-1.5 shadow-lg">
            <button
              type="button"
              onClick={() => setActiveDoc("resume")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-[11px] font-bold tracking-[0.12em] transition-all duration-300 ${
                activeDoc === "resume"
                  ? "border border-amber/60 bg-amber/15 text-amber shadow-[0_0_20px_rgba(255,77,90,0.3)]"
                  : "text-fog hover:text-paper"
              }`}
            >
              <FileText className="size-3.5" />
              <span>RESUME</span>
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-normal text-fog sm:inline">
                {DOCS.resume.size}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setActiveDoc("cv")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-[11px] font-bold tracking-[0.12em] transition-all duration-300 ${
                activeDoc === "cv"
                  ? "border border-amber/60 bg-amber/15 text-amber shadow-[0_0_20px_rgba(255,77,90,0.3)]"
                  : "text-fog hover:text-paper"
              }`}
            >
              <FileText className="size-3.5" />
              <span>CV (FULL)</span>
              <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-normal text-fog sm:inline">
                {DOCS.cv.size}
              </span>
            </button>
          </div>

          {/* Quick Actions Toolbar */}
          <div className="flex items-center gap-2 ml-auto">
            <a
              href={doc.url}
              target="_blank"
              rel="noopener noreferrer"
              title="Open PDF in new tab"
              className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2 font-mono text-[10.5px] font-semibold text-fog transition-colors hover:border-white/30 hover:text-paper"
            >
              <ExternalLink className="size-3.5 text-ash" />
              <span className="hidden sm:inline">OPEN NEW TAB</span>
            </a>

            <a
              href={doc.url}
              download={doc.fileName}
              title={`Download ${doc.fileName}`}
              className="flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2 font-mono text-[10.5px] font-bold tracking-[0.08em] text-ink shadow-[0_0_20px_rgba(255,77,90,0.35)] transition-all duration-300 hover:bg-flare hover:shadow-[0_0_25px_rgba(255,122,133,0.5)]"
            >
              <Download className="size-3.5" />
              <span>DOWNLOAD</span>
            </a>

            <button
              ref={closeRef}
              type="button"
              onClick={requestClose}
              aria-label="Close document preview"
              title="Close preview (Escape)"
              className="grid size-9 shrink-0 place-items-center rounded-xl border border-white/12 text-fog transition-colors hover:border-amber/60 hover:text-amber"
            >
              <X className="size-4.5" />
            </button>
          </div>
        </div>

        {/* Info & Status sub-bar */}
        <div className="flex items-center justify-between border-b border-white/6 bg-white/[0.01] px-4 py-2 text-[10px] font-mono text-ash sm:px-6">
          <div className="flex items-center gap-2.5 truncate">
            <span className="text-amber font-semibold">{doc.title}</span>
            <span>//</span>
            <span className="truncate">{doc.fileName}</span>
            <span className="hidden sm:inline">//</span>
            <span className="hidden sm:inline">{doc.sub}</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <CheckCircle2 className="size-3 text-emerald-400" />
            <span className="hidden sm:inline text-fog">VERIFIED PDF</span>
            <span>{doc.pages}</span>
          </div>
        </div>

        {/* Embedded PDF Viewer with native cursor support inside viewer */}
        <div
          data-native-cursor="true"
          className="pdf-viewer relative flex-1 w-full bg-[#12141a]"
        >
          {!iframeLoaded && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-coal text-fog">
              <div className="size-6 animate-spin rounded-full border-2 border-amber/30 border-t-amber" />
              <span className="font-mono text-xs text-ash tracking-wider">
                LOADING {doc.title} BUFFER...
              </span>
            </div>
          )}

          <iframe
            key={activeDoc}
            src={`${doc.url}#view=FitH&toolbar=1&navpanes=0`}
            title={`${personal.name} - ${doc.title}`}
            onLoad={() => setIframeLoaded(true)}
            className="h-full w-full border-0"
          />
        </div>

        {/* Bottom HUD Bar with Quick Switch */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2 text-[10.5px] font-mono text-ash">
            <ShieldCheck className="size-3.5 text-emerald-400" />
            <span className="hidden sm:inline">CHANDRU CHANDRAN //</span>
            <span>SWITCH TO:</span>
            <button
              type="button"
              onClick={() => setActiveDoc(activeDoc === "resume" ? "cv" : "resume")}
              className="inline-flex items-center gap-1 font-bold text-amber hover:underline"
            >
              <ArrowLeftRight className="size-3" />
              {activeDoc === "resume" ? "CV (CURRICULUM VITAE)" : "1-PAGE RESUME"}
            </button>
          </div>

          <div className="flex items-center gap-3 text-[10px] font-mono text-ash ml-auto">
            <span className="hidden md:inline">PRESS ESC TO CLOSE</span>
            <a
              href={doc.url}
              download={doc.fileName}
              className="text-amber underline hover:text-flare"
            >
              DIRECT DOWNLOAD ({doc.size})
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
