// src/components/WhatWeHeard.tsx
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Quote } from "lucide-react";

interface Stat {
  value: number;
  suffix: string;
  text: string;
}

const stats: Stat[] = [
  { value: 84, suffix: "%", text: "find it hard to explain what they need to others" },
  { value: 82, suffix: "%", text: "feel constant pressure to \u201cbehave normally\u201d every day" },
  { value: 75, suffix: "%", text: "feel constantly on edge, or in survival mode" },
];

const quotes = [
  {
    text: "After work I'm exhausted, not because of the tasks, but because I'm constantly trying to fit in.",
    source: "ADHD teacher",
  },
  {
    text: "I have difficulty focusing at work and my manager thinks I don't take my job seriously.",
    source: "Survey respondent",
  },
];

function StatCounter({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(eased * stat.value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
      className="rounded-3xl border border-primary/10 bg-white p-6 text-center shadow-[0_16px_36px_rgba(45,90,61,0.08)] md:p-8"
    >
      <p className="font-serif text-5xl text-primary md:text-6xl">
        <span ref={ref}>{display}</span>
        {stat.suffix}
      </p>
      <p className="mt-3 leading-relaxed text-primary/70 md:text-lg">{stat.text}</p>
    </motion.div>
  );
}

export default function WhatWeHeard() {
  return (
    <section className="bg-cream px-6 py-20 md:py-28">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            What we heard
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary md:text-5xl">
            We asked 200+ neurodivergent adults what work actually feels like.
            <span className="block italic text-primary-light">This is what they said.</span>
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-3 md:gap-6">
          {stats.map((stat, index) => (
            <StatCounter key={stat.text} stat={stat} index={index} />
          ))}
        </div>

        {/* Quotes */}
        <div className="mt-14 grid gap-6 md:mt-16 md:grid-cols-2">
          {quotes.map((quote, index) => (
            <motion.blockquote
              key={quote.source}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="relative rounded-3xl border border-primary/10 bg-white p-6 shadow-[0_16px_36px_rgba(45,90,61,0.08)] md:p-8"
            >
              <Quote className="h-6 w-6 text-yellow" fill="currentColor" strokeWidth={0} />
              <p className="mt-4 font-serif text-lg italic leading-relaxed text-primary md:text-xl">
                "{quote.text}"
              </p>
              <footer className="mt-4 text-sm font-semibold text-primary/50">
                — {quote.source}
              </footer>
            </motion.blockquote>
          ))}
        </div>

        {/* Closer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mt-14 max-w-2xl text-center md:mt-16"
        >
          <p className="text-lg leading-relaxed text-primary/80 md:text-xl">
            If any of that sounded like your Tuesday, you're not the problem. The
            workplace was never built for how your brain runs.
          </p>
          <p className="mt-2 font-sans text-xl italic text-primary md:text-3xl">
            NeuroDiver is.
          </p>
        </motion.div>
      </div>
    </section>
  );
}