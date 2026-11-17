"use client";

import Link from "next/link";
import { useState } from "react";
import { media } from "@/content/media";

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
 *  Desktop (md:) layout unchanged. */
export default function About() {
  const [tab, setTab] = useState<TabKey>("history");
  const [expanded, setExpanded] = useState(false);
  const current = content[tab];
  const hasMore = current.paragraphs.length > 1 || !!current.quote;

  const changeTab = (key: TabKey) => {
    setTab(key);
    setExpanded(false);
  };

  return (
    <section id="about" className="bg-sand">
      <div className="mx-auto grid max-w-[1440px] items-center gap-6 px-6 py-16 md:grid-cols-2 md:gap-20 md:px-10 md:py-36">
        {/* Phone-only heading (shown above the photo) */}
        <div className="reveal md:hidden">
          <p className="text-[11px] tracking-[0.25em] text-earth">03 — ABOUT STOARC</p>
          <h2 className="font-display mt-2 text-[32px] font-semibold leading-tight">About our journey</h2>
        </div>

        {/* Video */}
        <div className="reveal relative aspect-[4/3] overflow-hidden rounded-2xl bg-line md:aspect-[4/5] md:rounded-md">
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={media.about.video}
            poster={media.about.photo}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>

        {/* Text */}
        <div className="reveal">
          {/* Desktop heading */}
          <p className="hidden text-xs tracking-[0.2em] text-earth md:block">03 — ABOUT STOARC</p>
          <h2 className="font-display mt-3 hidden text-6xl font-semibold leading-tight md:block">About our journey</h2>

          {/* Capsule tabs — full width with equal parts on phones */}
          <div
            className="grid w-full grid-cols-3 rounded-full border border-[#C6A36A]/60 bg-white/40 p-1 backdrop-blur-sm md:mt-8 md:inline-flex md:w-auto"
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
            className="mt-6 animate-[fadeIn_0.5s_ease] md:mt-8 md:min-h-[260px]"
          >
            {current.paragraphs.map((p, i) => (
              <p
                key={p}
                className={`mb-3 text-[15px] leading-relaxed text-ink/80 md:mb-4 md:block md:text-lg ${
                  i > 0 && !expanded ? "hidden" : ""
                }`}
              >
                {p}
              </p>
            ))}
            {current.quote && (
              <blockquote
                className={`font-display mt-4 border-l-2 border-[#C6A36A] pl-4 text-lg italic text-ink md:mt-6 md:block md:pl-5 md:text-2xl ${
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

          {/* Stats — boxed with dividers on phones, open row on desktop */}
          <dl className="mt-8 grid grid-cols-3 divide-x divide-[#C6A36A]/30 overflow-hidden rounded-2xl border border-[#C6A36A]/40 bg-white/40 text-center md:gap-4 md:divide-x-0 md:overflow-visible md:rounded-none md:border-x-0 md:border-b-0 md:border-t md:border-line md:bg-transparent md:pt-8 md:text-left">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-5 md:p-0">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-[28px] font-semibold leading-none md:text-5xl">{s.value}</dd>
                <dd className="mt-2 text-[11px] uppercase tracking-[0.15em] text-earth md:mt-1 md:text-sm md:normal-case md:tracking-normal">
                  <span className="md:hidden">{s.short}</span>
                  <span className="hidden md:inline">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          {/* More about us — full width on phones */}
          <Link
            href="/about"
            className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-full border border-[#C6A36A]/70 px-7 text-sm transition hover:bg-[#C6A36A] hover:text-ink md:mt-10 md:inline-flex md:w-auto"
          >
            More about us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}