import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
};

// /blog — post list. Posts will come from Sanity (not connected yet).
export default function BlogPage() {
  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-[1440px] px-6 pb-16 pt-28 md:px-10 md:pb-20 md:pt-36">
        <h1 className="font-display text-[32px] font-semibold leading-tight md:text-5xl">Blog</h1>

        <p className="mt-6 text-[15px] leading-relaxed text-ink/80 md:mt-8 md:text-base">No posts yet.</p>
      </div>
    </section>
  );
}
