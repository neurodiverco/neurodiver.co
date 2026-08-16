"use client";

import React from "react";
import type { MotionValue } from "motion/react";import { motion, useScroll, useTransform } from "motion/react";

import { cn } from "../../../lib/utils";

interface ScrollRevealProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

const flatten = (children: React.ReactNode): React.ReactNode[] => {
  const result: React.ReactNode[] = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const props = child.props as Record<string, unknown>;

      if (child.type === React.Fragment) {
        result.push(...flatten(props.children as React.ReactNode));
      } else {
        result.push(child);
      }
    } else {
      // Preserve line breaks
      const lines = String(child).split("\n");

      lines.forEach((line, lineIndex) => {
        const words = line.split(/(\s+)/);

        words.forEach((word, wordIndex) => {
          result.push(
            <React.Fragment key={`${lineIndex}-${wordIndex}`}>
              {word}
            </React.Fragment>
          );
        });

        // Add a line break after every line except the last
        if (lineIndex !== lines.length - 1) {
          result.push(<br key={`br-${lineIndex}`} />);
        }
      });
    }
  });

  return result;
};

function OpacityChild({
  children,
  progress,
  index,
  total,
}: {
  children: React.ReactNode;
  progress: MotionValue<number>;
  index: number;
  total: number;
}) {
  const start = index / total;
  const end = Math.min(start + 0.18, 1);

  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  let className = "";

  if (React.isValidElement(children)) {
    className = ((children.props as { className?: string })?.className ?? "") as string;
  }

  return (
    <span className="relative mx-1">
      <span className="absolute opacity-15">{children}</span>

      <motion.span
        style={{ opacity }}
        className={cn("relative", className)}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function ScrollReveal({
  children,
  className,
  ...props
}: ScrollRevealProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const words = flatten(children);

  return (
    <div
      ref={containerRef}
      {...props}
      className={cn("relative h-[250vh] w-full", className)}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center px-6">
<div className="max-w-5xl text-center text-2xl font-bold leading-relaxed md:text-4xl lg:text-5xl">          {words.map((word, index) => {
  if (React.isValidElement(word) && word.type === "br") {
    return <br key={index} />;
  }

  return (
    <OpacityChild
      key={index}
      progress={scrollYProgress}
      index={index}
      total={words.length}
    >
      {word}
    </OpacityChild>
  );
})}
        </div>
      </div>
    </div>
  );
}