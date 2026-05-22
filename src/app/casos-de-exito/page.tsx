import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { TransformationShowcase } from "@/components/sections/TransformationShowcase";

export const metadata: Metadata = {
  title: "Casos reales",
  description: "Sistemas implementados en negocios reales con Go High Level.",
};

const cases = [
  {
    client: "Clinica capilar",
    sector: "Salud · Madrid",
    challenge: "Llamadas a candidatos sin criterio previo.",
    solution: "Formulario, scoring y pipeline en Go High Level.",
    result: "40% menos tiempo en llamadas iniciales.",
    tag: "Lead Qualification",
  },
  {
    client: "Empresa de eventos",
    sector: "Eventos · Barcelona",
    challenge: "Propuestas que tardaban 1-3 dias.",
    solution: "Intake + propuesta automatica en GHL.",
    result: "Propuesta lista en 8 minutos.",
    tag: "Proposal Automation",
  },
  {
    client: "Academia online",
    sector: "Formacion",
    challenge: "Leads sin seguimiento en email y WhatsApp.",
    solution: "Agente WhatsApp + nurturing en Go High Level.",
    result: "0 leads sin respuesta en 24h.",
    tag: "WhatsApp + CRM",
  },
];

export default function CasosPage() {
  return (
    <>
      <PageShell
        tag="Casos reales"
        title="Sistemas que funcionan hoy"
        description="Negocios reales. Go High Level como base de cada implementacion."
        wide
      >
        <ul className="flex flex-col gap-4">
          {cases.map((c) => (
            <li key={c.client} className="card">
              <div className="flex flex-wrap justify-between gap-2 mb-3">
                <div>
                  <h2 className="font-medium text-foreground">{c.client}</h2>
                  <p className="text-xs text-muted">{c.sector}</p>
                </div>
                <span className="text-xs text-accent">{c.tag}</span>
              </div>
              <p className="text-sm text-foreground-muted mb-2">{c.challenge}</p>
              <p className="text-sm text-foreground-muted mb-2">{c.solution}</p>
              <p className="text-sm text-accent font-medium">{c.result}</p>
            </li>
          ))}
        </ul>
        <Link href="#transformaciones" className="inline-block mt-6 text-sm text-accent hover:underline">
          Ver videos antes / despues →
        </Link>
      </PageShell>

      <TransformationShowcase />
      <PageCTA />
    </>
  );
}
