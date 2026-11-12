"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { Hand, X, LocateFixed, ZoomIn, Maximize, Crosshair } from "lucide-react";
import type { ViewMode } from "./Structure3D";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const GOLD = "#B8874B";

const Structure3D = dynamic(() => import("./Structure3D"), {
  ssr: false,
  loading: () => <Loading />,
});

function Loading() {
  return (
    <div className="flex h-full items-center justify-center font-mono text-xs tracking-[0.2em] text-earth">
      LOADING MODEL…
    </div>
  );
}

/** Section 3: interactive 3D view — warm render / blueprint, controls, drawing annotations. */
export default function StructureSection() {
  const [mode, setMode] = useState<ViewMode>("render");
  const [isTouch, setIsTouch] = useState(false);
  const [active, setActive] = useState(false);
  const [near, setNear] = useState(false);
  const lastTap = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    setIsTouch(window.matchMedia("(hover: none)").matches);
  }, []);

  // Only download the 3D engine when the section is close to the screen
  useEffect(() => {
    if (!boxRef.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px" }
    );
    io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  // Re-lock when scrolled away
  useEffect(() => {
    if (!boxRef.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) setActive(false);
    });
    io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  const onTap = () => {
    const now = Date.now();
    if (now - lastTap.current < 320) setActive(true);
    lastTap.current = now;
  };

  // Control bar actions
  const recenter = () => {
    setActive(true);
    controlsRef.current?.reset();
  };
  const zoomIn = () => {
    setActive(true);
    const c = controlsRef.current;
    if (!c) return;
    const offset = c.object.position.clone().sub(c.target);
    if (offset.length() > 10) {
      offset.multiplyScalar(0.8);
      c.object.position.copy(c.target).add(offset);
      c.update();
    }
  };
  const fullscreen = () => {
    setActive(true);
    const el = boxRef.current;
    if (!el) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else el.requestFullscreen?.();
  };

  const action = isTouch ? "Double-tap" : "Double-click";

  return (
    <section id="structure" className="relative overflow-hidden bg-sand">
      {/* Decorative arcs */}
      <svg
        aria-hidden="true"
        viewBox="0 0 800 800"
        className="pointer-events-none absolute -right-40 -top-40 hidden w-[760px] text-[#C6A36A]/25 md:block"
      >
        <circle cx="400" cy="400" r="380" fill="none" stroke="currentColor" />
        <circle cx="460" cy="400" r="300" fill="none" stroke="currentColor" />
      </svg>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-6 md:px-10 md:py-32 2xl:max-w-[1680px]">
        {/* Heading row */}
        <div className="reveal mb-8 flex flex-wrap items-end justify-between gap-6 md:mb-10">
          <div>
            <p className="flex items-center gap-4 text-xs tracking-[0.25em] text-earth">
              02 — EXPLORE THE STRUCTURE
              <span className="hidden h-px w-32 sm:block" style={{ background: `linear-gradient(to right, ${GOLD}, transparent)` }} />
            </p>
            <h2 className={`${serif.className} mt-4 text-5xl font-medium leading-none text-ink md:text-7xl 2xl:text-8xl`}>
              Walk around it in <em className="italic" style={{ color: GOLD }}>3D</em>
            </h2>
            <p className="mt-4 max-w-sm text-base leading-relaxed text-earth md:text-lg">
              Experience our designs from every angle with an interactive 3D view.
            </p>
          </div>

          {/* Blueprint / Render switch */}
          <div className="flex rounded-full border border-[#C6A36A]/60 bg-white/40 p-1 text-sm backdrop-blur-sm" role="group" aria-label="View mode">
            {(["blueprint", "render"] as ViewMode[]).map((m) => (
              <button
                key={m}
                type="button"
                aria-pressed={mode === m}
                onClick={() => setMode(m)}
                className="min-h-11 rounded-full px-6 capitalize transition"
                style={mode === m ? { background: GOLD, color: "#fff" } : { color: "#1c1b19" }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* 3D card */}
        <div
          ref={boxRef}
          className="reveal relative h-[58vh] min-h-[420px] w-full overflow-hidden rounded-[28px] border border-[#C6A36A]/50 bg-[#f3ece1] shadow-[0_20px_60px_rgba(110,95,75,0.12)] md:h-[66vh] [&:fullscreen]:h-screen [&:fullscreen]:rounded-none"
          data-lenis-prevent={active ? true : undefined}
        >
          {near ? <Structure3D mode={mode} interactive={active} controlsRef={controlsRef} /> : <Loading />}

          {/* Drawing annotations */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 font-mono text-[10px] tracking-[0.15em] text-ink/70 sm:text-[11px]">
            {/* Coordinates */}
            <div className="absolute left-5 top-5 flex items-center gap-3 md:left-7 md:top-7">
              <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#C6A36A]/50 bg-white/50">
                <Crosshair className="h-4 w-4" strokeWidth={1.25} />
              </span>
              <span>X 00.00&nbsp;&nbsp;Y 00.00&nbsp;&nbsp;Z +6.40</span>
            </div>

            {/* North arrow */}
            <svg viewBox="0 0 40 52" className="absolute right-5 top-5 h-12 w-10 text-ink/80 md:right-7 md:top-7">
              <text x="20" y="9" textAnchor="middle" fontSize="9" fill="currentColor">N</text>
              <circle cx="20" cy="31" r="15" fill="rgba(255,255,255,0.5)" stroke="currentColor" strokeWidth="0.75" />
              <path d="M20 16 L26 37 L20 32 L14 37 Z" fill="currentColor" />
            </svg>

            {/* Scale bar */}
            <div className="absolute bottom-6 left-5 hidden sm:block md:left-7">
              <div className="flex h-2 w-44 overflow-hidden rounded-[2px] border border-[#C6A36A]/60">
                <span className="w-1/4" style={{ background: GOLD }} />
                <span className="w-1/4 bg-[#C6A36A]/50" />
                <span className="w-1/4 bg-[#C6A36A]/25" />
                <span className="w-1/4 bg-white/60" />
              </div>
              <div className="mt-1.5 flex w-44 justify-between">
                <span>0</span>
                <span>2.5</span>
                <span>5 M</span>
              </div>
            </div>

            {/* Title block */}
            <div className="absolute bottom-6 right-5 hidden border border-[#C6A36A]/50 bg-white/50 backdrop-blur-sm md:right-7 md:block">
              <div className="border-b border-[#C6A36A]/40 px-3 py-2">STOARC — STRUCTURE</div>
              <div className="grid grid-cols-3 divide-x divide-[#C6A36A]/40">
                <span className="px-3 py-1.5">DWG S-01</span>
                <span className="px-3 py-1.5">1:100</span>
                <span className="px-3 py-1.5">REV A</span>
              </div>
            </div>
          </div>

          {/* Lock overlay: hand + double-click / double-tap */}
          {!active && (
            <button
              type="button"
              onPointerUp={isTouch ? onTap : undefined}
              onDoubleClick={() => setActive(true)}
              aria-label={`${action} to explore the 3D model`}
              className="absolute inset-0 flex cursor-pointer items-center justify-center"
              style={{ touchAction: "pan-y" }}
            >
              <span className="flex flex-col items-center gap-2 rounded-full border border-white/70 bg-white/55 px-8 py-4 text-ink shadow-lg backdrop-blur-md">
                <Hand className="h-6 w-6 animate-bounce" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-xs tracking-[0.25em] sm:text-sm">{action} to explore</span>
              </span>
            </button>
          )}

          {/* Exit (when unlocked) */}
          {active && (
            <button
              type="button"
              onClick={() => setActive(false)}
              className="absolute left-5 top-16 flex min-h-10 items-center gap-2 rounded-full border border-[#C6A36A]/50 bg-white/70 px-4 text-xs tracking-[0.15em] text-ink backdrop-blur-sm md:left-7 md:top-20"
            >
              <X className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
              Exit
            </button>
          )}

          {/* Bottom control bar */}
          <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center rounded-full border border-[#C6A36A]/50 bg-white/60 px-2 shadow-sm backdrop-blur-md">
            {[
              { label: "Recenter view", Icon: LocateFixed, onClick: recenter },
              { label: "Zoom in", Icon: ZoomIn, onClick: zoomIn },
              { label: "Full screen", Icon: Maximize, onClick: fullscreen },
            ].map(({ label, Icon, onClick }, i) => (
              <span key={label} className="flex items-center">
                {i > 0 && <span className="h-5 w-px bg-[#C6A36A]/40" aria-hidden="true" />}
                <button
                  type="button"
                  onClick={onClick}
                  aria-label={label}
                  title={label}
                  className="flex h-11 w-12 items-center justify-center text-ink transition hover:text-[#B8874B]"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}