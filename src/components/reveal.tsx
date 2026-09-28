"use client";

import { useEffect } from "react";

/** Content is visible without JS. Only offscreen elements receive entrance motion. */
export function Reveal() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches) return;
    const elements = [...document.querySelectorAll<HTMLElement>("[data-reveal]")];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) if (entry.isIntersecting) {
        entry.target.setAttribute("data-revealed", "true");
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.08, rootMargin: "0px 0px -24px 0px" });
    elements.forEach(element => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.setAttribute("data-revealed", "false");
        observer.observe(element);
      }
    });
    const revealAll = () => { if (media.matches) elements.forEach(e => e.setAttribute("data-revealed", "true")); };
    media.addEventListener("change", revealAll);
    return () => { observer.disconnect(); media.removeEventListener("change", revealAll); elements.forEach(e => e.removeAttribute("data-revealed")); };
  }, []);
  return null;
}
