import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "./gsap";

const allowMotion = (reduced: boolean, minWidth?: number) => {
  if (reduced) return false;
  if (minWidth && !window.matchMedia(`(min-width: ${minWidth}px)`).matches) return false;
  return true;
};

/**
 * Scoped scroll-reveal system. Attach `ref` to a section root; all children
 * marked with data attributes are animated when they enter the viewport.
 *
 *  - [data-reveal]            fade + slide up (optional data-delay)
 *  - [data-linegroup] > [data-line]   masked line-by-line heading reveal
 *  - [data-stagger]           children cascade in
 *  - [data-card]              clip-path + scale media reveal
 *  - [data-parallax="value"]  gentle yPercent drift while traversing (desktop)
 *  - [data-drawx]             scaleX 0->1 scrubbed (progress lines)
 *  - [data-drawy]             scaleY 0->1 scrubbed (vertical timelines)
 */
export function useReveals<T extends HTMLElement>(
  ref: RefObject<T | null>,
  reduced: boolean,
  deps: ReadonlyArray<unknown> = []
) {
  useLayoutEffect(() => {
    const scope = ref.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scope);

      /* ---------- masked line reveals ---------- */
      q<HTMLElement>("[data-linegroup]").forEach((group) => {
        const lines = Array.from(group.querySelectorAll<HTMLElement>("[data-line]"));
        if (!lines.length) return;
        if (reduced) {
          gsap.fromTo(
            lines,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.7,
              stagger: 0.08,
              scrollTrigger: { trigger: group, start: "top 88%", once: true },
            }
          );
          return;
        }
        gsap.fromTo(
          lines,
          { yPercent: 118 },
          {
            yPercent: 0,
            duration: 1.15,
            ease: "power4.out",
            stagger: 0.1,
            scrollTrigger: { trigger: group, start: "top 86%", once: true },
          }
        );
      });

      /* ---------- generic fade-up reveals ---------- */
      q<HTMLElement>("[data-reveal]").forEach((el) => {
        const delay = parseFloat(el.dataset.delay || "0");
        gsap.fromTo(
          el,
          { opacity: 0, y: reduced ? 0 : 40 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.6 : 1,
            delay,
            scrollTrigger: { trigger: el, start: "top 90%", once: true },
          }
        );
      });

      /* ---------- staggered children ---------- */
      q<HTMLElement>("[data-stagger]").forEach((parent) => {
        const children = Array.from(parent.children);
        if (!children.length) return;
        gsap.fromTo(
          children,
          { opacity: 0, y: reduced ? 0 : 34 },
          {
            opacity: 1,
            y: 0,
            duration: reduced ? 0.6 : 0.95,
            stagger: 0.09,
            scrollTrigger: { trigger: parent, start: "top 86%", once: true },
          }
        );
      });

      /* ---------- cinematic card reveals ---------- */
      q<HTMLElement>("[data-card]").forEach((el) => {
        if (reduced) {
          gsap.fromTo(
            el,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.7,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            }
          );
          return;
        }
        gsap.fromTo(
          el,
          {
            opacity: 0,
            y: 64,
            scale: 0.985,
            clipPath: "inset(16% 4% 16% 4% round 20px)",
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            clipPath: "inset(0% 0% 0% 0% round 20px)",
            duration: 1.25,
            ease: "power4.out",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });

      /* ---------- parallax drift (desktop, full motion only) ---------- */
      if (allowMotion(reduced, 1024)) {
        q<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = parseFloat(el.dataset.parallax || "10");
          gsap.fromTo(
            el,
            { yPercent: amount },
            {
              yPercent: -amount,
              ease: "none",
              scrollTrigger: {
                trigger: el.closest("[data-parallax-scope]") || el,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
      }

      /* ---------- scrubbed draw lines ---------- */
      q<HTMLElement>("[data-drawx]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left center",
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-draw-scope]") || el,
              start: "top 85%",
              end: reduced ? "top 85%" : "bottom 45%",
              scrub: reduced ? false : 0.5,
              once: reduced,
            },
          }
        );
      });

      q<HTMLElement>("[data-drawy]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "top center",
            ease: "none",
            scrollTrigger: {
              trigger: el.closest("[data-draw-scope]") || el,
              start: "top 82%",
              end: reduced ? "top 82%" : "bottom 55%",
              scrub: reduced ? false : 0.5,
              once: reduced,
            },
          }
        );
      });
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, ...deps]);
}
