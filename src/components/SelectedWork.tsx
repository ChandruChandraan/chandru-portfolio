import { useRef, useState } from "react";
import { Play } from "lucide-react";
import { selectedWork, type WorkItem } from "../data/content";
import { useReveals } from "../lib/anim";
import { useReducedMotion } from "../lib/hooks";
import SectionHeading from "./SectionHeading";
import VideoModal from "./VideoModal";

function WorkCard({
  item,
  onOpen,
}: {
  item: WorkItem;
  onOpen: (item: WorkItem) => void;
}) {
  const feature = item.n === "01";
  return (
    <button
      type="button"
      data-card
      onClick={() => onOpen(item)}
      aria-label={`Play video: ${item.title}${item.sub ? ` — ${item.sub}` : ""}`}
      className={`group relative block w-full overflow-hidden rounded-[20px] border border-white/8 bg-card text-left transition-colors duration-500 hover:border-amber/45 hover:bg-cardhot focus-visible:border-amber/60 ${item.span}`}
    >
      <div
        className={`relative w-full overflow-hidden ${item.aspect} ${
          item.tall ? "lg:aspect-none lg:h-full lg:min-h-[320px]" : ""
        }`}
      >
        <img
          src={item.image}
          alt={`${item.title} — project preview`}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full scale-[1.05] object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.12]"
        />

        {/* scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/30 to-ink/10 transition-opacity duration-500 group-hover:via-ink/15" />
        <div className="absolute inset-0 bg-amber/0 transition-colors duration-500 group-hover:bg-amber/5" />

        {/* top row */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
          <span className="font-mono text-xs text-fog transition-colors duration-300 group-hover:text-amber">
            {item.n}
          </span>
          <span className="rounded-full border border-white/15 bg-ink/50 px-3 py-1 font-mono text-[9px] tracking-[0.25em] text-fog backdrop-blur-sm transition-colors duration-300 group-hover:border-amber/50 group-hover:text-amber">
            WATCH
          </span>
        </div>

        {/* play button */}
        <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span
            className={`grid place-items-center rounded-full border border-white/25 bg-ink/60 backdrop-blur-md transition-all duration-500 group-hover:scale-110 group-hover:border-amber/70 group-hover:bg-ink/80 ${
              feature ? "size-16 sm:size-20" : "size-13 sm:size-15"
            }`}
          >
            <Play
              className={`ml-0.5 fill-amber text-amber transition-transform duration-500 group-hover:scale-110 ${
                feature ? "size-6" : "size-5"
              }`}
            />
          </span>
        </span>

        {/* bottom meta */}
        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <p className="font-mono text-[9px] tracking-[0.28em] text-ash transition-colors duration-300 group-hover:text-amber/80">
            DEO VERSE // PROFESSIONAL
          </p>
          <h3
            className={`mt-1.5 font-bold tracking-[0.03em] text-paper ${
              feature ? "text-xl sm:text-2xl lg:text-3xl" : "text-base sm:text-lg"
            }`}
          >
            {item.title}
          </h3>
          {item.sub && (
            <p className="mt-1 font-mono text-[10px] tracking-[0.22em] text-fog">{item.sub}</p>
          )}
        </div>
      </div>
    </button>
  );
}

/**
 * 04 — SELECTED WORK
 * Asymmetric editorial showreel of professional projects at Deo Verse.
 */
export default function SelectedWork() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  useReveals(ref, reduced);
  const [video, setVideo] = useState<WorkItem | null>(null);

  return (
    <section
      id="work"
      ref={ref}
      aria-label="Selected work"
      className="relative scroll-mt-24 border-t border-white/5"
    >
      <div className="wrap section-pad">
        <div className="mb-14 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <SectionHeading index="04" label="SELECTED WORK" className="mb-9" />
            <h2 className="font-bold leading-[0.95]" data-linegroup>
              <span className="block overflow-hidden pb-1">
                <span data-line className="block text-[clamp(2.2rem,5vw,4.4rem)]">
                  STUDIO
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span data-line className="block text-[clamp(2.2rem,5vw,4.4rem)]">
                  <span className="font-outline">SHOWREEL</span>
                  <span className="ml-4 align-top font-mono text-sm text-amber">[{selectedWork.length.toString().padStart(2, "0")}]</span>
                </span>
              </span>
            </h2>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <p data-reveal className="mb-3 font-mono text-[10.5px] tracking-[0.3em] text-amber">
              PROFESSIONAL WORK AT DEO VERSE
            </p>
            <p data-reveal data-delay="0.08" className="text-sm leading-relaxed text-fog">
              Selected professional work developed during my experience at Deo Verse.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-12" data-parallax-scope>
          {selectedWork.map((item) => (
            <WorkCard key={item.n} item={item} onOpen={setVideo} />
          ))}
        </div>

        <p data-reveal className="mt-8 text-right font-mono text-[9.5px] tracking-[0.3em] text-ash">
          {selectedWork.length.toString().padStart(2, "0")} CLIPS // COMPANY CHANNEL
        </p>
      </div>

      {video && <VideoModal video={video} onClose={() => setVideo(null)} />}
    </section>
  );
}
