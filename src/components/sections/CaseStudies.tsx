"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function CaseStudies() {
  const { c } = useLang();

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{c.cases.tag}</p>
          <h2 className="section-title max-w-2xl">{c.cases.title}</h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {c.cases.items.map((item, i) => (
            <Reveal as="li" key={item.client} delay={i * 0.08}>
              <div className="card group flex h-full flex-col">
                <div className="flex h-9 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.logo}
                    alt={item.client}
                    className="h-7 w-auto max-w-[150px] object-contain opacity-80"
                    loading="lazy"
                  />
                </div>
                <p className="mt-6 font-display text-4xl font-semibold tracking-tight text-accent">
                  {item.metric}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {item.metricLabel}
                </p>
                <p className="mt-4 border-t border-white/[0.08] pt-4 text-sm text-foreground-muted">
                  {item.solution}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <Link
            href="/casos-de-exito"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            {c.cases.cta}
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
