import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative mt-16 border-t border-white/[0.08]">
      <div className="mx-auto max-w-5xl px-6 py-14">
        <div className="glass relative overflow-hidden rounded-3xl px-6 py-10 md:px-10 md:py-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-accent/10 blur-[100px]" />
          <div className="relative flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-sm">
              <p className="font-display text-lg font-semibold tracking-tight text-foreground">
                RIA Consulting<span className="text-accent">.</span>
              </p>
              <p className="mt-2 text-sm text-foreground-muted">
                Sistemas de captacion, cualificacion y cierre en Go High Level.
              </p>
              <Link
                href="/diagnostico"
                className="btn-primary mt-5"
              >
                Diagnostico gratuito
                <ArrowUpRight size={16} />
              </Link>
            </div>

            <nav className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm">
              <Link href="/servicios" className="text-foreground-muted transition-colors hover:text-foreground">Servicios</Link>
              <Link href="/casos-de-exito" className="text-foreground-muted transition-colors hover:text-foreground">Casos</Link>
              <Link href="/soluciones" className="text-foreground-muted transition-colors hover:text-foreground">Soluciones</Link>
              <Link href="/sobre-mi" className="text-foreground-muted transition-colors hover:text-foreground">Sobre mi</Link>
              <Link href="/blog" className="text-foreground-muted transition-colors hover:text-foreground">Blog</Link>
              <Link href="/diagnostico" className="text-accent transition-colors hover:text-accent-hover">Diagnostico</Link>
            </nav>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted">
          © {new Date().getFullYear()} RIA Consulting · Automatizacion comercial
        </p>
      </div>
    </footer>
  );
}
