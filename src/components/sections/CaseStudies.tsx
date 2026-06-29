import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { caseStudies } from "@/lib/site-content";
import { Reveal } from "@/components/Reveal";

export function CaseStudies() {
  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">Resultados</p>
          <h2 className="section-title max-w-2xl">Casos reales, sin mockups.</h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {caseStudies.map((c, i) => (
            <Reveal as="li" key={c.client} delay={i * 0.08}>
              <div className="card group flex h-full flex-col justify-between">
                <span className="inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-foreground-muted">
                  {c.system}
                </span>
                <p className="mt-6 font-display text-xl font-semibold leading-snug text-foreground">
                  {c.result}
                </p>
                <p className="mt-3 text-sm text-foreground-muted">{c.client}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1}>
          <Link
            href="/casos-de-exito"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            Leer casos completos
            <ArrowRight size={15} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
