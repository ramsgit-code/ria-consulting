"use client";

import { m } from "framer-motion";

const flow = [
  {
    step: "01",
    label: "Lead entra",
    detail: "Formulario multi-paso en web o WhatsApp. Datos al CRM en tiempo real.",
    icon: "↓",
  },
  {
    step: "02",
    label: "Se cualifica solo",
    detail: "Score automatico segun presupuesto, urgencia y sector. Sin que nadie lo revise.",
    icon: "⚡",
  },
  {
    step: "03",
    label: "Respuesta inmediata",
    detail: "Email + WhatsApp automaticos en segundos. El lead no espera, no se enfria.",
    icon: "✉",
  },
  {
    step: "04",
    label: "Tu equipo actua",
    detail: "Solo reciben notificacion cuando el lead es bueno. Sin ruido, sin tiempo perdido.",
    icon: "→",
  },
];

export function Solution() {
  return (
    <section>
      <div className="section">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — texto */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="tag">La solucion</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
              Un sistema, no una herramienta.
            </h2>
            <p className="text-lg text-foreground-muted leading-relaxed mb-4">
              No instalo software y desaparezco. Diseno el proceso completo: como llega el lead,
              como se cualifica automaticamente, como recibe la propuesta y como se hace el
              seguimiento sin que tengas que perseguir a nadie.
            </p>
            <p className="text-lg text-foreground-muted leading-relaxed">
              Todo automatizado. Todo medible. Todo tuyo.
            </p>
          </m.div>

          {/* Right — flow */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="relative"
          >
            {/* Vertical connector */}
            <div className="absolute left-[22px] top-10 bottom-10 w-px bg-gradient-to-b from-accent/30 via-accent/10 to-transparent hidden sm:block" />

            <div className="flex flex-col gap-4">
              {flow.map((f, i) => (
                <m.div
                  key={f.step}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-11 h-11 rounded-full bg-background border border-accent/30 flex items-center justify-center text-accent font-mono text-base z-10">
                      {f.icon}
                    </div>
                  </div>
                  <div className="pb-4 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono text-accent/60">{f.step}</span>
                      <h3 className="font-semibold text-foreground">{f.label}</h3>
                    </div>
                    <p className="text-sm text-foreground-muted leading-relaxed">{f.detail}</p>
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
