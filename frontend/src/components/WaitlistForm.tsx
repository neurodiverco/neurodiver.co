import { useState } from "react";
import type { FormEvent } from "react";
import { ConfettiButton } from "../components/ui/confetti-button"

interface WaitlistFormProps {
  className?: string;
  buttonClassName?: string;
  successTextClassName?: string;
  successSubtextClassName?: string;
}

export default function WaitlistForm({
  className = "",
  buttonClassName = "",
  successTextClassName = "text-cream",
  successSubtextClassName = "text-cream/50",
}: WaitlistFormProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!email.trim()) return;

    setSubmitting(true);
    setError(null);

    try {
      const apiBase = import.meta.env.VITE_API_URL ?? "https://neurodiver.co/api";
      const res = await fetch(`${apiBase}/waitlist/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { message?: string }).message ?? "Could not join waitlist. Please try again."
        );
      }

      setSubmitted(true);
      setEmail("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }

    setSubmitting(false);
  }

  return (
    <div className={`w-full max-w-md mx-auto ${className}`}>
      {submitted ? (
        <div
          role="status"
          aria-live="polite"
          className="mb-5 text-center animate-in fade-in slide-in-from-top-1 duration-300"
        >
          <p className={`${successTextClassName} font-medium text-sm`}>
            You're on the list.
          </p>
          <p className={`mt-1 text-xs ${successSubtextClassName}`}>
            We'll email you when it's your turn.
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="mb-3 text-center text-sm font-medium text-orange" role="alert">
          {error}
        </p>
      ) : null}

      <form
        onSubmit={handleSubmit}
        className={`flex flex-col sm:flex-row gap-2.5 transition-opacity duration-300 ${
          submitted ? "opacity-40 pointer-events-none" : ""
        }`}
      >
        <label htmlFor="waitlist-email" className="sr-only">
          Your email address
        </label>
        <input
          id="waitlist-email"
          type="email"
          required
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitted || submitting}
          className="flex-1 px-4 py-2.5 rounded-lg border border-primary/25 bg-white text-primary-dark placeholder:text-primary/40 text-sm outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20 disabled:cursor-not-allowed"
        />
        <ConfettiButton
          type="submit"
          celebrate={submitted}
          confettiOnClick={false}
          disabled={submitted || submitting}
          className={`px-5 py-2.5 rounded-lg bg-orange text-white font-semibold text-sm transition-colors hover:bg-orange/90 whitespace-nowrap disabled:opacity-50 ${buttonClassName}`}
        >
          {submitting ? "Joining..." : submitted ? "Joined" : "Join waitlist"}
        </ConfettiButton>
      </form>
    </div>
  );
}