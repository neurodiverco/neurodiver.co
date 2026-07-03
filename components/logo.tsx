"use client";

import LogoColor from "@/assets/neurodiver-logo.inline.svg";
import LogoMono from "@/assets/neurodiver-logo-bw.inline.svg";

interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <>
      <LogoColor className={`h-12 w-auto hidden dark:inline-block ${className}`} />
      <LogoMono className={`h-12 w-auto inline-block dark:hidden fill-white ${className}`} />
    </>
  );
}
