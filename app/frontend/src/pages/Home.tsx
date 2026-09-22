import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import PageHeader from "@/components/marketing/PageHeader";
import HeroVisual from "@/components/marketing/HeroVisual";
import FeatureRow from "@/components/marketing/FeatureRow";
import FAQSection from "@/components/FAQsection";
import { FinalCtaBand } from "@/components/marketing/Section";
import { APP_SIGN_IN_URL } from "@/constants/site";

const recognitionCards = [
  {
    quote: "I know what I need to do, but I cannot start.",
    action: "Try body doubling.",
    to: "/body-doubling",
  },
  {
    quote: "I do not realise I am burning out until it is too late.",
    action: "Try a check-in.",
    to: "/tools",
  },
  {
    quote: "I cannot explain what I need at work.",
    action: "Explore strategies.",
    to: "/tools",
  },
];

const sessionSteps = [
  { title: "Choose a session", body: "Open the app and pick a time that works for you." },
  { title: "Sign in or create an account", body: "New to NeuroDiver? Create an account to book." },
  { title: "Bring one task", body: "Name a small first step — work, study or admin." },
  { title: "Focus together", body: "Join the room, work quietly, and wrap up when the session ends." },
];

export default function Home() {
  useSEO({
    title: "Support for Neurodivergent Adults",
    description:
      "NeuroDiver is a support platform for neurodivergent adults. Explore body doubling, quick check-ins and practical strategies that work with your brain.",
    path: "/",
  });

  return (
    <div className="bg-paper">
      <PageHeader
        eyebrow="For neurodivergent adults"
        title="Support that works with your brain."
        description={
          <>
            Body doubling, check-ins and strategies — in one place.
            <span className="mt-2 block text-sm font-semibold text-lime/90">
              No diagnosis needed · Cameras optional
            </span>
          </>
        }
        media={<HeroVisual />}
      >
        <BookSessionButton variant="on-dark" className="w-full px-8 sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
        <Link
          to="/tools"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-paper/40 px-8 py-3 text-base font-semibold text-paper transition hover:bg-white/10 sm:w-auto"
        >
          Explore the support toolkit
        </Link>
      </PageHeader>

      {/* 02 RECOGNITION */}
      <section className="border-t border-line bg-paper px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
            Sound familiar?
          </p>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-3xl text-primary md:text-4xl">
            If work feels harder than it looks, you are not alone.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted">
            Not knowing what you need. Pretending until burnout hits. Work feeling like a daily
            crisis. If any of that sounds familiar, you are not the problem.
          </p>
        </div>
        <ul className="mx-auto mt-12 grid max-w-6xl gap-6 md:grid-cols-3">
          {recognitionCards.map((card) => (
            <li
              key={card.quote}
              className="rounded-[20px] border border-line bg-soft p-6 text-left"
            >
              <p className="text-lg font-semibold leading-snug text-primary">
                &ldquo;{card.quote}&rdquo;
              </p>
              <Link
                to={card.to}
                className="mt-4 inline-block text-sm font-semibold text-brand hover:underline"
              >
                {card.action}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-line bg-soft px-6 py-12 md:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
            Three ways to find support
          </p>
          <h2 className="font-display mt-3 text-3xl text-primary md:text-4xl">
            A steadier way to move through your day.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Choose the kind of support you need today. You can begin with one tool and find
            another when you need it.
          </p>
        </div>
      </section>

      <FeatureRow
        title="Body doubling"
        body="When starting or finishing feels hard alone, work alongside others in a structured online session. State your task, focus together and check out. Cameras optional."
        media={
          <img
            src="/images/bodydouble.png"
            className="w-full object-cover"
          />
        }
        mediaLabel="Book a session"
        cta={{ label: "Book a session", href: APP_SIGN_IN_URL, external: true }}
      />

      <FeatureRow
        className="bg-soft"
        reverse
        title="Check-in"
        body="A quick check-in helps you notice your energy and focus. Over time, see more clearly what helps and what drains you, without a streak to keep or a guilt screen."
        media={
          <img
            src="/images/checkin.png"
            className="w-full object-cover"
          />
        }
        mediaLabel="Notice energy"
        cta={{ label: "Explore the app", href: APP_SIGN_IN_URL, external: true }}
      />

      <FeatureRow
        title="Strategy guidance"
        body="Find practical, situation-based strategies drawn from neurodivergent lived experience and shaped with clinical adviser input. Start with one next step that fits your moment."
        media={
          <img
            src="/images/strategy.png"
            alt="Strategy guidance in the NeuroDiver app"
            className="w-full object-cover"
          />
        }
        mediaLabel="Find one step"
        cta={{ label: "Explore all tools", href: "/tools" }}
      />

      <section className="bg-primary-dark px-6 py-16 text-paper md:py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-lime">
            A gentler way to get started
          </p>
          <h2 className="font-display mt-3 max-w-xl text-3xl md:text-4xl">
            Start with a session. Stay for the support that fits.
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-paper/80">
            A body doubling session gives you a time and place to begin alongside others. From
            there, NeuroDiver also offers check-ins and strategies for the moments when you
            need to understand your energy or find another way forward.
          </p>
          <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sessionSteps.map((step, i) => (
              <li
                key={step.title}
                className="rounded-[20px] border border-white/12 bg-white/8 p-5"
              >
                <span className="text-sm font-bold text-lime">0{i + 1}</span>
                <p className="mt-2 font-semibold">{step.title}</p>
                <p className="mt-2 text-sm text-paper/70">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10">
            <BookSessionButton variant="on-dark">Book a body doubling session</BookSessionButton>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              Built with the people who use it
            </p>
            <h2 className="font-display mt-3 text-3xl text-primary md:text-4xl">
              Built with lived experience, for real days.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted">
              NeuroDiver grew from listening to neurodivergent adults describe what support is
              missing at work and in everyday life. We keep testing the tools with our
              community and work with clinical psychology advisers on practical, responsible
              support.
            </p>
            <Link
              to="/about"
              className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
            >
              Meet the team
            </Link>
          </div>
          <div className="rounded-[20px] border border-line bg-soft p-8">
            <p className="text-lg font-semibold leading-relaxed text-primary">
              &ldquo;We want support to feel practical, respectful and possible to use on an
              ordinary Tuesday.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-muted">— NeuroDiver team</p>
          </div>
        </div>
      </section>

      {/* <section className="border-t border-line bg-soft px-6 py-16 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-display text-3xl text-primary md:text-4xl">
            Support the people behind the work.
          </h2>
          <p className="mt-4 text-lg text-muted">
            We are exploring opt-in workplace pilots that give neurodivergent talent practical
            support without asking them to explain or disclose everything first. Talk to us
            about a pilot for your team.
          </p>
          <Link
            to="/contact?audience=organisation"
            className="mt-8 inline-flex min-h-11 items-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper hover:brightness-95"
          >
            Enquire about a pilot
          </Link>
        </div>
      </section> */}

      <FAQSection />

      <FinalCtaBand
        title="Work with your brain, not against it."
        body="Begin with a body doubling session, then explore the rest of the support toolkit whenever you need it."
        footnote="You will continue in the NeuroDiver app to sign in and choose a session."
      >
        <BookSessionButton className="w-full sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
        <Link
          to="/body-doubling"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-brand px-6 py-3 text-sm font-semibold text-brand transition hover:bg-soft sm:w-auto"
        >
          Explore how it works
        </Link>
      </FinalCtaBand>
    </div>
  );
}
