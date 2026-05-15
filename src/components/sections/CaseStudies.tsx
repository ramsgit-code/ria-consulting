"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { Phone, ArrowRight } from "lucide-react";
import { LogoHospitalCapilar } from "@/components/logos/LogoHospitalCapilar";
import { LogoEventosBarcelona } from "@/components/logos/LogoEventosBarcelona";

const cases = [
  {
    Logo: LogoHospitalCapilar,
    label: null,
    sector: "Salud · Madrid",
    tag: "Lead Qualification",
    metric: "−40%",
    metricLabel: "tiempo en llamadas",
    result: "Solo hablan con leads que ya tienen intención real de compra.",
    href: "/casos-de-exito#clinica-capilar",
  },
  {
    Logo: LogoEventosBarcelona,
    label: null,
    sector: "Eventos · Barcelona",
    tag: "Proposal Automation",
    metric: "8 min",
    metricLabel: "por propuesta",
    result: "De 3 días a 8 minutos. El cliente recibe precio antes que la competencia.",
    href: "/casos-de-exito#eventos-barcelona",
  },
  {
    Logo: null,
    label: "Voice AI",
    sector: "Vapi + Retell",
    tag: "Voice AI Agents",
    metric: "24/7",
    metricLabel: "cobertura comercial",
    result: "Agentes de voz IA que califican y agendan llamadas sin intervención humana.",
    href: "/casos-de-exito",
  },
];

export function CaseStudies() {
  return (
    <section>
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <span className="tag">Casos reales</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Sistemas que ya están<br className="hidden md:block" /> funcionando.
            </h2>
          </div>
          <Link
            href="/casos-de-exito"
            className="text-sm text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4 shrink-0"
          >
            Ver todos los casos →
          </Link>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cases.map(({ Logo, label, sector, tag, metric, metricLabel, result, href }, i) => (
            <m.div
              key={tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card group hover:border-accent/30 hover:shadow-[0_0_40px_rgba(232,255,0,0.04)] transition-all duration-300 flex flex-col gap-6"
            >
              {/* Logo / label */}
              <div className="h-8 flex items-center justify-between">
                {Logo ? (
                  <Logo className="h-5 w-auto text-foreground-muted opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                ) : (
                  <div className="flex items-center gap-2 text-foreground-muted opacity-60 group-hover:opacity-90 transition-opacity duration-300">
                    <Phone size={16} />
                    <span className="text-sm font-semibold tracking-tight">{label}</span>
                  </div>
                )}
                <span className="text-[10px] text-muted font-mono">{sector}</span>
              </div>

              {/* Metric — HUGE */}
              <div className="py-2">
                <p className="text-7xl font-bold text-foreground tracking-tight leading-none tabular-nums">
                  {metric}
                </p>
                <p className="text-sm text-muted mt-2 font-mono">{metricLabel}</p>
              </div>

              {/* Result */}
              <p className="text-sm text-foreground-muted leading-relaxed flex-1">
                {result}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="text-[10px] font-mono text-accent/70 border border-accent/20 rounded px-2 py-1">
                  {tag}
                </span>
                <Link
                  href={href}
                  className="text-xs text-foreground-muted hover:text-accent transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                >
                  Ver caso <ArrowRight size={12} />
                </Link>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
