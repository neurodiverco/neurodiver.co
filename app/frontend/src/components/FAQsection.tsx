import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { marketingFaqs } from "@/data/faq";

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="bg-soft px-6 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-display text-center text-3xl text-primary md:text-4xl">
          Questions you might have
        </h2>

        <ul className="mt-12 space-y-3">
          {marketingFaqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <li
                key={faq.question}
                className="overflow-hidden rounded-[20px] border border-line bg-paper"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-semibold text-primary">{faq.question}</span>
                  <Plus
                    className={`h-5 w-5 shrink-0 text-brand transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <p className="border-t border-line px-5 pb-4 pt-2 text-base leading-relaxed text-muted">
                        {faq.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
