"use client";

import { useLang } from "@/components/LanguageProvider";
import { Reveal } from "@/components/Reveal";

export function Process() {
  const { c } = useLang();

  return (
    <section className="relative">
      <div className="section-wide">
        <Reveal>
          <p className="tag">{c.process.tag}</p>
          <h2 className="section-title max-w-2xl">{c.process.title}</h2>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.process.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 0.08}>
              <div className="card group relative h-full">
                <span className="font-display text-4xl font-bold text-white/10 transition-colors duration-300 group-hover:text-accent/40">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 font-display text-base font-semibold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  {step.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
