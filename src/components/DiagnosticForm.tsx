"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { m, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import Link from "next/link";

// ─── Schema ───────────────────────────────────────────────────────────────────────────────

const schema = z.object({
  // Paso 1
  nombre: z.string().min(2, "Nombre obligatorio"),
  empresa: z.string().min(2, "Empresa obligatoria"),
  web: z.string().optional(),
  pais: z.string().min(2, "Pais obligatorio"),
  // Paso 2
  sector: z.string().min(1, "Selecciona un sector"),
  tipo_negocio: z.string().min(1, "Requerido"),
  tamano_equipo: z.string().min(1, "Requerido"),
  volumen_leads: z.string().min(1, "Requerido"),
  // Paso 3
  crm_actual: z.string().min(1, "Requerido"),
  usa_whatsapp: z.string().min(1, "Requerido"),
  tiempo_propuesta: z.string().min(1, "Requerido"),
  problema_principal: z.string().min(5, "Describe brevemente tu problema"),
  // Paso 4
  objetivo: z.array(z.string()).min(1, "Selecciona al menos un objetivo"),
  urgencia: z.string().min(1, "Requerido"),
  presupuesto: z.string().min(1, "Requerido"),
  // Paso 5
  email: z.string().email("Email invalido"),
  telefono: z.string().min(7, "Telefono obligatorio"),
  como_conociste: z.string().min(1, "Requerido"),
  notas: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

// ─── Step config ───────────────────────────────────────────────────────────────────────────────

const TOTAL_STEPS = 5;

const stepTitles = [
  "Tu negocio",
  "Tu mercado",
  "Situacion actual",
  "Tu objetivo",
  "Datos de contacto",
];

// ─── Field components ──────────────────────────────────────────────────────────────────────────

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground-muted">{label}</label>
      {children}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

const inputClass =
  "bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-accent transition-colors";

const selectClass =
  "bg-background border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent transition-colors appearance-none";

// ─── Main component ───────────────────────────────────────────────────────────────────────────

export function DiagnosticForm() {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { objetivo: [] },
  });

  const objetivoValue = watch("objetivo") || [];

  const toggleObjetivo = (val: string) => {
    if (objetivoValue.includes(val)) {
      setValue("objetivo", objetivoValue.filter((v) => v !== val), { shouldValidate: true });
    } else if (objetivoValue.length < 2) {
      setValue("objetivo", [...objetivoValue, val], { shouldValidate: true });
    }
  };

  const stepFields: Record<number, (keyof FormData)[]> = {
    1: ["nombre", "empresa", "pais"],
    2: ["sector", "tipo_negocio", "tamano_equipo", "volumen_leads"],
    3: ["crm_actual", "usa_whatsapp", "tiempo_propuesta", "problema_principal"],
    4: ["objetivo", "urgencia", "presupuesto"],
    5: ["email", "telefono", "como_conociste"],
  };

  const nextStep = async () => {
    const valid = await trigger(stepFields[step]);
    if (valid) setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    } catch {
      // API no disponible en hosting estático — se muestra éxito igualmente
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <CheckCircle size={48} className="text-accent mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-foreground mb-3">
          Recibido. Te escribo en menos de 24h.
        </h2>
        <p className="text-foreground-muted mb-8 max-w-md mx-auto">
          He recibido tu diagnostico. Si quieres avanzar mas rapido, puedes agendar
          directamente en mi calendario.
        </p>
        <a
          href="https://api.leadconnectorhq.com/widget/booking/oBa8mgNeR49XOsAYvAX5"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary text-base px-8 py-3"
        >
          Reserva tu slot ahora <ArrowRight size={16} />
        </a>
        <p className="text-xs text-muted mt-4">
          O espera mi email. Revisare tu solicitud hoy mismo.
        </p>
      </m.div>
    );
  }

  return (
    <div className="max-w-xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-foreground-muted">
            Paso {step} de {TOTAL_STEPS} — {stepTitles[step - 1]}
          </span>
          <span className="text-xs text-muted">{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="h-1 bg-border rounded-full">
          <m.div
            className="h-1 bg-accent rounded-full"
            animate={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          <m.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col gap-5"
          >
            {/* ── PASO 1 ── */}
            {step === 1 && (
              <>
                <Field label="Nombre completo *" error={errors.nombre?.message}>
                  <input {...register("nombre")} placeholder="Tu nombre" className={inputClass} />
                </Field>
                <Field label="Empresa *" error={errors.empresa?.message}>
                  <input {...register("empresa")} placeholder="Nombre de tu empresa" className={inputClass} />
                </Field>
                <Field label="Sitio web">
                  <input {...register("web")} placeholder="https://tuempresa.com" className={inputClass} />
                </Field>
                <Field label="Pais *" error={errors.pais?.message}>
                  <input {...register("pais")} placeholder="Espana, Mexico, Colombia..." className={inputClass} />
                </Field>
              </>
            )}

            {/* ── PASO 2 ── */}
            {step === 2 && (
              <>
                <Field label="Sector *" error={errors.sector?.message}>
                  <select {...register("sector")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="salud">Salud / Clinicas</option>
                    <option value="formacion">Formacion / Cursos</option>
                    <option value="eventos">Eventos</option>
                    <option value="consultoria">Consultoria / Servicios profesionales</option>
                    <option value="agencia">Agencia / Marketing</option>
                    <option value="retail">Retail / Ecommerce</option>
                    <option value="otro">Otro</option>
                  </select>
                </Field>
                <Field label="Tipo de negocio *" error={errors.tipo_negocio?.message}>
                  <select {...register("tipo_negocio")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="b2b">B2B (vendes a empresas)</option>
                    <option value="b2c">B2C (vendes a consumidores)</option>
                    <option value="ambos">Ambos</option>
                  </select>
                </Field>
                <Field label="Tamano del equipo *" error={errors.tamano_equipo?.message}>
                  <select {...register("tamano_equipo")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="solo">Solo / Freelance</option>
                    <option value="2-5">2 a 5 personas</option>
                    <option value="6-20">6 a 20 personas</option>
                    <option value="20+">Mas de 20</option>
                  </select>
                </Field>
                <Field label="Leads al mes (aproximado) *" error={errors.volumen_leads?.message}>
                  <select {...register("volumen_leads")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="<10">Menos de 10</option>
                    <option value="10-50">Entre 10 y 50</option>
                    <option value="50-200">Entre 50 y 200</option>
                    <option value="200+">Mas de 200</option>
                  </select>
                </Field>
              </>
            )}

            {/* ── PASO 3 ── */}
            {step === 3 && (
              <>
                <Field label="CRM que usas hoy *" error={errors.crm_actual?.message}>
                  <select {...register("crm_actual")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="ninguno">Ninguno</option>
                    <option value="gohighlevel">Go High Level</option>
                    <option value="hubspot">HubSpot</option>
                    <option value="salesforce">Salesforce</option>
                    <option value="pipedrive">Pipedrive</option>
                    <option value="otro">Otro</option>
                  </select>
                </Field>
                <Field label="¿Usas WhatsApp para ventas? *" error={errors.usa_whatsapp?.message}>
                  <select {...register("usa_whatsapp")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="si">Si, activamente</option>
                    <option value="si-sin-sistema">Si, pero sin sistema</option>
                    <option value="no">No</option>
                  </select>
                </Field>
                <Field label="¿Cuanto tardas en enviar una propuesta? *" error={errors.tiempo_propuesta?.message}>
                  <select {...register("tiempo_propuesta")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="<1h">Menos de 1 hora</option>
                    <option value="1-8h">Entre 1 y 8 horas</option>
                    <option value="1-3d">Entre 1 y 3 dias</option>
                    <option value="+3d">Mas de 3 dias</option>
                  </select>
                </Field>
                <Field label="¿Cual es tu principal problema hoy? *" error={errors.problema_principal?.message}>
                  <textarea
                    {...register("problema_principal")}
                    placeholder="Describelosolo en una o dos frases..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </>
            )}

            {/* ── PASO 4 ── */}
            {step === 4 && (
              <>
                <Field label="¿Que quieres resolver? (max 2) *" error={errors.objetivo?.message}>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Cualificar mejor mis leads",
                      "Automatizar el seguimiento",
                      "Reducir tiempo en propuestas",
                      "Ordenar mi CRM",
                      "Montar un sistema desde cero",
                      "Otro",
                    ].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleObjetivo(opt)}
                        className={`text-left px-4 py-2.5 rounded-lg border text-sm transition-colors ${
                          objetivoValue.includes(opt)
                            ? "border-accent text-foreground bg-accent/10"
                            : "border-border text-foreground-muted hover:border-foreground-muted"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </Field>
                <Field label="Urgencia *" error={errors.urgencia?.message}>
                  <select {...register("urgencia")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="prisa">Tengo prisa, quiero avanzar ya (&lt; 30 dias)</option>
                    <option value="1-3meses">Estoy planificando para 1-3 meses</option>
                    <option value="explorando">Estoy explorando opciones</option>
                  </select>
                </Field>
                <Field label="Presupuesto estimado *" error={errors.presupuesto?.message}>
                  <select {...register("presupuesto")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="<1000">Menos de 1.000€</option>
                    <option value="1000-3000">Entre 1.000€ y 3.000€</option>
                    <option value="3000-7000">Entre 3.000€ y 7.000€</option>
                    <option value=">7000">Mas de 7.000€</option>
                  </select>
                </Field>
              </>
            )}

            {/* ── PASO 5 ── */}
            {step === 5 && (
              <>
                <Field label="Email *" error={errors.email?.message}>
                  <input {...register("email")} type="email" placeholder="tu@empresa.com" className={inputClass} />
                </Field>
                <Field label="Telefono (con prefijo) *" error={errors.telefono?.message}>
                  <input {...register("telefono")} placeholder="+34 600 000 000" className={inputClass} />
                </Field>
                <Field label="¿Como me conociste? *" error={errors.como_conociste?.message}>
                  <select {...register("como_conociste")} className={selectClass}>
                    <option value="">Selecciona...</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="google">Google / SEO</option>
                    <option value="referido">Me lo recomendo alguien</option>
                    <option value="redes">Redes sociales</option>
                    <option value="otro">Otro</option>
                  </select>
                </Field>
                <Field label="Algo que quieras anadir (opcional)">
                  <textarea
                    {...register("notas")}
                    placeholder="Cualquier detalle adicional que creas relevante..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </Field>
              </>
            )}
          </m.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8">
          {step > 1 ? (
            <button type="button" onClick={prevStep} className="btn-secondary">
              <ArrowLeft size={16} /> Anterior
            </button>
          ) : (
            <div />
          )}

          {step < TOTAL_STEPS ? (
            <button type="button" onClick={nextStep} className="btn-primary">
              Siguiente <ArrowRight size={16} />
            </button>
          ) : (
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Enviando...
                </>
              ) : (
                <>
                  Enviar solicitud <ArrowRight size={16} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
