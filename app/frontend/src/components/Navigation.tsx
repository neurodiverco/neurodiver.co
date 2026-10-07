import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import BookSessionButton from "./marketing/BookSessionButton";

const navLinks = [
  { to: "/body-doubling", label: "Body Doubling" },
  { to: "/tools", label: "Tools" },
  { to: "/for-organisations", label: "For Organisations" },
  { to: "/about", label: "About" },
  { to: "/pricing", label: "Pricing" },
];

const pillSpring = { type: "spring" as const, stiffness: 400, damping: 32, mass: 0.8 };

function NavTab({
  to,
  label,
  layoutId,
  onNavigate,
  className = "",
}: {
  to: string;
  label: string;
  layoutId: string;
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        `relative inline-flex items-center rounded-full px-4 py-2.5 text-lg font-bold tracking-tight transition-colors xl:px-5 xl:py-2.5 xl:text-xl ${
          isActive ? "text-brand" : "text-muted hover:text-primary"
        } ${className}`
      }
    >
      {({ isActive }) => (
        <>
          {isActive ? (
            <motion.span
              layoutId={layoutId}
              className="absolute inset-0 rounded-full bg-soft shadow-[inset_0_0_0_1px_rgba(206,217,205,0.9)]"
              transition={pillSpring}
              aria-hidden
            />
          ) : null}
          <span className="relative z-10 whitespace-nowrap">{label}</span>
        </>
      )}
    </NavLink>
  );
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-paper">
      <nav
        className="mx-auto flex max-w-7xl items-center gap-3 px-5 py-4 md:px-8 md:py-5 lg:gap-6"
        aria-label="Main"
      >
        <Link to="/" className="flex min-w-0 shrink-0 items-center">
          <img
            src="/images/logowords.png"
            alt="NeuroDiver"
            className="h-9 w-auto md:h-10 lg:h-11"
          />
        </Link>

        <ul className="ml-auto hidden items-center gap-1 lg:flex xl:gap-1.5">
          {navLinks.map(({ to, label }) => (
            <li key={to}>
              <NavTab to={to} label={label} layoutId="desktop-nav-pill" />
            </li>
          ))}
        </ul>

        <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3 lg:ml-4">
          <Link
            to="/contact"
            className="hidden min-h-11 items-center rounded-full border-2 border-brand px-5 py-2.5 text-base font-bold text-brand transition hover:bg-soft lg:inline-flex xl:px-7 xl:text-lg"
          >
            Contact
          </Link>

          <BookSessionButton
            variant="secondary"
            className="min-h-10 px-3.5 py-2 text-xs font-bold sm:min-h-11 sm:px-5 sm:py-2.5 sm:text-sm lg:px-6 lg:text-base xl:px-8 xl:text-lg"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book a session</span>
          </BookSessionButton>

          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="-mr-1 inline-flex min-h-10 min-w-10 shrink-0 items-center justify-center rounded-lg hover:bg-soft lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-main-nav"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-7 w-7 text-primary" aria-hidden />
            ) : (
              <Menu className="h-7 w-7 text-primary" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen ? (
        <div
          id="mobile-main-nav"
          className="border-t border-line bg-paper lg:hidden"
        >
          <ul className="mx-auto max-w-7xl space-y-1 px-5 py-4">
            {navLinks.map(({ to, label }) => (
              <li key={to}>
                <NavTab
                  to={to}
                  label={label}
                  layoutId="mobile-nav-pill"
                  onNavigate={() => setIsMenuOpen(false)}
                  className="w-full px-3 py-3"
                />
              </li>
            ))}
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `relative inline-flex w-full items-center rounded-full px-3 py-3 text-lg font-bold xl:text-xl ${
                    isActive ? "text-brand" : "text-brand/80 hover:text-brand"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive ? (
                      <motion.span
                        layoutId="mobile-nav-pill"
                        className="absolute inset-0 rounded-full bg-soft shadow-[inset_0_0_0_1px_rgba(206,217,205,0.9)]"
                        transition={pillSpring}
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative z-10">Contact</span>
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>
      ) : null}
    </header>
  );
}
