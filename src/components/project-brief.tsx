"use client";

import { useRef, useState, type FormEvent } from "react";
import { Arrow } from "./brand";

const kinds = ["A new product", "Practical AI", "Better operations", "Let's figure it out"];
const startingPoints: Record<string, string> = {
  "A new product": "Define the people, the core problem, and the smallest release worth putting in their hands.",
  "Practical AI": "Find the useful job for AI, the information it needs, and where a human should stay in the loop.",
  "Better operations": "Map the current workflow, the tools involved, and the handoffs that need to stop breaking.",
  "Let's figure it out": "Start with the problem. We can work out whether the answer is software, AI, automation—or something simpler.",
};

export function ProjectBrief() {
  const [kind, setKind] = useState(kinds[0]);
  const [brief, setBrief] = useState("");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [validationError, setValidationError] = useState("");
  const result = useRef<HTMLDivElement>(null);
  const form = useRef<HTMLFormElement>(null);

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const company = String(data.get("company") || "").trim();
    const idea = String(data.get("idea") || "").trim();
    if (!name || idea.length < 12) {
      setValidationError(!name ? "Please add your name, not just spaces." : "Please describe your idea in at least 12 characters, excluding surrounding spaces.");
      return;
    }
    setValidationError("");
    setCopied(false); setCopyError(false);
    setBrief(`Hi Jonathan,\n\nI'd like to talk about ${kind.toLowerCase()}.\n\nName: ${name}\nCompany / website: ${company || "Not provided"}\n\nHere's what I'm thinking:\n${idea}\n\nSuggested starting point:\n${startingPoints[kind]}\n\nSent from the Automated Brands project brief.`);
    requestAnimationFrame(() => result.current?.focus());
  }

  async function copy() {
    try { await navigator.clipboard.writeText(brief); setCopied(true); setCopyError(false); }
    catch { setCopyError(true); }
  }

  return <div className="brief-builder" data-reveal>
    <noscript><style>{`.brief-builder form { display: none; } .brief-builder .no-js-contact { display: block; }`}</style></noscript>
    <p className="brief-privacy no-js-contact">The brief builder needs JavaScript. <a href="mailto:jonathan@jonathanferrell.com">Email Jonathan directly with your idea.</a> Nothing is submitted by this page.</p>
    <div className="brief-topline mono"><span>YOUR NEXT BUILD</span><span>{brief ? "02 / YOUR STARTING POINT" : "01 / THE IDEA"}</span></div>
    <form ref={form} onSubmit={prepare} onInput={() => setValidationError("")} hidden={Boolean(brief)}>
      <fieldset><legend>What are you thinking?</legend><div className="kind-options">{kinds.map(option => <label key={option} className={kind === option ? "kind-option selected" : "kind-option"}><input type="radio" name="kind" value={option} aria-label={option} checked={kind === option} onChange={() => setKind(option)} /><span>{option}</span></label>)}</div></fieldset>
      <div className="field-row"><label>Your name<input name="name" autoComplete="name" placeholder="Your name" required maxLength={100} /></label><label>Company or website <span>(optional)</span><input name="company" autoComplete="organization" placeholder="Where you work" maxLength={180} /></label></div>
      <div className="idea-label"><label htmlFor="project-idea">What should exist that doesn&apos;t yet?</label><textarea id="project-idea" name="idea" aria-describedby="idea-hint" placeholder="The idea, the bottleneck, the thing your team keeps doing by hand…" rows={4} required minLength={12} maxLength={1400} /><span id="idea-hint" className="field-hint">A few sentences is a perfect place to start.</span></div>
      {validationError && <p role="alert" className="form-error">{validationError}</p>}
      <button type="submit" className="button button-dark brief-submit">Build my project brief <Arrow /></button>
      <p className="brief-privacy">This stays in your browser. Nothing is submitted or stored on our server. Review your brief, then choose to email it to Jonathan.</p>
    </form>
    <div ref={result} tabIndex={-1} className="brief-result" hidden={!brief} aria-labelledby="brief-result-heading">
      <span className="result-check" aria-hidden="true">✓</span><h3 id="brief-result-heading">Good ideas start somewhere.</h3><p>{startingPoints[kind]}</p>
      <label>Your project brief<textarea aria-label="Your project brief" rows={9} value={brief} readOnly /></label>
      <div className="brief-result-actions"><a href={`mailto:jonathan@jonathanferrell.com?subject=${encodeURIComponent(`Automated Brands — ${kind}`)}&body=${encodeURIComponent(brief)}`} className="button button-dark">Email Jonathan <Arrow diagonal /></a><button type="button" className="button button-outline" onClick={copy}>{copied ? "Copied" : "Copy brief"}</button></div>
      <p className="brief-privacy" role="status">{copyError ? "Clipboard unavailable. Select and copy the text above." : copied ? "Brief copied. Paste it into your preferred email app." : "Opens your email app. You review and send it there; nothing has been sent yet."}</p>
      <button type="button" className="edit-brief" onClick={() => { setBrief(""); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>("input[name='name']")?.focus()); }}>← Edit my idea</button>
    </div>
  </div>;
}
