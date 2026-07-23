
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/individuals", label: "For Individuals", end: false },
  // { to: "/organisations", label: "For Organisations", end: false },
  { to: "/blog", label: "Blog", end: false },
    { to: "/contact", label: "Contact", end: false },
    { to: "/about", label: "About", end: false },

];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 pt-4 md:pt-8">
      <nav className="max-w-7xl mx-auto flex items-center justify-between rounded-full bg-white/70 backdrop-blur-xl shadow-lg border border-white/30 px-6 md:px-8 py-4">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
  <img
    src="/images/logowords.png"
    alt="NeuroDiver"
    className="h-10 w-auto"
  />
</NavLink>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-10">
          {navLinks.map(({ to, label, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                className={({ isActive }) =>
                  `text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "text-orange"
                      : "text-primary/70 hover:text-primary"
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden rounded-lg p-2 hover:bg-black/5 transition"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-primary" />
          ) : (
            <Menu className="h-6 w-6 text-primary" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-3 mx-auto max-w-7xl rounded-3xl bg-white/95 backdrop-blur-xl shadow-xl border border-white/30 overflow-hidden">
          <ul className="flex flex-col py-2">
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-6 py-4 text-sm font-medium transition ${
                      isActive
                        ? "text-orange bg-orange/5"
                        : "text-primary/70 hover:bg-gray-50 hover:text-primary"
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}