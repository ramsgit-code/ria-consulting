"use client";

import { m } from "framer-motion";
import { TrendingUp, Clock, Zap, Award } from "lucide-react";

const metrics = [
  { icon: TrendingUp, value: "+60%", label: "Mejora en conversión", sub: "Media de clientes activos" },
  { icon: Clock,      value: "8 min", label: "De llamada a propuesta", sub: "Antes: 2 días" },
  { icon: Zap,        value: "24/7",  label: "Cobertura con Voice AI", sub: "Vapi + Retell" },
  { icon: Award,      value: "3",     label: "Sistemas en producción", sub: "España" },
];

const testimonials = [
  {
    quote: "Antes tardábamos 2 días en enviar una propuesta. Ahora tarda 8 minutos y la recibe el cliente mejor presentada.",
    author: "Director comercial",
    company: "Empresa de eventos · Barcelona",
    initials: "DC",
  },
  {
    quote: "El equipo solo habla con quien tiene intención real de compra. Redujo el ruido en el pipeline al 80%.",
    author: "Gerente comercial",
    company: "Clínica capilar · Madrid",
    initials: "GC",
  },
];

export function SocialProof() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="tag">Resultados</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Números,<br className="hidden sm:block" /> no promesas.
          </h2>
        </m.div>

        {/* Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-16">
          {metrics.map((item, i) => {
            const Icon = item.icon;
            return (
              <m.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="bg-background p-7 md:p-9 flex flex-col"
              >
                <Icon size={16} className="text-accent mb-5 opacity-60" />
                <p className="text-5xl md:text-6xl font-bold text-foreground leading-none mb-3 tracking-tight tabular-nums">
                  {item.value}
                </p>
                <p className="text-sm font-medium text-foreground-muted leading-snug mb-1">{item.label}</p>
                <p className="text-xs text-muted font-mono">{item.sub}</p>
              </m.div>
            );
          })}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-background border border-border rounded-2xl p-8 md:p-10 flex flex-col hover:border-accent/25 transition-colors duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-accent">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <p className="text-foreground leading-relaxed mb-8 text-[15px] md:text-base flex-1 italic">
                "{t.quote}"
              </p>

              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-10 h-10 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-accent font-mono text-xs font-bold shrink-0">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{t.author}</p>
                  <p className="text-xs text-muted">{t.company}</p>
                </div>
              </div>
            </m.div>
          ))}
        </div>
      </div>
    </section>
  );
}
