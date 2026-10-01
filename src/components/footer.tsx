import Link from "next/link";
import { Arrow, BrandLockup } from "./brand";

export function Footer() {
  return <footer className="site-footer"><div className="container">
    <div className="footer-grid">
      <div className="footer-identity"><Link href="/" aria-label="Automated Brands home"><BrandLockup id="footer" /></Link><p>Different markets.<br />The same drive to build something better.</p></div>
      <nav aria-label="The company"><span className="mono">THE COMPANY</span><Link href="/#brands">Our brands</Link><Link href="/#approach">Our approach</Link><Link href="/#company">Our story</Link></nav>
      <nav aria-label="Our brands"><span className="mono">THE BRANDS</span><a href="https://www.automatedre.com" target="_blank" rel="noopener noreferrer">AutomatedRE <Arrow diagonal /></a><a href="https://automatedlo.com" target="_blank" rel="noopener noreferrer">AutomatedLO <Arrow diagonal /></a></nav>
      <nav aria-label="Connect"><span className="mono">CONNECT</span><Link href="/partners">Partnerships</Link><Link href="/build-with-us">Selected custom builds</Link><a href="https://jonathanferrell.com" target="_blank" rel="noopener noreferrer">Meet the founder <Arrow diagonal /></a></nav>
    </div>
    <div className="footer-statement" aria-hidden="true">BIG IDEAS. <span>BUILT.</span></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} Automated Brands</span><span className="mono">BETTER WAYS. BUILT INTO BUSINESSES.</span></div>
  </div></footer>;
}
