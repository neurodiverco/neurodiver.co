type AppScreenProps = {
  children: React.ReactNode;
  className?: string;
  label?: string;
};

export default function AppScreen({ children, className = "", label }: AppScreenProps) {
  return (
    <figure className={`mx-auto w-full max-w-[300px] ${className}`}>
      <div className="rounded-[2rem] border border-line bg-paper p-2 shadow-[0_24px_60px_rgba(12,28,22,0.12)]">
        <div className="overflow-hidden rounded-[1.5rem] bg-soft">{children}</div>
      </div>
      {label ? (
        <figcaption className="mt-4 text-center text-sm text-muted">{label}</figcaption>
      ) : null}
    </figure>
  );
}
