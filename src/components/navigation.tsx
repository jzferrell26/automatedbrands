"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow, BrandLockup } from "./brand";

const sections = [["Our brands", "brands"], ["Our approach", "approach"], ["The company", "company"]];

export function Navigation() {
  const pathname = usePathname();
  return <NavigationMenu key={pathname} pathname={pathname} />;
}

function NavigationMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  const sectionHref = (id: string) => pathname === "/" ? `#${id}` : `/#${id}`;

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") { setOpen(false); toggle.current?.focus(); }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 961px)");
    const resize = () => { if (media.matches) setOpen(false); };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);

  return <header className="site-header" ref={header}>
    <div className="nav-inner container">
      <Link className="home-link" href="/" aria-label="Automated Brands home" onClick={() => setOpen(false)}><BrandLockup id="header" /></Link>
      <nav className="desktop-nav" aria-label="Primary navigation">{sections.map(([label, id]) => <Link key={id} href={sectionHref(id)}>{label}</Link>)}</nav>
      <div className="nav-actions">
        <Link className="button button-small button-silver" href="/partners" aria-current={pathname === "/partners" ? "page" : undefined} onClick={() => setOpen(false)}>Partner with us <Arrow diagonal /></Link>
        <button className="menu-toggle" ref={toggle} aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} aria-controls="mobile-navigation" onClick={() => setOpen(!open)}><span className={open ? "menu-lines is-open" : "menu-lines"}><i /><i /></span></button>
      </div>
    </div>
    <nav id="mobile-navigation" className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
      {sections.map(([label, id], i) => <Link key={id} href={sectionHref(id)} onClick={() => setOpen(false)}><span className="mono">0{i + 1}</span>{label}<Arrow /></Link>)}
      <Link href="/partners" onClick={() => setOpen(false)}><span className="mono">04</span>Partnerships<Arrow /></Link>
    </nav>
    <noscript><style>{`.menu-toggle { display: none !important; } .no-js-nav { display: flex !important; }`}</style></noscript>
    <nav className="no-js-nav container" aria-label="Navigation without JavaScript">{sections.map(([label, id]) => <a key={id} href={sectionHref(id)}>{label}</a>)}</nav>
  </header>;
}
