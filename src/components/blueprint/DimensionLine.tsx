/** Technical dimension line: |——— LABEL ———| that grows in when scrolled into view. */
type Props = { label: string; className?: string; tone?: "navy" | "light" };

export default function DimensionLine({ label, className = "", tone = "navy" }: Props) {
  const color = tone === "light" ? "text-sand/50" : "text-navy/60";
  return (
    <div
      aria-hidden="true"
      className={`reveal flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] ${color} ${className}`}
    >
      <span className="h-3 w-px bg-current" />
      <span className="dim-line h-px flex-1 origin-right bg-current" />
      <span className="whitespace-nowrap">{label}</span>
      <span className="dim-line h-px flex-1 origin-left bg-current" />
      <span className="h-3 w-px bg-current" />
    </div>
  );
}