// src/pages/ForIndividuals.tsx
import { Battery, CheckCircle2, Moon, Video, Zap } from "lucide-react";
import AudienceTemplate from "../components/AudienceTemplate";
import type { FeatureTab, PainPoint } from "../components/AudienceTemplate";
import { useSEO } from "@/hooks/useSEO";

const painPoints: PainPoint[] = [
  { image: "/images/stress.png", text: "I know what I need to do, but I cannot start." },
  { image: "/images/drained.jpg", text: "I feel drained after meetings." },
  { image: "/images/many-things.jpg", text: "I lose track of tasks when there is too much going on." },
  { image: "/images/relax.jpg", text: "I need recovery time after being \u201con\u201d all day." },
];

function CheckInPreview() {
  const levels = [
    { icon: Battery, label: "Low", active: false },
    { icon: Zap, label: "Steady", active: true },
    { icon: Moon, label: "Depleted", active: false },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-primary/50">Today's check-in</p>
      <p className="mt-1 font-serif text-xl text-primary">How's your energy right now?</p>
      <div className="mt-5 flex gap-3">
        {levels.map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={`flex flex-1 flex-col items-center gap-2 rounded-2xl border p-4 transition-colors ${
              active ? "border-yellow bg-yellow/30" : "border-primary/10 bg-primary/3"
            }`}
          >
            <Icon className={`h-5 w-5 ${active ? "text-orange" : "text-primary/40"}`} />
            <span className={`text-xs font-medium ${active ? "text-primary" : "text-primary/40"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-5 rounded-full bg-primary py-3 text-center text-sm font-semibold text-white">
        Log check-in
      </div>
    </div>
  );
}

function StrategiesPreview() {
  const items = [
    { title: "Two-minute start", tag: "Low energy · 2 min" },
    { title: "Body double session", tag: "Focus · 25 min" },
    { title: "Task triage", tag: "Overwhelm · 5 min" },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-primary/50">Suggested for you</p>
      <div className="mt-3 space-y-3">
        {items.map((item) => (
          <div
            key={item.title}
            className="flex items-center justify-between rounded-2xl border border-primary/10 bg-primary/3 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-4 w-4 flex-none text-orange" />
              <span className="text-sm font-medium text-primary">{item.title}</span>
            </div>
            <span className="text-xs text-primary/40">{item.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BodyDoublingPreview() {
  const initials = ["A", "M", "R", "K", "J"];

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary/50">Focus room</p>
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary/50">
          <span className="h-1.5 w-1.5 rounded-full bg-orange" />
          12 in session
        </span>
      </div>
      <p className="mt-1 font-serif text-xl text-primary">Quiet Deep Work</p>
      <div className="mt-5 flex -space-x-3">
        {initials.map((letter) => (
          <div
            key={letter}
            className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-primary-light text-sm font-semibold text-white"
          >
            {letter}
          </div>
        ))}
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-yellow/50 text-xs font-semibold text-primary">
          +7
        </div>
      </div>
      <div className="mt-5 flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-white">
        <Video className="h-4 w-4" />
        Join session
      </div>
    </div>
  );
}

const tabs: FeatureTab[] = [
  {
    id: "check-in",
    label: "Check In",
    title: "A quick pulse on how you're actually doing.",
    description:
      "A few taps, once or twice a day, to log your energy and focus. Over time it builds a picture of your real patterns — so you can plan around them instead of fighting them.",
    preview: <CheckInPreview />,
  },
  {
    id: "strategies",
    label: "Strategies",
    title: "Suggestions sized to the moment you're in.",
    description:
      "No generic productivity advice. Strategies are matched to your current energy and the specific friction you're facing, vetted by clinical psychologists.",
    preview: <StrategiesPreview />,
  },
  {
    id: "body-doubling",
    label: "Body Doubling",
    title: "Momentum is easier to find with others around.",
    description:
      "Drop into a shared virtual focus session. No talking required — just quiet, present company while you work through a task that's been stuck.",
    preview: <BodyDoublingPreview />,
  },
];

export default function ForIndividuals() {
  useSEO({
    title: "For Individuals — ADHD & Neurodivergent Productivity Tools",
    description:
      "Built for neurodivergent working adults, freelancers, and founders. Track your energy, get strategies matched to your brain, and find momentum with body doubling sessions.",
    path: "/individuals",
  });
  return (
    <AudienceTemplate
      eyebrow="For Individuals"
      headline={
        <>
          If work feels harder than it looks,{" "}
          <span className="italic text-primary-light">you are not alone.</span>
        </>
      }
      subtext="Built for working adults and freelancers whose brains just don't run on the default settings most tools assume."
      painPoints={painPoints}
      betterHeading="It can be better. Here's how."
      tabsEyebrow="What we provide"
      tabsHeading="Three ways NeuroDiver supports your day."
      tabsSubtext="Each one meets you where you are — no forcing a routine that isn't yours."
      tabs={tabs}
      ctaHeading="Be first to try it."
      ctaSubtext="Join the waitlist and help shape the tools as they're built."
    />
  );
}