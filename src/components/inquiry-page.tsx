import Link from "next/link";
import { InquiryForm } from "./inquiry-form";
import { Arrow } from "./brand";
import type { InquiryKind } from "@/lib/inquiries";

type InquiryPageProps = {
  kind: InquiryKind;
  eyebrow: string;
  title: string;
  description: string;
  fit: string[];
  note: string;
};

export function InquiryPage({ kind, eyebrow, title, description, fit, note }: InquiryPageProps) {
  return <>
    <section className="interior-hero container">
      <Link href="/partners" className="back-link">← Partnership paths</Link>
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="interior-description">{description}</p>
    </section>
    <section className="inquiry-section paper section-pad" aria-label="Prepare your introduction">
      <div className="container inquiry-layout">
        <aside className="inquiry-aside"><p className="eyebrow">A USEFUL STARTING POINT</p><h2>Start with the fit.</h2><ul>{fit.map(item => <li key={item}>{item}</li>)}</ul><p>{note}</p><div className="next-step-note"><span className="mono">WHAT HAPPENS NEXT</span><p>You send an introduction. We review the fit and discuss a practical next step if there&apos;s a match. Scope and terms are agreed separately.</p></div><Link href={kind === "project" ? "/partners" : "/#brands"} className="text-link">{kind === "project" ? "Looking for a partnership instead?" : "Get to know the brands"} <Arrow /></Link></aside>
        <InquiryForm kind={kind} />
      </div>
    </section>
  </>;
}
