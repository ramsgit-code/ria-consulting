"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";

export function Footer() {
  const { c } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-16 border-t border-white/[0.08]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 md:px-10 md:py-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
          <div className="relative flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-sm">
              <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                RIA Consulting<span className="text-accent">.</span>
              </p>
              <p className="mt-2 text-sm text-foreground-muted">{c.footer.tagline}</p>
              <Link href="/diagnostico" className="btn-primary mt-5">
                {c.footer.cta}
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              {c.footer.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={
                    l.href === "/diagnostico"
                      ? "text-accent transition-colors hover:text-accent-hover"
                      : "text-foreground-muted transition-colors hover:text-foreground"
                  }
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          © {year} RIA Consulting · {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}
