// src/app/[...slug]/page.tsx
import { useRouter } from "next/router";
import { useEffect } from "react";

const CatchAll = () => {
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) return;

    const path = Array.isArray(slug) ? slug.join("/") : slug;
    switch (path) {
      case "allmusic":
        router.replace("/allmusic.html");
        break;
      case "live":
        router.replace("/live.html");
        break;
      case "mixtape":
        router.replace("/mixtape.html");
        break;
      default:
        router.replace("/");
        break;
    }
  }, [slug, router]);

  return <p>Redirecting...</p>;
};

export default CatchAll;
