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

/** The five STOARC pillars.
 *  Phone/tablet: compact rows (icon left, text right).
 *  Desktop: 5 columns with big numbers. */
export default function Pillars() {
  return (
    <section id="pillars" className="bg-white">
      <div className="mx-auto max-w-[1440px] px-6 py-16 md:px-10 md:py-28">
        <div className="reveal mb-8 md:mb-16">
          <p className="text-xs tracking-[0.2em] text-earth">OUR APPROACH</p>
          <h2 className="font-display mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Five ways we think about building
          </h2>
        </div>

        <div className="grid grid-cols-1 border-t border-line sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(({ n, name, text, Icon }) => (
            <article
              key={n}
              className="reveal group flex items-start gap-4 border-b border-line py-6 sm:px-4 lg:flex-col lg:items-center lg:gap-0 lg:border-b-0 lg:border-r lg:px-6 lg:py-12 lg:text-center lg:last:border-r-0"
            >
              {/* Big number — desktop only */}
              <span className="font-display hidden text-8xl font-semibold leading-none text-line transition-colors duration-500 group-hover:text-earth lg:block">
                {n}
              </span>
              <span className="my-8 hidden h-px w-full bg-line lg:block" />

              {/* Icon in circle — small on phones, large on desktop */}
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-line transition-colors duration-500 group-hover:border-earth group-hover:bg-sand lg:h-28 lg:w-28">
                <Icon className="h-6 w-6 text-ink lg:h-9 lg:w-9" strokeWidth={1.25} aria-hidden="true" />
              </span>

              {/* Text */}
              <div className="min-w-0 lg:mt-8">
                <p className="text-[11px] tracking-[0.2em] text-earth lg:hidden">{n}</p>
                <h3 className="font-display text-lg font-semibold lg:text-2xl">{name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-earth lg:mx-auto lg:mt-4 lg:max-w-[280px]">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}