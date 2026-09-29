import { useState, useRef } from "react";
import {
  FileText,
  Download,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Cpu,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";
import { personal, experience, education, skills } from "../data/content";
import { useDocumentModal, type DocType } from "../context/DocumentModalContext";
import SectionHeading from "./SectionHeading";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";

export default function ResumePreview() {
  const [activeTab, setActiveTab] = useState<DocType>("resume");
  const [viewMode, setViewMode] = useState<"pdf" | "summary">("pdf");
  const { openDoc } = useDocumentModal();
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);

  const isResume = activeTab === "resume";
  const currentFile = isResume ? personal.resumeHref : personal.cvHref;
  const currentFileName = isResume ? "Chandru_Chandran_Resume.pdf" : "Chandru_Chandran_CV.pdf";
  const currentTitle = isResume ? "1-Page Executive Resume" : "Comprehensive Curriculum Vitae";
  const currentSize = isResume ? "30 KB" : "63 KB";
  const currentPages = isResume ? "1 Page" : "2 Pages";

  return (
    <section
      id="credentials"
      ref={ref}
      aria-label="Resume and CV Preview"
      className="relative scroll-mt-24 border-t border-white/8 bg-coal/60 py-20 sm:py-28"
    >
      {/* Background tech accent glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-amber/5 blur-[140px]"
        aria-hidden="true"
      />

      <div className="wrap relative">
        {/* Section Header */}
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionHeading index="DOCS" label="VERIFIED CREDENTIALS" className="mb-5" />
            <h2 className="font-bold leading-[0.95]" data-linegroup>
              <span className="block overflow-hidden pb-2">
                <span data-line className="block text-[clamp(2.2rem,5vw,4.2rem)]">
                  CREDENTIAL <span className="font-outline">STUDIO</span>
                </span>
              </span>
            </h2>
            <p data-reveal className="mt-4 max-w-xl text-sm leading-relaxed text-fog sm:text-base">
              Explore official verified documents. Preview the high-resolution PDF inline, switch to full-screen view, or toggle the interactive executive summary card.
            </p>
          </div>

          {/* Master Control Bar: Document Selection & View Mode */}
          <div data-reveal className="flex flex-col gap-3 sm:items-end">
            {/* Document Tabs */}
            <div className="flex items-center gap-1.5 rounded-2xl border border-white/10 bg-ink/90 p-1.5 shadow-xl backdrop-blur-md">
              <button
                type="button"
                onClick={() => setActiveTab("resume")}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.12em] transition-all duration-300 ${
                  isResume
                    ? "border border-amber/60 bg-amber/15 text-amber shadow-[0_0_20px_rgba(255,77,90,0.3)]"
                    : "text-fog hover:text-paper"
                }`}
              >
                <FileText className="size-3.5" />
                <span>RESUME</span>
                <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-normal text-fog">
                  30 KB
                </span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("cv")}
                className={`relative flex items-center gap-2 rounded-xl px-4 py-2.5 font-mono text-[11px] font-bold tracking-[0.12em] transition-all duration-300 ${
                  !isResume
                    ? "border border-amber/60 bg-amber/15 text-amber shadow-[0_0_20px_rgba(255,77,90,0.3)]"
                    : "text-fog hover:text-paper"
                }`}
              >
                <FileText className="size-3.5" />
                <span>CV (FULL)</span>
                <span className="rounded-md bg-white/10 px-1.5 py-0.5 text-[9px] font-normal text-fog">
                  63 KB
                </span>
              </button>
            </div>

            {/* View Mode Toggle: Interactive Summary vs PDF Embed */}
            <div className="flex items-center gap-2 self-start font-mono text-[10px] text-ash sm:self-end">
              <span>VIEW MODE:</span>
              <button
                type="button"
                onClick={() => setViewMode("pdf")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  viewMode === "pdf"
                    ? "bg-amber text-ink"
                    : "border border-white/10 bg-white/5 text-fog hover:text-paper"
                }`}
              >
                PDF VIEWER
              </button>
              <button
                type="button"
                onClick={() => setViewMode("summary")}
                className={`rounded-lg px-2.5 py-1 font-semibold transition-colors ${
                  viewMode === "summary"
                    ? "bg-amber text-ink"
                    : "border border-white/10 bg-white/5 text-fog hover:text-paper"
                }`}
              >
                INTERACTIVE SHEET
              </button>
            </div>
          </div>
        </div>

        {/* Main Preview Deck with Cyberpunk / HUD Framing */}
        <div
          data-reveal
          className="relative overflow-hidden rounded-3xl border border-white/15 bg-ink/90 shadow-[0_30px_100px_-20px_rgba(0,0,0,0.95)] backdrop-blur-xl"
        >
          {/* Tech HUD Corner Accents */}
          <div className="pointer-events-none absolute left-0 top-0 size-4 border-l-2 border-t-2 border-amber/70" />
          <div className="pointer-events-none absolute right-0 top-0 size-4 border-r-2 border-t-2 border-amber/70" />
          <div className="pointer-events-none absolute bottom-0 left-0 size-4 border-b-2 border-l-2 border-amber/70" />
          <div className="pointer-events-none absolute bottom-0 right-0 size-4 border-b-2 border-r-2 border-amber/70" />

          {/* Top Control Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-white/[0.02] px-5 py-3.5 sm:px-7">
            {/* Document Telemetry */}
            <div className="flex items-center gap-3">
              <span className="grid size-8 place-items-center rounded-xl border border-amber/40 bg-amber/10 text-amber shadow-[0_0_12px_rgba(255,77,90,0.2)]">
                <FileText className="size-4" />
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wide sm:text-sm text-paper">
                    {currentTitle}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-semibold text-emerald-400">
                    <CheckCircle2 className="size-2.5" /> VERIFIED
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-[10px] text-ash">
                  <span>{currentFileName}</span>
                  <span>•</span>
                  <span>{currentSize}</span>
                  <span>•</span>
                  <span>{currentPages}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Toolbar */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => openDoc(activeTab)}
                title="Open in full-screen modal"
                className="group flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-3.5 py-2 font-mono text-[10.5px] font-semibold text-fog transition-all duration-300 hover:border-amber/50 hover:bg-amber/10 hover:text-amber"
              >
                <Maximize2 className="size-3.5 transition-transform duration-300 group-hover:scale-110" />
                <span className="hidden sm:inline">FULLSCREEN</span>
              </button>

              <a
                href={currentFile}
                target="_blank"
                rel="noopener noreferrer"
                title="Open PDF directly in a new browser tab"
                className="flex items-center gap-1.5 rounded-xl border border-white/12 bg-white/5 px-3 py-2 font-mono text-[10.5px] font-semibold text-fog transition-colors hover:border-white/30 hover:text-paper"
              >
                <ExternalLink className="size-3.5" />
                <span className="hidden sm:inline">NEW TAB</span>
              </a>

              <a
                href={currentFile}
                download={currentFileName}
                title={`Download ${currentFileName}`}
                className="flex items-center gap-1.5 rounded-xl bg-amber px-4 py-2 font-mono text-[11px] font-bold tracking-[0.08em] text-ink shadow-[0_0_20px_rgba(255,77,90,0.35)] transition-all duration-300 hover:bg-flare hover:shadow-[0_0_25px_rgba(255,122,133,0.5)]"
              >
                <Download className="size-3.5" />
                <span>DOWNLOAD</span>
              </a>
            </div>
          </div>

          {/* Body: Conditional Rendering between PDF Frame and Interactive Summary */}
          {viewMode === "pdf" ? (
            <div className="relative">
              {/* PDF Container with native cursor support */}
              <div
                data-native-cursor="true"
                className="pdf-viewer relative h-[600px] sm:h-[760px] w-full bg-[#12141a]"
              >
                <iframe
                  key={activeTab}
                  src={`${currentFile}#view=FitH&toolbar=1&navpanes=0`}
                  title={`${personal.name} - ${currentTitle}`}
                  className="h-full w-full border-0"
                />
              </div>

              {/* Mobile Interaction Cue */}
              <div className="flex items-center justify-between border-t border-white/8 bg-ink px-4 py-2 text-[10px] font-mono text-ash sm:hidden">
                <span>MOBILE PDF EMBED</span>
                <button
                  type="button"
                  onClick={() => openDoc(activeTab)}
                  className="font-semibold text-amber underline"
                >
                  TAP FOR FULLSCREEN
                </button>
              </div>
            </div>
          ) : (
            /* Interactive Digital Credential Sheet */
            <div className="p-6 sm:p-10">
              <div className="grid gap-8 lg:grid-cols-12">
                {/* Left 7 Cols: Profile & Experience */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  {/* Identity Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-2xl font-bold tracking-tight text-paper sm:text-3xl">
                        {personal.name}
                      </h3>
                      <span className="font-mono text-xs font-semibold text-amber">
                        {personal.title}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-mono text-ash">
                      LOCATION: {personal.location} // NATIVE: {personal.nativePlace}
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-fog">
                      {isResume ? personal.summary[0] : personal.summary.join(" ")}
                    </p>
                  </div>

                  {/* Experience Card */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="flex items-center justify-between border-b border-white/8 pb-3">
                      <div className="flex items-center gap-2">
                        <Briefcase className="size-4 text-amber" />
                        <span className="text-sm font-bold tracking-wider text-paper">
                          {experience.company}
                        </span>
                      </div>
                      <span className="font-mono text-[10px] text-amber">{experience.period}</span>
                    </div>
                    <p className="mt-1 font-mono text-xs text-ash">{experience.role} // CHENNAI, INDIA</p>
                    <ul className="mt-4 space-y-2.5 text-xs text-fog">
                      {experience.items.slice(0, isResume ? 5 : 8).map((item) => (
                        <li key={item.id} className="flex items-start gap-2.5">
                          <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber/80" />
                          <div>
                            <span className="font-semibold text-paper">{item.title}: </span>
                            <span className="text-fog/90">{item.desc}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right 5 Cols: Tech Stack & Education */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  {/* Core Tech Stack */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                      <Cpu className="size-4 text-amber" />
                      <span className="text-sm font-bold tracking-wider text-paper">
                        CORE SPECIALIZATION
                      </span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {personal.primaryFocus.map((focus) => (
                        <span
                          key={focus}
                          className="rounded-lg border border-amber/40 bg-amber/10 px-2.5 py-1 font-mono text-[10px] font-bold text-amber"
                        >
                          {focus}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 space-y-3 font-mono text-xs">
                      <div>
                        <span className="text-[10px] text-ash tracking-wider">CORE:</span>
                        <p className="mt-0.5 text-fog">{skills.core.join(" • ")}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-ash tracking-wider">SUPPORTING:</span>
                        <p className="mt-0.5 text-fog">{skills.supporting.join(" • ")}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-ash tracking-wider">ADDITIONAL / TOOLS:</span>
                        <p className="mt-0.5 text-fog">{skills.additional.join(" • ")}</p>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                      <GraduationCap className="size-4 text-amber" />
                      <span className="text-sm font-bold tracking-wider text-paper">
                        ACADEMIC RECORD
                      </span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {education.map((edu) => (
                        <div key={edu.year} className="border-l-2 border-amber/40 pl-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-paper">{edu.title}</span>
                            <span className="font-mono text-[10px] text-ash">{edu.year}</span>
                          </div>
                          <p className="text-[11px] text-fog">{edu.institution}</p>
                          <p className="text-[10px] font-mono text-ash">{edu.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct Switch to PDF */}
                  <div className="rounded-2xl border border-amber/30 bg-amber/[0.06] p-5 text-center">
                    <span className="block font-mono text-[11px] font-bold text-amber">
                      PREFER THE ORIGINAL PDF?
                    </span>
                    <button
                      type="button"
                      onClick={() => setViewMode("pdf")}
                      className="mt-3 inline-flex items-center gap-2 rounded-xl bg-amber px-5 py-2.5 font-mono text-xs font-bold text-ink shadow-[0_0_15px_rgba(255,77,90,0.3)] hover:bg-flare"
                    >
                      <FileText className="size-3.5" />
                      SWITCH TO PDF VIEWER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Bottom HUD Footnote */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 bg-white/[0.02] px-5 py-3.5 sm:px-7">
            <div className="flex items-center gap-2 font-mono text-[10px] text-ash">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              <span>AUTHENTIC DOCUMENT // OFFICIAL REPO</span>
            </div>

            <div className="flex items-center gap-4 font-mono text-[11px]">
              <span className="text-ash">NEED OTHER DOCUMENT?</span>
              <button
                type="button"
                onClick={() => setActiveTab(isResume ? "cv" : "resume")}
                className="font-bold text-amber hover:underline inline-flex items-center gap-1"
              >
                <span>SWITCH TO {isResume ? "FULL CV" : "1-PAGE RESUME"}</span>
                <ArrowUpRight className="size-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
