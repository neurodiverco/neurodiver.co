import type { LucideIcon } from "lucide-react";
import {
  Activity,
  ClipboardList,
  EyeOff,
  Handshake,
  LineChart,
  Rocket,
  ShieldCheck,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PageHeader from "@/components/marketing/PageHeader";
import AppScreen from "@/components/marketing/AppScreen";
import { FinalCtaBand, Section } from "@/components/marketing/Section";
import FAQSection from "@/components/FAQsection";
import { CONTACT_EMAIL } from "@/constants/site";

const contactOrg = "/contact?audience=organisation";

const ctaPrimary =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition hover:brightness-95 sm:w-auto";
const ctaSecondary =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-brand px-6 py-3 text-sm font-semibold text-brand transition hover:bg-soft sm:w-auto";

const pilotOffers: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Users,
    title: "Body doubling sessions",
    body: "Structured online focus time employees can opt into when starting work feels hard.",
  },
  {
    icon: Activity,
    title: "Check-ins & strategies",
    body: "Lightweight tools for energy awareness and practical next steps on real workdays.",
  },
  {
    icon: LineChart,
    title: "Learn what actually helps",
    body: "See what support gets used — so you invest in things people reach for, not shelfware.",
  },
];

const pilotPhases = [
  {
    step: "01",
    title: "Align on scope",
    body: "We agree participation model, timeline, success measures and what you want to learn.",
    icon: Handshake,
  },
  {
    step: "02",
    title: "Opt-in launch",
    body: "Employees choose to join. We introduce sessions and tools without pressure to disclose.",
    icon: Rocket,
  },
  {
    step: "03",
    title: "Review together",
    body: "We look at uptake, feedback and whether a longer partnership makes sense for your team.",
    icon: ClipboardList,
  },
];

const safetyPillars = [
  {
    icon: ShieldCheck,
    title: "Opt-in always",
    body: "Participation is voluntary. No one should feel nudged to join or to share more than they want.",
  },
  {
    icon: EyeOff,
    title: "No diagnosis required",
    body: "Support is for real workdays — not for asking people to label themselves for access.",
  },
  {
    icon: ClipboardList,
    title: "Clear before you start",
    body: "Any employer reporting or data access is explained upfront and agreed before launch.",
  },
];

const enquireSteps = [
  "Tell us about your organisation and approximate team size.",
  "Share the support you want to explore (sessions, tools, or both).",
  "We will reply to discuss whether a pilot is a good fit.",
];

export default function ForOrganisations() {
  useSEO({
    title: "Workplace Pilots for Neurodivergent Talent",
    description:
      "Explore an opt-in NeuroDiver workplace pilot for neurodivergent talent. Practical support for focus, energy and sustainable workdays.",
    path: "/for-organisations",
  });

  return (
    <>
      <PageHeader
        eyebrow="For people teams and employers"
        title="Better support starts with a better fit."
        description="Practical, opt-in support built around real workdays — without asking people to disclose everything first."
      >
        <Link to={contactOrg} className={`${ctaPrimary} bg-lime text-primary-dark`}>
          Enquire about a pilot
        </Link>
      </PageHeader>

      {/* What a pilot includes */}
      <Section className="overflow-x-clip border-t border-line bg-paper py-12 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              For your team
            </p>
            <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
              A useful starting point for your team.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
              A pilot introduces employees to body doubling and practical work tools, while
              giving people teams a way to learn what support is useful — before you scale
              anything company-wide.
            </p>
            <ul className="mt-6 space-y-3 sm:mt-8">
              {pilotOffers.map(({ icon: Icon, title, body }) => (
                <li
                  key={title}
                  className="flex gap-3 rounded-[18px] border border-line bg-soft p-4 sm:gap-4"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime/25 text-brand">
                    <Icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-primary">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="mx-auto w-full max-w-[min(100%,17rem)] sm:max-w-xs lg:justify-self-end">
            <AppScreen label="What employees can access">
              <img
                src="/images/bodydouble.png"
                alt="Body doubling in the NeuroDiver app"
                className="aspect-[9/16] w-full object-cover object-top"
              />
            </AppScreen>
          </div>
        </div>
      </Section>

      {/* Pilot rhythm */}
      <Section className="overflow-x-clip bg-soft py-12 md:py-24">
        <div className="max-w-3xl text-left md:mx-auto md:text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
            How we work with you
          </p>
          <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
            From first conversation to pilot learnings.
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
            We co-design the pilot with you — scope, launch and review — so it fits your
            organisation and your people.
          </p>
        </div>
        <div className="relative mx-auto mt-8 max-w-5xl md:mt-12">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-0.5 bg-gradient-to-r from-lime/20 via-lime/50 to-lime/20 md:block"
            aria-hidden
          />
          <ol className="flex flex-col md:grid md:grid-cols-3 md:gap-6">
            {pilotPhases.map(({ step, title, body, icon: Icon }, index) => (
              <li
                key={step}
                className="relative min-w-0 pb-8 pl-10 last:pb-0 md:rounded-[20px] md:border md:border-line md:bg-paper md:p-6 md:pb-6 md:pl-6 md:pt-8 md:shadow-sm"
              >
                {index < pilotPhases.length - 1 ? (
                  <span
                    className="absolute bottom-0 left-[15px] top-9 w-0.5 bg-lime/35 md:hidden"
                    aria-hidden
                  />
                ) : null}
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-bold text-primary-dark md:left-1/2 md:-top-4 md:h-9 md:w-9 md:-translate-x-1/2 md:text-sm">
                  {step}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-paper text-brand ring-1 ring-line md:mx-auto md:mt-2 md:bg-soft md:ring-0">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-3 font-display text-lg text-primary sm:text-xl md:mt-4 md:text-center">
                  {title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted md:mt-2 md:text-center">
                  {body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      {/* Safety */}
      <Section className="overflow-x-clip bg-paper py-12 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              Non-negotiables
            </p>
            <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
              Participation should feel safe.
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
              Neurodivergent employees should be able to opt in without pressure. Trust is
              part of the product — not an afterthought.
            </p>
          </div>
          <ul className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1 xl:grid-cols-2">
            {safetyPillars.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-[20px] border border-line bg-soft p-4 transition hover:border-primary-light/40 sm:p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-brand ring-1 ring-line">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="mt-3 font-semibold text-primary">{title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Enquire */}
      <Section className="overflow-x-clip bg-primary-dark py-12 text-paper md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div className="order-2 min-w-0 lg:order-1">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-lime">
              Next step
            </p>
            <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-4xl">
              Tell us what your team needs.
            </h2>
            <p className="mt-3 text-base text-paper/80 sm:mt-4 sm:text-lg">
              Share your context and we will discuss whether a pilot is a fit — no hard sell,
              just an honest conversation.
            </p>
            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
              {enquireSteps.map((line, i) => (
                <li key={line} className="flex gap-3 sm:gap-4">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/20 text-sm font-bold text-lime">
                    {i + 1}
                  </span>
                  <p className="min-w-0 pt-0.5 text-sm leading-relaxed text-paper/85 sm:text-base">
                    {line}
                  </p>
                </li>
              ))}
            </ol>
            <div className="mt-6 flex flex-col gap-3 sm:mt-8 sm:flex-row sm:flex-wrap">
              <Link to={contactOrg} className={`${ctaPrimary} bg-lime text-primary-dark`}>
                Enquire about a pilot
              </Link>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`${ctaSecondary} border-paper/35 text-paper hover:bg-white/10`}
              >
                Email {CONTACT_EMAIL}
              </a>
            </div>
          </div>
          <div className="order-1 mx-auto w-full max-w-[min(100%,17rem)] sm:max-w-xs lg:order-2 lg:max-w-sm">
            <div className="rounded-[20px] border border-white/12 bg-white/8 p-4 sm:p-6">
              <p className="text-sm font-bold uppercase tracking-wide text-lime">
                Good to include
              </p>
              <ul className="mt-4 space-y-2 text-sm text-paper/85">
                <li className="flex gap-2">
                  <span className="text-lime" aria-hidden>
                    ·
                  </span>
                  Organisation name & industry
                </li>
                <li className="flex gap-2">
                  <span className="text-lime" aria-hidden>
                    ·
                  </span>
                  Approximate team or pilot size
                </li>
                <li className="flex gap-2">
                  <span className="text-lime" aria-hidden>
                    ·
                  </span>
                  What you hope support will change
                </li>
                <li className="flex gap-2">
                  <span className="text-lime" aria-hidden>
                    ·
                  </span>
                  Any timing or procurement notes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <FAQSection />

      <FinalCtaBand
        title="Ready to explore a pilot?"
        body="Start with the contact form — we will follow up by email to discuss scope and fit."
      >
        <Link to={contactOrg} className={`${ctaPrimary} bg-brand text-paper`}>
          Enquire about a pilot
        </Link>
      </FinalCtaBand>
    </>
  );
}
