// External tools must open in a clean browser tab. Opening the destination
// directly from an embedded preview can leave it in a restricted context,
// which sites such as Claude reject with ERR_BLOCKED_BY_RESPONSE.

import { toast } from "sonner";
import type { MouseEvent } from "react";

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  try {
    // Create the top-level tab before assigning the external URL. This avoids
    // preview/webview link interception while keeping the action user-initiated.
    const win = window.open("about:blank", "_blank");
    if (win) {
      win.opener = null;
      win.location.replace(url);
      return;
    }
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
  return {
    href: url,
    target: "_blank" as const,
    rel: "noopener noreferrer",
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      // Preserve browser shortcuts and long-press behavior while making an
      // ordinary tap/click use the clean-tab path above.
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      event.stopPropagation();
      openExternal(url);
    },
  };
}
