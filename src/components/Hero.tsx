import Link from "next/link";
import { media } from "@/content/media";
import { site } from "@/content/site";

/** Section 1: full-screen background video + framed video window in the middle */
export default function Hero() {
  return (
    <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-ink text-white">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full scale-105 object-cover"
        src={media.hero.video}
        poster={media.hero.poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
      {/* Darken + warm tint so text and the window stand out */}
      <div className="absolute inset-0 bg-ink/45" aria-hidden="true" />

      <div className="relative mx-auto flex h-full max-w-[1440px] flex-col px-6 pt-28 pb-10 md:px-10">
        {/* Top line */}
        <p className="text-xs tracking-[0.3em] text-sand/90">ARCHITECTURE · INTERIORS · PLANNING</p>

        {/* Centre: framed video window */}
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="group relative aspect-[16/10] w-full max-w-[640px] overflow-hidden rounded-xl border border-white/20 shadow-2xl">
            <video
              className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              src={media.hero.insetVideo}
              poster={media.hero.insetPoster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
            <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
            <Link
              href="/#about"
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Watch our story"
            >
              <span className="flex items-center gap-3 rounded-full border border-white/70 bg-ink/30 px-6 py-3 text-xs tracking-[0.25em] backdrop-blur-sm transition group-hover:bg-white group-hover:text-ink">
                <span aria-hidden="true">▶</span> OUR STORY
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom: headline left, text + button right */}
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h1 className="font-display max-w-3xl text-5xl font-semibold leading-[0.95] tracking-tight text-sand md:text-7xl lg:text-8xl">
            {site.tagline}
          </h1>
          <div className="flex max-w-xs flex-col gap-5">
            <p className="text-sm leading-relaxed text-sand/90">
              Homes, workplaces and public spaces designed with lasting materials and quiet clarity.
            </p>
            <Link
              href="/projects"
              className="inline-flex min-h-12 w-fit items-center rounded-full bg-sand px-7 text-sm text-ink transition hover:bg-white"
            >
              View projects
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-8 flex items-center gap-3 text-[11px] tracking-[0.3em] text-sand/70" aria-hidden="true">
          <span className="h-8 w-px animate-pulse bg-sand/70" />
          SCROLL
        </div>
      </div>
    </section>
  );
}