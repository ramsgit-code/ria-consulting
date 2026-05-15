"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { LogoHospitalCapilar } from "@/components/logos/LogoHospitalCapilar";
import { LogoEventosBarcelona } from "@/components/logos/LogoEventosBarcelona";

const stats = [
  { value: "−40%", label: "tiempo en leads sin cualificar" },
  { value: "8 min", label: "de llamada a propuesta enviada" },
  { value: "0", label: "leads sin respuesta en 24h" },
];

const pipeline = [
  { stage: "New Lead", count: 5, delta: "+2 hoy", accent: true },
  { stage: "Cualificado", count: 8, delta: null, accent: false },
  { stage: "Propuesta enviada", count: 4, delta: null, accent: false },
  { stage: "Cerrado", count: 12, delta: "↑ 80%", accent: false },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* Ambient glow — top right */}
      <div className="absolute -top-32 -right-32 w-[700px] h-[600px] rounded-full bg-accent/[0.07] blur-[140px] pointer-events-none" />
      {/* Ambient glow — bottom left */}
      <div className="absolute -bottom-32 -left-32 w-[400px] h-[300px] rounded-full bg-accent/[0.04] blur-[100px] pointer-events-none" />

      <div className="section w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left — copy */}
          <m.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <m.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="tag mb-6 inline-block"
            >
              Automatización comercial · Go High Level · IA
            </m.span>

            <h1 className="text-6xl md:text-7xl lg:text-[5.5rem] font-bold leading-[1.0] tracking-tight mb-8 text-foreground">
              Tu proceso<br />
              comercial,{" "}
              <span className="text-accent">
                funcionando<br className="hidden sm:block" /> solo.
              </span>
            </h1>

            <div className="flex flex-col sm:flex-row items-start gap-3 mb-14">
              <Link href="/diagnostico" className="btn-primary text-base px-7 py-4">
                Solicita tu diagnóstico
                <ArrowRight size={16} />
              </Link>
              <Link href="#video" className="btn-secondary text-base px-7 py-4">
                Ver cómo funciona
              </Link>
            </div>

            {/* Stats strip */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-8 pb-10 border-b border-border"
            >
              {stats.map((s) => (
                <div key={s.value} className="flex flex-col">
                  <span className="text-3xl font-bold text-accent leading-none tracking-tight tabular-nums">{s.value}</span>
                  <span className="text-xs text-muted mt-1.5 leading-snug max-w-[120px]">{s.label}</span>
                </div>
              ))}
            </m.div>

            {/* Logos */}
            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-8"
            >
              <p className="text-[10px] text-muted uppercase tracking-widest mb-5 font-mono">
                Sistemas implementados en
              </p>
              <div className="flex flex-wrap items-center gap-10">
                <LogoHospitalCapilar className="h-6 w-auto text-foreground opacity-40 hover:opacity-75 transition-opacity duration-300" />
                <LogoEventosBarcelona className="h-8 w-auto text-foreground opacity-40 hover:opacity-75 transition-opacity duration-300" />
              </div>
            </m.div>
          </m.div>

          {/* Right — pipeline mockup */}
          <m.div
            initial={{ opacity: 0, x: 32, y: 16 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="hidden lg:block"
          >
            <div className="bg-surface border border-border rounded-2xl overflow-hidden shadow-[0_0_100px_rgba(232,255,0,0.05)] ring-1 ring-white/[0.04]">
              {/* Window chrome */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-border bg-background/50">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="h-4 w-px bg-border" />
                  <p className="text-xs font-mono text-muted">Go High Level · Pipeline activo</p>
                </div>
                <span className="flex items-center gap-1.5 text-[11px] text-emerald-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
              </div>

              <div className="p-5">
                {/* Pipeline stages */}
                <div className="flex flex-col gap-2 mb-5">
                  {pipeline.map((p) => (
                    <div
                      key={p.stage}
                      className={`flex items-center justify-between rounded-lg px-4 py-3 ${
                        p.accent ? "bg-accent/10 border border-accent/25" : "bg-background border border-border"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full shrink-0 ${p.accent ? "bg-accent" : "bg-border"}`} />
                        <span className="text-sm text-foreground-muted">{p.stage}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        {p.delta && (
                          <span className={`text-xs font-mono ${p.accent ? "text-accent" : "text-emerald-400"}`}>
                            {p.delta}
                          </span>
                        )}
                        <span className="text-sm font-bold text-foreground tabular-nums">{p.count}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Activity feed */}
                <div className="border-t border-border pt-4 flex flex-col gap-3 mb-4">
                  <p className="text-[10px] text-muted uppercase tracking-widest font-mono">Actividad reciente</p>
                  {[
                    { text: "Nuevo lead cualificado", sub: "HOT · 84pts · LinkedIn", time: "2 min", dot: "bg-accent" },
                    { text: "Propuesta abierta", sub: "Clínica · 3.500€", time: "18 min", dot: "bg-emerald-400" },
                    { text: "WhatsApp enviado", sub: "Seguimiento día 2", time: "1 h", dot: "bg-blue-400" },
                  ].map((a) => (
                    <div key={a.text} className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div className={`w-1.5 h-1.5 rounded-full ${a.dot} mt-1.5 shrink-0`} />
                        <div>
                          <p className="text-xs text-foreground-muted">{a.text}</p>
                          <p className="text-[11px] text-accent/70 font-mono">{a.sub}</p>
                        </div>
                      </div>
                      <span className="text-[11px] text-muted shrink-0">{a.time}</span>
                    </div>
                  ))}
                </div>

                {/* Conversion bar */}
                <div className="border-t border-border pt-4">
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="text-muted font-mono">Tasa de conversión</span>
                    <span className="text-foreground font-bold tabular-nums">34%</span>
                  </div>
                  <div className="h-1.5 bg-background rounded-full overflow-hidden">
                    <m.div
                      className="h-full bg-accent rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: "34%" }}
                      transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
