import type { ReactNode } from "react";
import { Check, Sparkles, Users, Zap } from "lucide-react";

function FloatChip({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <span
      className={`animate-float inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-primary-dark/80 px-2.5 py-1 text-[0.65rem] font-bold text-paper shadow-[0_8px_24px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:px-3 sm:py-1.5 sm:text-xs ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </span>
  );
}

/** Phone mockup for hero with playful orbit accents */
export default function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[17rem] py-4 sm:max-w-[18rem] sm:py-6 lg:max-w-[20rem] lg:py-2 xl:max-w-[21rem]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[min(88vw,15.5rem)] w-[min(88vw,15.5rem)] -translate-x-1/2 -translate-y-[45%] rounded-full border border-dashed border-lime/25 sm:h-[16.5rem] sm:w-[16.5rem] lg:h-[18rem] lg:w-[18rem]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute left-1/2 top-8 h-32 w-48 -translate-x-1/2 rounded-full bg-lime/10 blur-[2px] lg:top-6 lg:h-36 lg:w-52"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 right-2 h-14 w-14 rounded-full bg-brand/35 blur-md lg:bottom-10 lg:right-4"
        aria-hidden
      />

      <Sparkles
        className="animate-float pointer-events-none absolute left-0 top-6 h-5 w-5 text-lime sm:h-6 sm:w-6 lg:left-2 lg:top-4"
        style={{ animationDelay: "0.3s" }}
        aria-hidden
      />
      <Sparkles
        className="animate-float pointer-events-none absolute right-1 top-14 h-4 w-4 text-lime/70 sm:right-3 sm:top-16 lg:right-6"
        style={{ animationDelay: "1.1s" }}
        aria-hidden
      />
      <span
        className="animate-float pointer-events-none absolute bottom-16 left-1 flex h-7 w-7 items-center justify-center rounded-full border border-lime/30 bg-lime/15 text-xs font-bold text-lime sm:bottom-20 sm:left-3 lg:bottom-24"
        style={{ animationDelay: "0.7s" }}
        aria-hidden
      >
        +
      </span>
      <span
        className="animate-float pointer-events-none absolute bottom-8 right-0 h-3 w-3 rounded-full bg-lime shadow-[0_0_12px_rgba(197,245,60,0.6)] sm:right-2 lg:bottom-12"
        style={{ animationDelay: "1.4s" }}
        aria-hidden
      />
      <span
        className="pointer-events-none absolute left-6 top-[42%] h-2 w-2 rounded-full bg-paper/40 lg:left-10"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute right-8 top-[38%] h-1.5 w-1.5 rounded-full bg-lime/80 lg:right-12"
        aria-hidden
      />

      <FloatChip
        className="absolute -left-1 top-10 z-20 sm:-left-2 sm:top-8 lg:-left-4"
        delay={0}
      >
        <Users className="h-3.5 w-3.5 text-lime" aria-hidden />
        Body doubling
      </FloatChip>
      <FloatChip
        className="absolute -right-1 top-[38%] z-20 sm:-right-2 lg:-right-3"
        delay={0.55}
      >
        <Check className="h-3.5 w-3.5 text-lime" aria-hidden />
        Check-in
      </FloatChip>
      <FloatChip
        className="absolute bottom-2 left-0 z-20 sm:bottom-4 sm:left-2 lg:bottom-6"
        delay={0.9}
      >
        <Zap className="h-3.5 w-3.5 text-lime" aria-hidden />
        Strategies
      </FloatChip>

      <div className="relative z-10 mx-auto w-full max-w-[11.5rem] origin-bottom sm:max-w-[12.5rem] lg:max-w-[14.5rem] xl:max-w-[15.5rem] lg:-rotate-[1.5deg] xl:-rotate-2">
        <div className="relative rounded-[1.35rem] border-[6px] border-white/18 bg-gradient-to-b from-white/12 to-white/[0.04] p-1 shadow-[0_16px_40px_rgba(0,0,0,0.32),0_0_0_1px_rgba(255,255,255,0.06)_inset] sm:rounded-[1.5rem] sm:border-[7px] sm:p-1.5 lg:rounded-[1.65rem] lg:border-[8px] lg:p-1.5">
          <div
            className="pointer-events-none absolute left-1/2 top-[7px] z-20 h-[5px] w-14 -translate-x-1/2 rounded-full bg-primary-dark/90 sm:top-2 sm:h-1.5 sm:w-16 lg:top-2.5 lg:w-[4.25rem]"
            aria-hidden
          />
          <div className="overflow-hidden rounded-[1rem] bg-primary-dark/40 sm:rounded-[1.1rem] lg:rounded-[1.2rem]">
            <img
              src="/images/diboscreen.png"
              alt="NeuroDiver app welcome screen"
              className="aspect-[9/19.5] w-full object-cover object-top"
              width={240}
              height={520}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
