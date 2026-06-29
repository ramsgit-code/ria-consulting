import Link from "next/link";
import { ArrowUpRight, Filter, FileText, MessageCircle } from "lucide-react";
import { services } from "@/lib/site-content";
import { Reveal } from "@/components/Reveal";

const icons = [Filter, FileText, MessageCircle];

export function Services() {
  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">Servicios</p>
          <h2 className="section-title max-w-2xl">
            Tres sistemas. Elige uno o los tres.
          </h2>
        </Reveal>

        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <Reveal as="li" key={s.slug} delay={i * 0.08}>
                <Link
                  href={`/servicios#${s.slug}`}
                  className="card group flex h-full flex-col"
                >
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-accent transition-colors group-hover:border-accent/40">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {s.shortTitle}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-foreground-muted">
                    {s.desc}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent">
                    Ver detalle
                    <ArrowUpRight
                      size={15}
                      className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
