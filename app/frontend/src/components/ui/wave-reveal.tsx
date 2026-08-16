"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

import { cn } from "../../../lib/utils";

interface WaveRevealProps {
  /**
   * The text to animate
   */
  text: string;

  /**
   * Additional classes for the container
   */
  className?: string;

  /**
   * The direction of the animation
   * @default "down"
   */
  direction?: "up" | "down";

  /**
   * The mode of the animation
   * @default "letter"
   */
  mode?: "letter" | "word";

  /**
   * Duration of the animation
   * E.g. 2000ms
   */
  duration?: string;

  /**
   * If true, the text will apply a blur effect as seen in WWDC.
   */
  blur?: boolean;

  letterClassName?: string;

  /**
   * Delay for each letter/word in ms
   */
  delay?: number;

  /**
   * If true, only starts animating once the element scrolls into view.
   * @default true
   */
  startOnView?: boolean;

  /**
   * If true, animation only ever plays once (won't replay on re-entry).
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * How much of the element must be visible before triggering (0-1).
   * @default 0.3
   */
  threshold?: number;

  /**
   * Root margin passed to IntersectionObserver, useful to trigger
   * slightly before/after the element is actually in view.
   * @default "0px"
   */
  rootMargin?: string;
}

interface ReducedValue extends Pick<WaveRevealProps, "direction" | "mode"> {
  nodes: ReactNode[];
  offset: number;
  duration: number | string;
  delay: number;
  blur?: boolean;
  className?: string;
  wordsLength: number;
  textLength: number;
  hasStarted: boolean;
}

const Word = ({
  isWordMode,
  word,
  index,
  offset,
  delay,
  duration,
  className,
}: Pick<ReducedValue, "delay" | "duration" | "offset"> & {
  index: number;
  className: string;
  isWordMode: boolean;
  word: string;
  length: number;
}) => {
  if (isWordMode) {
    return word;
  }

  return (
    <>
      {word.split("").map((letter, letterIndex) => {
        return (
          <span
            key={`${letter}_${letterIndex}_${index}`}
            className={cn({
              [className]: !isWordMode,
            })}
            style={{
              animationDuration: `${duration}`,
              animationDelay: createDelay({
                index: letterIndex,
                offset,
                delay,
              }),
            }}
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        );
      })}
    </>
  );
};

const createDelay = ({
  offset,
  index,
  delay,
}: Pick<ReducedValue, "offset" | "delay"> & {
  index: number;
}) => {
  return `${delay + (index + offset) * 50}ms`;
};

const createAnimatedNodes = (args: ReducedValue, word: string, index: number): ReducedValue => {
  const {
    nodes,
    offset,
    wordsLength,
    textLength,
    mode,
    direction,
    duration,
    delay,
    blur,
    hasStarted,
  } = args;

  const isWordMode = mode === "word";
  const isUp = direction === "up";
  const length = isWordMode ? wordsLength : textLength;
  const isLast = index === length - 1;

  const className = cn(
    "inline-block opacity-0 transition-opacity ease-in-out fill-mode-forwards",
    hasStarted && {
      "animate-[var(--animate-reveal-down)]": !isUp && !blur,
      "animate-[var(--animate-reveal-up)]": isUp && !blur,
      "animate-[var(--animate-reveal-down),var(--animate-content-blur)]": !isUp && blur,
      "animate-[var(--animate-reveal-up),var(--animate-content-blur)]": isUp && blur,
    },
    args.className,
  );

  const node = (
    <span
      key={`word_${index}`}
      className={cn("contents", {
        [className]: isWordMode,
      })}
      style={
        isWordMode
          ? {
              animationDuration: `${duration}`,
              animationDelay: createDelay({
                index,
                offset,
                delay,
              }),
            }
          : undefined
      }
    >
      <Word
        isWordMode={isWordMode}
        word={word}
        index={index}
        offset={offset}
        duration={duration}
        className={className}
        length={length}
        delay={delay}
      />
      {!isLast && "\u00A0"}
    </span>
  );

  return {
    ...args,
    nodes: [...nodes, node],
    offset: offset + (isWordMode ? 1 : word.length + 1),
  };
};

export default function WaveReveal({
  text,
  direction = "down",
  mode = "letter",
  className,
  duration = "2000ms",
  delay = 0,
  blur = true,
  letterClassName,
  startOnView = true,
  triggerOnce = true,
  threshold = 0.3,
  rootMargin = "0px",
}: WaveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(!startOnView);

  useEffect(() => {
    if (!startOnView || hasStarted) {
      return;
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          if (triggerOnce) {
            observer.unobserve(node);
          }
        } else if (!triggerOnce) {
          setHasStarted(false);
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [startOnView, triggerOnce, threshold, rootMargin, hasStarted]);

  if (!text) {
    return null;
  }

  const words = text.trim().split(/\s/);

  const { nodes } = words.reduce<ReducedValue>(createAnimatedNodes, {
    nodes: [],
    offset: 0,
    wordsLength: words.length,
    textLength: text.length,
    direction,
    mode,
    duration: duration ?? 60,
    delay: delay ?? 0,
    blur,
    className: letterClassName,
    hasStarted,
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-wrap justify-center whitespace-pre px-2 text-4xl font-medium md:px-6 md:text-7xl",
        className,
      )}
    >
      {nodes}
      <div className="sr-only">{text}</div>
    </div>
  );
}