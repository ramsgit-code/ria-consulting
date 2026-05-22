import { DiagnosticForm } from "@/components/DiagnosticForm";
import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Diagnostico gratuito",
  description:
    "Diagnostico de 30 minutos. Analizo tu proceso comercial y te digo que sistema en Go High Level necesitas.",
};

const bullets = [
  "Sin compromiso ni pitch agresivo",
  "Analisis de tu proceso actual",
  "Recomendacion concreta de sistema",
  "Para negocios con 10+ leads/mes",
];

export default function DiagnosticoPage() {
  return (
    <PageShell
      tag="Diagnostico gratuito"
      title="30 minutos para saber que necesitas"
      description="Rellena el formulario. Lo reviso antes de la llamada."
      wide
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        <ul className="flex flex-col gap-2">
          {bullets.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-foreground-muted">
              <span className="text-accent">✓</span>
              {item}
            </li>
          ))}
        </ul>
        <div className="card lg:sticky lg:top-20">
          <DiagnosticForm />
        </div>
      </div>
    </PageShell>
  );
}
