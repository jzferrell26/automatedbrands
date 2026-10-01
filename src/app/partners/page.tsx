import Link from "next/link";
import { Arrow } from "@/components/brand";
import { PartnerPaths } from "@/components/partner-paths";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Partnerships", "Explore distribution partnerships for AutomatedRE and AutomatedLO, or introduce a business opportunity grounded in real industry knowledge.", "/partners");

const questions = [
  ["Is this an affiliate sign-up?", "Not automatically. This is a conversation about fit. Any referral program, commission, integration, or distribution arrangement depends on the brand and an agreed set of terms. The product websites remain the home for product-specific offers."],
  ["Do I need a finished product idea?", "No. A clear problem, firsthand knowledge of the market, and access to the people who experience it are a useful starting point. We can discuss whether there is a worthwhile business behind the idea."],
  ["Are you offering investment or automatic co-founder arrangements?", "No. These pages invite a conversation, not a funding application or a promise of equity. Any potential collaboration needs its own scope, responsibilities, and agreement."],
  ["Where do I go for product pricing or support?", "Go directly to AutomatedRE or AutomatedLO. Each brand has its own customer experience, resources, and offers. The parent company handles company-level opportunities."],
];

export default function Partners() {
  return <>
    <section className="interior-hero container"><Link className="back-link" href="/">← Automated Brands</Link><p className="eyebrow">PARTNER WITH US</p><h1>Different strengths.<br /><span className="silver-text">Something better together.</span></h1><p className="interior-description">The right partnership starts with something real: an audience you understand, a problem you know firsthand, or a better way to bring a useful product to market.</p></section>
    <section className="partner-section paper section-pad" aria-labelledby="choose-path"><div className="container"><div className="section-heading"><div><p className="eyebrow">CHOOSE YOUR STARTING POINT</p><h2 id="choose-path">Two ways to<br /><span>start a conversation.</span></h2></div><p>Distribution helps an existing brand reach its customers. A business opportunity explores what could be built next.</p></div><PartnerPaths /><div className="partner-endnote"><p>Need something built specifically for your business?</p><Link href="/build-with-us" className="text-link">Explore selected custom builds <Arrow /></Link></div></div></section>
    <section className="faq-section section-pad"><div className="container faq-layout"><div><p className="eyebrow">BEFORE WE CONNECT</p><h2>A little clarity<br /><span className="silver-text">goes a long way.</span></h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>
    <section className="product-routing container"><p>Looking for a product, not a partnership?</p><a href="https://www.automatedre.com" target="_blank" rel="noopener noreferrer" className="text-link">Visit AutomatedRE <Arrow diagonal /></a><a href="https://automatedlo.com" target="_blank" rel="noopener noreferrer" className="text-link">Visit AutomatedLO <Arrow diagonal /></a></section>
  </>;
}
