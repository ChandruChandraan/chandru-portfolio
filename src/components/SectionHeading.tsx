type Props = {
  index: string;
  label: string;
  className?: string;
};

/** Numbered section eyebrow — the shared "debug label" of the workspace. */
export default function SectionHeading({ index, label, className = "" }: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`} data-reveal>
      <span className="font-mono text-[11px] text-amber">{index}</span>
      <span className="h-px w-12 bg-gradient-to-r from-amber/80 to-transparent" />
      <span className="eyebrow !text-fog">{label}</span>
    </div>
  );
}
