import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";
import BookSessionButton from "./BookSessionButton";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  id?: string;
  /** Stagger scroll-in delay (ms) */
  revealDelay?: number;
  animate?: boolean;
};

export function Section({
  children,
  className = "bg-cream",
  id,
  revealDelay = 0,
  animate = true,
}: SectionProps) {
  const inner = <div className="mx-auto max-w-6xl">{children}</div>;
  const sectionClass = `px-6 py-16 md:py-24 ${className}`;

  if (!animate) {
    return (
      <section id={id} className={sectionClass}>
        {inner}
      </section>
    );
  }

  return (
    <Reveal as="section" id={id} delay={revealDelay} className={sectionClass}>
      {inner}
    </Reveal>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-orange">
      {children}
    </p>
  );
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl font-extrabold leading-tight text-primary md:text-4xl">
      {children}
    </h2>
  );
}

export function SectionBody({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={`mt-4 max-w-3xl text-base leading-relaxed text-primary/80 md:text-lg ${className}`}
    >
      {children}
    </p>
  );
}

export function FinalCtaBand({
  title,
  body,
  footnote,
  children,
}: {
  title: string;
  body: string;
  footnote?: string;
  children?: ReactNode;
}) {
  return (
    <Section className="border-t border-line bg-paper py-12 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-2xl text-primary sm:text-3xl md:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">{body}</p>
        <div className="mt-6 flex flex-col items-stretch gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center">
          {children ?? (
            <BookSessionButton className="w-full sm:w-auto">
              Book a body doubling session
            </BookSessionButton>
          )}
        </div>
        {footnote ? (
          <p className="mt-4 text-xs text-muted sm:mt-5">{footnote}</p>
        ) : null}
      </div>
    </Section>
  );
}
