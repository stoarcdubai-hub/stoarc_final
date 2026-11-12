"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/** Smooth scrolling (desktop only) + reveal-on-scroll for elements with class "reveal". */
export default function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(hover: none)").matches;

    // Smooth scroll only on desktop with mouse/trackpad; phones keep native scrolling
    const lenis =
      reduce || touch
        ? null
        : new Lenis({
            lerp: 0.1,
            anchors: { offset: -100 }, // smooth #links, stop below the floating header
          });

    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    if (lenis) raf = requestAnimationFrame(loop);

    // Reveal-on-scroll
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );

    const observe = () =>
      document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => io.observe(el));
    observe();

    // Re-check for new .reveal elements, but at most once per frame (cheap)
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        observe();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pending);
      lenis?.destroy();
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return null;
}