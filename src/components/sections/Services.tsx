"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight, Filter, FileText, MessageSquare, Phone } from "lucide-react";

const services = [
  {
    icon: Filter,
    tag: "Sistema A",
    num: "01",
    title: "Lead Qualification",
    desc: "Filtra automáticamente quién vale tu tiempo antes de que hables con ellos.",
    href: "/servicios#lead-qualification-system",
    result: "−40%",
    resultLabel: "tiempo en llamadas",
  },
  {
    icon: FileText,
    tag: "Sistema B",
    num: "02",
    title: "Proposal Automation",
    desc: "Propuestas profesionales listas en minutos, no en días. El cliente las recibe antes que la competencia.",
    href: "/servicios#proposal-automation",
    result: "8 min",
    resultLabel: "por propuesta",
  },
  {
    icon: MessageSquare,
    tag: "Sistema C",
    num: "03",
    title: "WhatsApp + CRM",
    desc: "Seguimiento automático que no suena a robot, integrado con Go High Level.",
    href: "/servicios#whatsapp-crm-automation",
    result: "0",
    resultLabel: "leads sin respuesta",
  },
  {
    icon: Phone,
    tag: "Sistema D",
    num: "04",
    title: "Voice AI Agents",
    desc: "Agentes de voz con Vapi y Retell que califican, agendan y atienden 24/7.",
    href: "/servicios#voice-ai-agents",
    result: "24/7",
    resultLabel: "cobertura comercial",
  },
];

export function Services() {
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
          <span className="tag">Servicios</span>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight">
            Cuatro sistemas.<br className="hidden sm:block" /> Un objetivo.
          </h2>
          <p className="text-foreground-muted mt-4 leading-relaxed">
            Cada sistema resuelve una parte del proceso comercial. Pueden implementarse juntos o por separado.
          </p>
        </m.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <m.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="card group hover:border-accent/40 hover:shadow-[0_0_40px_rgba(232,255,0,0.04)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Faded background number */}
                <div className="absolute -top-2 right-4 text-8xl font-bold text-white/[0.025] font-mono leading-none select-none pointer-events-none">
                  {s.num}
                </div>

                <div className="flex items-start gap-3 mb-5 relative">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/15 transition-colors">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <div>
                    <p className="text-[10px] text-muted font-mono mb-0.5 tracking-widest uppercase">{s.tag}</p>
                    <h3 className="font-bold text-foreground text-xl tracking-tight">{s.title}</h3>
                  </div>
                </div>

                <p className="text-sm text-foreground-muted leading-relaxed mb-8 relative">{s.desc}</p>

                <div className="flex items-end justify-between pt-5 border-t border-border relative">
                  <div>
                    <p className="text-3xl font-bold text-accent leading-none tracking-tight tabular-nums">{s.result}</p>
                    <p className="text-xs text-muted mt-1.5 font-mono">{s.resultLabel}</p>
                  </div>
                  <Link
                    href={s.href}
                    className="text-sm text-foreground-muted flex items-center gap-1.5 group-hover:text-accent group-hover:gap-2.5 transition-all duration-200"
                  >
                    Ver más <ArrowRight size={14} />
                  </Link>
                </div>
              </m.div>
            );
          })}
        </div>

        <m.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mt-10 text-center"
        >
          <Link href="/servicios" className="text-sm text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4">
            Ver todos los servicios en detalle →
          </Link>
        </m.div>
      </div>
    </section>
  );
}
