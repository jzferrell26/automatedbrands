import { InquiryPage } from "@/components/inquiry-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Selected custom builds", "A separate path for a specific business project. Discuss custom software, practical AI, and connected systems with Automated Brands.", "/build-with-us");

export default function BuildWithUs() {
  return <InquiryPage
    kind="project"
    eyebrow="SELECTED CUSTOM BUILDS"
    title="Some problems need something purpose-built."
    description="Our own brands come first. We also consider selected software, AI, and systems projects where there is a clear business problem and a strong fit."
    fit={[
      "A defined business problem, a customer or team who will use the solution, and someone responsible for the result.",
      "A need for a custom application, a practical use of AI, or a better connection between existing tools.",
      "A willingness to define the first release, budget, dependencies, and ongoing ownership before the build.",
    ]}
    note="Custom work is scoped separately from our product brands and company-building partnerships. We agree on deliverables and support arrangements before starting."
  />;
}
