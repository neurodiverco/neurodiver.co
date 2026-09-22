import type { ReactNode } from "react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  media?: ReactNode;
  children?: ReactNode;
  compact?: boolean;
};

const inlineDiboClass =
  "pointer-events-none w-[min(44vw,168px)] shrink-0 select-none object-contain drop-shadow-[0_14px_36px_rgba(0,0,0,0.4)] animate-float sm:w-[190px] md:w-[210px] lg:w-[230px] xl:w-[250px]";

export default function PageHeader({
  eyebrow,
  title,
  description,
  media,
  children,
  compact = false,
}: PageHeaderProps) {
  return (
    <section
      className={`relative overflow-hidden bg-primary-dark ${
        compact ? "px-6 py-10 md:py-12" : "px-6 py-12 md:px-8 md:py-16 lg:px-10 lg:py-[4.5rem] xl:px-12 xl:py-24"
      } ${
        media
          ? "pb-8 pt-10 sm:pb-10 md:pb-16 lg:pb-[4.5rem] lg:pt-[4.5rem] xl:pb-24 xl:pt-24"
          : compact
            ? ""
            : "pb-10 md:pb-14"
      }`}
    >
      <div
        className="pointer-events-none absolute -left-20 top-0 h-56 w-56 rounded-full bg-lime/10 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-brand/40 blur-2xl lg:right-[8%] lg:top-1/2 lg:h-72 lg:w-72 lg:-translate-y-1/2 lg:blur-3xl"
        aria-hidden
      />

      <div
        className={`relative z-10 mx-auto max-w-6xl ${
          media
            ? "grid items-center gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-14 xl:grid-cols-[1fr_1.12fr] xl:gap-16"
            : ""
        }`}
      >
        {media ? (
          <div className="relative order-1 w-full lg:order-2 lg:flex lg:justify-end lg:overflow-visible">
            <div className="relative mx-auto w-full max-w-[min(100%,20rem)] px-1 pb-4 pt-2 sm:max-w-[21rem] sm:px-0 sm:pb-6 lg:mx-0 lg:ml-auto lg:w-full lg:max-w-[24rem] lg:px-4 lg:pb-8 lg:pt-4 xl:max-w-[26rem]">
              <div
                className="pointer-events-none absolute inset-x-0 bottom-2 top-4 rounded-[1.75rem] border border-white/[0.08] bg-gradient-to-b from-lime/[0.07] to-transparent sm:inset-x-1 lg:inset-x-0 lg:top-0 lg:rounded-[2.25rem] lg:bg-gradient-to-br lg:from-lime/[0.09] lg:via-white/[0.02] lg:to-brand/25 lg:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                aria-hidden
              />
              <div className="relative z-10 flex justify-center lg:justify-end">
                {media}
              </div>
            </div>
          </div>
        ) : null}

        <div
          className={`${
            media
              ? "order-2 lg:order-1"
              : "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:gap-12"
          }`}
        >
          <div
            className={`relative z-20 min-w-0 flex-1 max-w-2xl text-left lg:max-w-xl xl:max-w-2xl ${
              media ? "lg:py-4" : ""
            }`}
          >
            {eyebrow ? (
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.14em] text-lime md:text-xs">
                {eyebrow}
              </p>
            ) : null}
            <h1
              className={`font-display font-bold leading-[1.08] tracking-tight text-paper ${
                eyebrow ? "mt-3" : ""
              } text-3xl sm:text-4xl md:text-5xl lg:text-[2.65rem] lg:leading-[1.06] xl:text-[3.35rem]`}
            >
              {title}
            </h1>
            {description ? (
              <div className="mt-4 max-w-lg text-base leading-relaxed text-paper/80 md:text-lg">
                {description}
              </div>
            ) : null}
            {children ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:mt-9 lg:gap-4">
                {children}
              </div>
            ) : null}
          </div>

          {!media ? (
            <img
              src="/images/dibo.png"
              alt=""
              aria-hidden
              className={`${inlineDiboClass} self-end sm:self-auto`}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
