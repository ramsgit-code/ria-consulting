import Link from "next/link";
import { caseStudies } from "@/lib/site-content";

export function CaseStudies() {
  return (
    <section className="border-t border-border bg-surface">
      <div className="section-wide">
        <p className="tag">Resultados</p>
        <h2 className="section-title mb-8">Casos reales, sin mockups.</h2>

        <ul className="flex flex-col gap-4">
          {caseStudies.map((c) => (
            <li key={c.client} className="card">
              <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                <h3 className="font-medium text-foreground">{c.client}</h3>
                <span className="text-xs text-muted">{c.system}</span>
              </div>
              <p className="text-sm text-foreground-muted">{c.result}</p>
            </li>
          ))}
        </ul>

        <Link href="/casos-de-exito" className="inline-block mt-6 text-sm text-accent hover:underline">
          Leer casos completos →
        </Link>
      </div>
    </section>
  );
}
