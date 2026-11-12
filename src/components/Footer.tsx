import Link from "next/link";
import { site } from "@/content/site";

/** Section 5: footer on ink */
export default function Footer() {
  return (
    <footer id="contact" className="bg-ink text-sand">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10">
        <h2 className="font-display max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Let’s build something that lasts.
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-block text-lg text-muted underline-offset-4 hover:underline"
        >
          {site.email}
        </a>

        <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 text-sm sm:grid-cols-2 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-semibold tracking-[0.25em]">{site.name}</p>
            <p className="mt-2 text-muted">Architecture · Interiors</p>
          </div>
          <div>
            <p className="font-semibold">Studio</p>
            {site.address.map((line) => (
              <p key={line} className="mt-1 text-muted">
                {line}
              </p>
            ))}
          </div>
          <div>
            <p className="font-semibold">Contact</p>
            <p className="mt-1 text-muted">{site.phone}</p>
            <p className="mt-1 text-muted">{site.email}</p>
          </div>
          <div>
            <p className="font-semibold">Follow</p>
            {site.social.map((s) => (
              <Link key={s.label} href={s.href} className="mt-1 block text-muted hover:text-sand">
                {s.label}
              </Link>
            ))}
          </div>
        </div>
        <p className="mt-12 text-xs text-muted">
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}