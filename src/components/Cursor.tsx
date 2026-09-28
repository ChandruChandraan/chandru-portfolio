import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotion } from "../lib/hooks";

/** Subtle two-part cursor accent. Pointer-fine devices only. */
export default function Cursor() {
  const fine = useMediaQuery("(pointer: fine)");
  const reduced = useReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!fine || reduced) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let visible = false;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      hovering = !!target?.closest("a, button, [data-cursor]");
    };

    const onLeave = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    let rotation = 0;

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      
      dot.style.transform = `translate3d(${x - 2}px, ${y - 2}px, 0)`;
      
      const s = hovering ? 1.5 : 1;
      rotation += hovering ? 2 : 0.2;
      
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0) scale(${s}) rotate(${rotation}deg)`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      {/* Target Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] size-1 rounded-full bg-amber opacity-0 transition-opacity duration-300"
      />
      
      {/* Tactical Brackets */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] size-[44px] opacity-0 transition-opacity duration-300 will-change-transform"
      >
        {/* Corner Brackets */}
        <span className="absolute left-0 top-0 size-2.5 border-l border-t border-amber" />
        <span className="absolute right-0 top-0 size-2.5 border-r border-t border-amber" />
        <span className="absolute bottom-0 left-0 size-2.5 border-b border-l border-amber" />
        <span className="absolute bottom-0 right-0 size-2.5 border-b border-r border-amber" />
        
        {/* Scanning Lines (visible only on hover) */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <span className="h-px w-full bg-amber/40" />
          <span className="absolute h-full w-px bg-amber/40" />
        </div>
      </div>
    </>
  );
}
