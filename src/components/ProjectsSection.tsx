"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "@/content/projects";

/**
 * Section 2: scroll-driven project showcase.
 * The section pins to the screen; scrolling slides Project 1 → 2 → 3 → 4,
 * then the page continues to the next section.
 * Uses svh so it fits the visible area on iPhone Safari.
 * Phone: photo on top (takes the free space), compact details below.
 * Desktop: photo left, details right (unchanged).
 */
export default function ProjectsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = featuredProjects.length;

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track) return;
      const rect = section.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = Math.min(1, Math.max(0, -rect.top / scrollable));
      track.style.transform = `translate3d(${-progress * (count - 1) * 100}vw, 0, 0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setActive(Math.round(progress * (count - 1)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count]);

  // Jump to a project when a number is clicked
  const goTo = (i: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = section.offsetTop;
    const scrollable = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (scrollable * i) / Math.max(1, count - 1), behavior: "smooth" });
  };

  // Phone meta line: "Dubai, UAE · 2025 · 12,000 m²" — skips empty or "—" values
  const metaLine = (values: (string | number | undefined)[]) =>
    values
      .map((v) => (v === undefined ? "" : String(v).trim()))
      .filter((v) => v && v !== "—" && v !== "-")
      .join(" · ");

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative bg-sand"
      style={{ height: `${count * 100}svh` }}
      aria-label="Our projects"
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        {/* Header row */}
        <div className="mx-auto flex w-full max-w-[1440px] items-end justify-between gap-4 px-6 pt-20 pb-4 md:gap-6 md:px-10 md:pt-28 md:pb-6">
          <div>
            <p className="whitespace-nowrap text-[11px] tracking-[0.2em] text-earth md:text-xs">01 — OUR PROJECTS</p>
            <h2 className="font-display mt-2 whitespace-nowrap text-[26px] font-semibold leading-none md:text-5xl md:leading-tight">
              Selected work
            </h2>
          </div>
          <div className="flex items-center gap-1.5 md:gap-2" role="tablist" aria-label="Choose project">
            {featuredProjects.map((p, i) => (
              <button
                key={p.slug}
                type="button"
                role="tab"
                aria-selected={active === i}
                aria-label={`Show ${p.name}`}
                onClick={() => goTo(i)}
                className={`flex h-9 w-9 items-center justify-center rounded-full border text-[11px] transition md:h-11 md:w-11 md:text-xs ${
                  active === i ? "border-ink bg-ink text-sand" : "border-line text-earth hover:border-ink"
                }`}
              >
                {String(i + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        {/* Sliding row of projects */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={trackRef}
            className="absolute inset-0 flex will-change-transform"
            style={{ width: `${count * 100}vw` }}
          >
            {featuredProjects.map((p, i) => {
              const isActive = active === i;
              const meta = metaLine([p.location, p.year, p.area]);
              return (
                <article key={p.slug} className="h-full w-screen shrink-0">
                  <div className="mx-auto grid h-full max-w-[1440px] grid-rows-[1fr_auto] gap-4 px-6 pb-5 md:grid-cols-[1.6fr_1fr] md:grid-rows-1 md:gap-12 md:px-10 md:pb-16">
                    {/* Image / video — phone: takes all free space */}
                    <Link
                      href={`/projects/${p.slug}`}
                      className={`group relative min-h-0 overflow-hidden rounded-xl bg-line transition duration-700 ${
                        isActive ? "scale-100 opacity-100" : "scale-[0.94] opacity-60"
                      }`}
                    >
                      <Image
                        src={p.cover}
                        alt={`${p.name}, ${p.type} project in ${p.location}`}
                        fill
                        sizes="(min-width: 768px) 60vw, 100vw"
                        className="object-cover"
                        priority={i === 0}
                      />
                      {/* Only play a video if this project has one */}
                      {isActive && p.video && (
                        <video
                          className="absolute inset-0 h-full w-full object-cover"
                          src={p.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          aria-hidden="true"
                        />
                      )}
                      <span className="absolute left-4 top-4 rounded-full bg-sand/90 px-3 py-1 text-xs tracking-[0.15em] text-ink md:left-5 md:top-5">
                        {String(i + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                      </span>
                    </Link>

                    {/* Details */}
                    <div
                      className={`flex flex-col justify-center transition duration-700 ${
                        isActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-6 opacity-0"
                      }`}
                    >
                      <p className="text-[11px] tracking-[0.2em] text-earth md:text-xs">{p.type.toUpperCase()}</p>
                      <h3 className="font-display mt-1.5 text-2xl font-semibold leading-tight md:mt-3 md:text-5xl">
                        {p.name}
                      </h3>
                      <p className="mt-4 hidden text-base leading-relaxed text-ink/80 md:block">{p.summary}</p>

                      {/* Phone: one compact line + small link */}
                      <div className="mt-2 flex items-center justify-between gap-4 border-t border-line pt-3 text-sm md:hidden">
                        <span className="truncate text-earth">{meta}</span>
                        <Link href={`/projects/${p.slug}`} className="shrink-0 text-ink underline-offset-4 hover:underline">
                          View project →
                        </Link>
                      </div>

                      {/* Desktop: full details + button (unchanged) */}
                      <dl className="mt-8 hidden grid-cols-3 gap-4 border-t border-line pt-5 text-sm md:grid">
                        <div>
                          <dt className="text-earth">Location</dt>
                          <dd className="mt-1">{p.location}</dd>
                        </div>
                        <div>
                          <dt className="text-earth">Year</dt>
                          <dd className="mt-1">{p.year}</dd>
                        </div>
                        <div>
                          <dt className="text-earth">Area</dt>
                          <dd className="mt-1">{p.area}</dd>
                        </div>
                      </dl>

                      <Link
                        href={`/projects/${p.slug}`}
                        className="mt-8 hidden min-h-12 w-fit items-center rounded-full border border-ink px-6 text-sm transition hover:bg-ink hover:text-sand md:inline-flex"
                      >
                        View project →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Progress bar */}
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-4 md:px-10 md:pb-6">
          <div className="h-px w-full bg-line">
            <div ref={barRef} className="h-px w-full origin-left bg-ink" style={{ transform: "scaleX(0)" }} />
          </div>
        </div>
      </div>
    </section>
  );
}