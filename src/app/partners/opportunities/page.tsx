import { InquiryPage } from "@/components/inquiry-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Business opportunities", "Bring a real market problem, industry insight, and customer access. Explore whether there is a business to build with Automated Brands.", "/partners/opportunities");

export default function Opportunities() {
  return <InquiryPage
    kind="opportunity"
    eyebrow="02 / BUSINESS OPPORTUNITIES"
    title="You know the problem. Could there be a business?"
    description="A recurring problem. A market you understand. People who need a better answer. That is a stronger starting point than an app idea alone."
    fit={[
      "You have firsthand knowledge of a specific problem and the people who experience it.",
      "You can bring customer access, distribution, industry expertise, or another meaningful contribution.",
      "You're interested in exploring a business, not just requesting a development quote.",
    ]}
    note="We explore opportunities selectively. An introduction does not imply funding, shared ownership, or a commitment to build. Those conversations happen only after the fit is clear."
  />;
}
