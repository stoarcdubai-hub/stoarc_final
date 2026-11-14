"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster?: string;
  className?: string;
  eager?: boolean;
  /** Start (and loop back to) this second instead of 0 */
  startAt?: number;
};

/**
 * eager = true  → starts downloading immediately (top-of-page videos)
 * eager = false → only downloads when near the screen, pauses when scrolled away
 * startAt       → begins at that second and loops back to it
 */
export default function LazyVideo({ src, poster, className = "", eager = false, startAt = 0 }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(eager);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLoad(false);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setLoad(true);
          v.play().catch(() => {});
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

  // Jump to the start point once the video knows its length
  const onLoadedMetadata = () => {
    const v = ref.current;
    if (v && startAt > 0 && startAt < v.duration) v.currentTime = startAt;
  };

  // Loop back to the start point instead of 0
  const onEnded = () => {
    const v = ref.current;
    if (!v) return;
    v.currentTime = startAt;
    v.play().catch(() => {});
  };

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={poster}
      className={className}
      onLoadedMetadata={onLoadedMetadata}
      onEnded={onEnded}
      autoPlay={eager}
      muted
      loop={startAt === 0}
      playsInline
      preload={eager ? "auto" : "none"}
      aria-hidden="true"
    />
  );
}