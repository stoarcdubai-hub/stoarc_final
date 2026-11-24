import { site } from "@/content/site";

/** Social icons — matched by the label in site.social */
function SocialIcon({ label }: { label: string }) {
  const name = label.toLowerCase();

  if (name.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor" aria-hidden="true">
        <circle cx="5" cy="5.5" r="2.25" />
        <rect x="3" y="9.5" width="4" height="11" rx="0.5" />
        <path d="M9.5 9.5h3.8v1.6h.06c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.77 2.65 4.77 6.1v5.35h-4v-4.75c0-1.13-.02-2.6-1.58-2.6-1.59 0-1.83 1.24-1.83 2.52v4.83h-4z" />
      </svg>
    );
  }

  return null;
}

/** Section 5: footer on ink */
export default function Footer() {
  const tel = site.phone.replace(/[^\d+]/g, "");

  return (
    <footer id="contact" className="bg-ink text-sand">
      <div className="mx-auto max-w-[1440px] px-6 py-20 md:px-10 md:py-28">
        {/* Call to action */}
        <h2 className="font-display max-w-3xl text-4xl font-semibold leading-tight md:text-6xl">
          Let’s build something that lasts.
        </h2>
        <a
          href={`mailto:${site.email}`}
          className="mt-6 inline-flex items-center gap-2 text-lg text-[#C6A36A] underline-offset-4 hover:underline"
        >
          {site.email} <span aria-hidden="true">→</span>
        </a>

        <div className="mt-16 grid gap-10 border-t border-white/15 pt-12 text-sm sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-12">
          {/* Brand — text wordmark for now; swap for the logo image when ready */}
          <div>
            <p className="font-display text-2xl font-semibold tracking-[0.35em] md:text-3xl">{site.name}</p>
            <p className="mt-4 max-w-[16rem] leading-relaxed text-muted">
              Architecture · Interiors · Planning
            </p>
          </div>

          {/* Studio */}
          <div>
            <p className="text-xs tracking-[0.2em] text-[#C6A36A]">STUDIO</p>
            <address className="mt-4 not-italic leading-relaxed text-muted">
              {site.address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs tracking-[0.2em] text-[#C6A36A]">CONTACT</p>
            <a href={`tel:${tel}`} className="mt-4 block text-muted transition hover:text-sand">
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="mt-1 block text-muted transition hover:text-sand">
              {site.email}
            </a>
          </div>

          {/* Follow */}
          <div>
            <p className="text-xs tracking-[0.2em] text-[#C6A36A]">FOLLOW</p>
            <div className="mt-4 flex gap-3">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`STOARC on ${s.label}`}
                  title={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-sand transition hover:border-[#C6A36A] hover:bg-[#C6A36A] hover:text-ink"
                >
                  <SocialIcon label={s.label} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p>Dubai, United Arab Emirates</p>
        </div>
      </div>
    </footer>
  );
}