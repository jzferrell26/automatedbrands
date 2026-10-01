import Link from "next/link";
import { Arrow } from "./brand";

export function PartnerPaths() {
  return <div className="partner-paths">
    <Link href="/partners/distribution" className="partner-path" data-reveal>
      <div className="path-top"><span className="mono">01 / DISTRIBUTION PARTNERSHIPS</span><Arrow diagonal /></div>
      <h3>You know the audience.</h3>
      <p>Help an existing brand reach the people it was built for. For agencies, platforms, and people with a relevant community or customer base.</p>
      <span className="path-link">Explore distribution partnerships <Arrow /></span>
    </Link>
    <Link href="/partners/opportunities" className="partner-path" data-reveal>
      <div className="path-top"><span className="mono">02 / BUSINESS OPPORTUNITIES</span><Arrow diagonal /></div>
      <h3>You know the problem.</h3>
      <p>Bring industry knowledge, customer access, and a problem worth solving. Let&apos;s explore whether there&apos;s a business to build around it.</p>
      <span className="path-link">Explore a business opportunity <Arrow /></span>
    </Link>
  </div>;
}
