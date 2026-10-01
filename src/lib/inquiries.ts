export const inquiryTypes = {
  distribution: {
    label: "Distribution partnership",
    heading: "Tell us about your audience.",
    prompt: "Who do you reach, and how?",
    placeholder: "The people or businesses you work with, your channels, and why one of our brands could be a good fit…",
    secondPrompt: "How would you like to work together?",
    secondPlaceholder: "Referrals, an integration, a community partnership, or another approach…",
    secondRequired: false,
  },
  opportunity: {
    label: "Business opportunity",
    heading: "Tell us what you see.",
    prompt: "What problem do you see, and who has it?",
    placeholder: "The problem, who experiences it, how they handle it today, and what you have learned from them…",
    secondPrompt: "What would you bring to the opportunity?",
    secondPlaceholder: "Industry knowledge, access to customers, an existing business, distribution, or other relevant experience…",
    secondRequired: true,
  },
  project: {
    label: "Selected custom build",
    heading: "Start with the business problem.",
    prompt: "What needs to work better?",
    placeholder: "Who will use it, what is getting in their way, and what a useful first version would change…",
    secondPrompt: "Anything else we should know?",
    secondPlaceholder: "Existing tools, relevant constraints, your timing, or an approximate budget…",
    secondRequired: false,
  },
} as const;

export type InquiryKind = keyof typeof inquiryTypes;
