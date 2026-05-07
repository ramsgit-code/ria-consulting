import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Ramiro Perez — Especialista en Automatización Comercial",
  description:
    "Especialista en sistemas de captación, cualificación y automatización comercial con Go High Level. No soy una agencia: diseño e implemento el sistema completo.",
  alternates: { canonical: "https://ramiroperez.com/sobre-mi" },
  openGraph: {
    title: "Sobre Ramiro Perez — Automatización Comercial con Go High Level",
    description:
      "Diseño el proceso completo: desde el formulario de captación hasta el cierre. Sistemas reales implementados en clínicas, eventos y formación.",
  },
};

const stats = [
  { value: "3+", label: "Sistemas en produccion" },
  { value: "100%", label: "Proyectos con soporte incluido" },
  { value: "2–4 sem", label: "Tiempo medio de entrega" },
];

const specialties = [
  "Lead qualification systems con Go High Level",
  "Automatizacion de propuestas comerciales",
  "Agentes de WhatsApp integrados con CRM",
  "Funnels de captacion y nurturing",
  "Integraciones API y automatizacion de procesos",
  "Posicionamiento SEO tecnico",
];

const diferencias = [
  {
    titulo: "No vendo software",
    desc: "Implemento el sistema completo. El cliente no necesita aprender a configurar nada.",
  },
  {
    titulo: "Entiendo el proceso comercial",
    desc: "No solo la tecnologia. Se disena el sistema segun como funciona realmente el proceso de venta.",
  },
  {
    titulo: "Entregables claros",
    desc: "Antes de empezar sabes exactamente que vas a recibir, en cuanto tiempo y con que soporte.",
  },
  {
    titulo: "El sistema es tuyo",
    desc: "Sin dependencias permanentes. Una vez entregado, tu equipo puede gestionarlo.",
  },
];

export default function SobreMiPage() {
  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <span className="inline-block text-xs font-mono text-accent border border-accent/30 rounded px-2 py-0.5 mb-6">
          Sobre mi
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">
          No soy una agencia.<br />
          Soy el que construye el sistema.
        </h1>
        <p className="text-foreground-muted text-lg leading-relaxed max-w-2xl mb-12">
          Trabajo con negocios que tienen un problema comercial real y quieren resolverlo
          con un sistema, no con mas horas de trabajo manual.
        </p>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-6 mb-16 pb-16 border-b border-border">
          {stats.map((s) => (
            <div key={s.value}>
              <p className="text-3xl md:text-4xl font-bold text-accent leading-none mb-1">{s.value}</p>
              <p className="text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col gap-5 text-foreground-muted leading-relaxed">
            <p>
              Trabajo con negocios que tienen un problema comercial real: leads que no se convierten,
              seguimientos que no se hacen, propuestas que tardan demasiado o pipelines que nadie mira.
            </p>
            <p>
              No vendo software. No vendo plantillas. Diseno el proceso completo y lo construyo:
              desde el formulario en el que llega el lead hasta el momento en que el cliente firma.
            </p>
            <p>
              He implementado sistemas reales para clinicas, empresas de eventos y academias de formacion.
              Sistemas que funcionan hoy, no demos que quedan bonitas en una presentacion.
            </p>
            <p>
              La diferencia con una agencia generica es simple: entiendo tanto el proceso comercial
              como la tecnologia que lo mueve. No necesitas explicarme que es un pipeline ni un CRM.
              Necesitas que alguien lo construya bien desde el primer dia.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="bg-surface border border-border rounded-xl p-6">
              <p className="text-xs text-muted uppercase tracking-wider mb-4">Especialidades</p>
              <ul className="flex flex-col gap-3">
                {specialties.map((s) => (
                  <li key={s} className="flex gap-2 text-sm text-foreground-muted items-start">
                    <span className="text-accent mt-0.5 shrink-0">→</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Diferencias */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-foreground mb-8">Por que no es lo mismo que contratar una agencia.</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diferencias.map((d) => (
              <div key={d.titulo} className="bg-surface border border-border rounded-xl p-6">
                <p className="font-semibold text-foreground mb-2">{d.titulo}</p>
                <p className="text-sm text-foreground-muted leading-relaxed">{d.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-border pt-12">
          <p className="text-2xl font-semibold text-foreground mb-3">
            ¿Tiene sentido que hablemos?
          </p>
          <p className="text-foreground-muted mb-6">
            Si tienes un proceso comercial con friccion y quieres saber exactamente que necesitas,
            empieza por el diagnostico. 30 minutos, sin compromiso.
          </p>
          <Link href="/diagnostico" className="btn-primary">
            Solicita tu diagnostico gratuito →
          </Link>
        </div>
      </div>
    </div>
  );
}
