// src/pages/Contact.tsx
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { CONTACT_EMAIL } from "@/constants/site";
import PageHeader from "@/components/marketing/PageHeader";
import BookSessionButton from "@/components/marketing/BookSessionButton";
import { FinalCtaBand } from "@/components/marketing/Section";
import FAQSection from "@/components/FAQsection";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2 } from "lucide-react";
import { useSEO } from "../hooks/useSEO";

type AudienceType = "individual" | "organisation";

const workSituations = ["Employee", "Freelancer", "Founder", "Job seeker", "Other"];
const teamSizes = ["1–10", "11–50", "51–200", "201–500", "500+"];
const interests = ["Pilot", "Demo", "Partnership", "Research collaboration"];

interface IndividualForm {
  name: string;
  email: string;
  workSituation: string;
  helpText: string;
}

interface OrganisationForm {
  name: string;
  workEmail: string;
  organisationName: string;
  role: string;
  teamSize: string;
  interestedIn: string[];
  message: string;
}

const initialIndividual: IndividualForm = {
  name: "",
  email: "",
  workSituation: "",
  helpText: "",
};

const initialOrganisation: OrganisationForm = {
  name: "",
  workEmail: "",
  organisationName: "",
  role: "",
  teamSize: "",
  interestedIn: [],
  message: "",
};

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="mb-1.5 block text-sm font-semibold text-primary">
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-primary/15 bg-white px-4 py-3 text-primary placeholder:text-primary/35 outline-none transition-colors focus:border-orange focus:ring-2 focus:ring-orange/20";

export default function Contact() {
  useSEO({
    title: "Contact NeuroDiver",
    description:
      "For partnerships, pilots, press or general questions, email hello@neurodiver.co.",
    path: "/contact",
  });
  const [searchParams] = useSearchParams();
  const [audience, setAudience] = useState<AudienceType>("individual");

  useEffect(() => {
    if (searchParams.get("audience") === "organisation") {
      setAudience("organisation");
    }
  }, [searchParams]);
  const [individualData, setIndividualData] = useState<IndividualForm>(initialIndividual);
  const [organisationData, setOrganisationData] = useState<OrganisationForm>(initialOrganisation);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (value: string) => {
    setOrganisationData((prev) => ({
      ...prev,
      interestedIn: prev.interestedIn.includes(value)
        ? prev.interestedIn.filter((v) => v !== value)
        : [...prev.interestedIn, value],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (audience === "organisation" && organisationData.interestedIn.length === 0) {
      setError("Please select at least one option for \u201cInterested in.\u201d");
      return;
    }

    setSubmitting(true);

    const endpoint =
      audience === "individual"
        ? "/api/contact/individual"
        : "/api/contact/organisation";

    const body =
      audience === "individual"
        ? {
            name: individualData.name,
            email: individualData.email,
            workSituation: individualData.workSituation,
            helpText: individualData.helpText,
          }
        : {
            name: organisationData.name,
            email: organisationData.workEmail,
            organisationName: organisationData.organisationName,
            role: organisationData.role,
            teamSize: organisationData.teamSize,
            interestedIn: organisationData.interestedIn,
            message: organisationData.message,
          };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          (data as { message?: string }).message ??
            `We could not send your message. Please try again or email ${CONTACT_EMAIL}.`,
        );
      }

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : `We could not send your message. Please try again or email ${CONTACT_EMAIL}.`,
      );
    }

    setSubmitting(false);
  };

  const resetForm = () => {
    setIndividualData(initialIndividual);
    setOrganisationData(initialOrganisation);
    setSubmitted(false);
    setError(null);
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Get in touch."
        description={
          <>
            For partnerships, pilots, press or general questions, email{" "}
            <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-lime underline-offset-2 hover:underline">
              {CONTACT_EMAIL}
            </a>
            .
          </>
        }
        compact
      />

    <section className="flex min-h-0 items-center justify-center bg-soft px-6 py-16">
      <div className="mx-auto w-full max-w-2xl">
        {/* Card */}
        <div className="rounded-4xl border border-primary/10 bg-white p-6 shadow-[0_25px_60px_rgba(45,90,61,0.1)] md:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center py-10 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-yellow/50 text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-serif text-2xl text-primary md:text-3xl">
                  Thanks for getting in touch. We will reply by email.
                </h2>
                <button
                  type="button"
                  onClick={resetForm}
                  className="mt-6 text-sm font-semibold text-primary underline decoration-orange decoration-2 underline-offset-4 hover:text-primary-light"
                >
                  Submit another response
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {/* Tab switcher */}
                <div className="mb-8 flex rounded-full bg-primary/5 p-1">
                  {(
                    [
                      { id: "individual" as const, label: "I am an individual" },
                      { id: "organisation" as const, label: "I represent an organisation" },
                    ]
                  ).map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setAudience(tab.id);
                        setError(null);
                      }}
                      className={`flex-1 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 ${
                        audience === tab.id
                          ? "bg-orange text-white shadow-[0_10px_25px_rgba(45,90,61,0.25)]"
                          : "text-primary/50 hover:text-primary"
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {audience === "individual" ? (
                    <motion.form
                      key="individual-form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div>
                        <FieldLabel>Name</FieldLabel>
                        <input
                          type="text"
                          required
                          value={individualData.name}
                          onChange={(e) =>
                            setIndividualData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <FieldLabel>Email</FieldLabel>
                        <input
                          type="email"
                          required
                          value={individualData.email}
                          onChange={(e) =>
                            setIndividualData((prev) => ({ ...prev, email: e.target.value }))
                          }
                          placeholder="you@email.com"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <FieldLabel>Work situation</FieldLabel>
                        <select
                          required
                          value={individualData.workSituation}
                          onChange={(e) =>
                            setIndividualData((prev) => ({
                              ...prev,
                              workSituation: e.target.value,
                            }))
                          }
                          className={`${inputClass} appearance-none`}
                        >
                          <option value="" disabled>
                            Select one
                          </option>
                          {workSituations.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <FieldLabel>
                          What are you hoping NeuroDiver helps with?{" "}
                          <span className="font-normal text-primary/40">(optional)</span>
                        </FieldLabel>
                        <textarea
                          rows={4}
                          value={individualData.helpText}
                          onChange={(e) =>
                            setIndividualData((prev) => ({ ...prev, helpText: e.target.value }))
                          }
                          placeholder="Tell us a bit about what you're looking for..."
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-light disabled:opacity-60"
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </motion.form>
                  ) : (
                    <motion.form
                      key="organisation-form"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div>
                        <FieldLabel>Name</FieldLabel>
                        <input
                          type="text"
                          required
                          value={organisationData.name}
                          onChange={(e) =>
                            setOrganisationData((prev) => ({ ...prev, name: e.target.value }))
                          }
                          placeholder="Your name"
                          className={inputClass}
                        />
                      </div>

                      <div>
                        <FieldLabel>Work email</FieldLabel>
                        <input
                          type="email"
                          required
                          value={organisationData.workEmail}
                          onChange={(e) =>
                            setOrganisationData((prev) => ({ ...prev, workEmail: e.target.value }))
                          }
                          placeholder="you@company.com"
                          className={inputClass}
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                          <FieldLabel>Organisation name</FieldLabel>
                          <input
                            type="text"
                            required
                            value={organisationData.organisationName}
                            onChange={(e) =>
                              setOrganisationData((prev) => ({
                                ...prev,
                                organisationName: e.target.value,
                              }))
                            }
                            placeholder="Company or team name"
                            className={inputClass}
                          />
                        </div>
                        <div>
                          <FieldLabel>Role</FieldLabel>
                          <input
                            type="text"
                            required
                            value={organisationData.role}
                            onChange={(e) =>
                              setOrganisationData((prev) => ({ ...prev, role: e.target.value }))
                            }
                            placeholder="e.g. Head of People"
                            className={inputClass}
                          />
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Team size</FieldLabel>
                        <select
                          required
                          value={organisationData.teamSize}
                          onChange={(e) =>
                            setOrganisationData((prev) => ({ ...prev, teamSize: e.target.value }))
                          }
                          className={`${inputClass} appearance-none`}
                        >
                          <option value="" disabled>
                            Select a range
                          </option>
                          {teamSizes.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <FieldLabel>Interested in</FieldLabel>
                        <div className="flex flex-wrap gap-2">
                          {interests.map((interest) => {
                            const isActive = organisationData.interestedIn.includes(interest);
                            return (
                              <button
                                key={interest}
                                type="button"
                                onClick={() => toggleInterest(interest)}
                                aria-pressed={isActive}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${
                                  isActive
                                    ? "border-orange bg-yellow/40 text-primary"
                                    : "border-primary/15 bg-white text-primary/60 hover:border-primary/30"
                                }`}
                              >
                                {interest}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <FieldLabel>Message</FieldLabel>
                        <textarea
                          rows={4}
                          required
                          value={organisationData.message}
                          onChange={(e) =>
                            setOrganisationData((prev) => ({ ...prev, message: e.target.value }))
                          }
                          placeholder="What would you like to explore with NeuroDiver?"
                          className={`${inputClass} resize-none`}
                        />
                      </div>

                      {error && (
                        <p className="text-sm font-medium text-orange">{error}</p>
                      )}

                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full rounded-full bg-primary py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-primary-light disabled:opacity-60"
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>

      <FAQSection />

      <FinalCtaBand
        title="Prefer to start in the app?"
        body="Book a body doubling session or explore check-ins and strategies when you are ready."
        footnote="You can still use the form above for partnerships, pilots and press."
      >
        <BookSessionButton className="w-full sm:w-auto">
          Open the NeuroDiver app
        </BookSessionButton>
      </FinalCtaBand>
    </>
  );
}