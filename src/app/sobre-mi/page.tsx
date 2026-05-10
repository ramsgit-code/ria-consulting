import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sobre Ramiro Perez — Especialista en Automatización Comercial",
  description:
    "Especialista en sistemas de captación, cualificación y automatización comercial con Go High Level, Vapi y Retell. No soy una agencia: diseño e implemento el sistema completo.",
  alternates: { canonical: "https://ramiroperez.com/sobre-mi" },
  openGraph: {
    title: "Sobre Ramiro Perez — Automatización Comercial",
    description:
      "Diseño el proceso completo: desde el formulario de captación hasta el cierre. Sistemas reales implementados en clínicas, eventos y formación.",
    images: [{ url: "/og?title=Sobre+Ramiro+Perez&tag=Automatizaci%C3%B3n+Comercial" }],
  },
};

const stats = [
  { value: "3+", label: "Sistemas en producción" },
  { value: "4", label: "Sistemas disponibles" },
  { value: "2–4 sem", label: "Tiempo medio de entrega" },
];

const specialties = [
  "Lead qualification con Go High Level",
  "Automatización de propuestas comerciales",
  "Agentes de WhatsApp integrados con CRM",
  "Agentes de voz IA con Vapi y Retell",
  "Funnels de captación y nurturing",
  "Integraciones API y automatización de procesos",
];

const diferencias = [
  {
    num: "01",
    titulo: "No vendo software",
    desc: "Implemento el sistema completo. El cliente no necesita aprender a configurar nada.",
  },
  {
    num: "02",
    titulo: "Entiendo el proceso comercial",
    desc: "No solo la tecnología. El sistema se diseña según cómo funciona realmente el proceso de venta.",
  },
  {
    num: "03",
    titulo: "Entregables claros",
    desc: "Antes de empezar sabes exactamente qué vas a recibir, en cuánto tiempo y con qué soporte.",
  },
  {
    num: "04",
    titulo: "El sistema es tuyo",
    desc: "Sin dependencias permanentes. Una vez entregado, tu equipo puede gestionarlo sin mí.",
  },
];

export default function SobreMiPage() {
  return (
    <>
      {/* Page header */}
      <div className="pt-32 pb-16 border-b border-border">
        <div className="max-w-4xl mx-auto px-6">
          <span className="tag">Sobre mí</span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6 tracking-tight">
            No soy una agencia.<br />
            <span className="text-accent">Soy el que construye el sistema.</span>
          </h1>
          <p className="text-foreground-muted text-lg leading-relaxed max-w-2xl">
            Trabajo con negocios que tienen un problema comercial real y quieren resolverlo
            con un sistema, no con más horas de trabajo manual.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-20">

        {/* Stats */}
        <div className="grid grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden mb-20">
          {stats.map((s) => (
            <div key={s.value} className="bg-background p-6 md:p-8">
              <p className="text-3xl md:text-4xl font-bold text-accent leading-none mb-2 tabular-nums tracking-tight">{s.value}</p>
              <p className="text-xs text-muted leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="flex flex-col gap-5 text-foreground-muted leading-relaxed text-sm">
            <p>
              Trabajo con negocios que tienen un proceso comercial con fricción real: leads que no convierten, seguimientos que no se hacen, propuestas que tardan o pipelines que nadie mira.
            </p>
            <p>
              No vendo software. No vendo plantillas. Diseño el proceso completo y lo construyo — desde el formulario en el que llega el lead hasta el momento en que el cliente firma.
            </p>
            <p>
              La diferencia con una agencia genérica: entiendo tanto el proceso comercial como la tecnología que lo mueve. No necesitas explicarme qué es un pipeline ni un CRM.
            </p>
            <div className="pt-4">
              <Link href="/casos-de-exito" className="text-accent hover:text-accent-hover transition-colors text-sm font-medium">
                Ver sistemas implementados →
              </Link>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-6">
            <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-5">Especialidades</p>
            <ul className="flex flex-col gap-3">
              {specialties.map((s) => (
                <li key={s} className="flex gap-3 text-sm text-foreground-muted items-start">
                  <span className="text-accent mt-0.5 shrink-0 font-mono">→</span>
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-[11px] text-muted uppercase tracking-widest font-mono mb-3">Tecnologías</p>
              <div className="flex flex-wrap gap-2">
                {["Go High Level", "Vapi", "Retell", "WhatsApp API", "Make", "n8n"].map((tech) => (
                  <span key={tech} className="text-xs bg-background border border-border rounded px-2.5 py-1 text-foreground-muted font-mono">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Diferencias */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-10 tracking-tight">
            Por qué no es lo mismo que contratar una agencia.
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {diferencias.map((d) => (
              <div key={d.titulo} className="bg-surface border border-border rounded-xl p-6 hover:border-accent/30 transition-colors">
                <div className="flex items-start gap-4">
                  <span className="text-xs font-mono text-accent/60 mt-0.5 shrink-0">{d.num}</span>
                  <div>
                    <p className="font-semibold text-foreground mb-2 tracking-tight">{d.titulo}</p>
                    <p className="text-sm text-foreground-muted leading-relaxed">{d.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-accent/5 border border-accent/20 rounded-2xl p-10 md:p-14 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3 tracking-tight">
            ¿Tiene sentido que hablemos?
          </h2>
          <p className="text-foreground-muted mb-8 max-w-md mx-auto text-sm leading-relaxed">
            Si tienes un proceso comercial con fricción, empieza por el diagnóstico. 30 minutos, sin compromiso, con análisis real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/diagnostico" className="btn-primary text-base px-8 py-3.5">
              Solicita tu diagnóstico gratuito →
            </Link>
            <Link href="/servicios" className="btn-secondary">
              Ver servicios →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
