// src/components/WhyWeBuiltThis.tsx
import { motion } from "motion/react";

function Line({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className="text-lg leading-relaxed text-primary/75 md:text-xl"
    >
      {children}
    </motion.p>
  );
}

export default function WhyWeBuiltThis() {
  return (
    <section className="relative bg-white px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-14 text-center md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            Why we built this
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary md:text-5xl">
            I was one of those adults.
          </h2>
        </motion.div>

        <div className="space-y-7 md:space-y-8">
          <Line>
            Did you know <strong className="font-semibold text-primary">1 in 20</strong>{" "}
            working adults are Autistic and/or have ADHD? Most only find out
            as adults — after years of struggling, and being called{" "}
            <em className="italic">difficult</em>, or{" "}
            <em className="italic">inconsistent</em>.
          </Line>

          {/* Pull quote — breaks the rhythm */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="!mt-10 border-l-2 border-orange pl-5 font-serif text-2xl italic leading-snug text-primary md:!mt-12 md:pl-6 md:text-4xl"
          >
            I was one of those adults.
          </motion.p>

          <Line delay={0.05}>
            For years, the same pattern kept repeating: opening tabs I
            couldn't close, messages I couldn't bring myself to answer, a
            body that had clenched shut while my mind kept racing. It has a
            name —{" "}
            <strong className="font-semibold text-primary">
              executive dysfunction
            </strong>{" "}
            — but I didn't have the name yet. I just had the exhaustion, and
            the quiet conviction that{" "}
            <em className="italic">it was a personal failing</em>.
          </Line>

          <Line>
            When the diagnosis finally came, it wasn't an ending. It was the
            first sentence that had ever made sense of it:{" "}
            <em className="italic">not laziness, not sabotage</em> — a mask
            that had finally come unravelled because the body could no
            longer hold it.
          </Line>

          <Line>
            After speaking to{" "}
            <strong className="font-semibold text-primary">200 others</strong>{" "}
            just like me, the pattern was the same. Not knowing what we
            needed. Pretending until burnout hit. Work feeling like a daily
            crisis.
          </Line>
        </div>

        {/* Closing statement — highlighted card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="mt-14 rounded-4xl border border-primary/10 bg-cream p-8 text-center shadow-[0_20px_50px_rgba(45,90,61,0.06)] md:mt-16 md:p-12"
        >
          <p className="font-serif text-2xl leading-snug text-primary md:text-3xl">
            That's why we built{" "}
            <strong className="font-semibold">NeuroDiver</strong>
            <span className="italic text-orange">
              {" "}
              — so nobody has to figure this out as alone as we did.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}