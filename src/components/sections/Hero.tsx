import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LogoHospitalCapilar } from "@/components/logos/LogoHospitalCapilar";
import { LogoEventosBarcelona } from "@/components/logos/LogoEventosBarcelona";
import { LogoHermetic } from "@/components/logos/LogoHermetic";

export function Hero() {
  return (
    <section className="pt-28 pb-16 border-b border-border">
      <div className="section">
        <p className="tag">Go High Level · Automatizacion comercial</p>

        <h1 className="text-4xl md:text-5xl font-semibold text-foreground leading-tight mb-5">
          Vende mas sin perseguir leads a mano.
        </h1>

        <p className="text-foreground-muted text-lg leading-relaxed mb-8 max-w-xl">
          Monto tu sistema de captacion, cualificacion y cierre en Go High Level.
          Formularios, WhatsApp y propuestas conectados en un solo flujo.
        </p>

        <Link href="/diagnostico" className="btn-primary">
          Solicitar diagnostico gratuito
          <ArrowRight size={16} />
        </Link>

        <p className="text-sm text-muted mt-4">30 min · Sin compromiso · Respuesta en 24h</p>

        <div className="mt-14 pt-8 border-t border-border">
          <p className="text-xs text-muted mb-5">Clientes con sistema activo</p>
          <div className="flex flex-wrap items-center gap-8 opacity-50">
            <LogoHospitalCapilar className="h-5 w-auto text-foreground" />
            <LogoEventosBarcelona className="h-6 w-auto text-foreground" />
            <LogoHermetic className="h-5 w-auto text-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
