import { DiagnosticForm } from "@/components/DiagnosticForm";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Diagnóstico Gratuito de Automatización Comercial",
  description:
    "Sesión gratuita de 30 minutos. Analizo tu proceso comercial y te digo exactamente qué sistema necesitas para dejar de perder leads.",
  alternates: { canonical: "https://ramiroperez.com/diagnostico" },
  openGraph: {
    title: "Diagnóstico Gratuito — Automatización Comercial",
    description:
      "30 minutos para saber exactamente qué sistema necesitas. Sin compromiso ni pitch agresivo.",
    images: [{ url: "/og?title=Diagn%C3%B3stico+Gratuito&tag=30+min+%C2%B7+Sin+compromiso" }],
  },
};

const steps = [
  { num: "01", label: "Rellenas el formulario", sub: "5 minutos · sin datos sensibles" },
  { num: "02", label: "Lo reviso antes de la llamada", sub: "Análisis real de tu proceso" },
  { num: "03", label: "30 minutos, sin humo", sub: "Recomendación concreta + siguiente paso" },
];

export default function DiagnosticoPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — pitch */}
          <div className="lg:sticky lg:top-32">
            <span className="tag">Diagnóstico gratuito</span>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-5 tracking-tight">
              30 minutos para saber exactamente qué necesitas.
            </h1>
            <p className="text-foreground-muted leading-relaxed mb-10 text-sm">
              Rellena el formulario. Lo reviso antes de la llamada y te presento un análisis
              concreto de tu proceso actual con los puntos de mejora identificados.
            </p>

            {/* Process mini-timeline */}
            <div className="flex flex-col gap-4 mb-10">
              {steps.map((s, i) => (
                <div key={s.num} className="flex items-start gap-4">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-9 h-9 rounded-full bg-surface border border-accent/30 flex items-center justify-center text-accent font-mono text-xs font-semibold">
                      {s.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-4 bg-border mt-1" />
                    )}
                  </div>
                  <div className="pb-1">
                    <p className="text-sm font-medium text-foreground">{s.label}</p>
                    <p className="text-xs text-muted mt-0.5">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof nudge */}
            <div className="bg-surface border border-border rounded-xl p-5 mb-8">
              <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">Para quién es esto</p>
              <ul className="flex flex-col gap-2">
                {[
                  "Negocios con 10+ leads al mes",
                  "Proceso comercial con fricción o tiempo perdido",
                  "Quieres vender más sin contratar más",
                ].map((item) => (
                  <li key={item} className="flex gap-2.5 text-sm text-foreground-muted items-start">
                    <span className="text-accent mt-0.5 shrink-0">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cross-links */}
            <div className="flex flex-wrap gap-3">
              <Link href="/casos-de-exito" className="text-xs text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4">
                Ver casos reales →
              </Link>
              <Link href="/servicios" className="text-xs text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4">
                Ver servicios →
              </Link>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-surface border border-border rounded-2xl p-8">
            <DiagnosticForm />
          </div>
        </div>
      </div>
    </div>
  );
}
