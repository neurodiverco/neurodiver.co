/**
 * useSEO — sets <title>, meta tags, Open Graph, Twitter Card, and a
 * JSON-LD structured-data script for every page that calls it.
 *
 * Call at the top of each page component.
 */
import { useEffect } from "react";

const SITE_NAME = "NeuroDiver";
const BASE_URL = "https://www.neurodiver.co"; // canonical production domain
const DEFAULT_IMAGE = `${BASE_URL}/images/team-neurodiver.jpg`;

export interface SEOProps {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  article?: {
    publishedTime: string;
    tags?: string[];
  };
  // Accept both a single object or an array (for BlogPost which passes two schemas)
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  alternates?: { hreflang: string; href: string }[];
}

function setMeta(name: string, content: string, attr: "name" | "property" = "name") {
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function useSEO({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  article,
  jsonLd,
  alternates,
}: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const canonical = `${BASE_URL}${path}`;

    // ── Basic ─────────────────────────────────────────────────────────────
    document.title = fullTitle;
    setMeta("description", description);

    // ── Canonical ─────────────────────────────────────────────────────────
    setLink("canonical", canonical);

    // ── Open Graph ────────────────────────────────────────────────────────
    setMeta("og:type", type, "property");
    setMeta("og:title", fullTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical, "property");
    setMeta("og:image", image, "property");
    setMeta("og:site_name", SITE_NAME, "property");
    setMeta("og:locale", "en_MY", "property");

    // ── Twitter Card ──────────────────────────────────────────────────────
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", description);
    setMeta("twitter:image", image);

    // ── Article fields ────────────────────────────────────────────────────
    if (type === "article" && article) {
      setMeta("article:published_time", article.publishedTime, "property");
      setMeta("article:author", SITE_NAME, "property");
      if (article.tags) {
        article.tags.forEach((tag) =>
          setMeta("article:tag", tag, "property"),
        );
      }
    }

    // ── Geo / region ──────────────────────────────────────────────────────
    // Targets Malaysia as primary region; helps local search.
    setMeta("geo.region", "MY");
    setMeta("geo.placename", "Malaysia");
    setMeta("ICBM", "3.1390, 101.6869"); // Kuala Lumpur

    // ── Hreflang alternates ───────────────────────────────────────────────
    // Always include x-default and en-MY
    setLink("alternate", canonical, "x-default");
    setLink("alternate", canonical, "en-MY");
    if (alternates) {
      alternates.forEach(({ hreflang, href }) => setLink("alternate", href, hreflang));
    }

    // ── JSON-LD ───────────────────────────────────────────────────────────
    const scriptId = "page-jsonld";
    document.getElementById(scriptId)?.remove();

    const defaultJsonLd = {
      "@context": "https://schema.org",
      "@type": type === "article" ? "Article" : "WebPage",
      name: fullTitle,
      description,
      url: canonical,
      image,
      publisher: {
        "@type": "Organization",
        name: SITE_NAME,
        url: BASE_URL,
        logo: {
          "@type": "ImageObject",
          url: `${BASE_URL}/images/logowords.png`,
        },
      },
      ...(type === "article" && article
        ? { datePublished: article.publishedTime }
        : {}),
    };

    const script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd ?? defaultJsonLd);
    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [title, description, path, image, type, article, jsonLd, alternates]);
}
