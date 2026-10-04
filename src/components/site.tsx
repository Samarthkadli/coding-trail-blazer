import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { externalLinkProps } from "@/lib/external";

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-all duration-700 ease-out",
        shown ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Section({
  eyebrow,
  title,
  subtitle,
  children,
  id,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  children?: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto w-[min(1180px,92vw)] py-14 sm:py-20", className)}>
      <Reveal>
        <div className="mb-8 max-w-2xl">
          {eyebrow && (
            <span className="mb-3 inline-flex rounded-full bg-secondary px-3 py-1 text-xs font-black tracking-widest text-secondary-foreground uppercase">
              {eyebrow}
            </span>
          )}
          <h2 className="text-halo text-3xl leading-tight sm:text-4xl">{title}</h2>
          {subtitle && <p className="text-halo mt-3 text-base font-semibold text-muted-foreground sm:text-lg">{subtitle}</p>}
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "glass group relative overflow-hidden rounded-3xl p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function Chip({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "cyan" | "orange" | "primary" | "success" }) {
  const tones = {
    muted: "bg-secondary text-secondary-foreground",
    cyan: "bg-cyan/20 text-cyan-foreground",
    orange: "bg-orange/25 text-orange-foreground",
    primary: "bg-primary/15 text-primary",
    success: "bg-success/20 text-success-foreground",
  } as const;
  return <span className={cn("rounded-full px-2.5 py-1 text-xs font-bold", tones[tone])}>{children}</span>;
}

export function XpTag({ xp }: { xp: number }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-xp/30 px-2.5 py-1 text-xs font-black text-orange-foreground">
      +{xp} XP
    </span>
  );
}

export function CTAButton({
  children,
  to,
  onClick,
  variant = "primary",
  className,
  href,
}: {
  children: ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "brand";
  className?: string;
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-black transition-all duration-300 active:scale-95";
  const styles =
    variant === "primary"
      ? "bg-gradient-primary text-primary-foreground shadow-glow hover:brightness-110 hover:-translate-y-0.5"
      : variant === "brand"
        ? "border border-brand-mist/50 bg-brand-night/80 text-brand-light hover:bg-brand-night hover:-translate-y-0.5"
        : "glass text-foreground hover:-translate-y-0.5 hover:shadow-lift";
  const cls = cn(base, styles, className);
  if (href)
    return (
      <a {...externalLinkProps(href)} className={cls}>
        {children}
      </a>
    );
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
}

export function Footer() {
  return (
    <footer className="mt-10 border-t border-border/60 bg-card/50 py-12 backdrop-blur">
      <div className="mx-auto grid w-[min(1180px,92vw)] gap-8 sm:grid-cols-3">
        <div>
          <p className="font-display text-xl">
            <span className="gradient-text">AIVORA</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Your adventure into AI, coding & the future.
          </p>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-black">Explore</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/adventure" className="hover:text-foreground">Adventure Map</Link></li>
            <li><Link to="/ai-tools" className="hover:text-foreground">AI Toolbox</Link></li>
            <li><Link to="/coding" className="hover:text-foreground">Coding Playground</Link></li>
            <li><Link to="/projects" className="hover:text-foreground">Projects</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <p className="mb-2 font-black">Keep going</p>
          <ul className="space-y-1.5 text-muted-foreground">
            <li><Link to="/quests" className="hover:text-foreground">Daily Quests</Link></li>
            <li><Link to="/career" className="hover:text-foreground">Career Zone</Link></li>
            <li><Link to="/community" className="hover:text-foreground">Showcase</Link></li>
            <li><Link to="/dashboard" className="hover:text-foreground">My Progress</Link></li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 w-[min(1180px,92vw)] text-sm font-bold text-muted-foreground">
        You don't need to know everything about technology. You just need to start your adventure. 🚀
      </p>
    </footer>
  );
}
