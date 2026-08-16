import Reveal from "./Reveal";

type Tool = {
  title: string;
  description: string;
  image: string;
};

const tools = [
  {
    title: "Energy Tracker",
    description:
      "A daily check-in that tracks your energy and masking patterns in professional settings to signal burnout before it happens.",
    image: "/images/energy-tracker.mp4",
  },
  {
    title: "Strategy Deck",
    description:
      "Situation-based strategies from lived experience, endorsed by our Clinical Psychologists.",
    image: "/images/strategy-deck.mp4",
  },
  {
    title: "Co-Working Sessions",
    description:
      "Work alongside others with people who want to get tasks done, virtually.",
    image: "/images/co-working.mp4",
  },
];

interface CardProps {
  tool: Tool;
  delay: number;
}

function Card({ tool, delay }: CardProps) {
  return (
    <Reveal delay={delay} className="h-full">
      <article
        className="
          group
          relative
          overflow-hidden
          rounded-4xl
          border
          border-primary/10
          bg-primary
          shadow-xl
          transition-all
          duration-500
          hover:-translate-y-2
          hover:shadow-2xl
        "
      >

        {/* Video */}
        <div
          className="
            relative
            overflow-hidden
            aspect-video
          "
        >
          <video
            src={tool.image}
            autoPlay
            loop
            muted
            playsInline
            className="
              absolute
              inset-0
              h-full
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
            "
          />

          {/* Video to text gradient */}
          <div
            className="
              absolute
              inset-0
              bg-linear-to-b
              from-transparent
              via-transparent
              to-[#18392f]
            "
          />
        </div>


        {/* Text */}
        <div
          className="
            relative
            -mt-8
            bg-[#18392f]
            rounded-t-4xl
            p-6
            md:p-8
          "
        >
          <h3
            className="
              font-serif
              text-2xl
              md:text-3xl
              text-yellow
            "
          >
            {tool.title}
          </h3>

          <p
            className="
              mt-3
              text-white/75
              text-sm
              md:text-base
              leading-relaxed
              max-w-lg
            "
          >
            {tool.description}
          </p>
        </div>

      </article>
    </Reveal>
  );
}


export default function Toolkit() {
  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-svh
        bg-cream
        text-white
        px-5
        py-16
        md:px-10
        lg:px-16
        flex
        items-center
      "
    >

      {/* Yellow Corner Bokeh Background */}
<div className="absolute inset-0 pointer-events-none overflow-hidden">

  {/* Top Left */}
  <div
    className="
      absolute
      -top-32
      -left-32
      w-96
      h-96
      rounded-full
      bg-yellow/30
      blur-3xl
    "
  />

  {/* Top Right */}
  <div
    className="
      absolute
      -top-24
      -right-24
      w-80
      h-80
      rounded-full
      bg-yellow/25
      blur-3xl
    "
  />

  {/* Bottom Left */}
  <div
    className="
      absolute
      -bottom-32
      -left-24
      w-96
      h-96
      rounded-full
      bg-[#EBDFAD]/40
      blur-3xl
    "
  />

  {/* Bottom Right */}
  <div
    className="
      absolute
      -bottom-32
      -right-32
      w-96
      h-96
      rounded-full
      bg-yellow/30
      blur-3xl
    "
  />


  {/* Small floating bokeh */}
  <div
    className="
      absolute
      top-1/4
      left-1/4
      w-20
      h-20
      rounded-full
      bg-yellow/20
      blur-2xl
    "
  />

  <div
    className="
      absolute
      bottom-1/3
      right-1/3
      w-28
      h-28
      rounded-full
      bg-yellow/20
      blur-2xl
    "
  />

</div>


      {/* Content */}
      <div className="relative z-10 w-full mx-auto">


        {/* Header */}
        <Reveal className="text-center mb-12 md:mb-16 space-y-4">

          <h2
            className="
              font-serif
              text-3xl
              md:text-5xl
              text-primary
            "
          >
            The toolkit
          </h2>


          <p
            className="
              text-xl
              text-primary-light/40
              md:text-2xl
              font-medium
            "
          >
            Three tools. One steady foundation.
          </p>


          <p
            className="
              text-orange/60
              max-w-2xl
              mx-auto
              leading-relaxed
            "
          >
            Everything in NeuroDiver is built around a single principle:
            work with your brain, not against it.
          </p>

        </Reveal>



        {/* Bento grid */}
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-5
          "
        >

          {tools.slice(0, 2).map((tool, i) => (
            <Card
              key={tool.title}
              tool={tool}
              delay={i * 100}
            />
          ))}


          <div
            className="
              lg:col-span-2
              flex
              justify-center
            "
          >
            <div
              className="
                w-full
                lg:w-1/2
              "
            >
              <Card
                tool={tools[2]}
                delay={200}
              />
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}