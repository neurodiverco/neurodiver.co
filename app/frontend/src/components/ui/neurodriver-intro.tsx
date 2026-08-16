import WaveReveal from "./wave-reveal";
import { cn } from "../../../lib/utils";

function Circle({
  size = "w-8 h-8 md:w-14 md:h-14",
  color,
}: {
  size?: string;
  color: string;
}) {
  return (
    <div
      className={cn(
        size,
        color,
        "rounded-full shrink-0 shadow-lg"
      )}
    />
  );
}

function Pill({
  text,
  width,
}: {
  text: string;
  width?: string;
}) {
  return (
    <div
      className={cn(
        "h-14 md:h-20 rounded-full bg-cream flex items-center justify-center px-8 shadow-xl",
        width
      )}
    >
      <WaveReveal
        text={text}
        blur={false}
        direction="up"
        delay={200}
        duration="900ms"
        className="text-primary-dark font-bold text-2xl md:text-5xl"
      />
    </div>
  );
}

export default function NeuroIntro() {
  return (
    <section className="bg-primary-dark py-20 overflow-hidden">
      <div className="flex flex-col items-center gap-6">

        <div className="flex items-center gap-6">
          <Circle color="bg-yellow" />
          <Pill text="Discover" width="w-[320px]" />
          <Circle color="bg-primary" />
        </div>

        <div className="flex items-center gap-8">
          <Circle color="bg-orange" />
          <div className="h-3 w-28 rounded-full bg-primary-light" />
          <Circle color="bg-yellow" />
        </div>

        <div className="flex items-center gap-6">
          <Circle color="bg-primary-light" />
          <Pill text="Your" width="w-[220px]" />
          <Circle color="bg-orange" />
        </div>

        <div className="flex items-center gap-6">
          <div className="h-3 w-40 rounded-full bg-yellow" />
          <Circle color="bg-primary" />
          <div className="h-3 w-24 rounded-full bg-primary-light" />
        </div>

        <div className="flex items-center gap-6">
          <Circle color="bg-yellow" />
          <Pill
            text="Productivity"
            width="w-[520px]"
          />
          <Circle color="bg-primary-light" />
        </div>

        <div className="flex items-center gap-8 mt-4">
          <Circle color="bg-orange" />
          <div className="h-3 w-32 rounded-full bg-primary" />
          <Circle color="bg-yellow" />
          <div className="h-3 w-48 rounded-full bg-primary-light" />
          <Circle color="bg-primary" />
        </div>

      </div>
    </section>
  );
}