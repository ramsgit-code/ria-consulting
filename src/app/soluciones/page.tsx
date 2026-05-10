import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Soluciones por Sector — Automatización Comercial",
  description:
    "Sistemas de automatización específicos para clínicas, empresas de eventos, academias, servicios profesionales y negocios con alto volumen de llamadas. Adaptados al ciclo de venta de cada sector.",
  alternates: { canonical: "https://ramiroperez.com/soluciones" },
  openGraph: {
    title: "Soluciones por Sector — Automatización Comercial con Go High Level",
    description:
      "Automatización para clínicas, eventos, formación, consultoras y Voice AI. Casos reales con resultados medibles en cada vertical.",
    images: [{ url: "/og?title=Soluciones+por+Sector&tag=Automatizaci%C3%B3n+Comercial" }],
  },
};

const verticals = [
  {
    slug: "clinicas-hospitales",
    sector: "Salud",
    title: "Clínicas y Hospitales",
    pain: "Los pacientes preguntan por precio y no vuelven. El equipo pierde tiempo en llamadas sin conversión.",
    solution: "Funnel de precualificación por tratamiento, urgencia y presupuesto. Solo hablas con quien tiene intención real.",
    automations: [
      "Formulario multi-paso en web o WhatsApp",
      "Score automático por tipo de consulta y presupuesto",
      "Email + WhatsApp de confirmación inmediato",
      "Pipeline: Consulta → Cualificado → Cita → Atendido",
    ],
    ghl: "Custom fields por tratamiento, urgencia y zona geográfica. Pipeline específico para el ciclo de salud.",
    caseHref: "/casos-de-exito#clinica-capilar",
    caseLabel: "Caso: Clínica Capilar →",
  },
  {
    slug: "empresas-eventos",
    sector: "Eventos",
    title: "Empresas de Eventos",
    pain: "Las peticiones de presupuesto tardan días. Los clientes se van con quien responde antes.",
    solution: "Sistema de propuesta automática. El cliente rellena el formulario y recibe precio en minutos.",
    automations: [
      "Formulario de intake: tipo, fecha, aforo, presupuesto",
      "Propuesta web generada automáticamente",
      "Seguimiento si no abre en 48h",
      "Pipeline: Solicitud → Propuesta → Negociación → Cierre",
    ],
    ghl: "Custom fields por tipo de evento, fecha, aforo y ciudad. Automatización de propuesta post-formulario.",
    caseHref: "/casos-de-exito#eventos-barcelona",
    caseLabel: "Caso: Eventos Barcelona →",
  },
  {
    slug: "formacion-cursos",
    sector: "Formación",
    title: "Academias y Formación Online",
    pain: "Muchos interesados, pocos que compran. El equipo pierde tiempo con leads que no tienen intención.",
    solution: "Funnel de captación con precualificación y nurturing automático hasta conversión.",
    automations: [
      "Lead magnet → formulario → score automático",
      "Secuencia nurturing 7 días por email",
      "WhatsApp al día 3 si no abre emails",
      "Pipeline: Lead → Nurture → Llamada → Matriculado",
    ],
    ghl: "Custom fields por modalidad, presupuesto y urgencia. Secuencias de nurturing segmentadas por score.",
    caseHref: "/casos-de-exito#academia-online",
    caseLabel: "Caso: Academia Online →",
  },
  {
    slug: "servicios-profesionales",
    sector: "Consultoría",
    title: "Servicios Profesionales",
    pain: "Los referidos llegan pero el proceso de cierre es lento, inconsistente y sin seguimiento.",
    solution: "Sistema de diagnóstico + propuesta + seguimiento que profesionaliza el proceso comercial completo.",
    automations: [
      "Formulario de diagnóstico público multi-paso",
      "Score + pipeline automático desde el primer contacto",
      "Propuesta web post-llamada generada en minutos",
      "Cadencia de seguimiento: 2d, 5d, 10d",
    ],
    ghl: "Pipeline completo de consultoría. Propuestas automatizadas post-llamada con seguimiento incluido.",
    caseHref: null,
    caseLabel: null,
  },
  {
    slug: "voice-ai",
    sector: "Voice AI",
    title: "Negocios con Alto Volumen de Llamadas",
    pain: "Leads que llegan fuera de horario, saturación del equipo en horas punta, seguimientos salientes que nadie hace.",
    solution: "Agentes de voz IA con Vapi o Retell que atienden, califican y agendan — sin intervención humana.",
    automations: [
      "Agente inbound: atiende y cualifica llamadas entrantes",
      "Agente outbound: llamadas de seguimiento automáticas",
      "Integración directa con pipeline de GHL",
      "Grabación + transcripción + resumen en CRM",
    ],
    ghl: "Cada llamada crea o actualiza el contacto en GHL con score, resumen y siguiente acción asignada.",
    caseHref: null,
    caseLabel: null,
  },
];

export default function SolucionesPage() {
  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Soluciones</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4 tracking-tight">
            El mismo sistema,<br className="hidden md:block" /> adaptado a tu sector.
          </h1>
          <p className="text-foreground-muted text-lg max-w-xl leading-relaxed">
            El proceso comercial varía según el negocio. Adapto cada sistema al ciclo de venta, canal y tipo de cliente de cada vertical.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">
        <div className="flex flex-col gap-20">
          {verticals.map((v, i) => (
            <div key={v.slug} id={v.slug} className="border-t border-border pt-12 scroll-mt-24">

              {/* Header */}
              <div className="flex items-start justify-between mb-8 gap-4">
                <div>
                  <span className="tag">{v.sector}</span>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">{v.title}</h2>
                </div>
                <span className="text-5xl font-bold text-border/60 font-mono shrink-0 leading-none mt-1">
                  0{i + 1}
                </span>
              </div>

              {/* Problem + Solution */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">El problema</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{v.pain}</p>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">La solución</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{v.solution}</p>
                </div>
              </div>

              {/* Automations + GHL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-4">Automatizaciones clave</p>
                  <ul className="flex flex-col gap-2.5">
                    {v.automations.map((a) => (
                      <li key={a} className="flex gap-2.5 text-sm text-foreground-muted items-start">
                        <span className="text-accent shrink-0 mt-0.5 font-mono">→</span>
                        {a}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">Integración GHL</p>
                  <p className="text-sm text-foreground-muted leading-relaxed">{v.ghl}</p>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/diagnostico" className="btn-primary">
                  Diagnóstico para {v.title.toLowerCase()} →
                </Link>
                {v.caseHref && (
                  <Link href={v.caseHref} className="btn-secondary">
                    {v.caseLabel}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom cross-link */}
        <div className="mt-24 pt-12 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-foreground mb-1">¿Quieres ver los sistemas en detalle?</p>
            <p className="text-sm text-foreground-muted">Cada sistema tiene sus entregables, tiempos y resultados documentados.</p>
          </div>
          <Link href="/servicios" className="btn-secondary shrink-0">
            Ver todos los servicios →
          </Link>
        </div>
      </div>
    </>
  );
}
