import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReducedMotion } from "../lib/hooks";

/** Thin runtime progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    const tween = gsap.fromTo(
      bar,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: reduced ? false : 0.3 },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced]);

  return (
    <div className="fixed inset-x-0 top-0 z-[85] h-[2px] bg-transparent" aria-hidden="true">
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-rust via-amber to-flare"
      />
    </div>
  );
}
