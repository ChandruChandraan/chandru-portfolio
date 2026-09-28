type Props = {
  label: string;
  hint?: string;
};

/**
 * Static environment used when WebGL is unavailable (or while the 3D
 * runtime is still initializing): dark base, technical grid, amber glow.
 */
export default function SceneFallback({ label, hint = "REALTIME 3D" }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-ink" aria-hidden="true">
      <div className="absolute inset-0 tech-grid opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(75%_60%_at_68%_42%,rgba(0,229,255,0.08),transparent_62%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(50%_40%_at_30%_80%,rgba(0,136,204,0.05),transparent_60%)]" />

      {/* static wireframe diamond */}
      <svg
        viewBox="0 0 200 200"
        className="absolute right-[8%] top-1/2 hidden w-[46vmin] -translate-y-1/2 opacity-[0.16] md:block motion-safe:animate-float-slow"
      >
        <g fill="none" stroke="#00e5ff" strokeWidth="0.7">
          <path d="M100 12 L188 100 L100 188 L12 100 Z" />
          <path d="M100 42 L158 100 L100 158 L42 100 Z" />
          <path d="M100 12 L100 188 M12 100 L188 100 M100 42 L100 158 M42 100 L158 100" opacity="0.5" />
          <circle cx="100" cy="100" r="4" fill="#00e5ff" stroke="none" />
        </g>
      </svg>

      <div className="absolute bottom-5 right-5 font-mono text-[10px] tracking-[0.25em] text-ash">
        {hint} <span className="text-amber/60">//</span> {label}
      </div>
    </div>
  );
}
