import { Link } from "react-router-dom";
import { CONTACT_EMAIL } from "@/constants/site";

const footerLinks = [
  { label: "Body Doubling", to: "/body-doubling" },
  { label: "Tools", to: "/tools" },
  { label: "Pricing", to: "/pricing" },
  { label: "For Organisations", to: "/for-organisations" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-primary-dark text-paper">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm font-semibold text-paper/75 transition-colors hover:text-lime"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to="/privacy-policy"
                className="text-sm font-semibold text-paper/75 transition-colors hover:text-lime"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>

        <p className="mt-6 text-center text-sm text-paper/70">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="font-semibold text-paper/85 transition-colors hover:text-lime"
          >
            {CONTACT_EMAIL}
          </a>
        </p>

        <p className="mt-6 text-center text-sm text-paper/55">
          © {new Date().getFullYear()} NeuroDiver PLT
        </p>
      </div>
    </footer>
  );
}
