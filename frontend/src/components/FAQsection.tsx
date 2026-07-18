// src/components/FAQSection.tsx
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "What is NeuroDiver?",
    answer:
      "NeuroDiver is a workplace support platform that helps people understand their work patterns, discover practical strategies, and build more sustainable ways of working. We started by designing for neurodivergent working adults, but anyone who feels traditional productivity systems don't quite fit can benefit.",
  },
  {
    question: "Do I need to be diagnosed to use NeuroDiver?",
    answer:
      "No. You don't need a formal diagnosis to use NeuroDiver. Whether you're diagnosed, self-identify, exploring, or simply curious about how you work best, you're welcome here.",
  },
  {
    question: "Is NeuroDiver a medical or mental health service?",
    answer:
      "No. NeuroDiver is not a diagnostic, medical, or therapy service. It is a practical workplace support tool designed to help you better understand your work patterns and discover strategies that may help.",
  },
  {
    question: "How does the daily check-in work?",
    answer:
      "The daily Work Energy Check-in takes about one minute. You'll reflect on your workday, including what gave you energy, what drained you, and how supported you felt. Over time, these check-ins help generate personalised weekly and monthly insights.",
  },
  {
    question: "What is the Strategy Navigator?",
    answer:
      "The Strategy Navigator is a library of practical, easy-to-follow strategies designed around common workplace challenges. You can search for a situation, answer a few guided questions, or let us know if you're experiencing something we haven't covered yet.",
  },
  {
    question: "What is Body Doubling?",
    answer:
      "Body Doubling is a structured coworking session where people work quietly alongside each other. There is no pressure to socialise—sometimes simply knowing someone else is working at the same time makes it easier to get started and stay focused.",
  },
  {
  question : "Will my employer see my personal check-ins?",
answer: "No. Your personal check-ins, reflections, and notes remain private. If you're using NeuroDiver through your organisation, employers only receive anonymised and aggregated insights—they cannot see individual responses.",
},
{
  question: "How is my data used?",
  answer: "Your data is used to generate your personal insights and improve your experience. If you're part of a workplace pilot, only anonymised and aggregated trends are shared with your organisation. We never sell your personal data.",
},
{
 question: "Can I use NeuroDiver on my own?",
answer: "Yes. NeuroDiver is designed for both individuals and organisations. Whether you're employed, freelancing, studying, or managing your own business, you can use NeuroDiver independently.",
},
{
  question: "Is NeuroDiver available now?",
  answer: "NeuroDiver is currently in pilot testing. By joining our early access list, you'll be among the first to try new features and help shape how the platform grows.",
}
];

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="relative overflow-hidden bg-white px-6 py-20 md:py-28">
      {/* Ambient accent blob */}
      <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-yellow/20 blur-3xl md:h-96 md:w-96" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-64 w-64 rounded-full bg-primary/5 blur-3xl md:h-96 md:w-96" />

      <div className="relative mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mb-12 text-center md:mb-16"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-orange">
            Questions
          </p>
          <h2 className="mt-3 font-serif text-3xl leading-tight text-primary md:text-5xl">
            Good to know before you join.
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connecting rail */}
          <div className="absolute left-[19px] top-2 bottom-2 w-px bg-primary/10 md:left-[23px]" />

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={faq.question}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: "easeOut", delay: index * 0.05 }}
                  className="relative"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    aria-expanded={isActive}
                    className={`relative z-10 flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-colors duration-300 md:gap-5 md:px-5 ${
                      isActive
                        ? "border-orange bg-yellow/20"
                        : "border-primary/10 bg-white hover:border-primary/20"
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 flex-none items-center justify-center rounded-full text-sm font-semibold transition-colors duration-300 md:h-12 md:w-12 ${
                        isActive
                          ? "bg-orange text-white"
                          : "bg-primary/5 text-primary/50"
                      }`}
                    >
                      {index + 1}
                    </span>

                    <span
                      className={`flex-1 font-sans text-lg leading-snug transition-colors duration-300 md:text-xl ${
                        isActive ? "text-primary" : "text-primary/80"
                      }`}
                    >
                      {faq.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className={`flex h-8 w-8 flex-none items-center justify-center rounded-full transition-colors duration-300 ${
                        isActive ? "bg-orange text-white" : "bg-primary/5 text-primary/50"
                      }`}
                    >
                      <Plus className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="ml-14 mr-4 pb-2 pt-3 leading-relaxed text-primary/70 md:ml-[68px] md:pr-5">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}