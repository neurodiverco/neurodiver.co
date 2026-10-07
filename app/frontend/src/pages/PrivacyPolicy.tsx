// src/pages/PrivacyPolicy.tsx
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Mail, MapPin } from "lucide-react";
import PageHeader from "@/components/marketing/PageHeader";
import FAQSection from "@/components/FAQsection";
import { FinalCtaBand } from "@/components/marketing/Section";
import { RevealSection } from "@/components/Reveal";

interface Section {
  id: string;
  title: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: "scope",
    title: "1. Scope of this Privacy Policy",
    content: (
      <>
        <p>
          This Privacy Policy applies to our services and is incorporated into and forms
          part of the Terms of Service ("Terms") that you have agreed to in order to use
          our services. Any terms used in this Privacy Policy will have the same meaning
          as the equivalent defined terms in the Terms, unless otherwise defined in this
          Privacy Policy or the context requires otherwise. Please note that:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>
            this Privacy Policy does not apply to Personal Data collected through
            third-party services (including any third-party websites or mobile apps)
            that you may access through our services;
          </li>
          <li>in providing our services, we may collect, use, disclose and retain your Personal Data;</li>
          <li>
            we share your Personal Data only with the affiliates, business partners and
            service providers necessary to operate our services (as set out in the
            "Sharing of Your Personal Data" section below);
          </li>
          <li>
            you have rights that you may exercise in relation to your Personal Data, as
            set out in the "Your Rights" section below.
          </li>
        </ul>
        <p className="mt-4">
          By using our services, you agree that we may collect, use and process your
          Personal Data in accordance with this Privacy Policy, as revised from time to
          time. If you do not agree with this Privacy Policy, you must not use our
          services.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "2. Changes to this Privacy Policy",
    content: (
      <p>
        We may from time to time revise or add specific instructions, policies and terms
        to this Privacy Policy. Where there are material changes, we will notify you (via
        our website, email, or in-app notice). Continuing to use our services after such
        changes constitutes your agreement to the revised Privacy Policy.
      </p>
    ),
  },
  {
    id: "information",
    title: "3. The Information We Collect and How We Collect It",
    content: (
      <>
        <p>
          In providing our services, we collect and process the following categories of
          Personal Data:
        </p>
        <div className="mt-5 space-y-4">
          {[
            {
              label: "Identity Data",
              text: "your name, email address, and date of birth (where you choose to provide it).",
            },
            {
              label: "Contact Data",
              text: "your email address and, where provided, phone number.",
            },
            {
              label: "Account & Usage Data",
              text: "your login credentials, and activity generated through your use of our products, including Strategy Deck interactions, Body Doubling session sign-ups and attendance, Energy Tracker entries, and other in-app activity used to provide and improve our services.",
            },
            {
              label: "Sensitive Personal Data",
              text: 'where you choose to share information relating to a neurodivergent diagnosis, condition, or related health information (for example, when using diagnostic-adjacent features, completing onboarding surveys, or participating in research interviews), this is treated as "sensitive personal data" under Malaysia\'s Personal Data Protection Act 2010 ("PDPA"). We only collect and process this category with your separate, explicit consent, and you may decline to provide it without losing access to core features, where reasonably possible.',
            },
            {
              label: "Location Data",
              text: "general location information inferred from your IP address (e.g., country or city) for service delivery, fraud prevention, and security purposes. We do not collect precise GPS or device-sensor location data.",
            },
            {
              label: "Log Data",
              text: "technical information automatically collected when you use our services, including your browser type, device type, IP address, and general usage patterns (e.g., pages visited, features used).",
            },
            {
              label: "Payment Data",
              text: "where you subscribe to a paid plan, payment is processed via a third-party payment processor Stripe Payments Malaysia Sdn. Bhd. We do not store your full card or bank account details; we retain billing records, subscription tier, and transaction history necessary for account administration.",
            },
            {
              label: "Marketing and Communications Data",
              text: "your preferences for receiving product updates, newsletters, community session invitations, and similar communications.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-primary/10 bg-white p-5"
            >
              <p className="font-semibold text-primary">{item.label}</p>
              <p className="mt-1.5 text-primary/70">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-5">
          You must only submit Personal Data which is accurate and not misleading and you
          must keep it up to date. You may access and update your Personal Data at any
          time by contacting us using the details in the "Contact" section below.
        </p>
      </>
    ),
  },
  {
    id: "use",
    title: "4. How We Use Your Personal Data",
    content: (
      <>
        <p>We may use your Personal Data to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>provide and operate our services, including Strategy Deck, Body Doubling, and Energy Tracker;</li>
          <li>process subscription payments and manage billing for B2C and B2B plans;</li>
          <li>respond to support requests and notify you of service issues or account-related actions;</li>
          <li>enforce our Terms;</li>
          <li>maintain security, detect and prevent fraud (including payment fraud), and for archival/backup purposes;</li>
          <li>understand how our services are used in order to improve them, including language, accessibility, and communication preferences;</li>
          <li>
            conduct research to improve and validate our tools — sensitive data is used
            for this purpose only in anonymised or aggregated form, unless you have given
            separate, explicit consent to participate in identified research;
          </li>
          <li>comply with applicable legal or regulatory obligations and respond to legal claims;</li>
          <li>develop new features and conduct software maintenance and upgrades;</li>
          <li>communicate with you about our business and services.</li>
        </ul>
        <p className="mt-4">
          Where we rely on your consent for a particular use, you may withdraw that
          consent at any time by contacting us — though this may limit our ability to
          provide certain features.
        </p>
      </>
    ),
  },
  {
    id: "security",
    title: "5. Security Practices",
    content: (
      <p>
        We use industry-standard security measures to protect your Personal Data,
        including encryption in transit (TLS/SSL) and access controls limiting who
        within our team can view your data.
      </p>
    ),
  },
  {
    id: "advertising",
    title: "6. Advertising and Marketing",
    content: (
      <p>
        We may use your Contact Data and Marketing and Communications Data to send you
        product updates, newsletters, or invitations to community sessions. We do not
        sell your Personal Data to advertisers. You may opt out of marketing
        communications at any time via the unsubscribe link in our emails, your account
        settings, or by contacting us.
      </p>
    ),
  },
  {
    id: "sharing",
    title: "7. Sharing of Your Personal Data",
    content: (
      <>
        <p>We do not sell your Personal Data. We share it only with:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>service providers who help us operate our platform (e.g., hosting, payment processing, email delivery);</li>
          <li>
            B2B client organisations, but only in aggregated and anonymised form (e.g.,
            overall engagement or completion rates) — we do not share an individual
            employee's identity, Sensitive Personal Data, or individual usage records
            with their employer without that individual's separate, explicit consent;
          </li>
          <li>authorities or third parties where required by law, court order, or a valid request from a government or law enforcement body.</li>
        </ul>
        <p className="mt-4">
          Where third parties process your data on our behalf, we require them to do so
          only in accordance with this Privacy Policy and under appropriate
          confidentiality and security obligations.
        </p>
      </>
    ),
  },
  {
    id: "communications",
    title: "8. Communications From Us",
    content: (
      <p>
        We may send you service-related notifications (e.g., session reminders, account
        or billing notices) through the platform, app, or email. Service-related
        announcements are not promotional and cannot be opted out of, as they relate to
        the operation of your account.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "9. Third-Party Services",
    content: (
      <p>
        Our services may link to or integrate with third-party tools (for example, our
        payment processor or scheduling tools for Body Doubling sessions). Your use of
        those third-party services is governed by their own terms and privacy policies,
        not this one. We are not responsible for their handling of your data.
      </p>
    ),
  },
  {
    id: "retention",
    title: "10. Retention of Your Personal Data",
    content: (
      <p>
        We retain your Personal Data for as long as you maintain an active account, and
        for a reasonable period afterward where we have a legitimate business or legal
        need (e.g., billing records, dispute resolution). Sensitive Personal Data is
        retained only for as long as necessary for the purpose for which you consented
        to share it, and is deleted or anonymised thereafter.
      </p>
    ),
  },
  {
    id: "transfer",
    title: "11. Transfer of Your Data Overseas",
    content: (
      <p>
        In order to provide a fast and secure web-based productivity platform, our cloud
        infrastructure utilizes servers located outside of Malaysia, primarily in
        Singapore and the United States. By using our services, you acknowledge and
        agree that your Personal Data may be transferred to, stored, and processed
        internationally. We take all steps reasonably necessary to ensure that your data
        is treated securely and in accordance with this Privacy Policy and the PDPA.
      </p>
    ),
  },
  {
    id: "rights",
    title: "12. Your Rights",
    content: (
      <>
        <p>Subject to the PDPA, you have the right to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>request access to the Personal Data we hold about you;</li>
          <li>request correction of inaccurate or outdated Personal Data;</li>
          <li>
            request erasure of your Personal Data or cessation of processing, subject to
            certain exceptions (e.g., billing records we're legally required to keep);
          </li>
          <li>withdraw consent for any processing based on consent, including Sensitive Personal Data;</li>
          <li>receive your Personal Data in a structured, machine-readable format;</li>
          <li>lodge a complaint with the relevant data protection authority if you believe your rights have been breached.</li>
        </ul>
        <p className="mt-4">To exercise any of these rights, contact us using the details below.</p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        compact
      />
    <RevealSection className="bg-paper px-6 py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-lg leading-relaxed text-muted">
            Welcome to Neurodiver! In this Privacy Policy, "Neurodiver", "we", "our" or
            "us" refers to NEURODIVER PLT (Company No.: 202604001004 (LLP0046235-LGN)), a
            private company limited by shares incorporated under the laws of Malaysia and
            having its registered address at Common Ground Bangsar South, Level 1 & 2,
            Tower 3, Avenue 7 Horizon 2, Bangsar South City, Bangsar South, 59200 Kuala
            Lumpur. We value your privacy and this Privacy Policy informs you of your
            choices and our practices regarding any Personal Data you provide to us or
            that you generate through your use of our services ("our services"),
            including our website at{" "}
            <a
              href="https://neurodiver.co"
              className="text-primary underline decoration-orange decoration-2 underline-offset-2 hover:text-primary-light"
            >
              https://neurodiver.co
            </a>{" "}
            ("Website" or "our Website") and our web-based productivity platform.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-12 h-px bg-primary/10 md:my-16" />

        {/* Sections */}
        <div className="space-y-12 md:space-y-16">
          {sections.map((section) => (
            <motion.div
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="scroll-mt-24"
            >
              <h2 className="font-serif text-2xl text-primary md:text-3xl">
                {section.title}
              </h2>
              <div className="mt-4 leading-relaxed text-primary/70 [&_ul]:leading-relaxed">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="my-12 h-px bg-primary/10 md:my-16" />

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="scroll-mt-24 rounded-3xl border border-primary/10 bg-white p-6 md:p-8"
        >
          <h2 className="font-serif text-2xl text-primary md:text-3xl">Contact</h2>
          <p className="mt-4 leading-relaxed text-primary/70">
            If you have any questions, concerns, or requests regarding this Privacy
            Policy, or if you wish to exercise any of your rights under the PDPA, please
            contact our Data Protection Team at:
          </p>
          <div className="mt-5 space-y-3">
            <a
              href="mailto:hello@neurodiver.co"
              className="flex items-center gap-3 text-primary transition-colors hover:text-primary-light"
            >
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-yellow/40">
                <Mail className="h-4 w-4" />
              </span>
              hello@neurodiver.co
            </a>
            <div className="flex items-start gap-3 text-primary/70">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-yellow/40 text-primary">
                <MapPin className="h-4 w-4" />
              </span>
              <span>
                NeuroDiver PLT, Common Ground Bangsar South, Level 1 & 2, Tower 3, Avenue
                7 Horizon 2, Bangsar South City, Bangsar South, 59200 Kuala Lumpur.
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </RevealSection>

      <FAQSection />

      <FinalCtaBand
        title="Questions about your data?"
        body="Contact us anytime. To use NeuroDiver support, open the app and sign in when you are ready."
      >
        <Link
          to="/contact"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-full bg-brand px-6 py-3 text-sm font-semibold text-paper transition hover:brightness-95 sm:w-auto"
        >
          Contact us
        </Link>
      </FinalCtaBand>
    </>
  );
}