import { DiagnosticForm } from "@/components/DiagnosticForm";
import type { Metadata } from "next";
import { Check } from "lucide-react";
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
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
        <ul className="flex flex-col gap-4">
          {bullets.map((item) => (
            <li
              key={item}
              className="flex items-start gap-3 text-sm text-foreground-muted"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                <Check size={12} />
              </span>
              {item}
            </li>
          ))}
        </ul>
        <div className="card lg:sticky lg:top-24">
          <DiagnosticForm />
        </div>
      </div>
    </PageShell>
  );
}
