"use client";

import { m } from "framer-motion";

const problems = [
  "Leads que llegan y no convierten",
  "Seguimiento que depende de que alguien se acuerde",
  "Propuestas que tardan días",
  "CRM que nadie mira",
  "WhatsApp sin sistema ni historial",
  "La competencia responde antes que tú",
];

export function Problems() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:sticky lg:top-32"
          >
            <span className="tag">El problema</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
              Si reconoces alguno de estos,{" "}
              <span className="text-foreground-muted font-normal">necesitas un sistema.</span>
            </h2>
            <p className="text-foreground-muted mt-6 text-lg leading-relaxed max-w-sm">
              No es un problema de equipo. Es un problema de proceso.
            </p>
          </m.div>

          <div className="flex flex-col divide-y divide-border">
            {problems.map((p, i) => (
              <m.div
                key={i}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                className="flex items-center gap-5 py-5 group cursor-default"
              >
                <span className="text-xs font-mono text-muted/40 w-5 shrink-0 tabular-nums">0{i + 1}</span>
                <div className="w-2 h-2 rounded-full bg-red-500/40 group-hover:bg-red-500/80 transition-colors duration-300 shrink-0" />
                <p className="text-foreground-muted group-hover:text-foreground transition-colors duration-300 text-[15px]">{p}</p>
              </m.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
