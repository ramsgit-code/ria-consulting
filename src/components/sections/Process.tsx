"use client";

import Link from "next/link";
import { m } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    desc: "30 minutos. Analizo tu proceso actual, los puntos de fuga y te digo exactamente qué sistema necesitas.",
  },
  {
    number: "02",
    title: "Diseño del sistema",
    desc: "Mapa del funnel, estructura del CRM, automatizaciones y flujos de comunicación. Todo documentado antes de tocar nada.",
  },
  {
    number: "03",
    title: "Implementación",
    desc: "Construyo y conecto todo: formularios, Go High Level, WhatsApp, emails, propuestas.",
  },
  {
    number: "04",
    title: "Entrega y formación",
    desc: "El sistema funciona desde el primer día. Te explico cómo leer los datos y gestionar el pipeline.",
  },
  {
    number: "05",
    title: "Soporte 30 días",
    desc: "Ajustes incluidos durante el primer mes. Si algo no funciona como debe, lo corrijo.",
  },
];

export function Process() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        >
          <div>
            <span className="tag">Cómo trabajo</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
              Sin sorpresas.<br className="hidden sm:block" /> Sin promesas vagas.
            </h2>
          </div>
          <Link
            href="/diagnostico"
            className="text-sm text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4 shrink-0"
          >
            Empieza por el diagnóstico →
          </Link>
        </m.div>

        <div className="relative">
          {/* Vertical connector */}
          <div className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-accent/30 via-border to-transparent hidden md:block" />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <m.div
                key={step.number}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.09, duration: 0.5 }}
                className="flex gap-6 md:pl-16 relative group"
              >
                <div className="hidden md:flex absolute left-0 w-12 h-12 rounded-full bg-background border border-border group-hover:border-accent/40 items-center justify-center shrink-0 transition-colors duration-200 z-10">
                  <span className="text-xs font-mono text-accent">{step.number}</span>
                </div>
                <div className="bg-background border border-border group-hover:border-border/80 rounded-xl px-6 py-5 flex-1 transition-colors duration-200">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="md:hidden text-xs font-mono text-accent bg-accent/10 rounded px-1.5 py-0.5">{step.number}</span>
                    <h3 className="font-semibold text-foreground tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-sm text-foreground-muted leading-relaxed max-w-lg">{step.desc}</p>
                </div>
              </m.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
