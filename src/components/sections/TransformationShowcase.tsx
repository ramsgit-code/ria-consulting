"use client";

import { useState } from "react";
import Link from "next/link";
import { transformations } from "@/lib/transformations";
import { BeforeAfterPlayer } from "@/components/video/BeforeAfterPlayer";

export function TransformationShowcase() {
  const [activeId, setActiveId] = useState(transformations[0].id);
  const active = transformations.find((t) => t.id === activeId) ?? transformations[0];

  return (
    <section id="transformaciones" className="border-t border-border">
      <div className="section-wide">
        <p className="tag">Videos</p>
        <h2 className="section-title mb-2">Antes y despues</h2>
        <p className="text-sm text-foreground-muted mb-8 max-w-lg">
          Sustituye los placeholders subiendo tus MP4 en{" "}
          <code className="text-accent/90">public/videos/</code>.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {transformations.map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveId(t.id)}
              className={`text-sm px-3 py-1.5 rounded-md border ${
                activeId === t.id
                  ? "bg-accent text-black border-accent font-medium"
                  : "border-border text-foreground-muted hover:text-foreground"
              }`}
            >
              {t.tag}
            </button>
          ))}
        </div>

        <p className="text-sm text-muted mb-4">
          {active.client} · {active.metric} {active.metricLabel}
        </p>

        <BeforeAfterPlayer before={active.before} after={active.after} />

        <Link href="/diagnostico" className="btn-primary mt-8 inline-flex">
          Quiero un sistema asi
        </Link>
      </div>
    </section>
  );
}
