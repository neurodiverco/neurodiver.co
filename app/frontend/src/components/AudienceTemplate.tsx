// src/components/AudienceTemplate.tsx
import { useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown } from "lucide-react";
import WaitlistForm from "./WaitlistForm";

export interface PainPoint {
  image: string;
  text: string;
}

export interface FeatureTab {
  id: string;
  label: string;
  title: string;
  description: string;
  preview: ReactNode;
}

export interface AudienceTemplateProps {
  eyebrow: string;
  headline: ReactNode;
  subtext: string;
  painPoints: PainPoint[];
  betterHeading: string;
  tabsEyebrow: string;
  tabsHeading: string;
  tabsSubtext: string;
  tabs: FeatureTab[];
  ctaHeading: string;
  ctaSubtext: string;
}

export default function AudienceTemplate({
  eyebrow,
  headline,
  subtext,
  painPoints,
  betterHeading,
  tabsEyebrow,
  tabsHeading,
  tabsSubtext,
  tabs,
  ctaHeading,
  ctaSubtext,
}: AudienceTemplateProps) {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);
  const tabsSectionRef = useRef<HTMLDivElement>(null);
  const active = tabs.find((tab) => tab.id === activeTab) ?? tabs[0];

  const scrollToTabs = () => {
    tabsSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      {/* Hero */}
      <section className="px-6 pb-16 pt-32 md:pb-24 md:pt-32">
        <div className="mx-auto max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-sm font-semibold uppercase tracking-widest text-orange"
          >
            {eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
            className="mt-4 font-serif text-4xl leading-tight text-primary md:text-6xl"
          >
            {headline}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-primary/70"
          >
            {subtext}
          </motion.p>
        </div>

        {/* Pain point cards */}
        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-4 md:mt-16 md:grid-cols-4 md:gap-6">
          {painPoints.map((point, index) => (
            <motion.div
              key={point.text}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.08 }}
              className="group overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-[0_16px_36px_rgba(45,90,61,0.1)]"
            >
              <div className="relative aspect-square overflow-hidden bg-primary/5">
                <img
                  src={point.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-primary/70 via-primary/10 to-transparent" />
              </div>
              <div className="p-4 md:p-5">
                <p className="font-serif text-base italic leading-snug text-primary md:text-lg">
                  "{point.text}"
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* "It can be better" transition */}
      <section className="px-6 pb-16 md:pb-20">
        <motion.button
          type="button"
          onClick={scrollToTabs}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mx-auto flex flex-col items-center gap-3 text-center"
        >
          <h2 className="font-serif text-5xl text-primary md:text-5xl">
            {betterHeading}
          </h2>
          <span className="animate-float flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-[0_10px_25px_rgba(45,90,61,0.12)]">
            <ChevronDown className="h-5 w-5" />
          </span>
        </motion.button>
      </section>

      {/* Feature tabs */}
      <section ref={tabsSectionRef} className="bg-cream px-6 py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            {tabsEyebrow}
          </p>
          <h2 className="mt-3 font-serif text-3xl text-primary md:text-4xl">
            {tabsHeading}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary/70">
            {tabsSubtext}
          </p>
        </div>

        {/* Tab buttons */}
        <div className="mx-auto mt-10 flex max-w-xl flex-wrap items-center justify-center gap-2 md:mt-12">
          {tabs.map((tab) => {
            const isActive = tab.id === active.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? "bg-primary text-white shadow-[0_10px_25px_rgba(45,90,61,0.25)]"
                    : "bg-white text-primary/60 hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        <div className="mx-auto mt-12 max-w-5xl md:mt-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="grid gap-8 md:grid-cols-2 md:items-center md:gap-12"
            >
              <div>
                <h3 className="font-serif text-2xl text-primary md:text-3xl">
                  {active.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-primary/70">
                  {active.description}
                </p>
              </div>

              <div className="rounded-[2rem] border border-primary/10 bg-white p-6 shadow-[0_25px_60px_rgba(45,90,61,0.14)] md:p-8">
                {active.preview}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream px-6 py-20 md:py-28">
  <div
    className="
      relative
      mx-auto
      max-w-5xl
      overflow-hidden
      rounded-[2rem]
      border
      border-primary/30
      bg-white
      px-8
      py-16
      shadow-xl
      shadow-primary/5
      md:px-16
      md:py-20
    "
  >
    {/* Bokeh */}
    <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-yellow/30 blur-3xl" />
    <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />

    <div className="relative mx-auto max-w-2xl text-center">
      <span
        className="
          mb-5
          inline-flex
          rounded-full
          bg-yellow/50
          px-4
          py-2
          text-sm
          font-medium
          text-primary
        "
      >
        Join the Waitlist
      </span>

      <h2 className="font-serif text-3xl leading-tight text-orange md:text-5xl">
        {ctaHeading}
      </h2>

      <p className="mt-5 text-lg leading-relaxed text-orange/75">
        {ctaSubtext}
      </p>

      <div className="mt-10 flex justify-center">
<WaitlistForm
  successTextClassName="text-primary"
  successSubtextClassName="text-primary/70"
/>      </div>
    </div>
  </div>
</section>
    </>
  );
}