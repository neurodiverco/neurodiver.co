"use client"

import * as React from "react";
import WaitlistForm from "./waitlist-form";

export default function Hero() {
  return <section className="hero" id="home">
    {/* Decorative beam circles */}
    <svg
      className="hero-beam"
      viewBox="0 0 680 680"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="#C17F3A" strokeWidth="1">
        <circle cx="340" cy="340" r="60" opacity="0.30" />
        <circle cx="340" cy="340" r="130" opacity="0.18" />
        <circle cx="340" cy="340" r="210" opacity="0.11" />
        <circle cx="340" cy="340" r="300" opacity="0.07" />
      </g>
      <circle cx="340" cy="340" r="4" fill="#C17F3A" opacity="0.6" />
    </svg>

    <svg
      className="hero-beam-2"
      viewBox="0 0 400 400"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g fill="none" stroke="#C17F3A" strokeWidth="1">
        <circle cx="200" cy="200" r="50" opacity="0.20" />
        <circle cx="200" cy="200" r="110" opacity="0.12" />
        <circle cx="200" cy="200" r="180" opacity="0.07" />
      </g>
    </svg>

    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
      <div className="hero-content nd-stagger">
        <span className="eyebrow on-dark hero-eyebrow">Productivity toolkit</span>

        <h1 className="display on-dark hero-headline">
          Work with your brain, <em>not against it</em>.
        </h1>

        <p className="hero-sub">
          A productivity toolkit designed for neurodivergent adults. Track your energy, discover personalized strategies, and build sustainable ways of working.
        </p>

        <WaitlistForm />

        {/*<div className="hero-actions">
          <a href="#waitlist" className="btn btn-primary">
            Request early access
          </a>
          <a href="#features" className="btn btn-ghost-dark">
            See how it works
          </a>
        </div>*/}

        {/*<div className="hero-founding">
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(250,248,244,0.4)"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path
              d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"
            />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span>Built by ND, for ND.</span>
          <span style={{color: "rgba(250, 248, 244, 0.2)"}}>·</span>
          <span
            style={{
              color: "rgba(250, 248, 244, 0.3)",
              fontSize: "0.75rem"
            }}
          >
            Malaysia &amp; Southeast Asia
          </span>
        </div>*/}
      </div>
    </div>
  </section>
}
