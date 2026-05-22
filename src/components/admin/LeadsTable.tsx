"use client";

import { useState } from "react";
import Link from "next/link";

type Lead = {
  id: string;
  score: number;
  tier: string;
  ghlSynced: boolean;
  createdAt: Date | string;
  payload: unknown;
};

const tiers = ["", "cold", "warm", "hot", "premium"];

export function LeadsTable({
  leads,
  activeTier,
}: {
  leads: Lead[];
  activeTier?: string;
}) {
  const [selected, setSelected] = useState<Lead | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {tiers.map((t) => (
          <Link
            key={t || "all"}
            href={t ? `/admin/leads?tier=${t}` : "/admin/leads"}
            className={`text-xs px-3 py-1 rounded-md border ${
              (activeTier ?? "") === t
                ? "bg-accent text-black border-accent"
                : "border-border text-muted"
            }`}
          >
            {t || "Todos"}
          </Link>
        ))}
      </div>

      {leads.length === 0 ? (
        <p className="text-sm text-muted">Sin envios todavia.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-surface text-muted text-left">
              <tr>
                <th className="px-4 py-2">Nombre</th>
                <th className="px-4 py-2">Empresa</th>
                <th className="px-4 py-2">Tier</th>
                <th className="px-4 py-2">Score</th>
                <th className="px-4 py-2">GHL</th>
                <th className="px-4 py-2">Fecha</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => {
                const p = (lead.payload ?? {}) as {
                  nombre?: string;
                  empresa?: string;
                  email?: string;
                };
                return (
                  <tr
                    key={lead.id}
                    className="border-t border-border cursor-pointer hover:bg-surface/50"
                    onClick={() => setSelected(lead)}
                  >
                    <td className="px-4 py-3 text-foreground">{p.nombre ?? "—"}</td>
                    <td className="px-4 py-3 text-foreground-muted">{p.empresa ?? "—"}</td>
                    <td className="px-4 py-3 text-accent">{lead.tier}</td>
                    <td className="px-4 py-3">{lead.score}</td>
                    <td className="px-4 py-3">
                      <span className={lead.ghlSynced ? "text-accent" : "text-muted"}>
                        {lead.ghlSynced ? "Sí" : "No"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(lead.createdAt).toLocaleString("es-ES")}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-6 z-50">
          <div className="card max-w-lg w-full max-h-[80vh] overflow-auto">
            <div className="flex justify-between items-start mb-4">
              <h2 className="font-medium text-foreground">Detalle del lead</h2>
              <button
                type="button"
                onClick={() => setSelected(null)}
                className="text-muted hover:text-foreground"
              >
                Cerrar
              </button>
            </div>
            <pre className="text-xs text-foreground-muted whitespace-pre-wrap">
              {JSON.stringify(selected.payload, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
