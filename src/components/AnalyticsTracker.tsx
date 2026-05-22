"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function getSessionId() {
  const key = "rp_session";
  let id = sessionStorage.getItem(key);
  if (!id) {
    id = crypto.randomUUID();
    sessionStorage.setItem(key, id);
  }
  return id;
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const track = () => {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: pathname,
          referrer: document.referrer || null,
          sessionId: getSessionId(),
        }),
        keepalive: true,
      }).catch(() => {});
    };

    track();
  }, [pathname]);

  return null;
}
