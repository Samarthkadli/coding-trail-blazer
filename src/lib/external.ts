// Opening an external site from inside an embedded preview must ALWAYS happen in
// a new top-level tab. Navigating the current document instead makes sites that
// refuse framing (claude.ai, chatgpt.com, ...) show "refused to connect", so we
// never fall back to same-document navigation.

import { toast } from "sonner";

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) {
      win.opener = null;
      return;
    }
  } catch {
    /* popup blocked */
  }
  // Could not open a tab (popup blocker). Never navigate in-frame — tell the user.
  try {
    void navigator.clipboard?.writeText(url);
    toast("Popup blocked — link copied", { description: url });
  } catch {
    toast("Popup blocked", { description: url });
  }
}

export function externalLinkProps(url: string) {
  // A plain anchor with target="_blank" is the most reliable path: the browser
  // opens a real top-level tab. No onClick interception.
  return {
    href: url,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
