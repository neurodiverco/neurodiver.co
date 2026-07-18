// src/components/SignedPartners.tsx
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

interface Partner {
  name: string;
  clinic: string;
  role: string;
  image: string;
  bio: string;
}

const partners: Partner[] = [
  {
    name: "Izzat Zaid",
    clinic: "Minda Inklusif",
    role: "Clinical Psychologist",
    image: "/images/izzat.jpg",
    bio: "Izzat empowers individuals through compassionate, evidence-based care, supporting people navigating anxiety, depression, trauma, stress, and neurodivergent experiences. Her clinical insights guide NeuroDiver in creating tools and communities that prioritise understanding, growth, and practical support for individuals on their mental wellbeing journey.",
  },
  {
    name: "Shaleen",
    clinic: "Own Practice",
    role: "Clinical Psychologist",
    image: "/images/shaleen.jpg",
    bio: "Shaleen supports individuals in understanding their experiences with greater compassion, especially through challenges around identity, relationships, and emotional wellbeing. Her perspective helps NeuroDiver create a more inclusive community built on safety, acceptance, and genuine human connection..",
  },
  {
    name: "Kiran",
    clinic: "Aloe Mind",
    role: "Clinical Psychologist",
    image: "/images/kiran.jpeg",
    bio: "Kiran creates affirming spaces for individuals navigating stress, identity, emotional challenges, and life transitions. Her clinical insights guide NeuroDiver in building a community that understands the realities behind productivity struggles — not just the visible behaviours, but the experiences underneath.",
  },
];

function getOffset(index: number, current: number, length: number) {
  let diff = index - current;
  if (diff > length / 2) diff -= length;
  if (diff < -length / 2) diff += length;
  return diff;
}

export default function SignedPartners() {
  const [current, setCurrent] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const length = partners.length;
  const active = partners[current];

  const goTo = (i: number) => {
    setExpanded(false);
    setCurrent(((i % length) + length) % length);
  };
  const next = () => goTo(current + 1);
  const prev = () => goTo(current - 1);

  return (
    <section className="relative overflow-hidden bg-cream px-6 py-20 md:py-28">
{/* Warm yellow bokeh background */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {/* Top left - medium */}
  <div className="absolute -left-28 -top-28 h-80 w-80 rounded-full bg-yellow/30 blur-3xl" />

  {/* Top right - BIG */}
  <div className="absolute -right-48 -top-40 h-[520px] w-[520px] rounded-full bg-yellow/35 blur-3xl" />

  {/* Bottom left - BIG */}
  <div className="absolute -bottom-48 -left-40 h-[560px] w-[560px] rounded-full bg-yellow/30 blur-3xl" />

  {/* Bottom right - medium */}
  <div className="absolute -right-32 -bottom-32 h-96 w-96 rounded-full bg-yellow/25 blur-3xl" />


  {/* Middle small bokehs */}
  <div className="absolute left-[22%] top-[45%] h-14 w-14 rounded-full bg-yellow/30 blur-2xl" />

  <div className="absolute left-[48%] top-[28%] h-10 w-10 rounded-full bg-yellow/40 blur-xl" />

  <div className="absolute right-[25%] top-[50%] h-20 w-20 rounded-full bg-yellow/25 blur-2xl" />

  <div className="absolute left-[55%] bottom-[18%] h-12 w-12 rounded-full bg-yellow/35 blur-xl" />

  <div className="absolute right-[45%] top-[65%] h-6 w-6 rounded-full bg-yellow/40 blur-lg" />
</div>
<div className="relative z-10 mx-auto max-w-3xl">
            {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto mb-14 max-w-2xl text-center md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            Clinical Expertise
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary md:text-5xl">
            Backed by clinical psychologists
            <span className="italic text-primary-light">, on paper.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-primary/70">
            NeuroDiver has formal partnerships with three practicing clinical
            psychologists who help shape and vet the strategies inside the
            product.
          </p>
        </motion.div>

        {/* Avatar carousel */}
        <div className="relative flex h-[160px] items-center justify-center md:h-[220px]">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous partner"
            className="absolute left-0 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-[0_10px_25px_rgba(45,90,61,0.12)] transition-all duration-300 hover:-translate-x-0.5 hover:bg-primary hover:text-white md:h-12 md:w-12"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="relative flex h-full w-full items-center justify-center">
            {partners.map((partner, index) => {
              const offset = getOffset(index, current, length);
              const isCenter = offset === 0;
              const isVisible = Math.abs(offset) <= 1;

              return (
                <motion.button
                  type="button"
                  key={partner.name}
                  onClick={() => goTo(index)}
                  animate={{
                    x: `${offset * 130}%`,
                    scale: isCenter ? 1 : 0.72,
                    opacity: isVisible ? (isCenter ? 1 : 0.35) : 0,
                    zIndex: isCenter ? 30 : 10,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="absolute cursor-pointer focus:outline-none"
                  style={{ pointerEvents: isVisible ? "auto" : "none" }}
                  tabIndex={isCenter ? 0 : -1}
                  aria-label={`Show ${partner.name}`}
                >
                  <div
                    className={`overflow-hidden rounded-full bg-primary/5 shadow-[0_18px_40px_rgba(45,90,61,0.18)] transition-all duration-300 ${
                      isCenter
                        ? "h-28 w-28 ring-4 ring-yellow md:h-40 md:w-40"
                        : "h-20 w-20 ring-2 ring-white md:h-28 md:w-28"
                    }`}
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </motion.button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={next}
            aria-label="Next partner"
            className="absolute right-0 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-primary/15 bg-white text-primary shadow-[0_10px_25px_rgba(45,90,61,0.12)] transition-all duration-300 hover:translate-x-0.5 hover:bg-primary hover:text-white md:h-12 md:w-12"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {partners.map((partner, index) => (
            <button
              key={partner.name}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Go to ${partner.name}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === current ? "w-6 bg-orange" : "w-2 bg-primary/20 hover:bg-primary/40"
              }`}
            />
          ))}
        </div>

        {/* Info card */}
        <div className="mt-10 md:mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mx-auto max-w-xl rounded-[2rem] border-2 border-dashed border-yellow bg-white p-6 text-center shadow-[0_25px_60px_rgba(45,90,61,0.12)] md:p-8"
            >
              
              <h3 className="mt-3 font-serif text-2xl text-primary md:text-3xl">
                {active.name}
              </h3>
              <p className="mt-1 text-sm text-primary/60">
                {active.role} · {active.clinic}
              </p>

              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary underline decoration-orange decoration-2 underline-offset-4 transition-colors hover:text-primary-light"
              >
                {expanded ? "Show less" : "Know more"}
                <motion.span
                  animate={{ rotate: expanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <ChevronDown className="h-4 w-4" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-left text-primary/70 leading-relaxed md:text-center">
                      {active.bio}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}