"use client";

import { useState } from "react";
import { Building2, Sprout, Building, House, Wrench, Plus } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Pillar = { n: string; name: string; text: string; Icon: LucideIcon };

const pillars: Pillar[] = [
  {
    n: "01",
    name: "Stoarc.Green",
    text: "Integrating nature, landscape and ecological thinking into the built environment.",
    Icon: Building2,
  },
  {
    n: "02",
    name: "Stoarc.CO2",
    text: "Reducing the carbon impact of the built environment through informed design decisions and material selection.",
    Icon: Sprout,
  },
  {
    n: "03",
    name: "Stoarc.Sustainable",
    text: "Integrating environmental responsibility and building performance into the architectural design process.",
    Icon: Building,
  },
  {
    n: "04",
    name: "Stoarc.Code",
    text: "Integrating computational thinking, digital technologies and intelligent workflows into the design process.",
    Icon: House,
  },
  {
    n: "05",
    name: "Stoarc.Materials",
    text: "Exploring the relationship between materiality, sustainability, technology, craftsmanship and architectural expression.",
    Icon: Wrench,
  },
];

/** The five STOARC pillars.
 *  Phone/tablet: compact tap-to-open list that fits one screen.
 *  Desktop (lg): 5 columns with big numbers — unchanged. */
export default function Pillars() {
  const [open, setOpen] = useState(0);

  return (
    <section id="pillars" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-12 md:px-10 md:py-28">
        <div className="reveal mb-6 md:mb-16">
          <p className="text-[11px] tracking-[0.25em] text-earth md:text-xs md:tracking-[0.2em]">OUR APPROACH</p>
          <h2 className="font-display mt-2 max-w-2xl text-[28px] font-semibold leading-tight md:mt-3 md:text-5xl">
            Five ways we think about building
          </h2>
        </div>

        {/* ───── Phone / tablet: tap-to-open list ───── */}
        <ul className="reveal border-t border-line lg:hidden">
          {pillars.map(({ n, name, text, Icon }, i) => {
            const isOpen = open === i;
            return (
              <li key={n} className="border-b border-line">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  aria-controls={`pillar-${n}`}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <span className="w-6 shrink-0 text-[11px] tracking-[0.15em] text-earth">{n}</span>
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                      isOpen ? "border-[#C6A36A] bg-sand" : "border-line"
                    }`}
                  >
                    <Icon className="h-[18px] w-[18px] text-ink" strokeWidth={1.4} aria-hidden="true" />
                  </span>
                  <span className="font-display flex-1 text-[17px] font-semibold">{name}</span>
                  <Plus
                    className={`h-4 w-4 shrink-0 text-[#B8874B] transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  id={`pillar-${n}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 pl-[88px] pr-6 text-sm leading-relaxed text-earth">{text}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* ───── Desktop: 5 columns (unchanged) ───── */}
        <div className="hidden border-t border-line lg:grid lg:grid-cols-5">
          {pillars.map(({ n, name, text, Icon }) => (
            <article
              key={n}
              className="reveal group flex flex-col items-center border-r border-line px-6 py-12 text-center last:border-r-0"
            >
              <span className="font-display text-8xl font-semibold leading-none text-line transition-colors duration-500 group-hover:text-earth">
                {n}
              </span>
              <span className="my-8 h-px w-full bg-line" />

              <span className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-earth group-hover:bg-sand">
                <Icon className="h-9 w-9 text-ink" strokeWidth={1.25} aria-hidden="true" />
              </span>

              <div className="mt-8 min-w-0">
                <h3 className="font-display text-2xl font-semibold">{name}</h3>
                <p className="mx-auto mt-4 max-w-[280px] text-sm leading-relaxed text-earth">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}