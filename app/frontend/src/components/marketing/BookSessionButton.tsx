import { APP_SIGN_IN_URL } from "@/constants/site";

type BookSessionButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "outline" | "on-dark";
};

const base =
  "inline-flex min-h-11 items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-[filter,background-color] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light";

const variants = {
  primary: `${base} bg-primary text-paper shadow-sm hover:brightness-95`,
  secondary: `${base} bg-brand text-paper hover:brightness-95`,
  outline: `${base} border border-line bg-paper text-primary hover:border-primary-light`,
  "on-dark": `${base} bg-paper text-primary hover:brightness-95`,
};

export default function BookSessionButton({
  children,
  className = "",
  variant = "primary",
}: BookSessionButtonProps) {
  return (
    <a
      href={APP_SIGN_IN_URL}
      className={`${variants[variant]} ${className}`}
      aria-label="Book a body doubling session in the NeuroDiver app"
    >
      {children}
    </a>
  );
}
