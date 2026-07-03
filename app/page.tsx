import { Metadata } from 'next';
import Header from '@/components/blocks/header';
import Hero from '@/components/blocks/hero';
import { cn } from '@/lib/utils';
import Logo from '@/components/logo';
// import useIsMobile from '@/hooks/use-is-mobile';

export const metadata: Metadata = {
  title: 'NeuroDiver - Work with your brain, not against it.',
  description: 'Productivity toolkit designed for neurodivergent working adults in Southeast Asia'
}

export default function Home() {
  // const { isMobile } = useIsMobile();

  return (
    <>
      <Header />

      {/* ============================================================
       Hero
       ============================================================ */}
      <Hero />

      {/* ============================================================
       Problem statement
       ============================================================ */}
      <section
        className="section"
        id="problem"
        style={{background: "var(--warm-white)"}}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
          <div className={cn(`flex flex-col sm:flex-row gap-x-20 gap-y-10 items-center after:content-none`)}>
            <div style={{display: "flex", flexDirection: "column", gap: "16px", width: "100%"}}>
              <span className="eyebrow">The problem</span>
              <h2 className="h1">
                Most productivity tools weren&apos;t built for minds like <em>yours.</em>
              </h2>
            </div>
            <div style={{display: "flex", flexDirection: "column", gap: "16px"}}>
              <p className="body-lg body-muted">
                &ldquo;I don’t know what I need&rdquo;
              </p>
              <p className="body body-muted">
                &ldquo;I don&apos;t realise I&rsquo;m burning out until it&rsquo;s too late&rdquo;
              </p>
              <p className="body body-muted">
                NeuroDiver is the opposite: calm, steady, and
                designed from the ground up for the way different
                minds actually work.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* ============================================================
       Features
       ============================================================ */}
      <section
        className="section"
        id="features"
        style={{background: "var(--warm-white)"}}
      >
        <div className="mx-auto max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
          <div className="section-header center">
            <span className="eyebrow">The toolkit</span>
            <h2 className="h1">Three tools. One steady foundation.</h2>
            <p>
              Everything in NeuroDiver is built around a single principle: work with your brain, not against it.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {/* Energy Tracker */}
            <div className="feat-card">
              <div className="feat-icon">
                {/* battery-medium icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="7" width="16" height="10" rx="2" />
                  <line x1="22" y1="11" x2="22" y2="13" />
                  <line x1="6" y1="12" x2="10" y2="12" />
                </svg>
              </div>
              <h3>Energy Tracker</h3>
              <p>
                A daily check-in that tracks your energy and masking patterns in professional settings to signal burnout before it happens.
              </p>
            </div>

            {/* Strategy Deck */}
            <div className="feat-card">
              <div className="feat-icon">
                {/* layers icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </div>
              <h3>Strategy Deck</h3>
              <p>
                Situation-based strategies from lived experience, endorsed by our Clinical Psychologists
              </p>
            </div>

            {/* Coworking Sessions */}
            <div className="feat-card">
              <div className="feat-icon">
                {/* users-round icon */}
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="9" cy="7" r="3" />
                  <path d="M3 20a6 6 0 0 1 12 0" />
                  <circle cx="17" cy="9" r="2" />
                  <path d="M21 20a4 4 0 0 0-8 0" />
                </svg>
              </div>
              <h3>Co-Working Sessions</h3>
              <p>
                Work alongside others with people who want to get tasks done, virtually.
              </p>
            </div>

          </div>

          <div className="pt-16 text-center text-(--warm-grey)">
            <p>
              Productivity doesn&apos;t happen in isolation. When you need advice, encouragement, or simply people who understand, our community is there to support you.
            </p>
            <p>
              You know you&apos;re in good hands and good company.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
       Quote
       ============================================================ */}
      <section className="section-sm quote-section">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
          <div className="quote-block">
            <div className="quote-mark" aria-hidden="true">&ldquo;</div>
            <blockquote className="quote-text">
              &ldquo;I spent years thinking I was bad at work. Then I
              realised the tools were bad at <em>me.</em>&rdquo;
            </blockquote>
            <div className="quote-meta">
              Early access participant · Kuala Lumpur
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
       CTA / Waitlist
       ============================================================ */}
      <section className="cta-section" id="waitlist">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
          <div className="cta-inner nd-stagger">
            <span className="eyebrow on-dark">Early access</span>

            <h2
              className="h1"
              style={{color: "var(--warm-white)", textAlign: "center"}}
            >
              You don&apos;t need to think differently about yourself.
              <em
                style={{
                  fontStyle: "italic",
                  color: "rgba(250, 248, 244, 0.55)"
                }}
              >
                We&apos;ve already done that for the tools.
              </em>
            </h2>

            <p
              style={{
                color: "var(--fg-on-dark-mute)",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                textAlign: "center",
                maxWidth: "480px"
              }}
            >
              NeuroDiver is in early access. Join the waitlist and be
              among the first to shape how the product develops.
            </p>

            <form className="flex flex-col sm:flex-row gap-x-3 gap-y-4 w-full max-w-md flex-wrap justify-center" /*onSubmit={(e) => { e.preventDefault(); return false; }}*/>
              <input
                type="email"
                className="flex-1 min-w-55 py-3 px-4 placeholder:text-muted-foreground border border-sidebar-border/50 active:border-sidebar-border focus:border-sidebar-border focus:bg-accent-foreground/10 rounded-lg text-sidebar-foreground outline-none transition"
                placeholder="Your email address"
                aria-label="Email address"
                autoComplete="email"
              />
              <button type="submit" className="items-center gap-2 font-semibold tracking-[0.01em] px-5 py-2.5 rounded-lg border-0 cursor-pointer transition text-nowrap bg-accent text-accent-foreground hover:brightness-125 active:scale-[98%] w-full sm:w-auto">
                Join the waitlist
              </button>
            </form>

            <p className="cta-note">
              No marketing emails. We&apos;ll write when there&apos;s something
              real to say.
            </p>
          </div>
        </div>
      </section>

      {/* ============================================================
       Footer
       ============================================================ */}
      <footer className="footer after:content-none" id="about">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 sm:px-10 after:content-none">
          <div className="w-full gap-12 [align-items:start]">
            <div className="footer-brand">
              <div className="footer-logo">
                <Logo className="-ml-1.5" />
              </div>
              <p className="footer-tagline">
                Tools for minds that work differently.
              </p>
              <p className="footer-founding">Built by ND, for ND.</p>
            </div>

            {/*<div className="footer-links">
              <div className="footer-links-head">Product</div>
              <a href="#features">Features</a>
              <a href="#product">How it works</a>
              <a href="#waitlist">Early access</a>
            </div>

            <div className="footer-links">
              <div className="footer-links-head">Organisation</div>
              <a href="#workplace">NeuroDiver Workplace</a>
              <a href="#impact">Our mission</a>
              <a href="mailto:cxo@kaiden.my">Investors &amp; grants</a>
            </div>*/}

            <div className="pt-6 text-xs text-muted-foreground border-t border-t-muted-foreground/25">
              &copy; 2026 NeuroDiver PLT &nbsp;·&nbsp;
              <a
                href="#"
                style={{
                  color: "rgba(250, 248, 244, 0.25)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px"
                }}
              >
                Privacy
              </a>
              &nbsp;·&nbsp;
              <a
                href="#"
                style={{
                  color: "rgba(250, 248, 244, 0.25)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px"
                }}
              >
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
