import { InquiryPage } from "@/components/inquiry-page";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Distribution partnerships", "Help an Automated Brands product reach a relevant audience. Introduce your agency, platform, community, or customer base.", "/partners/distribution");

export default function Distribution() {
  return <InquiryPage
    kind="distribution"
    eyebrow="01 / DISTRIBUTION PARTNERSHIPS"
    title="You know the audience. Let's find the fit."
    description="Connect an existing brand with the people it was built for. We're interested in relevant relationships—not reach for the sake of reach."
    fit={[
      "You work with an audience that could benefit from AutomatedRE or AutomatedLO.",
      "You can explain how the product would fit into that audience's existing work.",
      "You have a practical channel in mind: an agency, a platform, a community, or a referral relationship.",
    ]}
    note="This is an introduction, not enrollment in a partner program. Availability, responsibilities, and any commercial terms are discussed directly."
  />;
}
