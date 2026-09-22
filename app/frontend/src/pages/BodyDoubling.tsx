import {

  Calendar,

  CheckCircle2,

  ListTodo,

  Sparkles,

  Timer,

  Users,

  VideoOff,

} from "lucide-react";

import { useSEO } from "@/hooks/useSEO";

import BookSessionButton from "@/components/marketing/BookSessionButton";

import PageHeader from "@/components/marketing/PageHeader";

import { FinalCtaBand, Section } from "@/components/marketing/Section";

import FAQSection from "@/components/FAQsection";



const sessionFlow = [

  {

    step: "01",

    title: "Settle in",

    body: "Choose one task and name a small first step — work, study or admin.",

    icon: ListTodo,

  },

  {

    step: "02",

    title: "Focus together",

    body: "Work quietly during the timed period while others do the same.",

    icon: Timer,

  },

  {

    step: "03",

    title: "Wrap up",

    body: "Notice what moved forward, even if it was smaller than you planned.",

    icon: CheckCircle2,

  },

];



const yourRules = [

  {

    title: "Camera optional",

    body: "Show up how you are comfortable. Video off is always fine.",

    icon: VideoOff,

  },

  {

    title: "No finish pressure",

    body: "Progress counts. You do not need to complete everything in one go.",

    icon: Sparkles,

  },

  {

    title: "Your task, your pace",

    body: "Bring what you would like to move forward. Nobody does it for you.",

    icon: Users,

  },

  {

    title: "Clear times before you book",

    body: "The live calendar shows session length and availability in MYT.",

    icon: Calendar,

  },

];



const bookSteps = [

  "Open the NeuroDiver app and sign in — or create an account if you are new.",

  "Browse available body doubling sessions and pick a time that works.",

  "Join the room, name your task and take that smaller first step.",

];



const ctaClass = "w-full sm:w-auto";



export default function BodyDoubling() {

  useSEO({

    title: "Body Doubling Sessions",

    description:

      "Book an online body doubling session with NeuroDiver. Bring one task, work quietly alongside others and take a smaller first step. Cameras optional.",

    path: "/body-doubling",

  });



  return (

    <>

      <PageHeader

        eyebrow="Online co-working for real life"

        title="Find your focus session."

        description={

          <>

            When starting alone feels hard, a little structure and quiet company can help.

            <span className="mt-2 block text-sm text-paper/65">

              Cameras optional · Times shown in MYT

            </span>

          </>

        }

      >

        <BookSessionButton variant="on-dark" className={ctaClass}>

          Book a session

        </BookSessionButton>

      </PageHeader>



      {/* What is body doubling */}

      <Section className="overflow-x-clip border-t border-line bg-paper py-12 md:py-24">

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">

          <div className="min-w-0">

            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">

              The idea

            </p>

            <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">

              What is body doubling?

            </h2>

            <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">

              Body doubling means doing your own task while another person is present and

              working too. The shared time and gentle structure can make it easier to begin

              and keep going.

            </p>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-2 sm:gap-4">

              <div className="flex flex-col rounded-[20px] border border-line bg-soft p-4 sm:p-5">

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-lime/30 text-primary">

                  <ListTodo className="h-5 w-5" aria-hidden />

                </span>

                <p className="mt-3 font-semibold text-primary">Your task</p>

                <p className="mt-1 text-sm text-muted">You choose what to work on.</p>

              </div>

              <div className="relative flex flex-col rounded-[20px] border border-line bg-soft p-4 sm:p-5">

                <span

                  className="pointer-events-none absolute -top-3 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-brand text-sm font-bold text-paper sm:hidden"

                  aria-hidden

                >

                  +

                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/15 text-brand">

                  <Users className="h-5 w-5" aria-hidden />

                </span>

                <p className="mt-3 font-semibold text-primary">Quiet company</p>

                <p className="mt-1 text-sm text-muted">Others focus alongside you.</p>

              </div>

            </div>

          </div>

          <div className="relative mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-xs lg:max-w-none lg:justify-self-end">

            <div

              className="pointer-events-none absolute -left-2 -top-2 h-20 w-20 rounded-full bg-lime/25 blur-2xl sm:-left-4 sm:-top-4 sm:h-24 sm:w-24 lg:-left-8"

              aria-hidden

            />

            <div className="relative overflow-hidden rounded-[20px] border border-line bg-soft p-2 shadow-[0_16px_40px_rgba(23,43,32,0.08)] sm:rounded-[24px] sm:p-3">

              <img

                src="/images/bodydouble.png"

                alt="Body doubling session in the NeuroDiver app"

                className="w-full rounded-[14px] object-cover sm:rounded-[18px]"

              />

            </div>

          </div>

        </div>

      </Section>



      {/* Session rhythm */}

      <Section className="overflow-x-clip bg-soft py-12 md:py-24">

        <div className="mx-auto max-w-3xl text-left md:text-center lg:max-w-none">

          <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">

            How a session flows

          </p>

          <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">

            A simple rhythm for the session.

          </h2>

          <p className="mt-3 max-w-2xl text-base text-muted sm:mt-4 sm:text-lg md:mx-auto">

            Three beats — settle, focus, wrap up. No performance, just a container that

            helps you start.

          </p>

        </div>



        <div className="relative mx-auto mt-8 max-w-5xl md:mt-12">

          <div

            className="pointer-events-none absolute left-[16%] right-[16%] top-14 hidden h-0.5 bg-gradient-to-r from-lime/20 via-lime/50 to-lime/20 md:block"

            aria-hidden

          />

          <ol className="flex flex-col md:grid md:grid-cols-3 md:gap-6">

            {sessionFlow.map(({ step, title, body, icon: Icon }, index) => (

              <li

                key={step}

                className="relative min-w-0 pb-8 pl-10 last:pb-0 md:rounded-[20px] md:border md:border-line md:bg-paper md:p-6 md:pb-6 md:pl-6 md:pt-8 md:shadow-sm"

              >

                {index < sessionFlow.length - 1 ? (

                  <span

                    className="absolute bottom-0 left-[15px] top-9 w-0.5 bg-lime/35 md:hidden"

                    aria-hidden

                  />

                ) : null}

                <span className="absolute left-0 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-lime text-xs font-bold text-primary-dark md:left-1/2 md:-top-4 md:h-9 md:w-9 md:-translate-x-1/2 md:text-sm">

                  {step}

                </span>

                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-paper text-brand ring-1 ring-line md:mx-auto md:mt-2 md:bg-soft md:ring-0">

                  <Icon className="h-5 w-5" aria-hidden />

                </span>

                <p className="mt-3 font-display text-lg text-primary sm:text-xl md:mt-4 md:text-center">

                  {title}

                </p>

                <p className="mt-1.5 text-sm leading-relaxed text-muted md:mt-2 md:text-center">

                  {body}

                </p>

              </li>

            ))}

          </ol>

        </div>

        <div className="mt-8 flex justify-stretch sm:mt-10 sm:justify-center">

          <BookSessionButton className={ctaClass}>See sessions and sign in</BookSessionButton>

        </div>

      </Section>



      {/* Your rules */}

      <Section className="overflow-x-clip bg-paper py-12 md:py-24">

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-14">

          <div className="min-w-0">

            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-primary-light">

              Your call

            </p>

            <h2 className="font-display mt-3 text-2xl text-primary sm:text-3xl md:text-4xl">

              Make the space work for you.

            </h2>

            <p className="mt-4 max-w-lg text-base leading-relaxed text-muted sm:mt-5 sm:text-lg">

              You do not need to share personal details or perform productivity. Bring what

              you would like to move forward — the session meets you where you are.

            </p>

          </div>

          <ul className="grid min-w-0 gap-3 sm:grid-cols-2 sm:gap-4">

            {yourRules.map(({ title, body, icon: Icon }) => (

              <li

                key={title}

                className="group rounded-[20px] border border-line bg-soft p-4 transition-colors hover:border-primary-light/40 hover:bg-white sm:p-5"

              >

                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-paper text-brand ring-1 ring-line transition group-hover:bg-lime/20">

                  <Icon className="h-5 w-5" aria-hidden />

                </span>

                <p className="mt-3 font-semibold text-primary">{title}</p>

                <p className="mt-1.5 text-sm leading-relaxed text-muted">{body}</p>

              </li>

            ))}

          </ul>

        </div>

      </Section>



      {/* Ready to book */}

      <Section className="overflow-x-clip bg-primary-dark py-12 text-paper md:py-24">

        <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16">

          <div className="order-2 min-w-0 lg:order-1">

            <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-lime">

              Ready when you are

            </p>

            <h2 className="font-display mt-3 text-2xl sm:text-3xl md:text-4xl">

              Ready for a little company?

            </h2>

            <p className="mt-3 max-w-lg text-base text-paper/80 sm:mt-4 sm:text-lg">

              Select Book a session to open the NeuroDiver app, choose an available slot and

              join the room.

            </p>

            <ol className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">

              {bookSteps.map((line, i) => (

                <li key={line} className="flex gap-3 sm:gap-4">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-lime/20 text-sm font-bold text-lime">

                    {i + 1}

                  </span>

                  <p className="min-w-0 pt-0.5 text-sm leading-relaxed text-paper/85 sm:text-base">

                    {line}

                  </p>

                </li>

              ))}

            </ol>

            <p className="mt-5 text-sm text-paper/60 sm:mt-6">

              No sessions this week? Check the next week in the app.

            </p>

            <div className="mt-6 sm:mt-8">

              <BookSessionButton variant="on-dark" className={ctaClass}>

                Book a body doubling session

              </BookSessionButton>

            </div>

          </div>

          <div className="relative order-1 mx-auto w-full max-w-[min(100%,16rem)] sm:max-w-xs lg:order-2 lg:max-w-md">

            <div

              className="pointer-events-none absolute -right-2 top-6 h-16 w-16 rounded-full bg-lime/15 blur-xl sm:-right-4"

              aria-hidden

            />

            <div className="relative rounded-[18px] border border-white/15 bg-white/5 p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:rounded-[22px] sm:p-2 lg:-rotate-1">

              <img

                src="/images/signin.png"

                alt="NeuroDiver app sign-in screen"

                className="w-full rounded-[14px] object-cover sm:rounded-[16px]"

              />

            </div>

          </div>

        </div>

      </Section>



      <FAQSection />

      <FinalCtaBand
        title="Find your focus session."
        body="Sign in to the app to see available body doubling sessions in MYT."
        footnote="Cameras optional · No diagnosis required."
      >
        <BookSessionButton className="w-full sm:w-auto">
          Book a body doubling session
        </BookSessionButton>
      </FinalCtaBand>
    </>
  );
}


