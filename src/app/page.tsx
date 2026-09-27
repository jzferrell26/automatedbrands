const brands = [
  {
    name: "AutomatedLO",
    eyebrow: "Mortgage technology",
    description:
      "Purpose-built systems, education, and automation for modern loan officers and mortgage teams.",
    href: "https://automatedlo.com",
  },
  {
    name: "AutomatedRE",
    eyebrow: "Real estate technology",
    description:
      "Listing marketing, property experiences, and intelligent tools built around the way real estate teams actually work.",
    href: "https://automatedre.com",
  },
];

const capabilities = [
  ["01", "Custom software", "Internal tools, client portals, operational platforms, and products that fit the business instead of forcing the business to fit the software."],
  ["02", "AI systems", "Useful AI woven into real workflows: reasoning, voice, data handling, content generation, and decision support where it actually earns its keep."],
  ["03", "Connected operations", "Integrations and automation that remove repetitive work, connect fragmented systems, and make the whole operation feel like one product."],
];

const steps = [
  ["Understand", "We get close to the problem, the people, and the current process before prescribing a solution."],
  ["Architect", "We define the product, the workflow, and the smallest version worth putting in front of real users."],
  ["Build", "We design and engineer the experience end to end, with speed without treating quality like an optional upgrade."],
  ["Ship", "We launch, learn from usage, and keep improving what matters instead of protecting a stale first version."],
];

function Mark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F6F8FB" />
          <stop offset="0.5" stopColor="#B6C0CC" />
          <stop offset="1" stopColor="#707B88" />
        </linearGradient>
        <linearGradient id="ice" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#4AB8FF" />
          <stop offset="1" stopColor="#A9EBFF" />
        </linearGradient>
      </defs>
      <path d="M11 82 43 18h18L29 82H11Z" fill="url(#ice)" />
      <path d="M43 18h18l28 64H69L57 53H42l8-16h15L57 18H43Z" fill="url(#steel)" />
      <path d="M43 61h21l8 18H34l9-18Z" fill="url(#steel)" opacity=".94" />
    </svg>
  );
}

export default function Home() {
  return (
    <main className="site-shell">
      <header className="nav-wrap">
        <a className="brand-lockup" href="#top" aria-label="Automated Brands home">
          <Mark className="brand-mark" />
          <span className="brand-copy"><strong>AUTOMATED</strong><span>BRANDS</span></span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#brands">Our Brands</a>
          <a href="#build">What We Build</a>
          <a href="#process">Process</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-cta" href="mailto:hello@automatedbrands.com?subject=I%20have%20an%20idea">Let&apos;s Build</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow"><span /> SOFTWARE · AI · PRODUCTS</div>
          <h1>You know that thing you wish existed?</h1>
          <h2>We build it.</h2>
          <p>
            Automated Brands turns ambitious ideas and complicated business problems into software,
            AI systems, and products people can actually use.
          </p>
          <div className="hero-actions">
            <a className="primary-button" href="mailto:hello@automatedbrands.com?subject=Tell%20us%20what%20you%27re%20thinking">Tell us what you&apos;re thinking <span>↗</span></a>
            <a className="text-link" href="#brands">See what we&apos;ve built <span>↓</span></a>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="orb orb-a" />
          <div className="orb orb-b" />
          <div className="mark-stage">
            <div className="stage-line stage-line-one" />
            <div className="stage-line stage-line-two" />
            <Mark className="hero-mark" />
          </div>
          <div className="micro-tag tag-one">IDEA → SYSTEM</div>
          <div className="micro-tag tag-two">BUILD / TEST / SHIP</div>
        </div>

        <div className="hero-foot">
          <span>BIG IDEAS.</span>
          <strong>BUILT.</strong>
        </div>
      </section>

      <section className="manifesto" id="about">
        <div className="section-kicker">THE COMPANY BEHIND THE BUILD</div>
        <div className="manifesto-grid">
          <h3>Some ideas sound ambitious<br />until someone builds them.</h3>
          <div className="manifesto-copy">
            <p>
              We create our own software brands and partner with businesses that have a valuable idea,
              an expensive recurring problem, or a process their current tools cannot handle well.
            </p>
            <p>
              The goal is not another impressive demo. It&apos;s something useful enough to change how the work gets done.
            </p>
          </div>
        </div>
      </section>

      <section className="brands-section" id="brands">
        <div className="section-heading-row">
          <div>
            <div className="section-kicker">OUR BRANDS</div>
            <h3>Focused products.<br />One builder behind them.</h3>
          </div>
          <p>AutomatedLO and AutomatedRE are the first chapters. They are proof of how we think, not a boundary on where we go next.</p>
        </div>

        <div className="brand-card-grid">
          {brands.map((brand, index) => (
            <a className="brand-card" href={brand.href} key={brand.name} target="_blank" rel="noreferrer">
              <div className="brand-card-top">
                <span>0{index + 1}</span>
                <span>VIEW BRAND ↗</span>
              </div>
              <div className="brand-card-display">
                <div className={`product-glyph glyph-${index + 1}`}>{index === 0 ? "LO" : "RE"}</div>
                <div className="product-name">{brand.name}</div>
              </div>
              <div className="brand-card-bottom">
                <div className="brand-eyebrow">{brand.eyebrow}</div>
                <p>{brand.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="build-section" id="build">
        <div className="section-kicker">WHAT WE BUILD</div>
        <div className="build-intro">
          <h3>When off-the-shelf<br />stops being enough.</h3>
          <p>We build around the business problem first, then choose the technology that makes the answer possible.</p>
        </div>
        <div className="capability-list">
          {capabilities.map(([num, title, copy]) => (
            <article className="capability" key={num}>
              <div className="cap-num">{num}</div>
              <h4>{title}</h4>
              <p>{copy}</p>
              <div className="cap-arrow">↗</div>
            </article>
          ))}
        </div>
      </section>

      <section className="process-section" id="process">
        <div className="process-head">
          <div>
            <div className="section-kicker">HOW WE WORK</div>
            <h3>Move fast.<br />Build deliberately.</h3>
          </div>
          <p>Speed matters. So does building the right thing. Our process is designed to protect both.</p>
        </div>
        <div className="process-grid">
          {steps.map(([title, copy], index) => (
            <article key={title} className="process-card">
              <div className="process-index">0{index + 1}</div>
              <h4>{title}</h4>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta">
        <div className="cta-noise" aria-hidden="true" />
        <div className="section-kicker">THE NEXT BUILD</div>
        <h3>What should exist in your business that doesn&apos;t yet?</h3>
        <p>Bring us the idea, the bottleneck, or the impossible-sounding ask. We&apos;ll figure out what deserves to be built.</p>
        <a className="primary-button light" href="mailto:hello@automatedbrands.com?subject=Let%27s%20build%20something">Let&apos;s build something <span>↗</span></a>
      </section>

      <footer>
        <div className="footer-brand"><Mark className="footer-mark" /><span>AUTOMATED BRANDS</span></div>
        <div className="footer-copy">Software. AI. Products. <strong>Big ideas. Built.</strong></div>
        <div className="footer-meta">© 2026 Automated Brands</div>
      </footer>
    </main>
  );
}
