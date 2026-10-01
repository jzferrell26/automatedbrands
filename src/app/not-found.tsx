import Link from "next/link";
import { Arrow } from "@/components/brand";

export default function NotFound() {
  return <section className="not-found container"><p className="eyebrow">404 / A DIFFERENT DIRECTION</p><h1>This page isn&apos;t<br />part of the story.</h1><p>The brand family and the next good opportunity are still here. Let&apos;s get you back.</p><Link href="/" className="button button-silver">Back to Automated Brands <Arrow /></Link></section>;
}
