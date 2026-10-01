import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/brand";
import { PartnerPaths } from "@/components/partner-paths";
import { pageMetadata } from "@/lib/site";

export const metadata: Metadata = pageMetadata(
  "Automated Brands | Big Ideas. Built.",
  "We turn better ways of working into businesses. Explore the Automated Brands family, including AutomatedRE and AutomatedLO.",
  "/",
);

const approach = [
  {
    title: "Find the friction.",
    copy: "Start where the work gets harder than it should be. Understand the people, the repeat problems, and what a genuinely better way would mean.",
    note: "A real problem. A clear audience.",
  },
  {
    title: "Build the solution.",
    copy: "Turn that understanding into something useful. Software, practical AI, systems, or education—the problem decides the form, not the other way around.",
    note: "Useful by design. Built to be used.",
  },
  {
    title: "Grow the business.",
    copy: "A launch is a beginning. Keep listening to customers, improving the experience, and finding the right ways to reach the people it was built for.",
    note: "The product matters. So does what follows.",
  },
];

export default function Home() {
  return <>
    <section className="company-hero" id="top" aria-labelledby="hero-title">
      <div className="hero-lines" aria-hidden="true"><span /><span /><span /></div>
      <div className="container">
        <div className="hero-overline"><p className="eyebrow">A FAMILY OF BRANDS. A SHARED AMBITION.</p><span className="mono">BIG IDEAS. <b>BUILT.</b></span></div>
        <div className="company-hero-grid">
          <h1 id="hero-title">We turn better<br className="desktop-break" /> ways of working<br className="desktop-break" /> <span className="silver-text">into businesses.</span></h1>
          <aside className="hero-conviction" aria-label="Our perspective">
            <span className="mono">THE COMMON THREAD</span>
            <p>There has to be<br />a better way.</p>
            <span className="conviction-rule" aria-hidden="true" />
            <p className="conviction-answer">We build<br />around that.</p>
          </aside>
        </div>
        <div className="hero-lower">
          <p>Automated Brands builds and grows software, systems, and focused brands around real business problems. Different markets. The same drive to make things work better.</p>
          <div className="hero-actions"><a className="button button-silver" href="#brands">Explore our brands <Arrow /></a><Link className="text-link" href="/partners">Partner with us <Arrow diagonal /></Link></div>
        </div>
        <div className="family-index" aria-label="Meet the brand family"><span className="mono">THE FIRST CHAPTERS</span><a href="#automatedre">Automated<span>RE</span> <Arrow diagonal /></a><a href="#automatedlo">Automated<span>LO</span> <Arrow diagonal /></a><p>Not the boundaries.</p></div>
      </div>
    </section>

    <section className="brands-section section-pad paper" id="brands" aria-labelledby="brands-title">
      <span id="work" className="legacy-anchor" aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow">01 / OUR BRANDS</p><h2 id="brands-title">Distinct identities.<br /><span>Shared ambition.</span></h2></div><p>Each brand has its own audience, its own purpose, and a better way of doing things. Automated Brands is the company behind them.</p></div>

        <article className="brand-chapter re-chapter" id="automatedre" aria-labelledby="re-title" data-reveal>
          <div className="brand-chapter-copy">
            <div className="chapter-meta mono"><span>01 / SOFTWARE</span><span>REAL ESTATE</span></div>
            <h3 id="re-title">Automated<span className="re-accent">RE</span></h3>
            <p className="brand-promise">A better way to bring<br />a listing to market.</p>
            <p className="brand-description">Property websites and branded marketing, connected to one saved property. Less starting over. More attention on the listing and the people behind it.</p>
            <dl className="brand-facts"><div><dt>Built for</dt><dd>Agents, teams, and brokerages</dd></div><div><dt>Why it exists</dt><dd>Good marketing shouldn&apos;t mean repetitive work.</dd></div></dl>
            <a href="https://www.automatedre.com" target="_blank" rel="noopener noreferrer" className="text-link">Visit AutomatedRE <Arrow diagonal /></a>
          </div>
          <div className="brand-chapter-art re-art">
            <span className="art-label mono">ONE PROPERTY. A CONNECTED EXPERIENCE.</span>
            <div className="property-preview"><Image src="/work/property-website.webp" alt="An AutomatedRE property website, using fictional demonstration content" width={1440} height={1000} sizes="(max-width: 820px) 90vw, 46vw" /></div>
            <div className="property-output"><Image src="/work/property-flyer.webp" alt="A coordinated AutomatedRE flyer with fictional sample property and agent details" width={600} height={800} sizes="(max-width: 820px) 25vw, 13vw" /><span>From the same<br />saved property.</span></div>
            <p className="art-caption">Actual product outputs. Illustrative sample property and office.</p>
          </div>
        </article>

        <article className="brand-chapter lo-chapter" id="automatedlo" aria-labelledby="lo-title" data-reveal>
          <div className="brand-chapter-copy">
            <div className="chapter-meta mono"><span>02 / EDUCATION & SYSTEMS</span><span>MORTGAGE</span></div>
            <h3 id="lo-title">Automated<span className="lo-accent">LO</span></h3>
            <p className="brand-promise">Make the work smarter.<br />Share the way forward.</p>
            <p className="brand-description">Practical training, workflow blueprints, and AI resources for loan officers. Built from the work itself, with a focus on putting better systems into practice.</p>
            <dl className="brand-facts"><div><dt>Built for</dt><dd>Loan officers and mortgage teams</dd></div><div><dt>Why it exists</dt><dd>Better systems should be easier to understand and use.</dd></div></dl>
            <a href="https://automatedlo.com" target="_blank" rel="noopener noreferrer" className="text-link">Visit AutomatedLO <Arrow diagonal /></a>
          </div>
          <div className="brand-chapter-art lo-art">
            <span className="art-label mono">KNOW THE WORK. BUILD A BETTER WAY.</span>
            <div className="lo-preview"><Image src="/work/automatedlo.webp" alt="AutomatedLO's training website, with workflow blueprints for loan officers" width={1280} height={889} sizes="(max-width: 820px) 90vw, 46vw" /></div>
            <div className="lo-topics"><span>Practical training</span><span>Workflow blueprints</span><span>AI resources</span></div>
            <p className="art-caption">Explore the training and resources at AutomatedLO.</p>
          </div>
        </article>
        <div className="brand-endnote"><span className="mono">TWO STARTING POINTS. A WIDER HORIZON.</span><p>Mortgage and real estate are where the first brands began.<br /><strong>The next good problem could be anywhere.</strong></p></div>
      </div>
    </section>

    <section className="approach-section section-pad" id="approach" aria-labelledby="approach-title">
      <span id="build" className="legacy-anchor" aria-hidden="true" /><span id="process" className="legacy-anchor" aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow">02 / OUR APPROACH</p><h2 id="approach-title">The idea is the start.<br /><span className="silver-text">The business is the point.</span></h2></div><p>We don&apos;t build for the novelty of it. We build around a problem, an audience, and a reason for the business to exist.</p></div>
        <ol className="approach-grid">{approach.map((step, i) => <li key={step.title} data-reveal><div className="approach-number"><span className="mono">0{i + 1}</span><Arrow /></div><h3>{step.title}</h3><p>{step.copy}</p><span className="approach-note">{step.note}</span></li>)}</ol>
        <div className="approach-bottom" data-reveal><p>Technology is part of it.<br /><strong>So are customers, distribution, and the day-to-day.</strong></p><span className="mono">BUILT TO WORK.<br />BUILT TO KEEP GETTING BETTER.</span></div>
      </div>
    </section>

    <section className="company-section section-pad" id="company" aria-labelledby="company-title">
      <span id="studio" className="legacy-anchor" aria-hidden="true" />
      <div className="container company-story">
        <div data-reveal><p className="eyebrow">03 / THE COMPANY</p><h2 id="company-title">One company.<br /><span>A bigger possibility.</span></h2></div>
        <div className="company-story-copy" data-reveal><p className="story-lead">A useful product solves a problem.<br />A focused brand gives it a future.</p><p>That&apos;s why Automated Brands exists: to turn better ways of working into businesses with a clear purpose. We bring practical technology and business experience together, while giving each brand room to serve its own customers.</p><p>We start with our own brands. We&apos;re also open to the right people, distribution relationships, and business opportunities that could help build what comes next.</p><div className="founder-note"><div><span className="mono">FOUNDED BY</span><strong>Jonathan Ferrell</strong></div><a href="https://jonathanferrell.com" target="_blank" rel="noopener noreferrer" className="text-link">About the founder <Arrow diagonal /></a></div></div>
      </div>
    </section>

    <section className="partner-section section-pad paper" id="partnerships" aria-labelledby="partner-title">
      <span id="start" className="legacy-anchor" aria-hidden="true" />
      <div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow">04 / WHAT COMES NEXT</p><h2 id="partner-title">The next chapter<br /><span>might start with you.</span></h2></div><p>You may know the audience. You may know a problem that deserves a better answer. Let&apos;s explore where the fit is real.</p></div>
        <PartnerPaths />
        <div className="partner-endnote"><p>A specific project in mind? Custom builds have their own path.</p><Link href="/build-with-us" className="text-link">Explore selected builds <Arrow /></Link></div>
      </div>
    </section>
  </>;
}
