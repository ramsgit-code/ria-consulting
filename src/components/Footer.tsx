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
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 text-center md:px-10 md:py-14">
          <div className="pointer-events-none absolute left-1/2 top-0 h-40 w-[26rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[100px]" />
          <div className="relative">
            <p className="font-display text-xl font-semibold tracking-tight text-foreground">
              RIA Consulting<span className="text-accent">.</span>
            </p>
            <p className="mx-auto mt-2 max-w-sm text-sm text-foreground-muted">
              {c.footer.tagline}
            </p>
            <Link href="/diagnostico" className="btn-primary mt-6">
              {c.footer.cta}
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          © {year} RIA Consulting · {c.footer.rights}
        </p>
      </div>
    </footer>
  );
}
