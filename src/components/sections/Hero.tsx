"use client";

import Link from "next/link";
import { ArrowRight, Bot, LayoutGrid, Workflow, FileText } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { LOGOS } from "@/lib/content";
import { Reveal } from "@/components/Reveal";

const clientLogos = [
  { src: LOGOS.hospitalCapilar, alt: "Hospital Capilar", h: "h-9" },
  { src: LOGOS.eventosBarcelona, alt: "EB Eventos Barcelona", h: "h-9" },
  { src: LOGOS.growth4u, alt: "Growth4U", h: "h-5" },
];

const offeringIcons = [Bot, LayoutGrid, Workflow, FileText];

export function Hero() {
  const { c } = useLang();
  const h = c.hero;

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 md:pt-44 md:pb-20">
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />

      <div className="section-wide relative !py-0">
        <Reveal>
          <h1 className="max-w-3xl text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl sm:leading-[1.05] md:text-7xl">
            {h.titlePre}
            <span className="gradient-text">{h.titleHighlight}</span>
            {h.titlePost}
          </h1>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-foreground-muted">
            {h.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link href="/diagnostico" className="btn-primary">
              {h.ctaPrimary}
              <ArrowRight size={16} />
            </Link>
            <Link href="/servicios" className="btn-secondary">
              {h.ctaSecondary}
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted">{h.note}</p>
        </Reveal>

        {/* clientes */}
        <Reveal delay={0.15}>
          <div className="mt-14 border-t border-white/[0.08] pt-8">
            <p className="mb-5 text-xs uppercase tracking-wider text-muted">
              {h.logosLabel}
            </p>
            <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
              {clientLogos.map((logo) => (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className={`${logo.h} w-auto object-contain opacity-60 transition-opacity duration-300 hover:opacity-100`}
                  loading="lazy"
                />
              ))}
            </div>
          </div>
        </Reveal>

        {/* qué construyo — bento visual */}
        <Reveal delay={0.18}>
          <div className="mt-16">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {h.offeringTitle}
            </h2>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
              {h.offering.map((o, i) => {
                const Icon = offeringIcons[i % offeringIcons.length];
                return (
                  <div
                    key={o}
                    className="card group relative overflow-hidden !p-5 transition-transform duration-300 sm:!p-6 sm:hover:-translate-y-1"
                  >
                    <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/25 bg-accent/[0.08] text-accent transition-colors group-hover:border-accent/50">
                      <Icon size={22} />
                    </div>
                    <p className="text-[15px] font-medium leading-snug text-foreground">
                      {o}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Reveal>

        {/* métricas */}
        <Reveal delay={0.22}>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {c.metrics.map((s) => (
              <div
                key={s.label}
                className="card !p-5 transition-transform duration-300 sm:hover:-translate-y-1"
              >
                <p className="font-display text-3xl font-semibold tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
