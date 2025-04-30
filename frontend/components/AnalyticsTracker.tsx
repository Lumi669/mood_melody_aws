"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1) On every client-side navigation, send a GA page_view
  useEffect(() => {
    if (typeof window.gtag === "function") {
      const fullPath =
        pathname +
        (searchParams.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", "G-LFGFCJQ737", {
        page_path: fullPath,
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      {/* 2) Load the gtag.js library once after hydration */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-LFGFCJQ737"
        strategy="afterInteractive"
      />

      {/* 3) Initialize dataLayer & default config */}
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          // the initial page load:
          gtag('config', 'G-LFGFCJQ737');
        `}
      </Script>
    </>
  );
}
