import type { Metadata } from "next";
import Link from "next/link";
import About from "@/components/About";
import Pillars from "@/components/Pillars";

export const metadata: Metadata = { title: "About" };

const services = [
  { n: "01", name: "Architecture", text: "New buildings from concept through construction documents — residential, commercial and mixed-use." },
  { n: "02", name: "Interior design", text: "Spatial planning, materials, lighting and bespoke joinery that continue the architecture inside." },
  { n: "03", name: "Urban masterplanning", text: "Site strategy, massing and phasing for communities and large developments." },
  { n: "04", name: "Landscape", text: "Gardens, courtyards and outdoor spaces designed together with the building." },
  { n: "05", name: "Construction administration", text: "Tendering, site supervision and quality control until handover." },
];

const process = [
  { n: "01", name: "Brief", text: "Site visit, needs, budget and goals." },
  { n: "02", name: "Concept", text: "Massing, sketches and early 3D studies." },
  { n: "03", name: "Design", text: "Plans, materials and technical detail." },
  { n: "04", name: "Approvals", text: "Authority submissions and permits." },
  { n: "05", name: "Construction", text: "Tender, supervision and site coordination." },
  { n: "06", name: "Handover", text: "Snagging, keys and aftercare." },
];

/** /about — full About page */
export default function AboutPage() {
  return (
    <>
      {/* 1. Page intro */}
      <section className="bg-sand pt-40 pb-16 md:pt-48 md:pb-24">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10">
          <p className="text-xs tracking-[0.2em] text-earth">ABOUT STOARC</p>
          <h1 className="font-display mt-4 max-w-5xl text-5xl font-semibold leading-[1.02] tracking-tight md:text-8xl">
            Designing spaces that inspire the human spirit
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/80">
            STOARC is a studio of architects working across residential communities, mixed-use developments,
            commercial towers and urban masterplans — always placing human experience at the centre of design.
          </p>
        </div>
      </section>

      {/* 2. Journey: History / Mission / Vision + stats */}
      <About showMore={false} />

      {/* 3. Five pillars */}
      <Pillars />

      {/* 4. Services */}
      <section className="bg-sand">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <p className="text-xs tracking-[0.2em] text-earth">WHAT WE DO</p>
          <h2 className="font-display mt-3 mb-14 text-4xl font-semibold md:text-6xl">Services</h2>
          <div className="border-t border-line">
            {services.map((s) => (
              <div
                key={s.n}
                className="reveal grid gap-4 border-b border-line py-8 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline md:gap-10"
              >
                <span className="text-sm text-earth">{s.n}</span>
                <h3 className="font-display text-2xl font-semibold md:text-3xl">{s.name}</h3>
                <p className="text-ink/80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1440px] px-6 py-24 md:px-10 md:py-32">
          <p className="text-xs tracking-[0.2em] text-earth">HOW WE WORK</p>
          <h2 className="font-display mt-3 mb-14 text-4xl font-semibold md:text-6xl">From brief to handover</h2>
          <ol className="grid gap-0 sm:grid-cols-2 lg:grid-cols-6">
            {process.map((p) => (
              <li key={p.n} className="reveal border-t-2 border-line py-6 pr-6 transition-colors hover:border-[#C6A36A]">
                <span className="font-display text-4xl font-semibold text-[#C6A36A]">{p.n}</span>
                <strong className="mt-3 block text-lg font-semibold">{p.name}</strong>
                <span className="mt-1 block text-sm text-earth">{p.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6. Call to action */}
      <section className="bg-sand">
        <div className="mx-auto flex max-w-[1440px] flex-col items-start gap-8 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 md:py-32">
          <h2 className="font-display max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
            Have a site, a brief or an idea? Let’s talk.
          </h2>
          <Link
            href="#contact"
            className="inline-flex min-h-12 shrink-0 items-center gap-2 rounded-full bg-ink px-8 text-sm text-sand transition hover:bg-earth"
          >
            Start a project <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}