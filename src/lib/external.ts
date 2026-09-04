// External tools must open in a NEW browser tab. The app runs inside an
// embedded preview iframe: target="_top" or in-frame navigation gets blocked
// by AI sites that deny framing ("refused to connect" / "blocked"). A plain
// _blank anchor (plus a window.open fallback) always escapes the iframe.

import { toast } from "sonner";

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) return;
  } catch {
    /* popup blocked */
  }
  // Popup blocked: copy the URL so the user can paste it in a new tab.
  try {
    void navigator.clipboard?.writeText(url);
    toast("Popup blocked — link copied", { description: url });
  } catch {
    toast("Popup blocked", { description: url });
  }
}

export function externalLinkProps(url: string) {
  // Native anchor keeps user activation; _blank opens the real tool site in
  // its own tab so frame-blocking headers never affect it.
  return {
    href: url,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
