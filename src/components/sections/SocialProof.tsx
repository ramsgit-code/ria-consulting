"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const testimonials = [
  {
    quote:
      "Antes tardabamos 2 dias en enviar una propuesta. Ahora tarda 8 minutos y la recibe el cliente mejor presentada que antes.",
    author: "Director comercial",
    company: "Empresa de eventos",
  },
  {
    quote:
      "Redujo el ruido de leads malos en el pipeline. Ahora el equipo solo habla con quien tiene intencion real de compra.",
    author: "Gerente comercial",
    company: "Clinica capilar",
  },
];

export function SocialProof() {
  return (
    <section>
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="tag">Lo que dicen</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Resultados que puedes medir.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="card"
            >
              <p className="text-accent text-4xl font-serif leading-none mb-4">"</p>
              <p className="text-foreground-muted leading-relaxed mb-6 text-[15px]">{t.quote}</p>
              <div>
                <p className="text-sm font-medium text-foreground">{t.author}</p>
                <p className="text-xs text-muted">{t.company}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link href="/casos-de-exito" className="btn-secondary">
            Ver casos completos
          </Link>
        </div>
      </div>
    </section>
  );
}
