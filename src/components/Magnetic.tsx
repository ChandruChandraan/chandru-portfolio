import { useRef, type ReactNode, type CSSProperties } from "react";
import { gsap } from "../lib/gsap";
import { useMediaQuery, useReducedMotion } from "../lib/hooks";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
};

/** Subtle magnetic hover for buttons — desktop pointer only. */
export default function Magnetic({ children, className = "", strength = 0.28, style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");
  const active = fine && !reduced;

  const onMove = (e: React.MouseEvent) => {
    if (!active || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    gsap.to(ref.current, {
      x: dx * strength,
      y: dy * strength,
      duration: 0.5,
      ease: "power3.out",
    });
  };

  const onLeave = () => {
    if (!active || !ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.45)" });
  };

  return (
    <div
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
      style={style}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
