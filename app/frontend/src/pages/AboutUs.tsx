// src/pages/AboutUs.tsx
import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Check, Sparkles, Heart, ShieldCheck, Users } from "lucide-react";
import TeamMemberSection from "@/components/ui/team-member";
import { useSEO } from "@/hooks/useSEO";

/* ----------------------------- Data ----------------------------- */

const values = [
  { label: "Inclusive", icon: Sparkles, text: "Everyone is welcome, with or without a diagnosis." },
  { label: "Sustainable", icon: Heart, text: "Prioritise long-term wellbeing over constant productivity." },
  { label: "Empowering", icon: ShieldCheck, text: "Help users understand themselves and build systems that work." },
  { label: "Personalised", icon: Users, text: "Adapt support to the individual, not the average user." },
];

// Replace with the real milestones/dates.
const milestones = [
  { title: "It Started with a Question", text: "Why does work feel so much harder for some people than others—even when they're just as capable? This question became the foundation of NeuroDiver." },
  { title: "Building with Lived Experience", text: "Instead of assuming what people needed, we listened, tested, and designed alongside neurodivergent working adults to understand the everyday friction they face at work." },
  { title: "From Research to Pilot", text: "We turned those insights into practical tools—from work energy check-ins to strategy guides and body doubling sessions—and began piloting them with real users." },
  { title: "Building What's Next", text: "Today, we're continuing to refine NeuroDiver with feedback from individuals and organisations as we work towards a more inclusive future of work." },
];

/* --------------------------- Sub-parts --------------------------- */

function ValuesOrbit() {
  // Fixed cardinal positions (top, right, bottom, left) to match a 4-value layout
  const positions = [
    "left-1/2 top-0 -translate-x-1/2 -translate-y-1/2",
    "left-full top-1/2 -translate-x-1/2 -translate-y-1/2",
    "left-1/2 top-full -translate-x-1/2 -translate-y-1/2",
    "left-0 top-1/2 -translate-x-1/2 -translate-y-1/2",
  ];

  return (
    <div className="mx-auto">
      {/* Desktop / tablet: circle layout, matches reference image */}
      <div className="relative mx-auto hidden h-[300px] w-[300px] sm:block sm:h-[360px] sm:w-[360px] md:h-[420px] md:w-[420px]">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-white/15" />
        {/* Radial glow */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at center, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.05) 45%, transparent 70%)",
          }}
        />

        {values.map((value, index) => (
          <motion.div
            key={value.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            className={`group absolute flex flex-col items-center gap-2 ${positions[index]}`}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow text-primary shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition-transform duration-300 group-hover:scale-110 md:h-16 md:w-16">
              <value.icon className="h-6 w-6" strokeWidth={1.75} />
            </div>
            <p className="whitespace-nowrap text-sm font-semibold text-white md:text-base">
              {value.label}
            </p>
            <p className="hidden max-w-40 text-center text-xs leading-snug text-white/60 md:block">
              {value.text}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Mobile: simple 2-column card grid instead of the circle */}
      <div className="grid grid-cols-2 gap-4 sm:hidden">
        {values.map((value, index) => (
          <motion.div
            key={value.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
            className="flex flex-col items-center gap-2 rounded-3xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-yellow text-primary">
              <value.icon className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <p className="text-sm font-semibold text-white">{value.label}</p>
            <p className="text-xs leading-snug text-white/60">{value.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ milestone, index }: { milestone: (typeof milestones)[number]; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex py-8 pl-12 md:py-14 md:pl-0 ${isLeft ? "md:justify-start" : "md:justify-end"}`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`w-full text-left md:w-[42%] ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10 md:text-left"}`}
      >
        {/* <p className="text-xs font-semibold uppercase tracking-widest text-orange">{milestone.year}</p> */}
        <h3 className="mt-1 font-serif text-xl text-orange md:text-2xl">{milestone.title}</h3>
        <p className="mt-2 text-primary/70 leading-relaxed">{milestone.text}</p>
      </motion.div>

      {/* Dot: left edge on mobile, centered on md+ */}
      <div className="absolute left-0 top-8 flex h-8 w-8 items-center justify-center rounded-full border-2 border-orange bg-cream md:left-1/2 md:top-14 md:-translate-x-1/2">
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.3, delay: 0.15 }}
        >
          <Check className="h-4 w-4 text-orange" />
        </motion.div>
      </div>
    </div>
  );
}

function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.65", "end 0.5"],
  });

  return (
    <div ref={containerRef} className="relative mx-auto max-w-3xl">
      {/* Track: left edge on mobile, centered on md+ */}
      <div className="absolute left-4 top-0 h-full w-px -translate-x-1/2 bg-primary/10 md:left-1/2" />
      {/* Progress fill, tied to scroll */}
      <motion.div
        style={{ scaleY: scrollYProgress }}
        className="absolute left-4 top-0 h-full w-px origin-top -translate-x-1/2 bg-orange md:left-1/2"
      />

      {milestones.map((milestone, index) => (
        <TimelineItem key={milestone.title} milestone={milestone} index={index} />
      ))}
    </div>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function AboutUs() {
  useSEO({
    title: "About Us — The Team Behind NeuroDiver",
    description:
      "NeuroDiver was built by neurodivergent people, for neurodivergent people. Meet the team, learn our story, and see the values that guide everything we build.",
    path: "/about",
    image: "https://www.neurodiver.co/images/team-neurodiver.jpg",
  });
  return (
    <>
      {/* Hero: team photo + heading */}
      <section className="relative flex h-[55vh] min-h-[380px] items-end overflow-hidden md:h-[65vh] md:min-h-[420px]">
        <img
          src="/images/team-neurodiver.jpg"
          alt="The NeuroDiver team"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-t from-primary-dark via-primary-dark/50 to-transparent" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative z-10 w-full px-6 pb-10 text-center md:pb-16"
        >
          {/* <p className="text-xs font-semibold uppercase tracking-widest text-yellow sm:text-sm">
            Built by ND, for ND
          </p> */}
          <h1 className="mt-3 font-serif text-3xl text-white sm:text-4xl md:text-6xl [text-shadow:0_2px_12px_rgba(0,0,0,0.4)]">
            About us
          </h1>
        </motion.div>
      </section>

      <TeamMemberSection />

      {/* Origin story
      <section className="bg-white px-6 py-14 sm:py-20 md:py-28">
        <div className="mx-auto grid max-w-5xl gap-8 sm:gap-10 md:grid-cols-2 md:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-orange">
              How it started
            </p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-primary sm:text-3xl md:text-4xl">
              We didn't set out to build a productivity app.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="rounded-4xl border-2 border-dashed border-yellow bg-cream p-6 md:p-8"
          >
            <p className="text-primary/70 leading-relaxed">
              One of our co-founders spent years cycling through planners, apps, and
              routines that were built for a brain that wasn't theirs. Every "just be
              consistent" tip made things worse, not better. NeuroDiver started as a
              rough spreadsheet to track energy instead of time — and it worked well
              enough that friends asked to use it too. That's the whole origin story:
              no big pitch deck, just a tool that finally made sense.
            </p>
          </motion.div>
        </div>
      </section> */}

      {/* Values orbit */}
      <section className="bg-primary-dark px-6 py-14 sm:py-20 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-yellow">
            What we stand for
          </p>
          <h2 className="mt-3 mb-30  font-serif text-2xl text-white sm:text-3xl md:text-4xl">
            Values that orbit everything we build.
          </h2>
        </div>

        <div className="mt-16 mb-30 sm:mt-16">
          <ValuesOrbit />
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream px-6 py-14 sm:py-20 md:py-28">
        <div className="mx-auto mb-10 max-w-2xl text-center sm:mb-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            Our journey
          </p>
          <h2 className="mt-3 font-serif text-2xl text-primary sm:text-3xl md:text-4xl">
            One milestone at a time.
          </h2>
        </div>

        <Timeline />
      </section>
    </>
  );
}