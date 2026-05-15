"use client";

import Link from "next/link";
import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-8">
      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[900px] h-[500px] rounded-full bg-accent/[0.07] blur-[140px]" />
      </div>
      {/* Grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />

      <div className="section relative z-10">
        <m.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto"
        >
          <span className="tag mb-8 inline-block">Diagnóstico gratuito</span>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-[1.0] tracking-tight">
            ¿Tu proceso comercial
            <br />
            <span className="text-accent">podría funcionar</span>
            <br />
            sin ti encima?
          </h2>

          <p className="text-foreground-muted text-lg mb-12 max-w-sm mx-auto leading-relaxed">
            30 minutos. Análisis real de tu proceso actual. Sin compromiso.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Link href="/diagnostico" className="btn-primary text-base px-8 py-4">
              Solicita tu diagnóstico gratuito
              <ArrowRight size={18} />
            </Link>
            <Link href="/casos-de-exito" className="btn-secondary text-base px-8 py-4">
              Ver casos reales →
            </Link>
          </div>

          <p className="text-xs text-muted font-mono tracking-wider">
            30 min · Gratis · Sin compromiso · Sin pitch agresivo
          </p>
        </m.div>
      </div>
    </section>
  );
}
