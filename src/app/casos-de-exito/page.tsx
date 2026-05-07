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
      "Hospital Capilar, Eventos Barcelona y más. Resultados concretos con sistemas de lead qualification, proposal automation y WhatsApp + CRM.",
  },
};

const cases = [
  {
    client: "Clinica capilar",
    sector: "Salud · Madrid",
    system: "Lead Qualification System",
    tag: "Lead Qualification",
    before: "2–3 días de espera · 60% de llamadas sin conversion",
    after: "−40% tiempo en llamadas · solo leads precualificados",
    metric: "−40%",
    metricLabel: "tiempo en llamadas iniciales",
    challenge:
      "El equipo de captacion atendia llamadas de personas que claramente no eran candidatos: presupuesto incompatible, expectativas irreales o zona geografica fuera de cobertura. Cada llamada malgastada era tiempo perdido en leads que podrian haber filtrado solos.",
    solution: [
      "Formulario multi-paso en web con logica condicional segun tipo de tratamiento",
      "Lead scoring automatico: presupuesto, urgencia, tratamiento solicitado",
      "Pipeline en Go High Level con etapas especificas para clinica",
      "Email y WhatsApp automaticos segun puntuacion del lead",
      "Notificacion prioritaria al equipo cuando llega lead calificado",
    ],
    result: "El equipo ahora solo habla con leads que ya pasaron el primer filtro automatico.",
  },
  {
    client: "Empresa de eventos",
    sector: "Eventos · Barcelona",
    system: "Proposal Automation System",
    tag: "Proposal Automation",
    before: "1–3 días por propuesta · perdida de clientes ante competidores",
    after: "8 minutos por propuesta · imagen profesional consistente",
    metric: "8 min",
    metricLabel: "de peticion a propuesta enviada",
    challenge:
      "Las peticiones de presupuesto tardaban entre 1 y 3 dias en responderse. En ese tiempo, el potencial cliente ya habia pedido presupuesto a 3 competidores y la decision estaba practicamente tomada.",
    solution: [
      "Formulario de intake de evento: tipo, fecha, aforo, ciudad, presupuesto",
      "Sistema de generacion automatica de propuesta web desde los datos del formulario",
      "Envio inmediato al cliente con pagina de propuesta personalizada",
      "Pipeline de seguimiento: apertura de email, clicks, seguimiento si no hay respuesta",
      "Integracion completa con Go High Level",
    ],
    result: "Propuesta generada en 8 minutos desde que llega la peticion. El cliente la recibe antes de que haya podido contactar a la competencia.",
  },
  {
    client: "Academia de formacion online",
    sector: "Formacion · Internacional",
    system: "WhatsApp + CRM Automation",
    tag: "WhatsApp + CRM",
    before: "Leads sin respuesta en 24h · tasa de respuesta email < 20%",
    after: "0 leads sin respuesta · respuesta WhatsApp en segundos",
    metric: "0",
    metricLabel: "leads sin respuesta en 24h",
    challenge:
      "Muchos interesados llegaban desde anuncios y redes sociales, pero el porcentaje de conversion era muy bajo. La mayoria no respondia emails y se perdia el lead sin que nadie hiciera seguimiento.",
    solution: [
      "Agente automatico de WhatsApp integrado con GHL",
      "Flujo de bienvenida y precualificacion por WhatsApp",
      "Secuencia de nurturing por email 7 dias para los que no respondian",
      "WhatsApp de reactivacion al dia 3 si no habia apertura de email",
      "Pipeline claro: Lead → Nurture → Llamada → Matriculado",
    ],
    result: "Todos los leads reciben respuesta automatica en los primeros 5 minutos. Tasa de respuesta en WhatsApp muy superior al email.",
  },
];

export default function CasosPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-block text-xs font-mono text-accent border border-accent/30 rounded px-2 py-0.5 mb-6">
          Casos reales
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
          Sistemas que estan funcionando hoy.
        </h1>
        <p className="text-foreground-muted text-lg mb-16 max-w-xl">
          Sin mockups, sin demos. Negocios reales con procesos que antes dependian de personas y ahora funcionan solos.
        </p>

        <div className="flex flex-col gap-20">
          {cases.map((c, i) => (
            <div key={i} className="border-t border-border pt-12">

              {/* Header */}
              <div className="flex items-start justify-between mb-6 gap-4 flex-wrap">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{c.client}</h2>
                  <p className="text-sm text-muted mt-0.5">{c.sector}</p>
                </div>
                <span className="text-xs font-mono text-accent border border-accent/30 rounded px-2 py-0.5 shrink-0">
                  {c.tag}
                </span>
              </div>

              {/* Before / After strip */}
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-red-950/20 border border-red-900/30 rounded-xl p-4">
                  <p className="text-xs text-red-400/70 uppercase tracking-wider mb-2">Antes</p>
                  <p className="text-sm text-red-300/80 leading-snug">{c.before}</p>
                </div>
                <div className="bg-emerald-950/20 border border-emerald-900/30 rounded-xl p-4">
                  <p className="text-xs text-emerald-400/70 uppercase tracking-wider mb-2">Ahora</p>
                  <p className="text-sm text-emerald-300/80 leading-snug">{c.after}</p>
                </div>
              </div>

              {/* Metric */}
              <div className="flex items-end gap-3 mb-8">
                <span className="text-6xl font-bold text-accent leading-none">{c.metric}</span>
                <span className="text-sm text-muted mb-2">{c.metricLabel}</span>
              </div>

              {/* Challenge + Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-3">El reto</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{c.challenge}</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-3">La solucion</p>
                  <ul className="flex flex-col gap-2">
                    {c.solution.map((s, j) => (
                      <li key={j} className="flex gap-2 text-sm text-foreground-muted items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 bg-accent/8 border border-accent/20 rounded-lg p-4">
                <p className="text-xs text-muted uppercase tracking-wider mb-1">Resultado</p>
                <p className="text-sm text-accent font-medium">{c.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 bg-surface border border-border rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-3">
            ¿Tu negocio podria ser el proximo caso?
          </h2>
          <p className="text-foreground-muted mb-6 max-w-md mx-auto">
            Empieza por el diagnostico. En 30 minutos te digo que sistema necesitas y si tiene sentido implementarlo.
          </p>
          <Link href="/diagnostico" className="btn-primary">
            Solicita tu diagnostico gratuito →
          </Link>
        </div>
      </div>
    </div>
  );
}
