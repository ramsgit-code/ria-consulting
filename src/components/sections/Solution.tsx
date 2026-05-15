"use client";

import { m } from "framer-motion";

const flow = [
  { step: "01", label: "Lead entra", desc: "Desde web, WhatsApp o cualquier canal configurado.", icon: "↓" },
  { step: "02", label: "Se cualifica solo", desc: "Score automático: presupuesto, urgencia, intención.", icon: "⚡" },
  { step: "03", label: "Respuesta inmediata", desc: "Email + WhatsApp personalizados en segundos.", icon: "✉" },
  { step: "04", label: "Tu equipo actúa", desc: "Solo con leads que ya pasaron el primer filtro.", icon: "→" },
];

export function Solution() {
  return (
    <section>
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag">La solución</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-5 text-foreground leading-tight tracking-tight">
              Un sistema,<br /> no una herramienta.
            </h2>
            <p className="text-lg text-foreground-muted leading-relaxed max-w-md">
              Diseño el proceso completo: captación, cualificación automática, propuesta y seguimiento.
              Sin que tengas que perseguir a nadie.
            </p>
          </m.div>

          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative"
          >
            {/* Vertical connector line */}
            <div className="absolute left-[21px] top-10 bottom-10 w-px bg-gradient-to-b from-accent/40 via-accent/15 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-1">
              {flow.map((f, i) => (
                <m.div
                  key={f.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex items-start gap-5 py-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-background border border-border group-hover:border-accent/40 flex items-center justify-center text-accent font-mono text-base shrink-0 z-10 transition-colors duration-200">
                    {f.icon}
                  </div>
                  <div className="pt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono text-accent/50">{f.step}</span>
                      <h3 className="font-semibold text-foreground tracking-tight">{f.label}</h3>
                    </div>
                    <p className="text-sm text-muted leading-relaxed">{f.desc}</p>
                  </div>
                </m.div>
              ))}
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
