import type { Metadata } from "next";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { aboutContent } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Sobre mi",
  description:
    "Especialista en sistemas de captacion y automatizacion comercial con Go High Level.",
};

export default function SobreMiPage() {
  return (
    <>
      <PageShell tag="Sobre mi" title="Construyo el sistema, no solo la herramienta">
        <div className="flex flex-col gap-8 max-w-xl">
          {aboutContent.intro.map((p) => (
            <p key={p} className="text-foreground-muted leading-relaxed">
              {p}
            </p>
          ))}

          <div className="card">
            <p className="text-xs text-muted mb-3">Especialidades</p>
            <ul className="flex flex-col gap-2">
              {aboutContent.specialties.map((s) => (
                <li key={s} className="text-sm text-foreground-muted">
                  → {s}
                </li>
              ))}
            </ul>
          </div>

          <div className="card">
            <p className="text-xs text-muted mb-3">Como trabajo</p>
            <ul className="flex flex-col gap-2">
              {aboutContent.principles.map((p) => (
                <li key={p} className="text-sm text-foreground-muted">
                  ✓ {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </PageShell>
      <PageCTA />
    </>
  );
}
