"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { hasGoogleTag, hasMetaPixel } from "@/lib/analytics/config";
import {
  trackEngagedVisitor,
  trackPageView,
} from "@/lib/analytics/track";

const ENGAGE_TIME_MS = 30_000;
const ENGAGE_SCROLL_RATIO = 0.5;

/**
 * SPA PageView on client navigations + EngagedVisitor (30s or 50% scroll).
 * Wrap in Suspense (useSearchParams).
 */
export function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const isFirstPageView = useRef(true);
  const engagedForPage = useRef(false);

  useEffect(() => {
    if (!hasMetaPixel && !hasGoogleTag) return;

    const url = search ? `${pathname}?${search}` : pathname;

    // Base scripts already fire PageView on first load — only track SPA changes.
    if (isFirstPageView.current) {
      isFirstPageView.current = false;
    } else {
      trackPageView(url);
    }

    engagedForPage.current = false;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    function fireEngaged() {
      if (engagedForPage.current) return;
      engagedForPage.current = true;
      trackEngagedVisitor();
      if (timerId !== undefined) clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll);
    }

    function onScroll() {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      if (scrollable <= 0) {
        fireEngaged();
        return;
      }
      if (window.scrollY / scrollable >= ENGAGE_SCROLL_RATIO) {
        fireEngaged();
      }
    }

    timerId = setTimeout(fireEngaged, ENGAGE_TIME_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (timerId !== undefined) clearTimeout(timerId);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, search]);

  return null;
}
