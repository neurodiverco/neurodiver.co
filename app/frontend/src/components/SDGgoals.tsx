// src/components/SDGGoals.tsx
import { useState } from "react";
import { motion } from "motion/react";
import { GraduationCap, HeartPulse, Scale, Briefcase, type LucideIcon } from "lucide-react";

interface Goal {
  number: string;
  title: string;
  icon: LucideIcon;
  color: string;
  textColor: string;
  blurb: string;
  contribution: string;
}

// Custom badges in the site's own palette — representing the same UN Sustainable
// Development Goals (3, 8, 10, 4), not a reproduction of the official SDG artwork.
const goals: Goal[] = [
  {
    number: "03",
    title: "Good Health & Well-being",
    icon: HeartPulse,
    color: "bg-primary",
    textColor: "text-white",
    blurb: "Supporting mental and emotional wellbeing as a daily practice, not an afterthought.",
    contribution:
      "Energy tracking and recovery-first strategies help neurodivergent adults protect their wellbeing before burnout sets in.",
  },
  {
    number: "08",
    title: "Decent Work & Economic Growth",
    icon: Briefcase,
    color: "bg-primary-light",
    textColor: "text-white",
    blurb: "Making sustainable, dignified work possible for minds that don't fit the default mould.",
    contribution:
      "By reducing burnout and executive dysfunction, NeuroDiver helps neurodivergent adults stay in — and grow within — the workforce.",
  },
  {
    number: "10",
    title: "Reduced Inequalities",
    icon: Scale,
    color: "bg-orange",
    textColor: "text-white",
    blurb: "Closing the gap between how workplaces are designed and how different brains actually work.",
    contribution:
      "Privacy-first organisation tools help employers support neurodivergent staff equitably, without singling anyone out.",
  },
  {
    number: "04",
    title: "Quality Education",
    icon: GraduationCap,
    color: "bg-yellow",
    textColor: "text-primary",
    blurb: "Helping people understand how they learn and work best, at any stage of life.",
    contribution:
      "Clinically-vetted strategies double as ongoing self-education — building lasting self-understanding, not just short-term fixes.",
  },
];

function GoalCard({ goal, index }: { goal: Goal; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = goal.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
      className="[perspective:1200px]"
    >
      <button
        type="button"
        onClick={() => setFlipped((v) => !v)}
        aria-pressed={flipped}
        aria-label={`${goal.title} — tap to ${flipped ? "show goal" : "show how NeuroDiver contributes"}`}
        className="relative block h-64 w-full text-left focus:outline-none md:h-72"
        style={{ transformStyle: "preserve-3d" }}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div
            className={`absolute inset-0 flex flex-col justify-between rounded-3xl p-5 shadow-[0_18px_40px_rgba(45,90,61,0.15)] md:p-6 ${goal.color} ${goal.textColor}`}
            style={{ backfaceVisibility: "hidden" }}
          >
            <div className="flex items-start justify-between">
              <span className="font-serif text-3xl md:text-4xl">{goal.number}</span>
              <Icon className="h-7 w-7 opacity-90 md:h-8 md:w-8" strokeWidth={1.75} />
            </div>
            <div>
              <p className="font-serif text-lg leading-snug md:text-xl">{goal.title}</p>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{goal.blurb}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-widest opacity-60">
                Tap to see how →
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col justify-between rounded-3xl border-2 border-dashed border-yellow bg-white p-5 shadow-[0_18px_40px_rgba(45,90,61,0.12)] md:p-6"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex items-start justify-between">
              <span className="font-serif text-3xl text-primary md:text-4xl">{goal.number}</span>
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${goal.color} ${goal.textColor}`}>
                <Icon className="h-4 w-4" strokeWidth={1.75} />
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-orange">
                How NeuroDiver contributes
              </p>
              <p className="mt-2 text-sm leading-relaxed text-primary/70">
                {goal.contribution}
              </p>
            </div>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function SDGGoals() {
  return (
    <section className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-12 max-w-2xl text-center md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            Aligned with global goals
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary md:text-5xl">
            Working toward something bigger than productivity.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary/70">
            NeuroDiver's mission connects to four UN Sustainable Development Goals. Tap a
            card to see how.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {goals.map((goal, index) => (
            <GoalCard key={goal.number} goal={goal} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}