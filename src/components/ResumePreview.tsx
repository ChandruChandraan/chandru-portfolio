import { useState, useRef } from "react";
import { FileText, Download, ExternalLink, Maximize2, CheckCircle2, Eye } from "lucide-react";
import { personal } from "../data/content";
import { useDocumentModal, type DocType } from "../context/DocumentModalContext";
import SectionHeading from "./SectionHeading";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";

export default function ResumePreview() {
  const [activeTab, setActiveTab] = useState<DocType>("resume");
  const { openDoc } = useDocumentModal();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  const isResume = activeTab === "resume";
  const currentFile = isResume ? personal.resumeHref : personal.cvHref;
  const currentFileName = isResume ? "Chandru_Chandran_Resume.pdf" : "Chandru_Chandran_CV.pdf";
  const currentTitle = isResume ? "Resume (Professional Summary)" : "Curriculum Vitae (Comprehensive CV)";
  const currentSize = isResume ? "30 KB" : "63 KB";
  const currentPages = isResume ? "1 Page" : "2 Pages";

  return (
    <section
      id="credentials"
      ref={ref}
      aria-label="Resume and CV Preview"
      className="relative scroll-mt-24 border-t border-white/5 bg-ink/60 py-20 sm:py-28"
    >
      <div className="wrap">
        {/* Section Header */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionHeading index="DOCS" label="VERIFIED CREDENTIALS" className="mb-6" />
            <h2 className="font-bold leading-[0.95]" data-linegroup>
              <span className="block overflow-hidden pb-2">
                <span data-line className="block text-[clamp(2.2rem,5vw,4.2rem)]">
                  INLINE <span className="font-outline">PREVIEW</span>
                </span>
              </span>
            </h2>
            <p data-reveal className="mt-4 max-w-xl text-sm text-fog sm:text-base">
              Preview verified official documents directly in your browser or switch to full-screen view. Both 1-page Resume and comprehensive CV are available.
            </p>
          </div>

          {/* Document Switcher Tabs */}
          <div data-reveal className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab("resume")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] transition-all duration-300 ${
                isResume
                  ? "border border-amber/50 bg-amber/15 text-amber shadow-[0_0_24px_rgba(255,77,90,0.3)]"
                  : "border border-white/10 bg-white/5 text-fog hover:border-white/20 hover:text-paper"
              }`}
            >
              <FileText className="size-4" />
              <span>RESUME</span>
              <span className="text-[10px] text-ash">(30 KB)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("cv")}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.14em] transition-all duration-300 ${
                !isResume
                  ? "border border-amber/50 bg-amber/15 text-amber shadow-[0_0_24px_rgba(255,77,90,0.3)]"
                  : "border border-white/10 bg-white/5 text-fog hover:border-white/20 hover:text-paper"
              }`}
            >
              <FileText className="size-4" />
              <span>CURRICULUM VITAE</span>
              <span className="text-[10px] text-ash">(63 KB)</span>
            </button>
          </div>
        </div>

        {/* Embedded Viewer Container */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-2xl border border-white/12 bg-coal shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)]"
        >
          {/* Viewer Top Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 bg-card px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <span className="grid size-7 place-items-center rounded-lg border border-amber/40 bg-amber/10">
                <FileText className="size-3.5 text-amber" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider sm:text-sm">{currentTitle}</span>
                  <span className="inline-flex items-center gap-1 rounded bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-medium text-emerald-400">
                    <CheckCircle2 className="size-2.5" /> VERIFIED
                  </span>
                </div>
                <div className="font-mono text-[10px] text-ash">
                  {currentFileName} // {currentSize} // {currentPages}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => openDoc(activeTab)}
                title="Open in fullscreen modal preview"
                className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2 font-mono text-[10.5px] text-fog transition-all duration-300 hover:border-amber/50 hover:bg-amber/10 hover:text-amber"
              >
                <Maximize2 className="size-3.5" />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </button>

              <a
                href={currentFile}
                target="_blank"
                rel="noopener noreferrer"
                title="Open PDF in a new browser tab"
                className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-3 py-2 font-mono text-[10.5px] text-fog transition-colors hover:border-white/30 hover:text-paper"
              >
                <ExternalLink className="size-3.5" />
                <span className="hidden sm:inline">NEW TAB</span>
              </a>

              <a
                href={currentFile}
                download={currentFileName}
                title={`Download ${currentFileName}`}
                className="flex items-center gap-1.5 rounded-xl bg-amber px-3.5 py-2 font-mono text-[10.5px] font-bold tracking-[0.08em] text-ink transition-colors hover:bg-flare"
              >
                <Download className="size-3.5" />
                <span>DOWNLOAD</span>
              </a>
            </div>
          </div>

          {/* Embedded Document Frame */}
          <div className="relative h-[560px] sm:h-[720px] w-full bg-[#1e2026]">
            <iframe
              key={activeTab}
              src={`${currentFile}#view=FitH&toolbar=1&navpanes=0`}
              title={`${personal.name} - ${currentTitle}`}
              className="h-full w-full border-0"
            />
          </div>

          {/* Bottom Viewer Action Footnote */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/8 bg-card px-4 py-3 sm:px-6">
            <span className="font-mono text-[10px] tracking-[0.2em] text-ash">
              CHANDRU CHANDRAN // GAME & VR DEVELOPER // CHENNAI, INDIA
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openDoc(activeTab)}
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-amber hover:underline"
              >
                <Eye className="size-3.5" />
                EXPAND MODAL PREVIEW
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
