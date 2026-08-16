// src/pages/ForOrganisations.tsx
import { AlertTriangle, ArrowUpRight, TrendingUp, Users } from "lucide-react";
import AudienceTemplate from "../components/AudienceTemplate";
import type { FeatureTab, PainPoint } from "../components/AudienceTemplate";
import { useSEO } from "@/hooks/useSEO";

// Placeholder copy — swap for real pain points your org research surfaced.
const painPoints: PainPoint[] = [
  { image: "/images/burn-out.jpg", text: "You don't know who's about to burn out until it's too late." },
  { image: "/images/unused.jpg", text: "One-size-fits-all wellness programs go unused." },
  { image: "/images/guesswork.jpg", text: "Retaining neurodivergent talent feels like guesswork." },
  { image: "/images/support.jpg", text: "Support conversations happen too late, if at all." },
];

function DashboardPreview() {
  const bars = [62, 78, 45, 88, 70, 55, 92];

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-primary/50">Team energy · this week</p>
        <span className="flex items-center gap-1 text-xs font-semibold text-orange">
          <TrendingUp className="h-3.5 w-3.5" />
          +12%
        </span>
      </div>
      <div className="mt-5 flex h-32 items-end gap-2">
        {bars.map((height, index) => (
          <div key={index} className="flex-1 rounded-t-lg bg-primary-light/70" style={{ height: `${height}%` }} />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-primary/40">
        <span>Mon</span>
        <span>Sun</span>
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-primary/10 pt-4 text-sm text-primary/60">
        <Users className="h-4 w-4 text-primary/40" />
        42 team members reporting
      </div>
    </div>
  );
}

function InsightsPreview() {
  const insights = [
    { text: "3 team members show early signs of overload this week.", tone: "warn" as const },
    { text: "Engineering's focus scores rose after adding async check-ins.", tone: "good" as const },
    { text: "Consider a lighter meeting day before the sprint deadline.", tone: "neutral" as const },
  ];

  return (
    <div>
      <p className="text-sm font-semibold text-primary/50">This week's insights</p>
      <div className="mt-3 space-y-3">
        {insights.map((insight) => (
          <div
            key={insight.text}
            className="flex items-start gap-3 rounded-2xl border border-primary/10 bg-primary/3 px-4 py-3"
          >
            {insight.tone === "warn" ? (
              <AlertTriangle className="mt-0.5 h-4 w-4 flex-none text-orange" />
            ) : (
              <ArrowUpRight className="mt-0.5 h-4 w-4 flex-none text-primary-light" />
            )}
            <p className="text-sm leading-relaxed text-primary/80">{insight.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function WellbeingTrendPreview() {
  return (
    <div>
      <p className="text-sm font-semibold text-primary/50">Wellbeing score</p>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="font-serif text-4xl text-primary">81</span>
        <span className="text-sm font-semibold text-orange">+9 this quarter</span>
      </div>
      <svg viewBox="0 0 240 80" className="mt-5 h-20 w-full">
        <polyline
          points="0,60 40,52 80,55 120,38 160,30 200,18 240,10"
          fill="none"
          stroke="#C17F3A"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <polygon
          points="0,60 40,52 80,55 120,38 160,30 200,18 240,10 240,80 0,80"
          fill="#EBDFAD"
          opacity="0.4"
        />
      </svg>
      <p className="mt-3 text-sm leading-relaxed text-primary/60">
        Tracked across check-ins, strategy usage, and focus session attendance — never
        tied to individual identities in reports.
      </p>
    </div>
  );
}

const tabs: FeatureTab[] = [
  {
    id: "dashboard",
    label: "Team Dashboard",
    title: "See how your team is really doing, in aggregate.",
    description:
      "A privacy-first view of energy, focus, and engagement trends across your team — built to spot patterns, not to monitor individuals.",
    preview: <DashboardPreview />,
  },
  {
    id: "insights",
    label: "Insights",
    title: "Know what to act on, not just what happened.",
    description:
      "Plain-language recommendations flag early signs of overload and highlight what's already working, so managers can act before small friction becomes attrition.",
    preview: <InsightsPreview />,
  },
  {
    id: "wellbeing",
    label: "Wellbeing Trends",
    title: "Track the shift over weeks and quarters, not just today.",
    description:
      "A single wellbeing score rolls up check-ins and engagement over time, giving leadership a clear signal without exposing anyone's individual data.",
    preview: <WellbeingTrendPreview />,
  },
];

export default function ForOrganisations() {
  useSEO({
    title: "For Organisations — Neurodivergent-Inclusive Workplace Tools",
    description:
      "Help your team thrive. NeuroDiver gives organisations privacy-first wellbeing insights, team energy dashboards, and evidence-based support for neurodivergent employees.",
    path: "/organisations",
  });
  return (
    <AudienceTemplate
      eyebrow="For Organisations"
      headline={
        <>
          If your best people are struggling quietly,{" "}
          <span className="italic text-primary-light">you deserve to know.</span>
        </>
      }
      subtext="Built for teams and organisations that want a calmer, evidence-based way to support how different people actually work."
      painPoints={painPoints}
      betterHeading="It can be better. Here's how."
      tabsEyebrow="What we provide"
      tabsHeading="Three ways NeuroDiver supports your team."
      tabsSubtext="Aggregate visibility and practical guidance, without turning wellbeing into surveillance."
      tabs={tabs}
      ctaHeading="Bring NeuroDiver to your team."
      ctaSubtext="Join the waitlist and be among the first organisations to pilot it."
    />
  );
}