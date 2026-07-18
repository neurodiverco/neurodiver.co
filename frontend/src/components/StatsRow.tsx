"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts up from 0 to `target` once the element scrolls into view.
 * Uses an IntersectionObserver so it only fires once, the first time
 * it's visible, rather than on every mount.
 */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const nodeRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const node = nodeRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasStarted.current) return;
        hasStarted.current = true;

        const start = performance.now();

        function tick(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          setValue(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }

        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, duration]);

  return { value, nodeRef };
}

/**
 * Polls a waitlist-count endpoint so the number feels "live".
 * Falls back to `initial` (and keeps polling silently) if the
 * endpoint isn't wired up yet, so this component is safe to ship
 * before the API route exists.
 */
/**
 * Connects to the SSE endpoint and keeps the count live in real-time.
 * Falls back to `initial` until the stream delivers its first message.
 */
function useWaitlistCount(initial: number) {
  const [count, setCount] = useState(initial);

  useEffect(() => {
    const apiBase = (import.meta as ImportMeta & { env: Record<string, string> }).env.VITE_API_URL ?? "http://localhost:3000/api";
    const es = new EventSource(`${apiBase}/waitlist/count-stream`);

    es.onmessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data as string) as { count: number };
        if (typeof data.count === "number") {
          setCount(data.count);
        }
      } catch {
        // malformed frame — ignore
      }
    };

    es.onerror = () => {
      // connection dropped — EventSource auto-reconnects, so just wait
    };

    return () => {
      es.close();
    };
  }, []);

  return count;
}

interface StatsRowProps {
  /** Fallback / starting waitlist count, shown until the live endpoint responds */
  initialWaitlistCount?: number;
  className?: string;
}

export default function StatsRow({
  initialWaitlistCount = 0,
  className = "",
}: StatsRowProps) {
  const { value: malaysiaCount, nodeRef: malaysiaStatRef } = useCountUp(863_500);
  const waitlistCount = useWaitlistCount(initialWaitlistCount);

  return (
    <div className={`w-full max-w-3xl mx-auto ${className}`}>
      <div className="flex flex-col divide-y divide-white/15 sm:flex-row sm:divide-y-0 sm:divide-x sm:divide-white/20">
        {/* Stat 1 — Malaysia prevalence, animated count-up */}
        <div ref={malaysiaStatRef} className="flex-1 py-4 sm:py-0 sm:px-8 text-center">
          <div className="font-serif text-3xl md:text-4xl text-yellow tabular-nums">
            {malaysiaCount.toLocaleString()}
          </div>
          <p className="mt-1.5 text-[11px] md:text-xs text-white/70 uppercase tracking-wide leading-snug max-w-44 mx-auto">
            Neurodivergent working adults in Malaysia
          </p>
        </div>

        {/* Stat 2 — live waitlist count */}
        <div className="flex-1 py-4 sm:py-0 sm:px-8 text-center">
          <div className="flex items-center justify-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-orange" />
            </span>
            <div className="font-serif text-3xl md:text-4xl text-yellow tabular-nums">
              {waitlistCount.toLocaleString()}
            </div>
          </div>
          <p className="mt-1.5 text-[11px] md:text-xs text-white/70 uppercase tracking-wide leading-snug max-w-44 mx-auto">
            People on the waitlist
          </p>
        </div>

        {/* Stat 3 — static prevalence figure */}
        <div className="flex-1 py-4 sm:py-0 sm:px-8 text-center">
          <div className="font-serif text-3xl md:text-4xl text-yellow">
            1 in 20
          </div>
          <p className="mt-1.5 text-[11px] md:text-xs text-white/70 uppercase tracking-wide leading-snug max-w-44 mx-auto">
            People are Autistic and/or have ADHD*
          </p>
        </div>
      </div>

      <p className="mt-4 text-center text-[11px] text-white/40">
        *Estimated combined prevalence of autism and ADHD in adults.
      </p>
    </div>
  );
}