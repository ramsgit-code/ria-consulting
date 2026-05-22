"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const problems = [
  "Recibes leads pero no sabes cuales son realmente buenos hasta que pierdes tiempo hablando con ellos.",
  "Tu equipo hace seguimiento a mano: copiar, pegar, recordar, perseguir.",
  "Envias propuestas a mano una por una y tardas dias en hacerlo.",
  "Tu CRM esta desactualizado o directamente no lo usas.",
  "No sabes que paso con el lead de hace 3 semanas.",
  "Tus competidores responden mas rapido que tu.",
];

export function Problems() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="tag">El problema</span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground max-w-xl">
            Si te suena esto, necesitas un sistema.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {problems.map((p, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex gap-3 items-start p-4 rounded-lg border border-border bg-background"
              >
                <span className="text-accent font-mono text-sm mt-0.5 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-foreground-muted text-sm leading-relaxed">{p}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/servicios" className="btn-secondary">
              Ver los sistemas que solucionan esto
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
