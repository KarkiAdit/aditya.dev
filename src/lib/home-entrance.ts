export const HOME_MAIN_GATE_ID = "home-main-gate";

const HOME_ENTRANCE_COOKIE = "aditya_home_entrance_dismissed";

export function hasHomeEntranceDismissedToday(): boolean {
  const needle = `${HOME_ENTRANCE_COOKIE}=`;
  return document.cookie.split(";").some((part) => part.trim().startsWith(needle));
}

export function setHomeEntranceDismissedUntilEndOfLocalDay(): void {
  const expiresAt = new Date();
  expiresAt.setHours(23, 59, 59, 999);
  const secure = globalThis.location?.protocol === "https:";
  document.cookie = [
    `${HOME_ENTRANCE_COOKIE}=1`,
    "path=/",
    `expires=${expiresAt.toUTCString()}`,
    "SameSite=Lax",
    ...(secure ? (["Secure"] as const) : []),
  ].join("; ");
}

export function releaseHomeEntranceGate(gateId: string = HOME_MAIN_GATE_ID): void {
  document.documentElement.removeAttribute("data-home-entrance");
  const gate = document.getElementById(gateId);
  if (gate) gate.inert = false;
}

export function lockDocumentScroll(): () => void {
  const html = document.documentElement;
  const body = document.body;
  const scrollY = window.scrollY;

  const prev = {
    htmlOverflow: html.style.overflow,
    bodyOverflow: body.style.overflow,
    bodyPosition: body.style.position,
    bodyTop: body.style.top,
    bodyWidth: body.style.width,
  };

  html.style.overflow = "hidden";
  body.style.overflow = "hidden";
  body.style.position = "fixed";
  body.style.top = `-${scrollY}px`;
  body.style.width = "100%";

  return () => {
    html.style.overflow = prev.htmlOverflow;
    body.style.overflow = prev.bodyOverflow;
    body.style.position = prev.bodyPosition;
    body.style.top = prev.bodyTop;
    body.style.width = prev.bodyWidth;
    window.scrollTo(0, scrollY);
  };
}
