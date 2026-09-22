import type { LucideIcon } from "lucide-react";
import { Ear, HeartHandshake, Link as LinkIcon, Sparkles, Stethoscope } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PageHeader from "@/components/marketing/PageHeader";
import TeamMemberSection from "@/components/ui/team-member";
import FAQSection from "@/components/FAQsection";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import { FinalCtaBand, Section } from "@/components/marketing/Section";

const ctaPrimary =
  "inline-flex min-h-11 w-full items-center justify-center rounded-full px-6 py-3 text-sm font-bold transition hover:brightness-95 sm:w-auto";

const buildSteps = [
  {
    step: "01",
    title: "Listen first",
    body: "We start with what neurodivergent adults say is missing — energy, focus, work, everyday friction.",
    icon: Ear,
  },
  {
    step: "02",
    title: "Test in real days",
    body: "We try ideas with people who use NeuroDiver and notice what feels overwhelming or actually helps.",
    icon: Sparkles,
  },
  {
    step: "03",
    title: "Make the next step obvious",
    body: "We keep refining until support feels practical, respectful and reachable on an ordinary Tuesday.",
    icon: HeartHandshake,
  },
];

const roots: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: HeartHandshake,
    title: "Lived experience in the room",
    body: "Facilitation, community work and product design shaped by people who know these days from the inside.",
  },
  {
    icon: Sparkles,
    title: "Tools, not lectures",
    body: "Body doubling, check-ins and strategies — built for moments when you need a hand, not a homework list.",
  },
  {
    icon: Stethoscope,
    title: "Advisers in the loop",
    body: "Clinical psychology advisers help us keep guidance practical and responsible.",
  },
];

const advisers = [
  { name: "Izzat Zaid", role: "Clinical psychology adviser" },
  { name: "Shaleen Chrisanne", role: "Clinical psychology adviser" },
  { name: "Kiran Kaur", role: "Clinical psychology adviser" },
];

export default function AboutUs() {
  useSEO({
    title: "About NeuroDiver | Built with Neurodivergent Adults",
    description:
      "NeuroDiver is a support platform built with neurodivergent adults. Meet the team and learn how we design practical tools for real days.",
    path: "/about",
  });

  return (
    <>
      <PageHeader
        eyebrow="About NeuroDiver"
        title="We are building support that makes room for different brains."
        description="We listened to neurodivergent adults describe friction with energy, focus and work — then built practical support around those moments."
      />

      {/* Origin */}
      <Section className="overflow-x-clip border-t border-line bg-soft py-12 md:py-24">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-14">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              Why we exist
            </p>
            <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
              From lived experience to useful tools.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">
              The team combines lived experience, facilitation, community work and product
              design. We test with the people who use NeuroDiver, learn from what feels
              overwhelming, and keep making the next step easier to find.
            </p>
            <blockquote className="mt-6 rounded-[20px] border border-line bg-paper p-5 sm:mt-8">
              <p className="font-display text-lg leading-snug text-primary sm:text-xl">
                &ldquo;We want support to feel practical, respectful and possible to use on an
                ordinary Tuesday.&rdquo;
              </p>
              <footer className="mt-3 text-sm font-medium text-muted">— NeuroDiver team</footer>
            </blockquote>
          </div>
          <ul className="grid min-w-0 gap-3 sm:gap-4">
            {roots.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="flex gap-3 rounded-[20px] border border-line bg-paper p-4 sm:gap-4 sm:p-5"
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
      </Section>

      {/* How we build */}
      <Section className="overflow-x-clip bg-paper py-12 md:py-24">
        <div className="max-w-3xl text-left md:mx-auto md:text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
            How we work
          </p>
          <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
            Design with people, not just for them.
          </h2>
          <p className="mt-3 text-base text-muted sm:mt-4 sm:text-lg">
            A simple loop — listen, test, simplify — so the product stays grounded in real
            workdays.
          </p>
        </div>
        <div className="relative mx-auto mt-8 max-w-5xl md:mt-12">
          <div
            className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-0.5 bg-gradient-to-r from-lime/20 via-lime/50 to-lime/20 md:block"
            aria-hidden
          />
          <ol className="flex flex-col md:grid md:grid-cols-3 md:gap-6">
            {buildSteps.map(({ step, title, body, icon: Icon }, index) => (
              <li
                key={step}
                className="relative min-w-0 pb-8 pl-10 last:pb-0 md:rounded-[20px] md:border md:border-line md:bg-soft md:p-6 md:pb-6 md:pl-6 md:pt-8"
              >
                {index < buildSteps.length - 1 ? (
                  <span
                    className="absolute bottom-0 left-[15px] top-9 w-0.5 bg-lime/35 md:hidden"
                    aria-hidden
                  />
                ) : null}
                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-bold text-primary-dark md:left-1/2 md:-top-4 md:h-9 md:w-9 md:-translate-x-1/2 md:text-sm">
                  {step}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-soft text-brand ring-1 ring-line md:mx-auto md:mt-2 md:ring-0">
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

      {/* Team */}
      <Section id="team" className="scroll-mt-24 overflow-x-clip bg-soft py-12 md:py-24">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0">
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              The humans
            </p>
            <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">
              Meet the people behind NeuroDiver.
            </h2>
            <p className="mt-3 max-w-2xl text-base text-muted sm:mt-4 sm:text-lg">
              Co-founders and builders — plus clinical advisers who help us shape responsible
              support.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            Say hello
            <LinkIcon className="h-3.5 w-3.5" aria-hidden />
          </Link>
        </div>
        <TeamMemberSection showIntro={false} />
      </Section>

      {/* Advisers */}
      <Section className="overflow-x-clip border-t border-line bg-paper py-12 md:py-20">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
          Clinical advisers
        </p>
        <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl">
          Shaped with professional guidance.
        </h2>
        <p className="mt-3 max-w-2xl text-base text-muted sm:text-lg">
          Our advisers inform how we talk about strategies and wellbeing — without turning
          NeuroDiver into a clinical service.
        </p>
        <ul className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
          {advisers.map(({ name, role }) => (
            <li
              key={name}
              className="rounded-[20px] border border-line bg-soft px-4 py-5 text-center sm:px-5"
            >
              <p className="font-semibold text-primary">{name}</p>
              <p className="mt-1 text-sm text-muted">{role}</p>
            </li>
          ))}
        </ul>
      </Section>

      <FAQSection />

      <FinalCtaBand
        title="See what we have built so far."
        body="Explore the toolkit, book a body doubling session, or get in touch if you are exploring a workplace pilot."
      >
        <Link to="/tools" className={`${ctaPrimary} bg-brand text-paper`}>
          Explore the tools
        </Link>
        <BookSessionButton className="w-full sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
      </FinalCtaBand>
    </>
  );
}
