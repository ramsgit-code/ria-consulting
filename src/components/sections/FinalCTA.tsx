import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="border-t border-border">
      <div className="section text-center">
        <h2 className="section-title mb-4">
          ¿Quieres saber que sistema necesitas?
        </h2>
        <p className="text-foreground-muted mb-8 max-w-md mx-auto">
          Diagnostico gratuito de 30 minutos. Te digo si tiene sentido trabajar juntos.
        </p>
        <Link href="/diagnostico" className="btn-primary">
          Solicitar diagnostico
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}
