import {

  Mail,
} from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "For Individuals", href: "/individuals" },
  { label: "For Organisations", href: "/organisations" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const socialLinks = [
  // {
  //   name: "Instagram",
  //   href: "#",
  //   icon: <Instagram className="h-5 w-5" />,
  // },
  // {
  //   name: "LinkedIn",
  //   href: "#",
  //   icon: <Linkedin className="h-5 w-5" />,
  // },
  {
    name: "Email",
    href: "#",
    icon: <Mail className="h-5 w-5" />,
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-white">
      {/* Warm yellow bokeh */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 bottom-0 h-96 w-96 rounded-full bg-yellow/20 blur-3xl" />
        <div className="absolute -right-32 top-0 h-[450px] w-[450px] rounded-full bg-yellow/25 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-14 md:px-8">
        {/* Logo / tagline */}
        <div className="mb-8 flex flex-col items-center text-center">
          <h2 className="text-3xl font-semibold tracking-tight">
            Neuro
            <span className="font-serif italic font-normal text-yellow">
              Diver
            </span>
          </h2>

          <p className="mt-3 max-w-md font-serif text-xl italic text-yellow/90">
            Tools for minds that work differently.
          </p>

          <p className="mt-2 text-sm text-white/60">
            Built with understanding, designed for neurodivergent minds.
          </p>
        </div>


        {/* Navigation */}
        <nav className="mb-8">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-sm text-white/70 transition-all duration-300 hover:text-yellow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>


        {/* Social icons */}
        <div className="mb-8 flex justify-center gap-5">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              aria-label={social.name}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/70 transition-all duration-300 hover:-translate-y-1 hover:border-yellow hover:text-yellow"
            >
              {social.icon}
            </a>
          ))}
        </div>


        {/* Bottom */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 text-sm text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} NeuroDiver PLT. All rights reserved.
          </p>

          <a
            href="/privacy-policy"
            className="transition-colors hover:text-white"
          >
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}