import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import FAQSection from "@/components/FAQsection";
import { FinalCtaBand, Section } from "@/components/marketing/Section";
import { APP_SIGN_IN_URL } from "@/constants/site";

type BillingCycle = "monthly" | "annual";

const MONTHLY_PRICE = 39;
const ANNUAL_TOTAL = 358.8;
const ANNUAL_MONTHLY_EQUIV = 29.9;

const onboardingSteps = [
  { step: "1", title: "Make it yours", body: "A few optional questions." },
  { step: "2", title: "Create your account", body: "Save your choices, then review checkout." },
  { step: "3", title: "Choose a session", body: "Pick a time that fits your week." },
  { step: "4", title: "Get your link by email", body: "Your confirmation and reminders." },
];

const sessionFlow = [
  {
    title: "Arrive & settle in",
    body: "Choose a manageable intention for the session.",
  },
  {
    title: "Work alongside each other",
    body: "Quiet focus time, at your own pace.",
  },
  {
    title: "Close with a check-in",
    body: "Notice what moved forward, however small.",
  },
];

const billingSpring = { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.85 };

function BillingToggle({
  cycle,
  onChange,
}: {
  cycle: BillingCycle;
  onChange: (c: BillingCycle) => void;
}) {
  return (
    <div
      className="relative inline-flex items-stretch rounded-xl border border-line bg-white p-1 shadow-[0_1px_3px_rgba(23,43,32,0.06)]"
      role="group"
      aria-label="Billing cycle"
    >
      <button
        type="button"
        onClick={() => onChange("monthly")}
        aria-pressed={cycle === "monthly"}
        className="relative z-10 rounded-lg px-5 py-2.5 text-sm font-semibold sm:px-6"
      >
        {cycle === "monthly" ? (
          <motion.span
            layoutId="pricing-billing-indicator"
            className="absolute inset-0 rounded-lg border-2 border-brand bg-brand/[0.04]"
            transition={billingSpring}
            aria-hidden
          />
        ) : null}
        <motion.span
          className="relative block"
          animate={{
            color: cycle === "monthly" ? "var(--color-primary)" : "var(--color-muted)",
          }}
          transition={{ duration: 0.2 }}
        >
          Monthly
        </motion.span>
      </button>

      <button
        type="button"
        onClick={() => onChange("annual")}
        aria-pressed={cycle === "annual"}
        className="relative z-10 rounded-lg px-3 py-2.5 text-sm font-semibold sm:px-4"
      >
        {cycle === "annual" ? (
          <motion.span
            layoutId="pricing-billing-indicator"
            className="absolute inset-0 rounded-lg border-2 border-brand bg-brand/[0.04]"
            transition={billingSpring}
            aria-hidden
          />
        ) : null}
        <span className="relative flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 sm:flex-nowrap">
          <motion.span
            animate={{
              color: cycle === "annual" ? "var(--color-primary)" : "var(--color-muted)",
            }}
            transition={{ duration: 0.2 }}
          >
            Annual
          </motion.span>
          <motion.span
            layout
            animate={{
              color: cycle === "annual" ? "var(--color-brand)" : "var(--color-primary-light)",
              opacity: cycle === "annual" ? 1 : 0.85,
            }}
            transition={billingSpring}
            className="text-xs font-semibold sm:text-sm"
          >
            Save RM109.20/year
          </motion.span>
        </span>
      </button>
    </div>
  );
}

function FeatureList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-left text-sm leading-relaxed text-primary/85 sm:text-base">
          <span
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-soft text-brand"
            aria-hidden
          >
            <Check className="h-3 w-3 stroke-[3]" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  useSEO({
    title: "Pricing & Membership",
    description:
      "NeuroDiver membership and free check-ins. Body doubling sessions, energy tracking, and a gentle space to begin — from RM39/month.",
    path: "/pricing",
  });

  const membershipPrice =
    billing === "monthly"
      ? {
          amount: `RM${MONTHLY_PRICE}`,
          suffix: "/ month",
          note: `RM${MONTHLY_PRICE} charged every month.`,
        }
      : {
          amount: `RM${ANNUAL_MONTHLY_EQUIV.toFixed(2)}`,
          suffix: "/ month equivalent",
          note: `RM${ANNUAL_TOTAL.toFixed(2)} charged once a year, equivalent to RM${ANNUAL_MONTHLY_EQUIV.toFixed(2)}/month.`,
        };

  return (
    <>
      <Section className="border-t border-line bg-paper py-12 md:py-16">
      <div className="mt-6 text-center flex flex-col items-center gap-3">
            <p className="text-5xl font-semibold text-black">NeuroDiver membership</p>
            <p className="text-2xl font-semibold text-muted">Bring the thing you want to work on.<br />Spend 90 minutes working alongside others, with a gentle start and a shared finish.</p>
            <BillingToggle cycle={billing} onChange={setBilling} />
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:mt-12 lg:grid-cols-2 lg:gap-8">
          <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-6 sm:p-8 md:p-10">
            <p className="text-sm font-medium text-primary-light">Your everyday space</p>
            <h2 className="font-display mt-3 text-3xl tracking-tight text-primary sm:text-4xl">
              Free check-ins
            </h2>
            <p className="mt-6 font-display text-4xl text-primary sm:text-[2.75rem]">
              RM0{" "}
              <span className="font-sans text-lg font-normal text-muted sm:text-xl">/ always</span>
            </p>
            <p className="mt-3 max-w-sm text-muted">A place to pause and notice how you feel.</p>

            <div className="my-8 border-t border-line" aria-hidden />

            <div className="flex flex-1 flex-col">
              <FeatureList
                items={[
                  "Daily mood and energy check-ins",
                  "Your basic in-app history",
                  "No subscription or card needed",
                ]}
              />
              <a
                href={APP_SIGN_IN_URL}
                className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/30 hover:bg-soft"
              >
                Create a free account
              </a>
            </div>
          </article>

          <article className="relative flex h-full flex-col rounded-2xl border-2 border-brand bg-white p-6 sm:p-8 md:p-10">
            <img
              src="/images/dibo.png"
              alt=""
              className="pointer-events-none absolute right-5 top-6 h-14 w-14 object-contain sm:right-8 sm:top-8 sm:h-16 sm:w-16"
              aria-hidden
            />
            <p className="text-sm font-medium text-primary-light">Make room for focus</p>
            <h2 className="font-display mt-3 max-w-[12rem] text-3xl tracking-tight text-primary sm:text-4xl">
              Membership
            </h2>
            <p className="mt-6 font-display text-4xl text-primary sm:text-[2.75rem]">
              {membershipPrice.amount}{" "}
              <span className="font-sans text-base font-normal text-muted sm:text-lg">
                {membershipPrice.suffix}
              </span>
            </p>
            <p className="mt-3 max-w-md text-sm text-muted sm:text-base">{membershipPrice.note}</p>

            <div className="my-8 border-t border-line" aria-hidden />

            <div className="flex flex-1 flex-col">
              <FeatureList
                items={[
                  "Up to 8 body-doubling sessions each calendar month",
                  "90-minute online co-working sessions",
                  "Energy tracker and weekly reports",
                  "Discounted live events",
                ]}
              />
              <a
                href={APP_SIGN_IN_URL}
                className="mt-10 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-95"
              >
                Choose membership
              </a>
              <p className="mt-4 text-center text-xs leading-relaxed text-muted sm:text-left">
                Auto-renews. Cancel future renewal in Membership &amp; billing before your next
                charge. Access continues until the paid period ends.
              </p>
            </div>
          </article>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-dashed border-brand/35 bg-amber-200/30 p-6 text-center sm:p-8">
          <p className="text-xs font-bold uppercase tracking-wide text-brand">
            A first month to find your rhythm
          </p>
          <p className="mt-3 text-base leading-relaxed text-primary/85 sm:text-lg">
            Code <span className="font-mono font-bold text-primary">DIBODIVER</span> gives 30 days
            free to the first 100 eligible members. Availability is checked securely before
            payment. A card is required; your chosen plan starts charging after the trial unless
            you cancel.
          </p>
        </div>
      </Section>

      <Section className="border-t border-line bg-soft py-12 md:py-20">
        <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
          What happens next
        </p>
        <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {onboardingSteps.map((item) => (
            <li key={item.step} className="rounded-[20px] border border-line bg-paper p-5">
              <span className="text-sm font-bold text-lime">{item.step.padStart(2, "0")}</span>
              <h2 className="font-display mt-2 text-lg text-primary">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section className="border-t border-line bg-paper py-12 md:py-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-14">
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              Bring your own task
            </p>
            <h2 className="font-display mt-3 text-3xl text-primary md:text-4xl">A shared 90 minutes</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">
              Body doubling means working alongside other people on your own task. You might study,
              write, plan, or tackle everyday admin.
            </p>
            <Link
              to="/body-doubling"
              className="mt-6 inline-block text-sm font-semibold text-brand hover:underline"
            >
              Learn about body doubling
            </Link>
          </div>
          <ul className="space-y-4">
            {sessionFlow.map((step, index) => (
              <li key={step.title} className="rounded-[20px] border border-line bg-paper p-5">
                <span className="text-xs font-bold uppercase tracking-wide text-brand">
                  Step {index + 1}
                </span>
                <h3 className="font-display mt-2 text-xl text-primary">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <FAQSection />

      <FinalCtaBand
        title="Ready when you are."
        body="Start with free check-ins or choose membership when you want regular body doubling sessions."
      >
        <BookSessionButton className="w-full sm:w-auto">Book a body doubling session</BookSessionButton>
        <a
          href={APP_SIGN_IN_URL}
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-primary/20 bg-paper px-8 py-3 text-base font-semibold text-primary transition hover:border-primary/35 sm:w-auto"
        >
          Create a free account
        </a>
      </FinalCtaBand>
    </>
  );
}
