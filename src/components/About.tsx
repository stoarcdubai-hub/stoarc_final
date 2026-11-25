"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type TabKey = "history" | "mission" | "vision";

const tabs: { key: TabKey; label: string }[] = [
  { key: "history", label: "History" },
  { key: "mission", label: "Mission" },
  { key: "vision", label: "Vision" },
];

const content: Record<TabKey, { paragraphs: string[]; quote?: string }> = {
  history: {
    paragraphs: [
      "With a portfolio spanning luxury residential communities, mixed-use developments, commercial towers and urban masterplans, our work crosses multiple continents and diverse typologies.",
      "From concept through construction administration, we provide comprehensive services tailored to the unique demands of each client, site and cultural context — always placing human experience at the centre of design.",
    ],
  },
  mission: {
    paragraphs: [
      "To deliver transformative architectural and design solutions that enhance the quality of human life. We are committed to creating spaces that are functional, beautiful and enduring — bridging the gap between client vision and built reality.",
      "Our mission is anchored in technical rigour, creative excellence and a deep respect for the cultural and environmental context of every project we undertake.",
      "To be a globally recognised architecture group, creating iconic spaces that inspire people, respect the planet and shape a more sustainable future.",
    ],
    quote: "Designing spaces that inspire the human spirit",
  },
  vision: {
    paragraphs: [
      "To transform ideas into meaningful architecture through creativity, innovation and sustainable thinking — delivering thoughtful, functional and timeless spaces that create lasting value for our clients, communities and the environment.",
    ],
  },
};

const stats = [
  { value: "15+", label: "Years of experience", short: "Years" },
  { value: "200+", label: "Projects delivered", short: "Projects" },
  { value: "12+", label: "Countries", short: "Countries" },
];

/** Section 4: About Our Journey.
 *  Phone: heading → photo → full-width tabs → short text + Read more → boxed stats → full-width button.
 *  Desktop: same two-column layout, sized down to fit one screen.
 *  Scroll: the section pins in place, photo 2 slides up over photo 1, then the page continues. */
export default function About({ showMoreLink = true }: { showMoreLink?: boolean }) {
  const [tab, setTab] = useState<TabKey>("history");
  const [expanded, setExpanded] = useState(false);
  const current = content[tab];
  const hasMore = current.paragraphs.length > 1 || !!current.quote;

  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const secondRef = useRef<HTMLDivElement>(null);

  // Pinned scroll: while the section is held in place, progress 0 → 1 swaps photo 1 for photo 2.
  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const spacer = spacerRef.current;
    const first = firstRef.current;
    const second = secondRef.current;
    if (!section || !sticky || !spacer || !first || !second) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      // Phone: pin with the heading at the top (as in the design).
      // Desktop: pin vertically centred; if taller than the screen, centre it anyway.
      const top = desktop.matches ? Math.min(0, (vh - sticky.offsetHeight) / 2) : 0;
      sticky.style.top = `${top}px`;

      // How far we've scrolled since the section pinned, as 0 → 1.
      // Finishes at 80% so photo 2 holds for a moment before the page moves on.
      const scrolled = top - section.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, scrolled / (spacer.offsetHeight * 0.8)));

      second.style.clipPath = `inset(${(1 - p) * 100}% 0 0 0)`;
      first.style.transform = `scale(${1 + p * 0.06})`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const changeTab = (key: TabKey) => {
    setTab(key);
    setExpanded(false);
  };

  return (
    <section ref={sectionRef} id="about" className="relative bg-sand">
      {/* Pinned content */}
      <div
        ref={stickyRef}
        className="sticky top-0 mx-auto grid max-w-[1440px] items-center gap-6 px-6 py-16 md:grid-cols-2 md:gap-12 md:px-10 md:py-20"
      >
        {/* Phone-only heading (shown above the photo) */}
        <div className="reveal md:hidden">
          <h2 className="font-display text-[32px] font-semibold leading-tight">About our journey</h2>
        </div>

        {/* Photos — phone: height follows photo 1, no crop; desktop: 4:5 frame. Photo 2 slides up while pinned. */}
        <div className="reveal relative overflow-hidden rounded-2xl bg-line md:aspect-[4/5] md:max-h-[calc(100vh-10rem)] md:rounded-md">
          <div ref={firstRef} className="will-change-transform md:absolute md:inset-0">
            <Image
              src="/images/about-studio.jpg"
              alt="STOARC team receiving an industry award"
              width={0}
              height={0}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="block h-auto w-full md:h-full md:object-cover"
            />
          </div>
          <div
            ref={secondRef}
            className="absolute inset-0 will-change-[clip-path]"
            style={{ clipPath: "inset(100% 0 0 0)" }}
          >
            <Image
              src="/images/about-studio-2.jpg"
              alt="Design Awards 2026 trophy — STOARC, winner of Restaurant Design of the Year"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div className="reveal">
          {/* Desktop heading */}
          <h2 className="font-display hidden text-5xl font-semibold leading-tight md:block">About our journey</h2>

          {/* Capsule tabs — full width with equal parts on phones */}
          <div
            className="grid w-full grid-cols-3 rounded-full border border-[#C6A36A]/60 bg-white/40 p-1 backdrop-blur-sm md:mt-6 md:inline-flex md:w-auto"
            role="tablist"
            aria-label="About STOARC"
          >
            {tabs.map((t) => (
              <button
                key={t.key}
                type="button"
                role="tab"
                id={`tab-${t.key}`}
                aria-selected={tab === t.key}
                aria-controls="about-panel"
                onClick={() => changeTab(t.key)}
                className={`min-h-11 rounded-full px-2 text-sm transition md:min-h-10 md:px-6 ${
                  tab === t.key ? "bg-ink text-sand" : "text-earth hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div
            id="about-panel"
            role="tabpanel"
            aria-labelledby={`tab-${tab}`}
            key={tab}
            className="mt-6 animate-[fadeIn_0.5s_ease] md:mt-6 md:min-h-[200px]"
          >
            {current.paragraphs.map((p, i) => (
              <p
                key={p}
                className={`mb-3 text-[15px] leading-relaxed text-ink/80 md:mb-4 md:block md:text-base ${
                  i > 0 && !expanded ? "hidden" : ""
                }`}
              >
                {p}
              </p>
            ))}
            {current.quote && (
              <blockquote
                className={`font-display mt-4 border-l-2 border-[#C6A36A] pl-4 text-lg italic text-ink md:mt-6 md:block md:pl-5 md:text-xl ${
                  expanded ? "" : "hidden"
                }`}
              >
                “{current.quote}”
              </blockquote>
            )}

            {/* Read more — phones only */}
            {hasMore && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                className="mt-1 text-sm font-medium text-[#B8874B] underline-offset-4 hover:underline md:hidden"
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : "Read more"}
              </button>
            )}
          </div>

          {/* Stats — same boxed row with dividers on phone and desktop */}
          <div className="mt-8 grid grid-cols-3 divide-x divide-[#C6A36A]/30 overflow-hidden rounded-2xl border border-[#C6A36A]/40 bg-white/40 text-center md:mt-6">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-5 md:px-4 md:py-6">
                <p className="font-display text-[28px] font-semibold leading-none md:text-4xl">{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.15em] text-earth md:text-xs">
                  <span className="md:hidden">{s.short}</span>
                  <span className="hidden md:inline">{s.label}</span>
                </p>
              </div>
            ))}
          </div>

          {/* More about us — full width on phones. Hidden on the /about page itself. */}
          {showMoreLink && (
            <Link
              href="/about"
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#C6A36A]/70 px-7 text-sm transition hover:bg-[#C6A36A] hover:text-ink md:mt-8 md:inline-flex md:w-auto"
            >
              More about us <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>
      </div>

      {/* Scroll distance while pinned — how long the photo change lasts */}
      <div ref={spacerRef} aria-hidden="true" className="h-[80vh] md:h-screen" />
    </section>
  );
}