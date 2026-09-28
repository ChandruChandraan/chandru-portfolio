import { useEffect, useRef } from "react";
import { useMediaQuery, useReducedMotion } from "../lib/hooks";

/**
 * Fluid Minimalist Dot & Lagging Aura Ring cursor.
 * Matches universal primary theme (#FF4D5A / #FF7A85).
 * Fine pointer devices only with full reduced motion support.
 */
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

    document.body.classList.add("has-custom-cursor");

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let hovering = false;
    let isDown = false;
    let visible = false;
    let currentRingScale = 1;
    let currentDotScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const checkHover = (target: HTMLElement | null) => {
      const isInteractive = !!target?.closest(
        "a, button, [role='button'], [data-cursor], summary, input, select, textarea, label, .cursor-pointer"
      );
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.setAttribute("data-hovering", hovering ? "true" : "false");
      }
    };

    const onOver = (e: MouseEvent) => {
      checkHover(e.target as HTMLElement | null);
    };

    const onDown = () => {
      isDown = true;
    };

    const onUp = () => {
      isDown = false;
    };

    const onLeave = () => {
      visible = false;
      hovering = false;
      ring.setAttribute("data-hovering", "false");
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onEnter = () => {
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const loop = () => {
      // Fluid lerp for the lagging ring
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;

      // Calculate target scales based on interaction state
      const targetRingScale = hovering
        ? isDown
          ? 1.45
          : 1.85
        : isDown
        ? 0.8
        : 1.0;
      const targetDotScale = hovering
        ? isDown
          ? 0.5
          : 0.65
        : isDown
        ? 0.7
        : 1.0;

      // Smooth lerp for scales to avoid sudden snapping
      currentRingScale += (targetRingScale - currentRingScale) * 0.2;
      currentDotScale += (targetDotScale - currentDotScale) * 0.25;

      // Position center dot (6px) at mouse tip (x - 3, y - 3)
      dot.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0) scale(${currentDotScale})`;

      // Position lagging ring (38px) at smoothed position (rx - 19, ry - 19)
      ring.style.transform = `translate3d(${rx - 19}px, ${ry - 19}px, 0) scale(${currentRingScale})`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown, { passive: true });
    window.addEventListener("mouseup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced]);

  if (!fine || reduced) return null;

  return (
    <>
      {/* Precision Core Dot (#FF4D5A with neon coral glow) */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[95] size-[6px] rounded-full bg-amber shadow-[0_0_8px_rgba(255,77,90,0.85)] opacity-0 transition-opacity duration-300 will-change-transform"
      />

      {/* Fluid Lagging Aura Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        data-hovering="false"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[95] size-[38px] rounded-full border border-amber/40 bg-amber/[0.04] shadow-[0_0_16px_-2px_rgba(255,77,90,0.3)] backdrop-blur-[0.5px] opacity-0 transition-[border-color,background-color,box-shadow,opacity] duration-300 will-change-transform data-[hovering=true]:border-flare data-[hovering=true]:bg-amber/[0.12] data-[hovering=true]:shadow-[0_0_24px_rgba(255,77,90,0.45)]"
      />
    </>
  );
}
