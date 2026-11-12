"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Hand, X } from "lucide-react";
import type { ViewMode } from "./Structure3D";
import DimensionLine from "./blueprint/DimensionLine";

const Structure3D = dynamic(() => import("./Structure3D"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full items-center justify-center font-mono text-xs tracking-[0.2em] text-navy/60">
      LOADING MODEL…
    </div>
  ),
});

/** Section 3: interactive 3D view with Blueprint / Render switch.
 *  On every device the model is locked until the user double-taps / double-clicks. */
export default function StructureSection() {
  const [mode, setMode] = useState<ViewMode>("blueprint");
  const [isTouch, setIsTouch] = useState(false);
  const [active, setActive] = useState(false);
  const lastTap = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);

  // Detect phones/tablets only to choose the wording (tap vs click)
  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Re-lock automatically when the user scrolls away
  useEffect(() => {
    if (!boxRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) setActive(false);
    });
    io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  // Double-tap detection (works on all mobile browsers)
  const onTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 320) setActive(true);
    lastTap.current = now;
  };

  const action = isTouch ? "DOUBLE TAP" : "DOUBLE CLICK";

  return (
    <section id="structure" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-36">
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.2em] text-earth">02 — EXPLORE THE STRUCTURE</p>
            <h2 className="font-display mt-3 text-4xl font-semibold md:text-6xl">Walk around it in 3D</h2>
          </div>

          <div className="flex rounded-full border border-line p-1 text-xs tracking-[0.15em]" role="group" aria-label="View mode">
            {(["blueprint", "render"] as ViewMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className={`min-h-10 rounded-full px-5 transition ${
                  mode === m ? "bg-navy text-paper" : "text-earth hover:text-ink"
                }`}
              >
                {m.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <DimensionLine label="24 600 MM" className="mb-4" />

        <div
          ref={boxRef}
          className="reveal relative h-[62vh] min-h-[440px] w-full overflow-hidden rounded-md border border-navy/15"
          data-lenis-prevent={active ? true : undefined}
        >
          <Structure3D mode={mode} interactive={active} />

          {/* Drawing annotations (blueprint mode only) */}
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 font-mono text-[10px] tracking-[0.2em] text-navy/70 transition-opacity duration-700 ${
              mode === "blueprint" ? "opacity-100" : "opacity-0"
            }`}
          >
            <span className="absolute left-4 top-4 h-5 w-5 border-l border-t border-navy/40" />
            <span className="absolute right-4 top-4 h-5 w-5 border-r border-t border-navy/40" />
            <span className="absolute bottom-4 left-4 h-5 w-5 border-b border-l border-navy/40" />
            <span className="absolute bottom-4 right-4 h-5 w-5 border-b border-r border-navy/40" />

            <span className="absolute left-8 top-8">X 00.00 · Y 00.00 · Z +6.40</span>

            <svg viewBox="0 0 40 52" className="absolute right-8 top-8 h-12 w-10 text-navy/70">
              <circle cx="20" cy="30" r="14" fill="none" stroke="currentColor" strokeWidth="0.75" />
              <path d="M20 14 L26 34 L20 30 L14 34 Z" fill="currentColor" />
              <text x="20" y="9" textAnchor="middle" fontSize="8" fill="currentColor">N</text>
            </svg>

            <div className="absolute bottom-8 left-8 hidden sm:block">
              <div className="flex h-2 w-40 border border-navy/50">
                <span className="w-1/4 bg-navy/50" />
                <span className="w-1/4" />
                <span className="w-1/4 bg-navy/50" />
                <span className="w-1/4" />
              </div>
              <div className="mt-1 flex w-40 justify-between">
                <span>0</span>
                <span>2.5</span>
                <span>5 M</span>
              </div>
            </div>

            <div className="absolute bottom-8 right-8 hidden border border-navy/40 bg-paper/80 md:block">
              <div className="border-b border-navy/30 px-3 py-2 text-navy">STOARC — STRUCTURE</div>
              <div className="grid grid-cols-3 divide-x divide-navy/30">
                <span className="px-3 py-1.5">DWG S-01</span>
                <span className="px-3 py-1.5">1:100</span>
                <span className="px-3 py-1.5">REV A</span>
              </div>
            </div>
          </div>

          {/* Lock overlay: hand icon + double tap / double click to explore */}
          {!active && (
            <button
              type="button"
              onPointerUp={isTouch ? onTap : undefined}
              onDoubleClick={() => setActive(true)}
              aria-label={`${action} to explore the 3D model`}
              className="absolute inset-0 flex cursor-pointer items-center justify-center bg-paper/20"
              style={{ touchAction: "pan-y" }}
            >
              <span className="flex flex-col items-center gap-3 rounded-2xl border border-navy/20 bg-paper/85 px-6 py-5 text-navy shadow-sm backdrop-blur-sm">
                <Hand className="h-7 w-7 animate-bounce" strokeWidth={1.5} aria-hidden="true" />
                <span className="font-mono text-[10px] tracking-[0.25em]">{action} TO EXPLORE</span>
              </span>
            </button>
          )}

          {/* Exit button once unlocked */}
          {active && (
            <button
              type="button"
              onClick={() => setActive(false)}
              className="absolute left-4 top-14 flex min-h-10 items-center gap-2 rounded-full border border-navy/20 bg-paper/90 px-4 font-mono text-[10px] tracking-[0.2em] text-navy backdrop-blur-sm"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              EXIT
            </button>
          )}
        </div>

        <p className="mt-4 font-mono text-[11px] tracking-[0.2em] text-grey">
          {action} TO EXPLORE · {isTouch ? "PINCH TO ZOOM" : "DRAG TO ROTATE · SCROLL TO ZOOM"}
        </p>
      </div>
    </section>
  );
}