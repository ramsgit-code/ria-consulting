import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export function PageCTA() {
  return (
    <div className="section-wide">
      <Reveal>
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-14 text-center md:px-12">
          <div className="pointer-events-none absolute left-1/2 top-0 h-48 w-[28rem] -translate-x-1/2 rounded-full bg-accent/15 blur-[100px]" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl text-balance font-display text-3xl font-semibold leading-tight tracking-tight text-foreground md:text-4xl">
              ¿Quieres saber que sistema necesitas?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm text-foreground-muted">
              Diagnostico gratuito de 30 minutos en Go High Level.
            </p>
            <Link href="/diagnostico" className="btn-primary mt-7">
              Solicitar diagnostico
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
