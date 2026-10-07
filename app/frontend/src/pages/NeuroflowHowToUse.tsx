import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import PageHeader from "@/components/marketing/PageHeader";
import { RevealSection } from "@/components/Reveal";

const steps = [
  {
    title: "Open Neuroflow when you need a nudge",
    body: "Use it at the start of a task block or when switching between things feels sticky.",
  },
  {
    title: "Name one small first step",
    body: "Keep it concrete — one sentence you could do in the next few minutes.",
  },
  {
    title: "Follow the flow at your pace",
    body: "There is no streak to protect. Pause, adjust, or come back when it fits your day.",
  },
  {
    title: "Pair it with other NeuroDiver support",
    body: "Body doubling, check-ins, and strategies on the site can reinforce what Neuroflow started.",
  },
];

export default function NeuroflowHowToUse() {
  useSEO({
    title: "How to use Neuroflow",
    description: "Simple steps for getting the most from Neuroflow with NeuroDiver.",
    path: "/neuroflow/how-to-use",
  });

  return (
    <>
      <PageHeader
        compact
        eyebrow="Neuroflow"
        title="How to use Neuroflow"
        description="A short guide so you can reuse the flow whenever starting feels hard."
      >
        <Link
          to="/neuroflow"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-paper/40 px-8 py-3 text-base font-semibold text-paper transition hover:bg-white/10 sm:w-auto"
        >
          Back to thank you page
        </Link>
      </PageHeader>

      <RevealSection className="border-t border-line bg-paper px-6 py-12 md:py-16">
        <div className="mx-auto max-w-2xl">
          <ol className="space-y-8">
            {steps.map((step, index) => (
              <li key={step.title} className="flex gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand/15 text-sm font-bold text-brand">
                  {index + 1}
                </span>
                <div>
                  <h2 className="font-display text-xl text-primary md:text-2xl">{step.title}</h2>
                  <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              to="/"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-8 py-3 text-base font-semibold text-paper transition hover:bg-brand/90 sm:w-auto"
            >
              Explore more on NeuroDiver
            </Link>
            <Link
              to="/tools"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-primary/20 px-8 py-3 text-base font-semibold text-primary transition hover:border-primary/35 sm:w-auto"
            >
              View the support toolkit
            </Link>
          </div>
        </div>
      </RevealSection>
    </>
  );
}
