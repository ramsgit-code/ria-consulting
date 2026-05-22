import Link from "next/link";
import { services } from "@/lib/site-content";

export function Services() {
  return (
    <section>
      <div className="section-wide">
        <p className="tag">Servicios</p>
        <h2 className="section-title mb-8">Tres sistemas. Elige uno o los tres.</h2>

        <ul className="flex flex-col gap-4">
          {services.map((s) => (
            <li key={s.slug}>
              <Link
                href={`/servicios#${s.slug}`}
                className="card block hover:border-foreground-muted transition-colors group"
              >
                <h3 className="font-medium text-foreground mb-1 group-hover:text-accent transition-colors">
                  {s.shortTitle}
                </h3>
                <p className="text-sm text-foreground-muted">{s.desc}</p>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/servicios" className="inline-block mt-6 text-sm text-accent hover:underline">
          Ver detalle de cada sistema →
        </Link>
      </div>
    </section>
  );
}
