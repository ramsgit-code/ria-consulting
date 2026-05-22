import Link from "next/link";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { services } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Lead Qualification, Proposal Automation y WhatsApp + CRM en Go High Level.",
};

export default function ServiciosPage() {
  return (
    <>
      <PageShell
        tag="Servicios"
        title="Tres sistemas en Go High Level"
        description="Cada uno resuelve una parte del proceso comercial. Se pueden implementar juntos o por separado."
      >
        <ul className="flex flex-col gap-8">
          {services.map((s) => (
            <li key={s.slug} id={s.slug} className="card scroll-mt-24">
              <h2 className="font-medium text-foreground text-lg mb-1">{s.title}</h2>
              <p className="text-sm text-accent mb-4">{s.tagline}</p>
              <p className="text-sm text-foreground-muted mb-3">
                <span className="text-muted">Problema: </span>
                {s.problem}
              </p>
              <p className="text-sm text-foreground-muted mb-4">
                <span className="text-muted">Para quien: </span>
                {s.forWho}
              </p>
              <ul className="flex flex-col gap-1.5 mb-4">
                {s.deliverables.map((d) => (
                  <li key={d} className="text-sm text-foreground-muted">
                    → {d}
                  </li>
                ))}
              </ul>
              <Link href="/diagnostico" className="text-sm text-accent hover:underline">
                Solicitar diagnostico →
              </Link>
            </li>
          ))}
        </ul>
      </PageShell>
      <PageCTA />
    </>
  );
}
