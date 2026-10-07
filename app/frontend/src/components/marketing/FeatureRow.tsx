import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import AppScreen from "./AppScreen";

type FeatureRowProps = {
  title: string;
  body: string;
  reverse?: boolean;
  media: React.ReactNode;
  mediaLabel?: string;
  cta?: { label: string; href: string; external?: boolean };
  className?: string;
};

export default function FeatureRow({
  title,
  body,
  reverse = false,
  media,
  mediaLabel,
  cta,
  className = "bg-paper",
}: FeatureRowProps) {
  return (
    <Reveal as="section" className={`px-6 py-16 md:py-24 ${className}`}>
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className={reverse ? "md:order-2" : undefined}>
          <h2 className="font-display text-3xl leading-tight text-primary md:text-4xl">
            {title}
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted">{body}</p>
          {cta ? (
            cta.external ? (
              <a
                href={cta.href}
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-95"
              >
                {cta.label}
              </a>
            ) : (
              <Link
                to={cta.href}
                className="mt-8 inline-flex min-h-11 items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-95"
              >
                {cta.label}
              </Link>
            )
          ) : null}
        </div>
        <div className={reverse ? "md:order-1" : undefined}>
          <AppScreen label={mediaLabel}>{media}</AppScreen>
        </div>
      </div>
    </Reveal>
  );
}
