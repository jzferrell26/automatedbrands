import type { SVGProps } from "react";

export function Arrow({ diagonal = false, ...props }: SVGProps<SVGSVGElement> & { diagonal?: boolean }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{diagonal ? <path d="M6 18 18 6M6 6h12v12" /> : <path d="M4 12h15m-6-6 6 6-6 6" />}</svg>;
}

/** Shared geometry and explicit SVG namespaces keep every instance consistent. */
export function BrandMark({ id, className = "" }: { id: string; className?: string }) {
  return <svg viewBox="0 0 100 88" className={className} aria-hidden="true">
    <defs>
      <linearGradient id={`${id}-blue`} x1="0" y1="1" x2="1" y2="0"><stop stopColor="#45BAFF" /><stop offset="1" stopColor="#A9EBFF" /></linearGradient>
      <linearGradient id={`${id}-silver`} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#F5F7FA" /><stop offset=".5" stopColor="#C4CDD8" /><stop offset="1" stopColor="#788491" /></linearGradient>
    </defs>
    <path d="M44 7h18l31 72H72L44 7Z" fill={`url(#${id}-silver)`} />
    <path d="M7 79 44 7h18L28 79H7Z" fill={`url(#${id}-blue)`} />
    <path d="M42 59h22l9 20H32l10-20Z" fill={`url(#${id}-silver)`} />
  </svg>;
}

export function BrandLockup({ id }: { id: string }) {
  return <span className="brand-lockup"><BrandMark id={id} className="brand-mark" /><span className="brand-wordmark"><strong>AUTOMATED</strong><span>BRANDS</span></span></span>;
}
