"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";

/** Compact floating glass capsule header: logo left, links centre, contact right. */
export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  const overVideo = pathname === "/" && !scrolled && !open;
  const links = site.nav.filter((l) => l.label !== "Contact");

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-3 md:pt-4">
      <div
        className={`mx-auto grid max-w-[720px] grid-cols-[1fr_auto] items-center rounded-full border border-[#C6A36A]/60 py-1 pl-4 pr-1 shadow-[0_6px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-colors duration-500 md:grid-cols-[1fr_auto_1fr] ${
          overVideo ? "bg-white/10 text-white" : "bg-sand/60 text-ink"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="font-display text-xs font-semibold tracking-[0.3em] md:text-sm">
          {site.name}
        </Link>

        {/* Centre links */}
        <nav aria-label="Main" className="hidden items-center text-xs md:flex">
          {links.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3 py-1.5 transition hover:bg-[#C6A36A]/15 ${
                  active ? "bg-[#C6A36A]/20" : ""
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: contact (desktop) / menu (mobile) */}
        <div className="flex justify-end">
          <Link
            href="#contact"
            className="hidden min-h-8 items-center rounded-full border border-[#C6A36A]/70 px-4 text-xs transition hover:bg-[#C6A36A] hover:text-ink md:inline-flex"
          >
            Contact
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex min-h-9 items-center px-3 text-[10px] tracking-[0.25em] md:hidden"
          >
            {open ? "CLOSE" : "MENU"}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav
          aria-label="Mobile"
          className="mx-auto mt-2 flex max-w-[720px] flex-col gap-1 rounded-3xl border border-[#C6A36A]/60 bg-sand/80 p-3 text-ink backdrop-blur-xl md:hidden"
        >
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-2xl px-4 py-2.5 text-lg hover:bg-[#C6A36A]/15">
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}