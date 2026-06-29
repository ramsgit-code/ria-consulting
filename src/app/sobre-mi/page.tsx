import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageCTA } from "@/components/layout/PageCTA";
import { Reveal } from "@/components/Reveal";
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
        <Reveal className="flex max-w-2xl flex-col gap-5">
          {aboutContent.intro.map((p) => (
            <p key={p} className="text-lg leading-relaxed text-foreground-muted">
              {p}
            </p>
          ))}
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Reveal delay={0.05} className="h-full">
            <div className="card h-full">
              <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                Especialidades
              </p>
              <ul className="flex flex-col gap-3">
                {aboutContent.specialties.map((s) => (
                  <li
                    key={s}
                    className="flex items-start gap-2 text-sm text-foreground-muted"
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="h-full">
            <div className="card h-full">
              <p className="mb-4 text-xs uppercase tracking-wider text-muted">
                Como trabajo
              </p>
              <ul className="flex flex-col gap-3">
                {aboutContent.principles.map((p) => (
                  <li
                    key={p}
                    className="flex items-start gap-2 text-sm text-foreground-muted"
                  >
                    <Check size={15} className="mt-0.5 shrink-0 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </PageShell>
      <PageCTA />
    </>
  );
}
