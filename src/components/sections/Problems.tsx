"use client";

import { m } from "framer-motion";

const problems = [
  {
    title: "Leads que llegan y no convierten",
    desc: "No sabes cuales son buenos hasta que ya perdiste 30 minutos al telefono con alguien que no iba a comprar.",
  },
  {
    title: "Seguimiento que depende de que alguien se acuerde",
    desc: "Tu equipo hace seguimiento cuando puede y como puede. Los leads buenos se enfrian mientras gestionas los malos.",
  },
  {
    title: "Propuestas que tardan dias",
    desc: "Cuando la envias, el cliente ya tiene precio de tres competidores y la decision esta practicamente tomada.",
  },
  {
    title: "CRM que nadie mira",
    desc: "Esta configurado pero desactualizado. Nadie sabe en que etapa esta cada oportunidad real.",
  },
  {
    title: "WhatsApp sin sistema ni historial",
    desc: "Mensajes en el movil de cada comercial. Sin historial centralizado, sin seguimiento estructurado.",
  },
  {
    title: "La competencia responde antes que tu",
    desc: "En B2B y servicios, quien llega primero tiene ventaja real. Sin automatizacion, siempre vas tarde.",
  },
];

export function Problems() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="tag">El problema</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground max-w-xl leading-tight">
            Si reconoces alguno de estos, necesitas un sistema.
          </h2>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {problems.map((p, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.4 }}
              className="bg-background border border-border rounded-xl p-5 flex flex-col gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="text-red-400/80 text-base leading-none mt-0.5 shrink-0">✕</span>
                <p className="text-sm font-semibold text-foreground leading-snug">{p.title}</p>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed pl-6">{p.desc}</p>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
