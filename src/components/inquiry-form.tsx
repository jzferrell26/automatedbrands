"use client";

import { useRef, useState, type FormEvent } from "react";
import { contactEmail } from "@/lib/site";
import { inquiryTypes, type InquiryKind } from "@/lib/inquiries";
import { Arrow } from "./brand";

/** A local email-draft helper. No backend submission, storage, or implied receipt. */
export function InquiryForm({ kind }: { kind: InquiryKind }) {
  const config = inquiryTypes[kind];
  const [draft, setDraft] = useState("");
  const [error, setError] = useState("");
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const directEmail = `mailto:${contactEmail}?subject=${encodeURIComponent(`Automated Brands — ${config.label}`)}`;

  function prepare(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const read = (name: string) => String(data.get(name) || "").trim();
    const name = read("name");
    const company = read("company");
    const detail = read("detail");
    const context = read("context");
    const message = !name ? "Please add your name, not just spaces."
      : detail.length < 20 ? "Please describe the opportunity in at least 20 characters, excluding surrounding spaces."
      : config.secondRequired && context.length < 20 ? "Please describe what you bring in at least 20 characters, excluding surrounding spaces." : "";
    if (message) { setError(message); requestAnimationFrame(() => errorRef.current?.focus()); return; }
    setError("");
    setCopyState("idle");
    const lines = [
      "Hi Jonathan,", "", `I'd like to discuss a ${config.label.toLowerCase()} with Automated Brands.`, "",
      `Name: ${name}`, `Company / website: ${company || "Not provided"}`,
      ...(kind === "distribution" ? [`Brand of interest: ${read("brand") || "Let's discuss the fit"}`] : []),
      "", config.prompt, detail,
      ...(context ? ["", config.secondPrompt, context] : []),
      "", "Prepared on the Automated Brands website.",
    ];
    setDraft(lines.join("\n"));
    requestAnimationFrame(() => {
      resultRef.current?.focus({ preventScroll: true });
      resultRef.current?.scrollIntoView({ block: "start", behavior: "instant" });
    });
  }

  async function copy() {
    try { await navigator.clipboard.writeText(draft); setCopyState("copied"); }
    catch { setCopyState("failed"); }
  }

  function edit() {
    setDraft("");
    setCopyState("idle");
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>("input[name='name']")?.focus());
  }

  return <div className="inquiry-form" id="inquiry">
    <noscript><style>{`.inquiry-form form { display: none; } .inquiry-form .no-js-contact { display: block; }`}</style></noscript>
    <div className="no-js-contact"><h2>Email your introduction.</h2><p>The draft helper needs JavaScript. You can contact us directly instead. Nothing has been sent by this page.</p><a href={directEmail} className="text-link">Write to Automated Brands <Arrow diagonal /></a></div>
    <div className="inquiry-topline mono"><span>{config.label}</span><span>{draft ? "02 / REVIEW" : "01 / INTRODUCE YOURSELF"}</span></div>
    <form ref={formRef} onSubmit={prepare} onInput={() => setError("")} hidden={Boolean(draft)}>
      <h2>{config.heading}</h2>
      <p className="form-intro">A few useful details make a better first conversation. Review your introduction before opening an email draft.</p>
      <div className="field-row"><label htmlFor={`${kind}-name`}>Your name<input id={`${kind}-name`} name="name" autoComplete="name" required maxLength={100} /></label><label htmlFor={`${kind}-company`}>Company or website <span>(optional)</span><input id={`${kind}-company`} name="company" autoComplete="organization" maxLength={180} /></label></div>
      {kind === "distribution" && <label className="field" htmlFor="distribution-brand">Which brand interests you?<select id="distribution-brand" name="brand" defaultValue="Let's discuss the fit"><option>Let&apos;s discuss the fit</option><option>AutomatedRE</option><option>AutomatedLO</option><option>Both brands</option></select></label>}
      <label className="field" htmlFor={`${kind}-detail`}>{config.prompt}<textarea id={`${kind}-detail`} name="detail" placeholder={config.placeholder} rows={4} required minLength={20} maxLength={1000} aria-describedby={`${kind}-detail-hint`} /></label>
      <p id={`${kind}-detail-hint`} className="field-hint">Keep it at the business level. Please don&apos;t include confidential customer information.</p>
      <label className="field" htmlFor={`${kind}-context`}>{config.secondPrompt}{!config.secondRequired && <span> (optional)</span>}<textarea id={`${kind}-context`} name="context" placeholder={config.secondPlaceholder} rows={3} required={config.secondRequired} minLength={config.secondRequired ? 20 : undefined} maxLength={700} /></label>
      {error && <p ref={errorRef} className="form-error" role="alert" tabIndex={-1}>{error}</p>}
      <button className="button button-dark form-submit" type="submit">Review my introduction <Arrow /></button>
      <p className="form-disclosure">This helper works in your browser. No form information is submitted or saved on our server. You choose whether to send the email.</p>
    </form>
    <div ref={resultRef} className="inquiry-result" hidden={!draft} tabIndex={-1} aria-labelledby={`${kind}-review-title`}>
      <span className="result-label mono">YOUR INTRODUCTION IS READY TO REVIEW</span>
      <h2 id={`${kind}-review-title`}>A good place to start.</h2>
      <p>Review the details below. Opening the draft does not send it—you make the final call in your email app.</p>
      <label htmlFor={`${kind}-draft`}>Your introduction<textarea id={`${kind}-draft`} value={draft} readOnly rows={11} /></label>
      <div className="result-actions"><a className="button button-dark" href={`${directEmail}&body=${encodeURIComponent(draft)}`}>Open email draft <Arrow diagonal /></a><button type="button" className="button button-outline" onClick={copy}>{copyState === "copied" ? "Copied" : "Copy introduction"}</button></div>
      <p className="form-disclosure" role="status">{copyState === "failed" ? "Clipboard unavailable. Select and copy the introduction above." : copyState === "copied" ? "Introduction copied. Paste it into your preferred email app. Nothing has been sent by this site." : "Nothing has been sent yet. Use your email app to review and send your introduction."}</p>
      <p className="recipient-note">To Jonathan Ferrell at <a href={`mailto:${contactEmail}`}>{contactEmail}</a></p>
      <button className="edit-introduction" type="button" onClick={edit}>← Edit my introduction</button>
    </div>
  </div>;
}
