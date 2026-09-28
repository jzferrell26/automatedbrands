import { ImageResponse } from "next/og";

export const alt = "Automated Brands — Big ideas. Built. Software. AI. Products.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "linear-gradient(125deg, #090c10, #102332)", color: "#f5f7fa", fontFamily: "sans-serif" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 18 }}><svg width="53" height="47" viewBox="0 0 100 88"><path d="M44 7h18l31 72H72L44 7Z" fill="#c4cdd8" /><path d="M7 79 44 7h18L28 79H7Z" fill="#78d8ff" /><path d="M42 59h22l9 20H32l10-20Z" fill="#c4cdd8" /></svg><span style={{ fontSize: 21, letterSpacing: 5 }}>AUTOMATED BRANDS</span></div>
    <div style={{ display: "flex", flexDirection: "column", fontSize: 127, lineHeight: 1, letterSpacing: -8, fontWeight: 700 }}><span>Big ideas.</span><span style={{ color: "#a8d2e7" }}>Built.</span></div>
    <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 24, borderTop: "1px solid #354857", fontSize: 15, letterSpacing: 3, color: "#bfccd7" }}><span>SOFTWARE. AI. PRODUCTS.</span><span style={{ color: "#78d8ff" }}>FROM WHAT IF. TO WHAT&apos;S NEXT.</span></div>
  </div>, size);
}
