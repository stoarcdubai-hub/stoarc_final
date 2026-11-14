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
  { value: "15+", label: "Years of experience" },
  { value: "200+", label: "Projects delivered" },
  { value: "12+", label: "Countries" },
];

/** Section 4: About Our Journey — History / Mission / Vision capsules + stats
 *  Phone sizes are compact; desktop (md:) values unchanged. */
export default function About() {
  const [tab, setTab] = useState<TabKey>("history");
  const current = content[tab];

  return (
    <section id="about" className="bg-sand">
      <div className="mx-auto grid max-w-[1440px] items-center gap-8 px-6 py-14 md:grid-cols-2 md:gap-20 md:px-10 md:py-36">
        {/* Video — short wide card on phones, tall on desktop */}
        <div className="reveal relative aspect-[16/10] overflow-hidden rounded-md bg-line md:aspect-[4/5]">
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
          <p className="text-xs tracking-[0.2em] text-earth">03 — ABOUT STOARC</p>
          <h2 className="font-display mt-3 text-3xl font-semibold leading-tight md:text-6xl">About our journey</h2>

          {/* Capsule tabs */}
          <div
            className="mt-5 inline-flex rounded-full border border-[#C6A36A]/60 bg-white/40 p-1 backdrop-blur-sm md:mt-8"
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
                onClick={() => setTab(t.key)}
                className={`min-h-9 rounded-full px-4 text-sm transition md:min-h-10 md:px-6 ${
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
            className="mt-5 min-h-[200px] animate-[fadeIn_0.5s_ease] md:mt-8 md:min-h-[260px]"
          >
            {current.paragraphs.map((p) => (
              <p key={p} className="mb-3 text-[15px] leading-relaxed text-ink/80 md:mb-4 md:text-lg">
                {p}
              </p>
            ))}
            {current.quote && (
              <blockquote className="font-display mt-4 border-l-2 border-[#C6A36A] pl-4 text-lg italic text-ink md:mt-6 md:pl-5 md:text-2xl">
                “{current.quote}”
              </blockquote>
            )}
          </div>

          {/* Stats */}
          <dl className="mt-6 grid grid-cols-3 gap-4 border-t border-line pt-6 md:mt-8 md:pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-semibold md:text-5xl">{s.value}</dd>
                <dd className="mt-1 text-xs text-earth md:text-sm">{s.label}</dd>
              </div>
            ))}
          </dl>

          {/* More about us capsule */}
          <Link
            href="/about"
            className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full border border-[#C6A36A]/70 px-7 text-sm transition hover:bg-[#C6A36A] hover:text-ink md:mt-10"
          >
            More about us <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}