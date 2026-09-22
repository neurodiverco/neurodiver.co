import type { LucideIcon } from "lucide-react";
import { Activity, Compass, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import PageHeader from "@/components/marketing/PageHeader";
import AppScreen from "@/components/marketing/AppScreen";
import { APP_SIGN_IN_URL } from "@/constants/site";
import FAQSection from "@/components/FAQsection";
import { FinalCtaBand, Section } from "@/components/marketing/Section";

type Tool = {
  id: string;
  subtitle: string;
  title: string;
  body: string;
  image: string;
  imageAlt: string;
  mediaLabel: string;
  highlights: string[];
  icon: LucideIcon;
  cta: { label: string; href: string; external: boolean };
  learnMore?: { label: string; to: string };
};

const tools: Tool[] = [
  {
    id: "body-doubling",
    subtitle: "Body doubling",
    title: "Start with quiet company.",
    body: "Bring a task into an online focus session. A shared start, a time boundary and a gentle wrap-up help you get moving without doing it alone.",
    image: "/images/bodydouble.png",
    imageAlt: "Body doubling session in the NeuroDiver app",
    mediaLabel: "Book a session",
    highlights: ["Cameras optional", "Shared focus time", "Sessions in MYT"],
    icon: Users,
    cta: { label: "Book a session", href: APP_SIGN_IN_URL, external: true },
    learnMore: { label: "About body doubling", to: "/body-doubling" },
  },
  {
    id: "check-in",
    subtitle: "Check-in",
    title: "Notice how you are doing.",
    body: "Take a quick moment to record how you feel and what your energy is like. The point is awareness, not a perfect streak.",
    image: "/images/checkin.png",
    imageAlt: "Energy check-in in the NeuroDiver app",
    mediaLabel: "Notice energy",
    highlights: ["Quick pulse on mood", "Spot patterns over time", "No guilt screens"],
    icon: Activity,
    cta: { label: "Explore the app", href: APP_SIGN_IN_URL, external: true },
  },
  {
    id: "strategy",
    subtitle: "Strategy",
    title: "Find one useful next step.",
    body: "When a situation feels stuck, look for a strategy specific enough to try today. NeuroDiver draws on lived experience and clinical adviser input to shape practical guidance.",
    image: "/images/strategy.png",
    imageAlt: "Strategy guidance in the NeuroDiver app",
    mediaLabel: "Find one step",
    highlights: ["Situation-based tips", "One step you can try today", "Adviser-informed"],
    icon: Compass,
    cta: { label: "Explore the app", href: APP_SIGN_IN_URL, external: true },
  },
];


const ctaClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition hover:brightness-95 sm:w-auto";

function ToolCta({ tool }: { tool: Tool }) {
  if (tool.cta.external) {
    return (
      <a href={tool.cta.href} className={`${ctaClass} bg-primary text-paper`}>
        {tool.cta.label}
      </a>
    );
  }
  return (
    <BookSessionButton className="w-full sm:w-auto">{tool.cta.label}</BookSessionButton>
  );
}

function ToolSection({ tool, reverse }: { tool: Tool; reverse: boolean }) {
  const Icon = tool.icon;

  return (
    <Section
      id={tool.id}
      className={`scroll-mt-24 overflow-x-clip py-12 md:py-24 ${reverse ? "bg-soft" : "bg-paper"}`}
    >
      <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
        <div
          className={`min-w-0 ${reverse ? "order-1 lg:order-2" : "order-1"}`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-soft px-3 py-1 text-xs font-bold uppercase tracking-wide text-brand">
            <Icon className="h-3.5 w-3.5" aria-hidden />
            {tool.subtitle}
          </span>
          <h2 className="font-display mt-4 text-2xl text-primary sm:text-3xl md:text-4xl">
            {tool.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
            {tool.body}
          </p>
          <ul className="mt-5 flex flex-wrap gap-2 sm:mt-6">
            {tool.highlights.map((item) => (
              <li
                key={item}
                className="rounded-full bg-lime/25 px-3 py-1 text-xs font-semibold text-primary sm:text-sm"
              >
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap sm:items-center">
            <ToolCta tool={tool} />
            {tool.learnMore ? (
              <Link
                to={tool.learnMore.to}
                className={`${ctaClass} border-2 border-brand bg-transparent text-brand hover:bg-soft`}
              >
                {tool.learnMore.label}
              </Link>
            ) : null}
          </div>
        </div>

        <div
          className={`mx-auto w-full max-w-[min(100%,17rem)] sm:max-w-xs lg:max-w-none ${
            reverse ? "order-2 lg:order-1 lg:justify-self-start" : "order-2 lg:justify-self-end"
          }`}
        >
          <AppScreen label={tool.mediaLabel}>
            <img
              src={tool.image}
              alt={tool.imageAlt}
              className="aspect-[9/16] w-full object-cover object-top"
            />
          </AppScreen>
        </div>
      </div>
    </Section>
  );
}

export default function Tools() {
  useSEO({
    title: "NeuroDiver Support Toolkit | Body Doubling, Check-Ins and Strategies",
    description:
      "Find the support that fits today. NeuroDiver brings body doubling, quick check-ins and practical strategies together for neurodivergent adults.",
    path: "/tools",
  });

  return (
    <>
      <PageHeader
        eyebrow="Support toolkit"
        title="Your support, all in one place."
        description="A toolkit for brains that work differently — company to begin, check-ins for energy, strategies for the stuck moments."
      />
      <Section className="overflow-x-clip border-t border-line bg-soft py-12 text-primary md:py-20">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="min-w-0">
            <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-4xl">
              They work better together — and alone is fine too.
            </h2>
            <p className="mt-4 text-base text-primary/80 sm:text-lg">
              A session might lead to a check-in. A check-in might point you to a strategy.
              Use what you need; skip what you do not.
            </p>
          </div>
          <ul className="grid gap-3 sm:gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <li
                  key={tool.id}
                  className="flex items-start gap-3 rounded-[18px] border border-line bg-paper p-4 sm:gap-4 sm:p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-soft text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold">{tool.subtitle}</p>
                    <p className="mt-1 text-sm text-primary/70">{tool.highlights[0]}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="mt-8 flex justify-stretch sm:mt-10 sm:justify-start lg:mt-0">
          <BookSessionButton className="w-full sm:w-auto">
            Open the app
          </BookSessionButton>
        </div>
      </Section>

{/* 
      <Section className="overflow-x-clip border-t border-line bg-soft py-12 md:py-20">
        <div className="mx-auto max-w-3xl text-left md:text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
            Pick what fits today
          </p>
          <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
            Three tools. No perfect routine required.
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg md:mx-auto">
            Start with one. Add another when it helps — there is no right order.
          </p>
        </div>
        <ul className="mx-auto mt-8 grid max-w-4xl gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {pickToday.map(({ label, pick, href }) => (
            <li key={pick}>
              <a
                href={href}
                className="group flex h-full flex-col rounded-[20px] border border-line bg-paper p-4 transition hover:border-primary-light/50 hover:shadow-md sm:p-5"
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {label}
                </span>
                <span className="mt-2 font-display text-lg text-primary group-hover:text-brand sm:text-xl">
                  {pick}
                </span>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand">
                  Jump to section
                  <LinkIcon className="h-3.5 w-3.5" aria-hidden />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Section> */}

      {tools.map((tool, index) => (
        <ToolSection key={tool.id} tool={tool} reverse={index % 2 === 1} />
      ))}

      <FAQSection />

      <FinalCtaBand
        title="Choose what helps today."
        body="You do not have to use every tool or follow a perfect routine. If starting is the hard part, body doubling is one easy place to begin."
      >
        <BookSessionButton className="w-full sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
        <Link
          to="/body-doubling"
          className={`${ctaClass} border-2 border-brand bg-transparent text-brand hover:bg-soft`}
        >
          About body doubling
        </Link>
      </FinalCtaBand>
    </>
  );
}
