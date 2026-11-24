import Link from "next/link";
import { media } from "@/content/media";
import { site } from "@/content/site";
import LazyVideo from "./LazyVideo";

/** Section 1: full-screen background video + framed video window in the middle */
export default function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden bg-ink text-white">
      {/* Background video: plays on all devices (phones and PC).
          Zoomed from top-left to crop out the ✦ mark. */}
      <div className="absolute inset-0" aria-hidden="true">
        <LazyVideo
          className="h-full w-full origin-top-left scale-[1.15] object-cover"
          src={media.hero.video}
          eager
        />
      </div>

      {/* Darken so text and the window stand out: overall black shade + stronger fade at the bottom */}
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-black/60 to-transparent" aria-hidden="true" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1440px] flex-col px-5 pt-24 pb-8 sm:px-6 md:px-10 md:pt-28 md:pb-10 2xl:max-w-[1680px]">
        {/* Top line */}
        <p className="text-[10px] tracking-[0.3em] text-sand/90 sm:text-xs">ARCHITECTURE · INTERIORS · PLANNING</p>

        {/* Centre: framed landscape video window
            Phone 320px · Tablet 380px · PC 420px · Large screens 520px */}
        <div className="flex flex-1 items-center justify-center py-8">
          <div className="group relative aspect-[16/10] w-full max-w-[320px] overflow-hidden rounded-xl border border-white/20 bg-ink shadow-2xl sm:max-w-[380px] md:max-w-[420px] 2xl:max-w-[520px]">
            {/* eager = starts downloading immediately; zoomed to crop out the ✦ mark */}
            <LazyVideo
              className="absolute inset-0 h-full w-full origin-top-left scale-[1.15] object-cover transition duration-700 group-hover:scale-[1.2]"
              src={media.hero.insetVideo}
              eager
            />
            <div className="absolute inset-0 bg-ink/20" aria-hidden="true" />
            <Link
              href="/#about"
              className="absolute inset-0 flex items-center justify-center"
              aria-label="Watch our story"
            >
              <span className="flex items-center gap-3 rounded-full border border-white/70 bg-ink/30 px-5 py-2.5 text-[11px] tracking-[0.25em] backdrop-blur-sm transition group-hover:bg-white group-hover:text-ink">
                <span aria-hidden="true">▶</span> OUR STORY
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom: headline left, text + buttons right */}
        <div className="flex flex-wrap items-end justify-between gap-6 md:gap-8">
          <h1 className="font-display max-w-3xl text-4xl font-semibold leading-[0.95] tracking-tight text-sand sm:text-5xl md:text-6xl lg:text-7xl 2xl:max-w-4xl 2xl:text-8xl">
            {site.tagline}
          </h1>
          <div className="flex max-w-xs flex-col gap-4 md:gap-5 2xl:max-w-sm">
            <p className="text-sm leading-relaxed text-sand/90 2xl:text-base">
              Homes, workplaces and public spaces designed with lasting materials and quiet clarity.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex min-h-12 w-fit items-center rounded-full bg-sand px-7 text-sm text-ink transition hover:bg-white"
              >
                View projects
              </Link>
              {/* Extra Our story button on phones */}
              <Link
                href="/#about"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-white/60 px-5 text-xs tracking-[0.2em] md:hidden"
              >
                <span aria-hidden="true">▶</span> OUR STORY
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="mt-6 flex items-center gap-3 text-[11px] tracking-[0.3em] text-sand/70 md:mt-8" aria-hidden="true">
          <span className="h-8 w-px animate-pulse bg-sand/70" />
          SCROLL
        </div>
      </div>
    </section>
  );
}