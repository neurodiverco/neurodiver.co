"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import Logo from "@/components/logo";

const navItems: Array<{ label: string; href: string; active?: string }> = [
  // { label: "Product", href: "#product", active: false },
  // { label: "Solutions", href: "#solutions" },
  // { label: "FAQ", href: "#faq" },
  // { label: "About Us", href: "#about-us" },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <section className="bg-sidebar">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-10 after:content-none">
        <a
          href="#"
          className="flex items-center gap-2 font-semibold tracking-tight text-sidebar-foreground"
        >
          <Logo className="-ml-1.5" />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={
                item.active
                  ? "rounded-md bg-sidebar-foreground/5 px-3 py-1.5 text-sm font-medium text-sidebar-foreground"
                  : "rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-muted/20 hover:text-sidebar-foreground"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {
          (navItems.length > 0) ?
            <div className="flex items-center gap-2 after:content-none md:hidden">
              {/*<a href="#waitlist" className="items-center gap-2 font-semibold text-sm tracking-[0.01em] px-5 py-2.5 rounded-lg border-0 cursor-pointer transition text-nowrap bg-primary text-primary-foreground hover:bg-primary/50 active:scale-[98%]">
            Request early access
          </a>*/}
              <button
                type="button"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
                className="grid size-9 place-items-center place-content-center rounded-full border border-border text-foreground md:hidden"
              >
                <Menu className="size-4 text-border dark:invert" />
              </button>
            </div>
            : <></>
        };
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-x-4 top-4 overflow-hidden rounded-2xl border border-border bg-card p-5 shadow-2xl shadow-black/30">
            <div className="flex items-center justify-between after:content-none">
              <a
                href="#"
                className="inline-flex items-center gap-2 font-semibold tracking-tight text-foreground"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/neurodiver-logo.svg"
                  alt="NeuroDiver"
                  className="size-6 dark:invert"
                />
                NeuroDiver
              </a>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="grid size-9 place-items-center place-content-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="size-4" />
              </button>
            </div>

            <ul className="mt-5 flex flex-col">
              {navItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className={
                      item.active
                        ? "flex items-center rounded-md bg-muted/60 px-3 py-3.5 font-medium text-foreground"
                        : "flex items-center rounded-md px-3 py-4.5 font-medium text-foreground transition-colors hover:bg-muted"
                    }
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>

            {/*<div className="mt-5 flex flex-col gap-2 border-t border-border pt-5">
              <a href="#waitlist" className="items-center gap-2 font-semibold tracking-[0.01em] px-5 py-2.5 rounded-lg border-0 cursor-pointer transition text-nowrap bg-primary text-primary-foreground hover:bg-primary/50 active:scale-[98%] w-full">
                Request early access
              </a>
            </div>*/}

            {/*<a
              href="#status"
              className="mt-4 inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <span className="relative grid size-1.5 place-items-center">
                <span className="size-1.5 rounded-full bg-emerald-500" />
                <span
                  aria-hidden
                  className="absolute inset-0 animate-ping rounded-full bg-emerald-500/50"
                />
              </span>
              All systems operational
            </a>*/}
          </div>
        </div>
      )}
    </section>
  )
}
