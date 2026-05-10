import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Servicios de Automatización Comercial",
  description:
    "Lead Qualification, Proposal Automation, WhatsApp + CRM y Voice AI Agents con Vapi y Retell. Cuatro sistemas para vender más sin depender de procesos manuales.",
  alternates: { canonical: "https://ramiroperez.com/servicios" },
  openGraph: {
    title: "Servicios — Automatización Comercial con Go High Level",
    description:
      "Cuatro sistemas para automatizar captación, propuestas, seguimiento y llamadas. Implementado en clínicas, empresas de eventos y academias.",
    images: [{ url: "/og?title=Servicios+%E2%80%94+Automatizaci%C3%B3n+Comercial&tag=Servicios" }],
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
      "Lead scoring automático (cold / warm / hot / premium)",
      "Pipeline configurado en Go High Level",
      "Tags automáticos según respuestas del lead",
      "Primer contacto automático: email + WhatsApp",
      "Dashboard de seguimiento y reporte",
    ],
    benefits: [
      "Solo hablas con leads que cumplen tu criterio mínimo",
      "Ningún lead sin respuesta en las primeras 24h",
      "Sabes en qué etapa está cada oportunidad",
      "El sistema trabaja sin supervisión constante",
    ],
    result: "−40% tiempo en llamadas que no convierten",
    relatedCase: { label: "Ver caso: Clínica Capilar", href: "/casos-de-exito#clinica-capilar" },
  },
  {
    slug: "proposal-automation",
    tag: "Sistema B",
    title: "Proposal Automation System",
    tagline: "Propuestas en minutos, no en días.",
    timeline: "3–4 semanas",
    forWho: "Agencias, freelances, empresas de servicios. Cualquiera que envíe más de 5 propuestas al mes.",
    problem:
      "Crear propuestas a mano es lento e inconsistente. Para cuando la envías, el cliente ya está frío o ya eligió a la competencia.",
    deliverables: [
      "Formulario interno de intake post-llamada",
      "Propuesta web dinámica generada automáticamente",
      "PDF descargable con branding profesional",
      "Envío automático con seguimiento integrado",
      "Pipeline de estado de propuesta en GHL",
      "Recordatorios automáticos si no hay respuesta",
    ],
    benefits: [
      "Propuesta lista en menos de 10 minutos",
      "Imagen profesional consistente en cada envío",
      "Seguimiento automático sin perseguir al cliente",
      "Mides exactamente cuántas propuestas convierten",
    ],
    result: "De 1–3 días a 8 minutos por propuesta",
    relatedCase: { label: "Ver caso: Eventos Barcelona", href: "/casos-de-exito#eventos-barcelona" },
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
      "Respuesta inmediata 24/7 sin depender de nadie",
      "Leads cualificados antes de que hables con ellos",
      "Historial de cada lead en un solo lugar",
      "Nunca más un lead sin seguimiento",
    ],
    result: "0 leads sin respuesta en las primeras 24h",
    relatedCase: { label: "Ver caso: Academia Online", href: "/casos-de-exito#academia-online" },
  },
  {
    slug: "voice-ai-agents",
    tag: "Sistema D",
    title: "Voice AI Agents",
    tagline: "Llamadas que califican y agendan solas, 24/7.",
    timeline: "2–4 semanas",
    forWho: "Clínicas, inmobiliarias, academias, servicios con alto volumen de llamadas entrantes o campañas outbound.",
    problem:
      "El teléfono sigue siendo el canal con mayor conversión, pero requiere personas disponibles. Los leads que llegan fuera de horario se pierden o se enfrían antes de que alguien los atienda.",
    deliverables: [
      "Agente de voz IA configurado con Vapi o Retell",
      "Script de llamada y lógica de cualificación",
      "Integración con pipeline de Go High Level",
      "Grabación y transcripción de llamadas",
      "Notificación al equipo por leads calificados",
      "Dashboard de llamadas y métricas",
    ],
    benefits: [
      "Cobertura comercial 24/7 sin equipo adicional",
      "Cualificación consistente en cada llamada",
      "Cero tiempo de espera para el lead",
      "Tu equipo solo interviene cuando vale la pena",
    ],
    result: "24/7 de cobertura comercial sin coste de equipo",
    relatedCase: null,
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
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      {/* Page header */}
      <div className="pt-32 pb-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Servicios</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 tracking-tight">
            Cuatro sistemas. Un objetivo.
          </h1>
          <p className="text-foreground-muted text-lg max-w-xl leading-relaxed">
            Cada sistema resuelve una parte del proceso comercial. Pueden implementarse juntos o por separado, según donde estés perdiendo más.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-24">
          {services.map((s) => (
            <div key={s.slug} id={s.slug} className="scroll-mt-24">

              {/* Header */}
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
                <div className="flex items-start gap-4">
                  <span className="tag mt-1 shrink-0">{s.tag}</span>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{s.title}</h2>
                    <p className="text-foreground-muted mt-1">{s.tagline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 bg-surface border border-border rounded-full px-4 py-1.5 shrink-0">
                  <span className="text-xs text-muted font-mono">Entrega:</span>
                  <span className="text-xs font-semibold text-foreground">{s.timeline}</span>
                </div>
              </div>

              {/* Problem + For who */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">El problema</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{s.problem}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">Para quién</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{s.forWho}</p>
                </div>
              </div>

              {/* Deliverables + Benefits */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-4">Entregables</p>
                  <ul className="flex flex-col gap-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-2.5 text-sm text-foreground-muted items-start">
                        <span className="text-accent mt-0.5 shrink-0 font-mono">→</span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-4">Qué consigues</p>
                  <ul className="flex flex-col gap-2.5">
                    {s.benefits.map((b) => (
                      <li key={b} className="flex gap-2.5 text-sm text-foreground-muted items-start">
                        <span className="text-accent mt-0.5 shrink-0">✓</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Result + CTA */}
              <div className="flex flex-wrap items-center justify-between gap-4 bg-accent/5 border border-accent/20 rounded-xl px-6 py-5">
                <div>
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-1">Resultado habitual</p>
                  <p className="font-semibold text-accent text-lg">{s.result}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  {s.relatedCase && (
                    <Link href={s.relatedCase.href} className="text-xs text-foreground-muted hover:text-foreground transition-colors font-mono underline underline-offset-4">
                      {s.relatedCase.label}
                    </Link>
                  )}
                  <Link href="/diagnostico" className="btn-primary">
                    Solicita tu diagnóstico <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom cross-link */}
        <div className="mt-24 pt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">¿Cuál aplica a tu sector?</p>
            <p className="text-sm text-foreground-muted">Cada sistema se adapta al ciclo de venta de tu vertical.</p>
          </div>
          <Link href="/soluciones" className="btn-secondary shrink-0">
            Ver soluciones por sector →
          </Link>
        </div>
      </div>
    </>
  );
}
