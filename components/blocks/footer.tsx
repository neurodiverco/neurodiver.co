"use client"

import Link from "next/link";
import Logo from "@/components/logo";

export default function Footer() {
  return (
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
            <a href="mailto:cxo@kaiden.my">Investors & grants</a>
          </div>*/}

          <div className="pt-6 text-xs text-muted-foreground border-t border-t-muted-foreground/25">
            &copy; 2026 NeuroDiver PLT &nbsp;·&nbsp;
            <Link
              href="/privacy-policy"
              style={{
                color: "rgba(250, 248, 244, 0.25)",
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
