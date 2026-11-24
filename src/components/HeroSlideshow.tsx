"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

/** Images shown in the hero's centre window, in order */
const slides = [
  "/hero/hero-1.jpg",
  "/hero/hero-2.jpg",
  "/hero/hero-3.jpg",
  "/hero/hero-4.jpg",
];

/** Auto slideshow: soft crossfade every 3 seconds with a slow zoom, loops 1 → 4. */
export default function HeroSlideshow({ interval = 3000 }: { interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    // Respect visitors who turn off motion in their phone/computer settings
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => window.clearInterval(id);
  }, [interval]);

  return (
    <div className="absolute inset-0" aria-hidden="true">
      {slides.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="(min-width: 1536px) 520px, (min-width: 768px) 420px, (min-width: 640px) 380px, 320px"
          className={`object-cover ${i === index ? "scale-[1.06] opacity-100" : "scale-100 opacity-0"}`}
          style={{
            transitionProperty: "opacity, transform",
            transitionDuration: "900ms, 4000ms",
            transitionTimingFunction: "ease-out",
          }}
        />
      ))}
    </div>
  );
}