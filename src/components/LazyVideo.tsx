"use client";

import { useEffect, useRef, useState } from "react";

type Props = { src: string; poster?: string; className?: string };

/**
 * Video that only downloads when it's near the screen,
 * plays while visible and pauses when scrolled away.
 * Respects "reduce motion" settings (shows the poster image only).
 */
export default function LazyVideo({ src, poster, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!reduce) setLoad(true);
          if (!reduce) v.play().catch(() => {});
        } else {
          v.pause();
        }
      },
      { rootMargin: "200px" }
    );
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (load) ref.current?.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      className={className}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
    />
  );
}