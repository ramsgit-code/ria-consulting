import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Casos Reales — Automatización Comercial Implementada",
  description:
    "Sistemas de captación y automatización implementados en clínicas, empresas de eventos y academias. Resultados medibles: −40% tiempo en llamadas, propuestas en 8 minutos, 0 leads sin respuesta.",
  alternates: { canonical: "https://ramiroperez.com/casos-de-exito" },
  openGraph: {
    title: "Casos Reales — Resultados de Automatización Comercial",
    description:
      "Resultados concretos con sistemas de lead qualification, proposal automation y WhatsApp + CRM.",
    images: [{ url: "/og?title=Casos+Reales&tag=Resultados+reales" }],
  },
};

const cases = [
  {
    id: "clinica-capilar",
    client: "Clínica Capilar",
    sector: "Salud · Madrid",
    system: "Lead Qualification System",
    tag: "Sistema A",
    metric: "−40%",
    metricLabel: "tiempo en llamadas iniciales",
    before: "2–3 días de espera · 60% de llamadas sin conversión",
    after: "−40% tiempo · solo leads precualificados",
    challenge:
      "El equipo atendía llamadas de personas que claramente no eran candidatos: presupuesto incompatible, expectativas irreales o zona fuera de cobertura. Tiempo perdido que no era recuperable.",
    solution: [
      "Formulario multi-paso con lógica condicional por tratamiento",
      "Lead scoring: presupuesto, urgencia, tratamiento solicitado",
      "Pipeline en Go High Level con etapas específicas para clínica",
      "Email y WhatsApp automáticos según puntuación del lead",
      "Notificación prioritaria al equipo por cada lead calificado",
    ],
    result: "El equipo solo habla con leads que ya pasaron el primer filtro automático.",
    serviceHref: "/servicios#lead-qualification-system",
    solucionHref: "/soluciones#clinicas-hospitales",
  },
  {
    id: "eventos-barcelona",
    client: "Empresa de Eventos",
    sector: "Eventos · Barcelona",
    system: "Proposal Automation System",
    tag: "Sistema B",
    metric: "8 min",
    metricLabel: "de petición a propuesta enviada",
    before: "1–3 días por propuesta · pérdida de clientes ante competidores",
    after: "8 minutos por propuesta · imagen profesional consistente",
    challenge:
      "Las peticiones de presupuesto tardaban entre 1 y 3 días. En ese tiempo, el potencial cliente ya había pedido precio a 3 competidores y la decisión estaba prácticamente tomada.",
    solution: [
      "Formulario de intake: tipo de evento, fecha, aforo, ciudad, presupuesto",
      "Generación automática de propuesta web desde los datos del formulario",
      "Envío inmediato al cliente con propuesta personalizada",
      "Pipeline de seguimiento: apertura, clics, seguimiento si no hay respuesta",
      "Integración completa con Go High Level",
    ],
    result: "Propuesta lista en 8 minutos desde que llega la petición. El cliente la recibe antes de contactar a la competencia.",
    serviceHref: "/servicios#proposal-automation",
    solucionHref: "/soluciones#empresas-eventos",
  },
  {
    id: "academia-online",
    client: "Academia Online",
    sector: "Formación · Internacional",
    system: "WhatsApp + CRM Automation",
    tag: "Sistema C",
    metric: "0",
    metricLabel: "leads sin respuesta en 24h",
    before: "Leads sin respuesta en 24h · tasa de respuesta email < 20%",
    after: "0 leads sin respuesta · respuesta WhatsApp en segundos",
    challenge:
      "Muchos interesados llegaban desde anuncios y redes, pero el porcentaje de conversión era muy bajo. La mayoría no respondía emails y el lead se perdía sin que nadie hiciera seguimiento.",
    solution: [
      "Agente automático de WhatsApp integrado con GHL",
      "Flujo de bienvenida y precualificación por WhatsApp",
      "Secuencia de nurturing por email durante 7 días",
      "WhatsApp de reactivación al día 3 si no había apertura de email",
      "Pipeline claro: Lead → Nurture → Llamada → Matriculado",
    ],
    result: "Todos los leads reciben respuesta automática en los primeros 5 minutos. Tasa de respuesta en WhatsApp muy superior al email.",
    serviceHref: "/servicios#whatsapp-crm-automation",
    solucionHref: "/soluciones#formacion-cursos",
  },
];

export default function CasosPage() {
  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Casos reales</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 tracking-tight">
            Sistemas que están<br className="hidden md:block" /> funcionando hoy.
          </h1>
          <p className="text-foreground-muted text-lg max-w-xl leading-relaxed">
            Sin mockups, sin demos. Negocios reales con procesos que antes dependían de personas y ahora funcionan solos.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-24">
          {cases.map((c) => (
            <div key={c.id} id={c.id} className="scroll-mt-24">

              {/* Header */}
              <div className="flex items-start justify-between mb-6 gap-4 flex-wrap pb-6 border-b border-border">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="tag">{c.tag}</span>
                    <span className="text-xs text-muted font-mono">{c.system}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{c.client}</h2>
                  <p className="text-sm text-muted mt-1">{c.sector}</p>
                </div>
                <div className="text-right">
                  <p className="text-5xl font-bold text-accent leading-none tabular-nums">{c.metric}</p>
                  <p className="text-xs text-muted mt-1">{c.metricLabel}</p>
                </div>
              </div>

              {/* Before / After */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4">
                  <p className="text-[10px] text-red-400/70 uppercase tracking-widest font-mono mb-2">Antes</p>
                  <p className="text-sm text-red-300/80 leading-snug">{c.before}</p>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4">
                  <p className="text-[10px] text-emerald-400/70 uppercase tracking-widest font-mono mb-2">Ahora</p>
                  <p className="text-sm text-emerald-300/80 leading-snug">{c.after}</p>
                </div>
              </div>

              {/* Challenge + Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">El reto</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{c.challenge}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">La solución</p>
                  <ul className="flex flex-col gap-2.5">
                    {c.solution.map((s, j) => (
                      <li key={j} className="flex gap-2.5 text-sm text-foreground-muted items-start">
                        <span className="text-accent mt-0.5 shrink-0 font-mono">→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result + cross-links */}
              <div className="bg-accent/5 border border-accent/20 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-1">Resultado</p>
                  <p className="text-sm text-accent font-medium leading-snug">{c.result}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link href={c.solucionHref} className="text-xs text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4">
                    Ver solución para este sector →
                  </Link>
                  <Link href={c.serviceHref} className="btn-secondary text-xs py-2">
                    Ver sistema en detalle →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 bg-surface border border-border rounded-2xl p-10 md:p-14 text-center">
          <span className="tag mb-4 inline-block">¿El tuyo también?</span>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            Tu negocio podría ser el próximo.
          </h2>
          <p className="text-foreground-muted mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Empieza por el diagnóstico. En 30 minutos te digo qué sistema necesitas y si tiene sentido implementarlo.
          </p>
          <Link href="/diagnostico" className="btn-primary text-base px-8 py-3.5">
            Solicita tu diagnóstico gratuito →
          </Link>
        </div>
      </div>
    </>
  );
}
