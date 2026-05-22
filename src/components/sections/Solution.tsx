"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export function Solution() {
  return (
    <section>
      <div className="section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <span className="tag">La solucion</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground leading-tight">
            Un sistema, no una herramienta.
          </h2>
          <p className="text-lg text-foreground-muted leading-relaxed mb-6">
            No instalo software y desaparezco. Diseno el proceso completo: como llega el lead,
            como se cualifica automaticamente, como recibes la propuesta y como se hace el
            seguimiento sin que tengas que perseguir a nadie.
          </p>
          <p className="text-lg text-foreground-muted leading-relaxed">
            Todo automatizado. Todo medible. Todo tuyo.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            {
              title: "Captacion ordenada",
              desc: "Formularios que precualifican y envian datos directamente a tu CRM sin tocar nada.",
            },
            {
              title: "Seguimiento automatico",
              desc: "Emails y WhatsApp que siguen al lead segun su comportamiento. Ningun lead se pierde.",
            },
            {
              title: "Cierre profesional",
              desc: "Propuestas en minutos. Pipeline claro. Saber siempre en que punto esta cada cliente.",
            },
          ].map((item) => (
            <div key={item.title} className="card">
              <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-foreground-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10"
        >
          <Link href="/soluciones" className="btn-secondary">
            Ver soluciones por sector
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
