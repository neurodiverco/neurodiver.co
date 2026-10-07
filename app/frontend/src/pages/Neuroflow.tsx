import { Link } from "react-router-dom";
import { useSEO } from "@/hooks/useSEO";
import { RevealSection } from "@/components/Reveal";
import NeuroflowFloatingCards from "@/components/neuroflow/NeuroflowFloatingCards";

export default function Neuroflow() {
  useSEO({
    title: "Thank you — Neuroflow",
    description: "Thank you for using Neuroflow with NeuroDiver.",
    path: "/neuroflow",
  });

  return (
    <RevealSection disabled className="relative w-full bg-soft px-6">
      <NeuroflowFloatingCards>
        <div className="w-full rounded-[20px] border border-line bg-paper/95 p-6 text-center shadow-[0_22px_56px_rgba(23,43,32,0.12)] backdrop-blur-md sm:p-8 md:p-10">
          <h1 className="font-display text-2xl text-primary sm:text-3xl md:text-4xl">
            Thank you for using Neuroflow
          </h1>
          <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
            We hope it helped you move forward today. Choose a card below to see a solution.
          </p>
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:mt-10 sm:flex-row sm:items-center sm:justify-center">
            <Link
              to="/"
              className="inline-flex min-h-11 w-full items-center justify-center rounded-full border-2 border-primary/20 bg-soft px-8 py-3 text-base font-semibold text-primary transition hover:border-primary/35 hover:bg-white sm:w-auto"
            >
              Explore more
            </Link>
          </div>
        </div>
      </NeuroflowFloatingCards>
    </RevealSection>
  );
}
