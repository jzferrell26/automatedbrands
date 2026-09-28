"use client";

import { useRef, useState } from "react";
import { Arrow } from "./brand";

const capabilities = [
  { id: "product", name: "Custom software", line: "The product you wish existed.", copy: "A customer portal. An internal platform. An entirely new business. Software designed around how people actually need to work.", tags: ["Web applications", "Client portals", "Internal tools"], input: "An idea worth building", steps: ["Define the experience", "Connect the right data", "Build & test"], output: "A product people can use", code: "idea → architecture → working product" },
  { id: "ai", name: "Practical AI", line: "Intelligence with a job to do.", copy: "Put AI where it makes a real difference: understanding information, assisting your team, or moving a workflow forward—with the right human checkpoints.", tags: ["AI assistants", "Voice experiences", "Document workflows"], input: "A question. A call. A document.", steps: ["Understand the context", "Apply your business rules", "Review & approve"], output: "The next useful action", code: "context → intelligence → reviewed action" },
  { id: "operations", name: "Connected operations", line: "Less copy. Less paste. More progress.", copy: "Bring the tools you already use into one coherent workflow. Cut the duplicate entry and broken handoffs without throwing away what works.", tags: ["CRM integrations", "Workflow automation", "Connected data"], input: "A change in your business", steps: ["Capture the event", "Connect your tools", "Handle exceptions"], output: "The right information, in sync", code: "event → workflow → connected operation" },
];

export function Capabilities() {
  const [active, setActive] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  const item = capabilities[active];
  return <div className="capability-explorer" data-reveal>
    <div className="capability-choices" role="tablist" aria-label="Explore what we build" aria-orientation="vertical">
      {capabilities.map((capability, index) => <button key={capability.id} ref={el => { buttons.current[index] = el; }} id={`tab-${capability.id}`} role="tab" aria-selected={active === index} aria-controls={`panel-${capability.id}`} tabIndex={active === index ? 0 : -1} className={`capability-tab ${active === index ? "is-active" : ""}`} onClick={() => setActive(index)} onKeyDown={event => {
        let next = index;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % capabilities.length;
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + capabilities.length - 1) % capabilities.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = capabilities.length - 1;
        else return;
        event.preventDefault(); setActive(next); buttons.current[next]?.focus();
      }}><span className="mono">0{index + 1}</span><span>{capability.name}</span><Arrow diagonal /></button>)}
      <p className="explorer-aside">Different starting points.<br />The same standard: make it useful.</p>
    </div>
    {capabilities.map((capability, index) => <section key={capability.id} id={`panel-${capability.id}`} role="tabpanel" aria-labelledby={`tab-${capability.id}`} hidden={active !== index} tabIndex={0} className="capability-panel">
      {active === index && <><div className="workflow-demo" aria-label={`Illustrative workflow: ${item.code}`}>
        <div className="demo-title mono"><span className="status-dot" />THE BUILD LOGIC<span>ILLUSTRATIVE WORKFLOW</span></div>
        <div className="workflow-input"><span className="mono">START HERE</span><strong>{item.input}</strong></div>
        <div className="workflow-track">{item.steps.map((step, i) => <div className="workflow-step" key={step}><span>{String(i + 1).padStart(2, "0")}</span>{step}<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 8 3 3 5-6" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg></div>)}</div>
        <div className="workflow-output"><span className="output-symbol">↗</span><div><span className="mono">BUILT FOR</span><strong>{item.output}</strong></div></div>
      </div><div className="capability-detail"><h3>{item.line}</h3><p>{item.copy}</p><ul className="tags">{item.tags.map(tag => <li key={tag}>{tag}</li>)}</ul></div></>}
    </section>)}
  </div>;
}
