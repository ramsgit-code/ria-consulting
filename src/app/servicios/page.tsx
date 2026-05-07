import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Automatización Comercial",
  description:
    "Lead Qualification System, Proposal Automation y WhatsApp + CRM Automation con Go High Level. Tres sistemas para convertir más leads sin procesos manuales.",
  alternates: { canonical: "https://ramiroperez.com/servicios" },
  openGraph: {
    title: "Servicios — Automatización Comercial con Go High Level",
    description:
      "Tres sistemas para automatizar captación, propuestas y seguimiento de leads. Implementado en clínicas, empresas de eventos y academias.",
  },
};

const services = [
  {
    slug: "lead-qualification-system",
    tag: "Sistema A",
    title: "Lead Qualification System",
    tagline: "Filtra automáticamente quién vale tu tiempo.",
    timeline: "2–3 semanas",
    forWho: "Clínicas, academias, consultoras, agencias. Cualquier negocio con 10+ leads/mes.",
    problem:
      "Recibes leads pero no sabes cuáles son buenos hasta que pierdes tiempo hablando con ellos. El equipo hace seguimiento manual y aun así los leads se enfrían sin convertir.",
    deliverables: [
      "Formulario de precualificación multi-paso",
      "Sistema de scoring automático (cold / warm / hot / premium)",
      "Pipeline configurado en Go High Level",
      "Tags automáticos según respuestas del lead",
      "Automatización de primer contacto (email + WhatsApp)",
      "Dashboard de seguimiento y reporte",
    ],
    benefits: [
      "Solo hablas con leads que cumplen tu criterio mínimo",
      "Ningún lead se queda sin respuesta en las primeras 24h",
      "Sabes exactamente en qué etapa está cada oportunidad",
      "El sistema trabaja sin supervisión constante",
    ],
    result: "−40% tiempo en llamadas que no convierten",
  },
  {
    slug: "proposal-automation",
    tag: "Sistema B",
    title: "Proposal Automation System",
    tagline: "Propuestas en minutos, no en días.",
    timeline: "3–4 semanas",
    forWho: "Agencias, freelances, empresas de servicios. Cualquiera que envíe más de 5 propuestas al mes.",
    problem:
      "Crear propuestas a mano es lento, inconsistente y hace que pierdas momentum con el cliente. Para cuando la envías, ya está frío o ya eligió a la competencia.",
    deliverables: [
      "Formulario interno de intake post-llamada",
      "Propuesta web dinámica generada automáticamente",
      "PDF descargable con branding profesional",
      "Automatización de envío con seguimiento integrado",
      "Pipeline de estado de propuesta en GHL",
      "Recordatorios automáticos si no hay respuesta",
    ],
    benefits: [
      "Propuesta lista en menos de 10 minutos",
      "Imagen profesional consistente en cada envío",
      "Seguimiento automático sin perseguir al cliente",
      "Mides exactamente cuántas propuestas se convierten",
    ],
    result: "De 1–3 días a 8 minutos por propuesta",
  },
  {
    slug: "whatsapp-crm-automation",
    tag: "Sistema C",
    title: "WhatsApp + CRM Automation",
    tagline: "Seguimiento automático que no suena a robot.",
    timeline: "2–3 semanas",
    forWho: "Clínicas, formación, eventos, retail premium. Negocios donde WhatsApp es canal principal de captación.",
    problem:
      "WhatsApp es tu canal principal pero es un caos: mensajes sin respuesta, sin historial, sin sistema. Leads que llegan y nadie atiende, o que se atienden de forma inconsistente.",
    deliverables: [
      "Agente automático de WhatsApp integrado con GHL",
      "Flujo de bienvenida y precualificación",
      "Secuencias de nurturing por WhatsApp y email",
      "Notificaciones al equipo por leads calificados",
      "Historial completo de conversación en CRM",
      "Reportes de conversión por canal",
    ],
    benefits: [
      "Respuesta inmediata 24/7 sin depender de una persona",
      "Leads cualificados antes de que hables con ellos",
      "Historial de cada lead en un solo lugar",
      "Nunca más un lead sin seguimiento",
    ],
    result: "0 leads sin respuesta en las primeras 24h",
  },
];

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios de Automatización Comercial — Ramiro Perez",
  itemListElement: services.map((s, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Service",
      "@id": `https://ramiroperez.com/servicios#${s.slug}`,
      name: s.title,
      description: s.tagline,
      provider: { "@id": "https://ramiroperez.com/#person" },
      areaServed: { "@type": "Country", name: "España" },
      serviceType: "Automatización comercial",
    },
  })),
};

export default function ServiciosPage() {
  return (
    <div className="pt-32 pb-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="max-w-4xl mx-auto px-6">
        <span className="inline-block text-xs font-mono text-accent border border-accent/30 rounded px-2 py-0.5 mb-6">
          Servicios
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
          Tres sistemas. Un objetivo.
        </h1>
        <p className="text-foreground-muted text-lg mb-20 max-w-xl">
          Cada sistema resuelve una parte del proceso comercial. Pueden implementarse juntos o por separado.
        </p>

        <div className="flex flex-col gap-24">
          {services.map((s) => (
            <div key={s.slug} id={s.slug} className="border-t border-border pt-12">

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-accent border border-accent/30 rounded px-2 py-0.5 shrink-0 mt-1">
                    {s.tag}
                  </span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground">{s.title}</h2>
                    <p className="text-foreground-muted mt-1">{s.tagline}</p>
                  </div>
                </div>
                {/* Timeline badge */}
                <div className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-1.5 shrink-0">
                  <span className="text-xs text-muted">Entrega:</span>
                  <span className="text-xs font-semibold text-foreground">{s.timeline}</span>
                </div>
              </div>

              {/* Problem + for who */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-3">El problema</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{s.problem}</p>
                </div>
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-3">Para quién</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{s.forWho}</p>
                </div>
              </div>

              {/* Deliverables + Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-surface border border-border rounded-xl p-6">
                  <p className="text-xs text-muted uppercase tracking-wider mb-4">Entregables</p>
                  <ul className="flex flex-col gap-2">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2 text-sm text-foreground-muted items-start">
                        <span className="text-accent mt-0.5 shrink-0">→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-6">
                  <p className="text-xs text-muted uppercase tracking-wider mb-4">Beneficios</p>
                  <ul className="flex flex-col gap-2">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex gap-2 text-sm text-foreground-muted items-start">
                        <span className="text-accent mt-0.5 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result callout */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-accent/5 border border-accent/20 rounded-xl px-6 py-4 mb-6">
                <div>
                  <p className="text-xs text-muted uppercase tracking-wider mb-0.5">Resultado habitual</p>
                  <p className="font-semibold text-accent">{s.result}</p>
                </div>
                <Link href="/diagnostico" className="btn-primary shrink-0">
                  Solicita tu diagnóstico →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
