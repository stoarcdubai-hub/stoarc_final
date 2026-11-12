import { Building2, Sprout, Building, House, Wrench } from "lucide-react";
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

/** The five STOARC pillars: number, line, icon, name, text. */
export default function Pillars() {
  return (
    <section id="pillars" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
        <div className="reveal mb-14 md:mb-20">
          <p className="text-xs tracking-[0.2em] text-earth">OUR APPROACH</p>
          <h2 className="font-display mt-3 max-w-2xl text-4xl font-semibold leading-tight md:text-5xl">
            Five ways we think about building
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(({ n, name, text, Icon }) => (
            <article
              key={n}
              className="reveal group flex flex-col items-center border-b border-line px-6 py-12 text-center sm:border-r lg:border-b-0 lg:last:border-r-0"
            >
              {/* Big number */}
              <span className="font-display text-7xl font-semibold leading-none text-line transition-colors duration-500 group-hover:text-earth md:text-8xl">
                {n}
              </span>

              {/* Divider */}
              <span className="my-8 h-px w-full bg-line" />

              {/* Icon in circle */}
              <span className="flex h-28 w-28 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-earth group-hover:bg-sand">
                <Icon className="h-9 w-9 text-ink" strokeWidth={1.25} aria-hidden="true" />
              </span>

              {/* Name + text */}
              <h3 className="font-display mt-8 text-2xl font-semibold">{name}</h3>
              <p className="mt-4 max-w-[280px] text-sm leading-relaxed text-earth">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}