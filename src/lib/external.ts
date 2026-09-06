// External tools must open in a clean browser tab. Opening the destination
// directly from an embedded preview can leave it in a restricted context,
// which sites such as Claude reject with ERR_BLOCKED_BY_RESPONSE.

export function openExternal(url: string) {
  if (typeof window === "undefined") return;
  window.open(url, "_blank", "noopener,noreferrer");
}

export function externalLinkProps(url: string) {
  return {
    href: url,
    target: "_blank" as const,
    rel: "noopener noreferrer",
  };
}
