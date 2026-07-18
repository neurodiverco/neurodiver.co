// src/pages/Home.tsx
import WaitlistForm from "../components/WaitlistForm";
import StatsRow from "../components/StatsRow";
import Grainient from "../components/Grainient";
import Testimonials from "../components/Testimonials";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Award, MessagesSquare, Users, HeartHandshake, LineChart, Smile } from "lucide-react";
import SlackIntro from "@/components/ui/slack-intro";
import SignedPartners from "@/components/SignedPartners";
import SDGGoals from "@/components/SDGgoals";
import FAQSection from "@/components/FAQsection";
import { useSEO } from "@/hooks/useSEO";

export default function Home() {
  useSEO({
    title: "Productivity toolkit for neurodivergent minds",
    description:
      "NeuroDiver is a productivity toolkit built for neurodivergent adults. Track your energy, discover personalised strategies, and build sustainable ways of working — designed in Malaysia.",
    path: "/",
  });

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-svh flex flex-col items-center justify-start pt-28 pb-16 sm:justify-center sm:py-16 px-6 overflow-hidden">
        <Grainient
          color1="#4e6544"
          color2="#134333"
          color3="#746b4a"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
        <div className="relative z-10 max-w-3xl mx-auto text-center space-y-5 sm:space-y-6">
          <p className="inline-block px-4 py-2 sm:px-5 sm:py-2.5 rounded-full bg-yellow backdrop-blur-sm border border-[#655733] text-[#655733] text-xs sm:text-sm font-semibold uppercase tracking-widest">
            Productivity toolkit
          </p>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-6xl text-white leading-tight [text-shadow:0_2px_12px_rgba(0,0,0,0.5),0_4px_24px_rgba(0,0,0,0.3)]">
            Work with your brain, <span className="text-yellow italic">not against it.</span>
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">
            A productivity toolkit designed for neurodivergent adults. Track your
            energy, discover personalized strategies, and build sustainable ways
            of working.
          </p>
          <div className="pt-2 sm:pt-4">
            <WaitlistForm />
          </div>
          <div className="pt-6 sm:pt-8">
            <StatsRow initialWaitlistCount={0} />
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-orange text-sm font-semibold uppercase tracking-widest mb-6"
          >
            What we help with
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="rounded-4xl border border-primary/10 bg-white p-8 md:p-12 shadow-[0_20px_50px_rgba(45,90,61,0.08)]"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)]">
              <div>
                <h2 className="font-sans text-2xl md:text-3xl text-primary leading-tight">
                  We help neurodivergent adults understand themselves, work
                  sustainably, and build healthier productivity habits through
                  personalized tools, practical strategies, and a supportive
                  community.
                </h2>
              </div>

              <div className="grid gap-10 sm:grid-cols-2 sm:divide-x sm:divide-primary/10">
                <div className="sm:pr-8 md:pr-10">
                  <h3 className="font-serif italic text-2xl md:text-3xl text-primary mb-6">
                    For individuals
                  </h3>
                  <div className="divide-y divide-primary/10">
                    {[
                      {
                        icon: Award,
                        text: "Personalized strategies designed around real-life challenges like burnout, overwhelm, and executive dysfunction.",
                      },
                      {
                        icon: MessagesSquare,
                        text: "Track your energy, focus, and daily patterns to understand what works best for your brain.",
                      },
                      {
                        icon: Users,
                        text: "Virtual co-working spaces and a community of people who understand your experiences.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-yellow/40 text-primary">
                          <item.icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <p className="text-primary/70 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:pl-8 md:pl-10">
                  <h3 className="font-serif text-2xl italic md:text-3xl text-primary mb-6">
                    For your organization
                  </h3>
                  <div className="divide-y divide-primary/10">
                    {[
                      {
                        icon: HeartHandshake,
                        text: "Support neurodivergent employees with tools that promote sustainable performance and wellbeing.",
                      },
                      {
                        icon: LineChart,
                        text: "Gain insights into workplace wellbeing patterns while keeping individual experiences private and respected.",
                      },
                      {
                        icon: Smile,
                        text: "Inclusive resources and evidence-informed strategies that help teams work better together.",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-4 py-5 first:pt-0 last:pb-0">
                        <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-yellow/40 text-primary">
                          <item.icon className="h-5 w-5" strokeWidth={1.75} />
                        </span>
                        <p className="text-primary/70 leading-relaxed">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:py-24 bg-primary text-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-10 md:mb-14"
          >
            <p className="text-yellow text-sm font-semibold uppercase tracking-widest">
              How NeuroDiver helps
            </p>
            <h2 className="font-serif text-3xl md:text-5xl leading-tight">
              A steadier way to move through work.
            </h2>
            <p className="text-white/75 text-lg md:text-xl leading-relaxed">
              Three simple ways the product supports the rhythm of your day.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-3">
            {[
              {
                title: "Understand your patterns",
                image: "/images/patterns.jpg",
                text: "See when your energy rises, drops, or starts to fray, so you can plan with a bit more clarity.",
              },
              {
                title: "Find strategies that fit",
                image: "/images/strategies.jpg",
                text: "Use practical support that meets the task in front of you, instead of trying to force a one-size-fits-all approach.",
              },
              {
                title: "Work alongside others",
                image: "/images/work.jpg",
                text: "Build momentum with body doubling and shared focus sessions that make starting and staying on task feel lighter.",
              },
            ].map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="group overflow-hidden rounded-4xl border border-white/10 bg-white/10 shadow-[0_18px_40px_rgba(0,0,0,0.12)] backdrop-blur-sm"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-xs font-semibold uppercase tracking-widest text-yellow">
                      0{index + 1}
                    </p>
                  </div>
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="font-serif text-2xl md:text-3xl text-yellow">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-white/75 leading-relaxed">{item.text}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <SDGGoals />

      <SignedPartners />

      <section className="px-6 py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center space-y-4 max-w-3xl mx-auto mb-10 md:mb-14"
          >
            <p className="text-orange text-sm font-semibold uppercase tracking-widest">
              How it works
            </p>
            <h2 className="font-serif text-3xl md:text-5xl text-primary leading-tight">
              Choose the path that fits what you need right now.
            </h2>
            <p className="text-primary/70 text-lg md:text-xl leading-relaxed">
              Start as an individual, or explore how NeuroDiver can support your team or
              organisation.
            </p>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {[
              {
                title: "For Individuals",
                description:
                  "Built for working adults, freelancers, and founders who want steadier workdays and less friction.",
                to: "/individuals",
                image: "/images/individual.jpg",
                accent: "Start here",
              },
              {
                title: "For Organisations",
                description:
                  "Built for teams and organisations creating a calmer way to support different work styles.",
                to: "/organisations",
                image: "/images/organizations.jpg",
                accent: "See the team view",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <Link
                  to={item.to}
                  className="group block h-full overflow-hidden rounded-4xl border border-primary/10 bg-white shadow-[0_22px_50px_rgba(45,90,61,0.1)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_65px_rgba(45,90,61,0.14)]"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-primary via-primary/20 to-transparent" />
                    <div className="absolute inset-x-5 bottom-5 flex items-center justify-between">
                      <span className="rounded-full bg-yellow px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                        {item.accent}
                      </span>
                      <span className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                        Click to explore
                      </span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8">
                    <h3 className="font-serif text-2xl md:text-3xl text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-3 text-primary/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SlackIntro />

      <Testimonials />

      <FAQSection />

      {/* Early Access CTA */}
       <section className="bg-cream px-6 py-20 md:py-28">
        <div
          className="
            relative
            mx-auto
            max-w-5xl
            overflow-hidden
            rounded-4xl
            border
            border-primary/30
            bg-white
            px-8
            py-16
            shadow-xl
            shadow-primary/5
            md:px-16
            md:py-20
          "
        >
          {/* Bokeh */}
          <div className="absolute -top-20 -left-16 h-56 w-56 rounded-full bg-yellow/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-orange/20 blur-3xl" />
      
          <div className="relative mx-auto max-w-2xl text-center">
            <span
              className="
                mb-5
                inline-flex
                rounded-full
                bg-yellow/50
                px-4
                py-2
                text-sm
                font-medium
                text-primary
              "
            >
              Join the Waitlist
            </span>
      
            <h2 className="font-serif text-3xl leading-tight text-orange md:text-5xl">
              Be first to try it.
            </h2>
      
            <p className="mt-5 text-lg leading-relaxed text-orange/75">
              Join the waitlist and help shape the tools as they're built.
            </p>
      
            <div className="mt-10 flex justify-center">
      <WaitlistForm
        successTextClassName="text-primary"
        successSubtextClassName="text-primary/70"
      />      </div>
          </div>
        </div>
      </section>
    </>
  );
}