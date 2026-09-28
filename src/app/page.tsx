import Image from "next/image";
import { Arrow, BrandLockup } from "@/components/brand";
import { Navigation } from "@/components/navigation";
import { Reveal } from "@/components/reveal";
import { Capabilities } from "@/components/capabilities";
import { ProjectBrief } from "@/components/project-brief";

const process = [
  { title: "Find the real problem.", copy: "We look at the people, the workflow, and what is actually getting in the way. The best build starts with the right question.", output: "A clear problem worth solving" },
  { title: "Design the right first version.", copy: "Define the experience, connect the pieces, and agree on what the first release needs to do. Ambition gets a practical plan.", output: "A scoped product blueprint" },
  { title: "Make it real. Make it work.", copy: "Design and engineering move together. Review working software, test the important paths, and improve the details that people feel.", output: "A working, tested product" },
  { title: "Launch. Learn. Keep building.", copy: "Put it in people's hands. Support and future improvements are agreed up front, so the next chapter has a clear owner.", output: "A launch and a plan for what follows" },
];

const questions = [
  ["Do you only build for mortgage and real estate?", "No. Those are the industries behind our first two brands, not the boundaries of the studio. We start with the business problem, whether that means a new platform, a customer experience, or a better internal workflow."],
  ["What if I have an idea, but not a technical plan?", "That's a good starting point. Discovery turns the idea into a clear problem, a proposed experience, and a realistic first-release scope. You don't need a technical specification to start a conversation."],
  ["Can you work with the tools we already use?", "Yes, when the tools provide suitable integration access. We look at what should stay, what needs connecting, and what actually requires custom development before proposing a rebuild."],
  ["How do pricing and timelines work?", "Custom projects are scoped around the work, not forced into a generic package. We define the deliverables, dependencies, budget, and timeline before the build. Our own products have separate plans on their respective websites."],
];

export default function Home() {
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Navigation />
    <main id="main-content">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-atmosphere" aria-hidden="true"><div className="horizon-line" /><div className="hero-orbit" /><div className="hero-orbit orbit-two" /></div>
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow"><span className="accent-line" />SOFTWARE. AI. A LITTLE WHAT IF.</p>
            <h1 id="hero-title">Big ideas.<br /><span className="silver-text">Built.</span><span className="hero-period" aria-hidden="true" /></h1>
            <p className="hero-lead">You know that thing you wish existed?<br /><strong>We build it.</strong></p>
            <p className="hero-description">Ambitious software. Practical AI. Connected businesses. We turn what&apos;s possible into something people can actually use.</p>
            <div className="hero-actions"><a href="#start" className="button button-silver">Bring us your idea <Arrow diagonal /></a><a href="#work" className="text-link">Explore the work <Arrow /></a></div>
          </div>
          <div className="hero-showcase" aria-label="Actual AutomatedRE product output and Event Beast mobile preview">
            <div className="showcase-label mono"><span>FROM WHAT IF.</span><span>TO WHAT&apos;S NEXT.</span></div>
            <div className="product-window hero-product"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>AutomatedRE / property experience</span><Arrow diagonal /></div><Image src="/work/property-website.webp" alt="Actual AutomatedRE property website output using fictional demonstration content" width={1440} height={1000} sizes="(max-width: 820px) 85vw, 48vw" preload className="hero-product-image" /></div>
            <div className="hero-phone"><div className="phone-speaker" /><Image src="/work/event-beast-mobile.webp" alt="Event Beast's mobile-first event companion for Momentum Builder LIVE" width={780} height={1688} sizes="(max-width: 820px) 33vw, 17vw" preload /></div>
            <div className="build-label"><span className="build-label-icon" aria-hidden="true"><Arrow diagonal /></span><div><strong>Ideas don&apos;t have to stay ideas.</strong><span>Designed. Engineered. Put to work.</span></div></div>
            <p className="showcase-caption">Actual product screens · Sample property content<br />Event Beast preview · Built through Cuantico AI</p>
          </div>
        </div>
        <div className="container hero-bottom"><span className="mono">OUR OWN BRANDS. YOUR NEXT BIG BUILD.</span><a href="#work" className="scroll-cue" aria-label="Scroll to selected work">DISCOVER <span>↓</span></a></div>
      </section>

      <div className="discipline-strip"><div className="container"><p>Different industries.<br /><strong>The same builder&apos;s instinct.</strong></p><span>SOFTWARE PRODUCTS</span><span>INTELLIGENT SYSTEMS</span><span>CONNECTED EXPERIENCES</span><span className="strip-symbol" aria-hidden="true">↗</span></div></div>

      <section id="work" className="work-section section-pad" aria-labelledby="work-title">
        <div className="container">
          <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="accent-line" />01 / THE WORK</p><h2 id="work-title">Less explaining.<br /><span>More showing.</span></h2></div><p>Our own brands and selected builds.<br />Different problems. Real things you can open, explore, and put to work.</p></div>
          <article className="featured-work" data-reveal>
            <a href="https://www.automatedre.com" target="_blank" rel="noopener noreferrer" className="re-showcase" aria-label="Explore AutomatedRE, opens in a new tab"><div className="re-art-label mono">ONE PROPERTY. EVERYTHING CONNECTED.</div><div className="re-browser product-window"><div className="window-bar"><span className="window-dots"><i /><i /><i /></span><span>The property experience</span><Arrow diagonal /></div><Image src="/work/property-website.webp" alt="AutomatedRE property page generated from fictional demonstration details" width={1440} height={1000} sizes="(max-width: 820px) 90vw, 52vw" /></div><div className="re-flyer"><Image src="/work/property-flyer.webp" alt="Matching branded listing flyer generated by AutomatedRE with fictional sample details" width={600} height={800} sizes="(max-width: 820px) 26vw, 15vw" /></div><span className="open-project" aria-hidden="true"><Arrow diagonal /></span></a>
            <div className="featured-work-copy"><p className="project-category"><span className="small-dot" />AN AUTOMATED BRANDS COMPANY</p><h3>Automated<span className="re-blue">RE</span></h3><h4>One listing. <br />A complete experience.</h4><p>Property websites and branded marketing, connected to the same saved property. Built so the next listing doesn&apos;t mean starting over.</p><ul className="tags"><li>Software product</li><li>Real estate</li><li>Brand systems</li></ul><a className="text-link dark-link" href="https://www.automatedre.com" target="_blank" rel="noopener noreferrer">Explore AutomatedRE <Arrow diagonal /></a><small>Actual outputs. Fictional sample property and office.</small></div>
          </article>
          <div className="secondary-work-grid">
            <article className="work-card" data-reveal><a href="https://event-beast.vercel.app" target="_blank" rel="noopener noreferrer" className="work-card-image event-image" aria-label="Explore the Event Beast preview, opens in a new tab"><Image src="/work/event-beast.webp" alt="Event Beast's desktop home with agenda, people, sponsors, and event information" width={1280} height={889} sizes="(max-width: 720px) 90vw, 44vw" /><span className="image-badge">IN DEVELOPMENT / LIVE PREVIEW</span><span className="open-project"><Arrow diagonal /></span></a><div className="work-card-copy"><p className="project-category">SELECTED BUILD / THROUGH CUANTICO AI</p><div className="work-card-title"><h3>Event Beast</h3><Arrow diagonal /></div><p>An event, in your pocket. Agenda, people, and conversations in a mobile-first companion for Momentum Builder LIVE.</p><ul className="tags"><li>Event technology</li><li>Mobile-first web app</li></ul></div></article>
            <article className="work-card" data-reveal><a href="https://automatedlo.com" target="_blank" rel="noopener noreferrer" className="work-card-image lo-image" aria-label="Explore AutomatedLO, opens in a new tab"><Image src="/work/automatedlo.webp" alt="AutomatedLO's live training website and practical workflow blueprints" width={1280} height={889} sizes="(max-width: 720px) 90vw, 44vw" /><span className="image-badge">THE AUTOMATED BRANDS FAMILY</span><span className="open-project"><Arrow diagonal /></span></a><div className="work-card-copy"><p className="project-category">AN AUTOMATED BRANDS COMPANY</p><div className="work-card-title"><h3>AutomatedLO</h3><Arrow diagonal /></div><p>Automation from the inside out. Practical training, workflow blueprints, and AI resources for the way loan officers actually work.</p><ul className="tags"><li>Education & community</li><li>Mortgage workflows</li></ul></div></article>
          </div>
          <div id="brands" className="family-note"><span className="mono">THE AUTOMATED BRANDS FAMILY</span><p>AutomatedRE + AutomatedLO.<br /><strong>The first chapters. Not the boundaries.</strong></p><a href="#start" className="text-link dark-link">What&apos;s your next chapter? <Arrow diagonal /></a></div>
        </div>
      </section>

      <section id="build" className="build-section section-pad" aria-labelledby="build-title"><div className="container">
        <div className="section-heading" data-reveal><div><p className="eyebrow"><span className="accent-line" />02 / WHAT WE BUILD</p><h2 id="build-title">Your ambition.<br /><span className="muted-heading">Our kind of problem.</span></h2></div><p>Not another tool for the sake of it.<br />The right technology, built around what your business actually needs.</p></div>
        <Capabilities />
        <div className="principles" data-reveal><div><span className="mono">BUSINESS FIRST</span><h3>Understand before building.</h3><p>The problem chooses the technology. Not the other way around.</p></div><div><span className="mono">BUILT END TO END</span><h3>No gaps between the pieces.</h3><p>Product thinking, interface design, and engineering in the same conversation.</p></div><div><span className="mono">MADE TO BE USED</span><h3>Beyond the impressive demo.</h3><p>Real workflows. Thoughtful details. Something people can actually run.</p></div></div>
      </div></section>

      <section id="studio" className="studio-section section-pad" aria-labelledby="studio-title"><div className="container studio-grid">
        <div className="studio-image" data-reveal><Image src="/work/jonathan.webp" alt="Jonathan Ferrell, founder of Automated Brands, in conversation" width={500} height={500} sizes="(max-width: 820px) 90vw, 40vw" /><div className="portrait-caption"><span>JONATHAN FERRELL</span><span>FOUNDER / BUILDER</span></div></div>
        <div className="studio-copy" data-reveal><p className="eyebrow"><span className="accent-line" />03 / THE STUDIO</p><h2 id="studio-title">The best ideas start with<br /><span className="silver-text">“there has to be a better way.”</span></h2><p>Automated Brands was founded by Jonathan Ferrell to turn that instinct into working products.</p><p>We build our own brands and partner with businesses that see an opportunity their current tools can&apos;t reach. The work can cross industries. The mindset stays the same: understand it, simplify it, build it properly.</p><div className="studio-signoff"><span>Ambitious by nature.<br /><strong>Practical by design.</strong></span><a href="https://jonathanferrell.com" target="_blank" rel="noopener noreferrer" className="text-link">Meet the founder <Arrow diagonal /></a></div></div>
      </div></section>

      <section id="process" className="process-section section-pad" aria-labelledby="process-title"><div className="container process-layout"><div className="process-intro" data-reveal><p className="eyebrow"><span className="accent-line" />04 / FROM IDEA TO REALITY</p><h2 id="process-title">Big thinking.<br /><span>Clear next steps.</span></h2><p>You shouldn&apos;t need to understand the technology to understand what happens next.</p><a className="text-link dark-link" href="#start">Start the conversation <Arrow diagonal /></a></div><ol className="process-list">{process.map((step, index) => <li key={step.title} data-reveal><span className="process-number mono">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.copy}</p><span className="process-output"><span aria-hidden="true">↳</span> {step.output}</span></div></li>)}</ol></div></section>

      <section className="faq-section section-pad" aria-labelledby="faq-title"><div className="container faq-layout"><div data-reveal><p className="eyebrow"><span className="accent-line" />A FEW GOOD QUESTIONS</p><h2 id="faq-title">Before the<br /><span className="muted-heading">what if.</span></h2></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span className="faq-plus" aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div></section>

      <section id="start" className="contact-section section-pad" aria-labelledby="contact-title"><div className="container contact-grid"><div className="contact-copy" data-reveal><p className="eyebrow"><span className="accent-line" />YOUR IDEA GOES HERE</p><h2 id="contact-title">What should <br />exist <span>next?</span></h2><p>The ambitious idea. The everyday bottleneck. The thing you keep saying someone should build.</p><p><strong>Let&apos;s start there.</strong></p><a href="mailto:jonathan@jonathanferrell.com" className="direct-contact"><span className="mono">PREFER A DIRECT CONVERSATION?</span><span>Email Jonathan <Arrow diagonal /></span></a></div><ProjectBrief /></div></section>
    </main>
    <footer className="site-footer"><div className="container"><div className="footer-top"><a href="#top" aria-label="Automated Brands, back to top"><BrandLockup id="footer" /></a><p>Different industries.<br /><strong>The same drive to build something better.</strong></p><a className="back-top" href="#top" aria-label="Back to top">↑</a></div><div className="footer-statement" aria-hidden="true">BIG IDEAS. <span>BUILT.</span></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Automated Brands</span><nav aria-label="Our brands"><a href="https://www.automatedre.com" target="_blank" rel="noopener noreferrer">AutomatedRE <Arrow diagonal /></a><a href="https://automatedlo.com" target="_blank" rel="noopener noreferrer">AutomatedLO <Arrow diagonal /></a></nav><span>SOFTWARE. AI. PRODUCTS.</span></div></div></footer>
    <Reveal />
  </>;
}
