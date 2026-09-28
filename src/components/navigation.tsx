"use client";

import { useEffect, useRef, useState } from "react";
import { Arrow, BrandLockup } from "./brand";

const links = [["The work", "#work"], ["What we build", "#build"], ["The studio", "#studio"]];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 821px)");
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => { document.removeEventListener("keydown", close); document.removeEventListener("pointerdown", outside); media.removeEventListener("change", resize); };
  }, [open]);

  return <header className="site-header" ref={header}>
    <div className="nav-inner container">
      <a className="home-link" href="#top" aria-label="Automated Brands home" onClick={() => setOpen(false)}><BrandLockup id="header" /></a>
      <nav className="desktop-nav" aria-label="Primary navigation">{links.map(([label, href]) => <a key={href} href={href}>{label}</a>)}</nav>
      <div className="nav-actions"><a className="button button-small button-silver" href="#start" onClick={() => setOpen(false)}>Let&apos;s build <Arrow diagonal /></a><button className="menu-toggle" ref={toggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span className={open ? "menu-lines is-open" : "menu-lines"}><i /><i /></span></button></div>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>{links.map(([label, href], i) => <a key={href} href={href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{label}<Arrow /></a>)}</nav>
  </header>;
}
