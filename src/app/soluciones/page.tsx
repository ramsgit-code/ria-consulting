import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
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
        <ul className="flex flex-col gap-4">
          {verticals.map((v) => (
            <li key={v.slug} className="card">
              <div className="flex flex-wrap justify-between gap-2 mb-2">
                <h2 className="font-medium text-foreground">{v.title}</h2>
                <span className="text-xs text-muted">{v.sector}</span>
              </div>
              {v.reference && (
                <p className="text-xs text-muted mb-2">Caso: {v.reference}</p>
              )}
              <p className="text-sm text-foreground-muted mb-2">
                <span className="text-muted">Problema: </span>
                {v.pain}
              </p>
              <p className="text-sm text-foreground-muted">
                <span className="text-muted">Solucion: </span>
                {v.solution}
              </p>
            </li>
          ))}
        </ul>
        <Link href="/servicios" className="inline-block mt-6 text-sm text-accent hover:underline">
          Ver los tres sistemas →
        </Link>
      </PageShell>
      <PageCTA />
    </>
  );
}
