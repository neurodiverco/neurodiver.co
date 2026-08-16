// src/components/WhichOneAreYou.tsx
import { motion } from "motion/react";

interface Persona {
  label: string;
  text: string;
}

const personas: Persona[] = [
  {
    label: "Diagnosed young",
    text: "Most of the research, the funding, and the support systems were built with you in mind — even if it never felt like enough.",
  },
  {
    label: "Diagnosed late, and struggling",
    text: "You're employed. You're coping, mostly. But you're invisible in the data because you've never disclosed — and visible everywhere else: sick leave, burnout, quietly passed over.",
  },
  {
    label: "Still not sure",
    text: "Maybe no one's called it anything yet. You just know you're \u201ctoo much\u201d in some rooms and mysteriously fine in others. People have called you difficult, inconsistent, too sensitive. You've called yourself worse.",
  },
];

function Bokeh({ className, size, delay }: { className: string; size: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut", delay }}
      className={`pointer-events-none absolute rounded-full bg-orange blur-3xl ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="animate-float h-full w-full rounded-full" style={{ animationDelay: `${delay}s` }} />
    </motion.div>
  );
}

export default function WhichOneAreYou() {
  return (
    <section className="relative overflow-hidden bg-cream px-6 py-20 md:py-28">
      {/* Bokeh atmosphere — 4 corners */}
      <Bokeh className="-left-16 -top-16 opacity-[0.16] md:-left-20 md:-top-20" size={220} delay={0} />
      <Bokeh className="-right-14 -top-24 opacity-[0.12] md:-right-16 md:-top-28" size={160} delay={0.3} />
      <Bokeh className="-left-20 -bottom-20 opacity-[0.12] md:-left-24 md:-bottom-24" size={180} delay={0.6} />
      <Bokeh className="-right-16 -bottom-16 opacity-[0.18] md:-right-20 md:-bottom-20" size={240} delay={0.15} />

      <div className="relative mx-auto max-w-5xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            Is this for me?
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary md:text-5xl">
            Most support out there is built for one kind of neurodivergent person.
            <span className="block italic text-primary-light">You're probably not that person.</span>
          </h2>
        </motion.div>

        {/* Persona cards */}
        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
              className="rounded-3xl border border-primary/10 bg-white/90 p-6 shadow-[0_16px_36px_rgba(45,90,61,0.08)] backdrop-blur-sm md:p-7"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-yellow/50 text-sm font-semibold text-primary">
                0{index + 1}
              </span>
              <h3 className="mt-4 font-serif text-xl text-primary md:text-2xl">
                {persona.label}
              </h3>
              <p className="mt-3 leading-relaxed text-primary/70">{persona.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Closer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
          className="mx-auto mt-14 max-w-xl text-center md:mt-16"
        >
          <p className="font-serif text-2xl leading-snug text-primary md:text-3xl">
            NeuroDiver was built for the second and third groups
            <span className="italic font-bold text-primary"> — the ones almost nobody else is building for.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}