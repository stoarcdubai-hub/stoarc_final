import DimensionLine from "./DimensionLine";

/** Section-cut symbol: circle with a letter and a direction arrow. */
function SectionMark({ code, flip = false }: { code: string; flip?: boolean }) {
  return (
    <svg viewBox="0 0 48 48" className={`h-10 w-10 shrink-0 text-navy ${flip ? "-scale-x-100" : ""}`} aria-hidden="true">
      <circle cx="20" cy="24" r="14" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="6" y1="24" x2="34" y2="24" stroke="currentColor" strokeWidth="0.75" />
      <path d="M34 24 L46 24 L40 18 Z" fill="currentColor" />
      <text
        x="20"
        y="20"
        textAnchor="middle"
        fontSize="9"
        fontFamily="ui-monospace, monospace"
        fill="currentColor"
        className={flip ? "[transform:scaleX(-1)] [transform-origin:20px_20px]" : ""}
      >
        {code}
      </text>
    </svg>
  );
}

/** Blueprint transition strip placed between two sections. */
export default function SectionDivider({ label, code = "A" }: { label: string; code?: string }) {
  return (
    <div aria-hidden="true" className="relative overflow-hidden border-y border-navy/10 bg-paper">
      <div className="bp-grid absolute inset-0" />
      <div className="bp-scan absolute inset-y-0 w-px bg-navy/25" />
      <div className="relative mx-auto flex max-w-[1440px] items-center gap-4 px-6 pt-10 pb-4 md:gap-6 md:px-10">
        <SectionMark code={code} />
        <DimensionLine label={label} className="flex-1" />
        <SectionMark code={code} flip />
      </div>
      <div className="relative mx-auto flex max-w-[1440px] justify-between gap-4 px-6 pb-8 font-mono text-[10px] tracking-[0.2em] text-grey md:px-10">
        <span>25.20°N · 55.27°E</span>
        <span className="hidden sm:inline">SCALE 1:100</span>
        <span>STOARC · DWG {code}-01</span>
      </div>
    </div>
  );
}