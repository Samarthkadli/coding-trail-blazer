// Opening an external site from inside an embedded preview can be blocked when
// the frame's sandbox refuses `target="_blank"` navigations (the browser shows a
// blocked page instead of the site). These helpers always try a real top-level
// navigation and fall back gracefully, so official tool links keep working
// everywhere: preview, published site, and mobile browsers.

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  try {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (win) {
      win.opener = null;
      return;
    }
  } catch {
    /* popup blocked — fall through */
  }
  try {
    // Escape the preview frame when possible, otherwise navigate this document.
    (window.top ?? window).location.href = url;
  } catch {
    window.location.href = url;
  }
}

export function externalLinkProps(url: string) {
  return {
    href: url,
    target: "_blank" as const,
    rel: "noopener noreferrer",
    onClick: (event: React.MouseEvent) => {
      // Let modifier-clicks (new tab/window) behave natively.
      if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      openExternal(url);
    },
  };
}
