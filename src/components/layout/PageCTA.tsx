import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function PageCTA() {
  return (
    <div className="section text-center border-t border-border pt-12">
      <h2 className="section-title mb-3">¿Quieres saber que sistema necesitas?</h2>
      <p className="text-foreground-muted text-sm mb-6 max-w-md mx-auto">
        Diagnostico gratuito de 30 minutos en Go High Level.
      </p>
      <Link href="/diagnostico" className="btn-primary inline-flex">
        Solicitar diagnostico
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
