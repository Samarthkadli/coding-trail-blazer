// External tools must escape the embedded preview completely. Several AI sites
// deny iframe rendering, and some preview hosts keep target="_blank" pages in an
// internal webview. Native target="_top" navigation cannot remain in that frame.

import { toast } from "sonner";

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  try {
    window.open(url, "_top");
    return;
  } catch {
    /* top-level navigation blocked by the host */
  }
  // Never navigate a child frame to an AI site; copy the URL as a safe fallback.
  try {
    void navigator.clipboard?.writeText(url);
    toast("External navigation blocked — link copied", { description: url });
  } catch {
    toast("External navigation blocked", { description: url });
  }
}

export function externalLinkProps(url: string) {
  // Keep this as a native anchor so the browser recognizes the user activation.
  // _top deliberately escapes Lovable's preview iframe and other embedded hosts.
  return {
    href: url,
    target: "_top" as const,
    rel: "noopener noreferrer",
  };
}
