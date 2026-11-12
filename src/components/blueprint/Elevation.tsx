/** Decorative building elevation sketch (SVG) with level markers. Draws in on scroll. */
const L = { pathLength: 1 } as const;

export default function Elevation({ className = "" }: { className?: string }) {
  const hatch = Array.from({ length: 38 }, (_, i) => 20 + i * 20);
  const screen = Array.from({ length: 11 }, (_, i) => 140 + i * 11);
  return (
    <svg
      viewBox="0 0 800 230"
      fill="none"
      stroke="currentColor"
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
      className={`reveal bp-draw ${className}`}
    >
      {/* Ground + hatch */}
      <line {...L} x1="0" y1="190" x2="800" y2="190" strokeWidth="1.5" />
      {hatch.map((x) => (
        <line key={x} {...L} x1={x} y1="190" x2={x - 10} y2="202" strokeWidth="0.5" />
      ))}
      {/* Main volume */}
      <rect {...L} x="120" y="100" width="300" height="90" strokeWidth="1.25" />
      {/* Upper cantilever + roof slab */}
      <rect {...L} x="260" y="50" width="360" height="50" strokeWidth="1.25" />
      <line {...L} x1="250" y1="46" x2="630" y2="46" strokeWidth="2" />
      {/* Glass box with mullions */}
      <rect {...L} x="420" y="100" width="150" height="90" strokeWidth="1" />
      {[457, 495, 532].map((x) => (
        <line key={x} {...L} x1={x} y1="100" x2={x} y2="190" strokeWidth="0.5" />
      ))}
      {/* Timber screen */}
      {screen.map((x) => (
        <line key={x} {...L} x1={x} y1="110" x2={x} y2="190" strokeWidth="0.5" />
      ))}
      {/* Upper windows */}
      <rect {...L} x="300" y="62" width="90" height="26" strokeWidth="0.75" />
      <rect {...L} x="420" y="62" width="160" height="26" strokeWidth="0.75" />
      {/* Level markers */}
      {[
        { y: 190, t: "+0.00" },
        { y: 100, t: "+3.20" },
        { y: 46, t: "+6.40" },
      ].map((m) => (
        <g key={m.t}>
          <polyline {...L} points={`60,${m.y - 8} 66,${m.y} 72,${m.y - 8} 60,${m.y - 8}`} strokeWidth="0.75" />
          <line {...L} x1="72" y1={m.y} x2="110" y2={m.y} strokeWidth="0.4" />
          <text x="20" y={m.y - 2} fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace" fontSize="9">
            {m.t}
          </text>
        </g>
      ))}
      {/* Overall dimension */}
      <line {...L} x1="120" y1="18" x2="630" y2="18" strokeWidth="0.5" />
      <line {...L} x1="120" y1="12" x2="120" y2="24" strokeWidth="0.5" />
      <line {...L} x1="630" y1="12" x2="630" y2="24" strokeWidth="0.5" />
      <g fill="currentColor" stroke="none" fontFamily="ui-monospace, monospace" fontSize="9" letterSpacing="1.5">
        <text x="350" y="14">24 600</text>
        <text x="650" y="222">SOUTH ELEVATION · 1:200</text>
      </g>
    </svg>
  );
}