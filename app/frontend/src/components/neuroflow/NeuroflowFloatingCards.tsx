import { useCallback, useEffect, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

type FlowCard = {
  id: string;
  label: string;
  front: string;
  back: string;
};

const CARDS: FlowCard[] = [
  {
    id: "social",
    label: "Social",
    front: "/images/social.png",
    back: "/images/social-solution.png",
  },
  {
    id: "wellness",
    label: "Wellness",
    front: "/images/wellness.png",
    back: "/images/wellness-solution.png",
  },
  {
    id: "workplace",
    label: "Workplace",
    front: "/images/workplace.png",
    back: "/images/workplace-solution.png",
  },
];

function CardFace({ src, alt }: { src: string; alt: string }) {
  return (
    <img
      src={src}
      alt={alt}
      className="h-full w-full object-contain object-center"
      draggable={false}
    />
  );
}

type FlipCardProps = {
  card: FlowCard;
  expanded: boolean;
  flipped: boolean;
  onOpen: () => void;
  className?: string;
};

function FlipCard({ card, expanded, flipped, onOpen, className = "" }: FlipCardProps) {
  const showBack = expanded && flipped;
  const faceShell =
    "neuroflow-flip-face flex items-center justify-center overflow-hidden rounded-[1.15rem] bg-paper";

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        if (!expanded) onOpen();
      }}
      aria-label={`${card.label} — tap to see solution`}
      aria-expanded={expanded}
      className={`group neuroflow-flip-root outline-none focus-visible:ring-2 focus-visible:ring-brand/40 ${
        expanded
          ? "neuroflow-flip-root--expanded overflow-visible rounded-2xl border-0 bg-transparent shadow-none ring-0"
          : "overflow-hidden rounded-[1.25rem] border border-primary/15 bg-paper shadow-[0_18px_40px_rgba(23,43,32,0.14)] ring-brand/40 transition-shadow hover:shadow-[0_22px_48px_rgba(23,43,32,0.2)]"
      } ${className}`}
    >
      <div
        className={`neuroflow-flip-inner h-full w-full ${showBack ? "is-flipped" : ""}`}
      >
        <div className={`${faceShell} neuroflow-flip-front relative`}>
          <CardFace src={card.front} alt={card.label} />
          {!expanded && (
            <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-primary/75 to-transparent px-2 pb-2 pt-8 text-center text-[0.65rem] font-bold uppercase tracking-wider text-paper">
              {card.label}
            </span>
          )}
        </div>
        <div className={`${faceShell} neuroflow-flip-back`}>
          <CardFace src={card.back} alt={`${card.label} solution`} />
        </div>
      </div>
    </button>
  );
}

type NeuroflowFloatingCardsProps = {
  children: ReactNode;
};

export default function NeuroflowFloatingCards({ children }: NeuroflowFloatingCardsProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [flipped, setFlipped] = useState(false);

  const activeCard = CARDS.find((c) => c.id === activeId);

  const open = useCallback((id: string) => {
    setActiveId(id);
    setFlipped(false);
    window.setTimeout(() => setFlipped(true), 220);
  }, []);

  const close = useCallback(() => {
    setFlipped(false);
    window.setTimeout(() => setActiveId(null), 450);
  }, []);

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeId, close]);

  useEffect(() => {
    document.body.style.overflow = activeId ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeId]);

  const modal =
    typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {activeCard ? (
              <motion.div
                key={activeCard.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="fixed inset-0 z-[200] grid place-items-center bg-primary-dark/55 p-4 backdrop-blur-sm sm:p-6"
                onClick={close}
                role="dialog"
                aria-modal="true"
                aria-label={`${activeCard.label} solution`}
              >
                <motion.div
                  initial={{ scale: 0.88, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="relative flex w-full max-w-[min(88vw,17.5rem)] flex-col items-center justify-center sm:max-w-[min(94vw,30rem)]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={close}
                    className="absolute -right-1 -top-1 z-[70] flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-primary shadow-md transition hover:bg-soft sm:-right-2 sm:-top-2"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <FlipCard
                    card={activeCard}
                    expanded
                    flipped={flipped}
                    onOpen={() => open(activeCard.id)}
                    className="relative z-[60] aspect-[3/4] w-full max-w-[min(88vw,17.5rem)] overflow-visible sm:max-w-[min(94vw,30rem,calc(min(85dvh,40rem)*0.75))]"
                  />
                </motion.div>
              </motion.div>
            ) : null}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
      <div className="relative z-10 mx-auto flex w-full max-w-xl flex-col items-stretch gap-8 px-2 py-10 sm:gap-10 sm:py-12 md:py-16">
        {children}

        <div className="w-full">
          <div className="rounded-[20px] border border-line bg-paper/80 p-4 shadow-[0_16px_40px_rgba(23,43,32,0.08)] sm:p-6">
            <p className="text-center text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">
              Pick a focus area
            </p>
            <ul className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-4 md:gap-5">
              {CARDS.map((card) => (
                <li key={card.id} className="min-w-0">
                  <FlipCard
                    card={card}
                    expanded={false}
                    flipped={false}
                    onOpen={() => open(card.id)}
                    className="aspect-[3/4] w-full"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {modal}
    </>
  );
}
