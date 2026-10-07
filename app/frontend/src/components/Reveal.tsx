import { forwardRef, useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

export type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms when the block enters view */
  delay?: number;
  id?: string;
  as?: ElementType;
  /** Skip animation (e.g. reduced motion handled via CSS) */
  disabled?: boolean;
};

/**
 * Fades + slides content into place the first time it scrolls into view.
 */
const Reveal = forwardRef<HTMLElement, RevealProps>(function Reveal(
  {
    children,
    className = "",
    delay = 0,
    id,
    as: Component = "div",
    disabled = false,
  },
  forwardedRef
) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(disabled);

  useEffect(() => {
    if (disabled) return;
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [disabled]);

  const setRef = (node: HTMLElement | null) => {
    ref.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  return (
    <Component
      ref={setRef}
      id={id}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none motion-reduce:opacity-100 motion-reduce:translate-y-0 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } ${className}`}
    >
      {children}
    </Component>
  );
});

export default Reveal;

/** Full-width page section with scroll reveal */
export const RevealSection = forwardRef<HTMLElement, Omit<RevealProps, "as">>(
  function RevealSection({ children, className = "", id, delay = 0, disabled }, ref) {
    return (
      <Reveal
        ref={ref}
        as="section"
        id={id}
        delay={delay}
        disabled={disabled}
        className={className}
      >
        {children}
      </Reveal>
    );
  }
);
