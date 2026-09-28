import Link from "next/link";
import { Arrow, BrandLockup } from "@/components/brand";

export default function NotFound() {
  return <main className="not-found container"><Link href="/" aria-label="Automated Brands home"><BrandLockup id="notfound" /></Link><p className="eyebrow">404 / NOT PART OF THE PLAN</p><h1>This page hasn&apos;t<br />been built.</h1><p>The next good idea is still out there. Let&apos;s get you back to the studio.</p><Link href="/" className="button button-silver">Back to Automated Brands <Arrow /></Link></main>;
}
