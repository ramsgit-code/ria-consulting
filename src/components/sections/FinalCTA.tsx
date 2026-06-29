import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function FinalCTA() {
  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <div className="glass relative overflow-hidden rounded-3xl px-6 py-16 text-center md:px-12 md:py-20">
            {/* glows */}
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[32rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[110px]" />
            <div className="pointer-events-none absolute inset-0 grid-bg opacity-[0.4] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent_75%)]" />

            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-balance font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
                ¿Quieres saber que{" "}
                <span className="gradient-text">sistema necesitas?</span>
              </h2>
              <p className="mx-auto mt-5 max-w-md text-foreground-muted">
                Diagnostico gratuito de 30 minutos. Te digo si tiene sentido
                trabajar juntos — sin compromiso.
              </p>
              <Link href="/diagnostico" className="btn-primary mt-8">
                Solicitar diagnostico
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
