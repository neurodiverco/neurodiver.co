import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="sticky top-0 z-50 backdrop-blur border-b-border bg-sidebar text-sidebar-foreground">
      <div className="mx-auto my-0 px-4 py-2.5 sm:max-w-5xl sm:py-0">
        <div className="flex items-center justify-between h-16 gap-8">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="beam-dot w-2 h-2 rounded-[50%] shrink-0 animate-[nd-beam-pulse_3s_ease-in-out_infinite]"></div>
            <span className="text-xl font-bold tracking-tight">NeuroDiver</span>
          </Link>

          <ul className="flex items-center gap-1 flex-1 justify-center list-none">
            <li><a className="px-3 py-1.5 rounded-md transition text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10" href="#features">Product</a></li>
            <li><a className="px-3 py-1.5 rounded-md transition text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10" href="#workplace">For organisations</a></li>
            <li><a className="px-3 py-1.5 rounded-md transition text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10" href="#impact">Our mission</a></li>
            <li><a className="px-3 py-1.5 rounded-md transition text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/10" href="#about">About</a></li>
          </ul>

          <div className="shrink-0">
            <a href="#waitlist" className="items-center gap-2 font-semibold tracking-[0.01em] px-5 py-2.5 rounded-lg border-0 cursor-pointer transition text-nowrap bg-primary text-primary-foreground hover:bg-primary/50 active:scale-[98%]">
              Request early access
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
