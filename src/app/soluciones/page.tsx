import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { Reveal } from "@/components/Reveal";
import { verticals } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Soluciones por sector",
  description:
    "Sistemas de automatizacion para clinicas, eventos, formacion y servicios profesionales en Go High Level.",
};

export default function SolucionesPage() {
  return (
    <>
      <PageShell
        tag="Soluciones"
        title="Adaptado a tu sector"
        description="El mismo enfoque en Go High Level, ajustado al ciclo de venta de cada negocio."
        wide
      >
        <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {verticals.map((v, i) => (
            <li key={v.slug}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="card flex h-full flex-col">
                  <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
                    <h2 className="font-display text-lg font-semibold text-foreground">
                      {v.title}
                    </h2>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-xs text-foreground-muted">
                      {v.sector}
                    </span>
                  </div>
                  {v.reference && (
                    <p className="mb-3 text-xs text-muted">Caso: {v.reference}</p>
                  )}
                  <p className="mb-2 text-sm leading-relaxed text-foreground-muted">
                    <span className="text-muted">Problema: </span>
                    {v.pain}
                  </p>
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    <span className="text-muted">Solucion: </span>
                    {v.solution}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
        <Link
          href="/servicios"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
        >
          Ver los tres sistemas
          <ArrowRight size={15} />
        </Link>
      </PageShell>
      <PageCTA />
    </>
  );
}
