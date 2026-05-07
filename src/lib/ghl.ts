// Go High Level API v2
// https://highlevel.stoplight.io/docs/integrations

const GHL_API_KEY = process.env.GHL_API_KEY!;
const GHL_LOCATION_ID = process.env.GHL_LOCATION_ID!;
const GHL_BASE_URL = "https://services.leadconnectorhq.com";

export interface GHLContactPayload {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  website?: string;
  source?: string;
  tags?: string[];
}

export interface GHLOpportunityPayload {
  name: string;
  pipelineId: string;
  pipelineStageId: string;
  contactId: string;
  monetaryValue?: number;
  status: "open" | "won" | "lost" | "abandoned";
}

async function ghlFetch(path: string, options: RequestInit) {
  if (!GHL_API_KEY || !GHL_LOCATION_ID) {
    throw new Error("GHL env vars missing: GHL_API_KEY or GHL_LOCATION_ID not set");
  }

  const res = await fetch(`${GHL_BASE_URL}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${GHL_API_KEY}`,
      "Content-Type": "application/json",
      Version: "2021-07-28",
      ...options.headers,
    },
  });

  const body = await res.text();

  if (!res.ok) {
    throw new Error(`GHL ${res.status} ${path}: ${body}`);
  }

  return JSON.parse(body);
}

export async function createOrUpdateContact(payload: GHLContactPayload) {
  return ghlFetch("/contacts/", {
    method: "POST",
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      ...payload,
    }),
  });
}

export async function createOpportunity(payload: GHLOpportunityPayload) {
  return ghlFetch("/opportunities/", {
    method: "POST",
    body: JSON.stringify({
      locationId: GHL_LOCATION_ID,
      ...payload,
    }),
  });
}

export async function addNoteToContact(contactId: string, body: string) {
  return ghlFetch(`/contacts/${contactId}/notes`, {
    method: "POST",
    body: JSON.stringify({ body }),
  });
}

// Formats ALL form fields into a readable note visible inside the GHL contact/opportunity
export function buildFormNote(data: Record<string, unknown>, score: number, tier: string): string {
  const lines: string[] = [
    `DIAGNOSTICO COMERCIAL — ${data.nombre} | ${data.empresa}`,
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    "NEGOCIO",
    `• Nombre:   ${data.nombre}`,
    `• Empresa:  ${data.empresa}`,
    `• País:     ${data.pais}`,
    data.web ? `• Web:      ${data.web}` : "",
    "",
    "MERCADO",
    `• Sector:         ${data.sector}`,
    `• Tipo negocio:   ${data.tipo_negocio}`,
    `• Tamaño equipo:  ${data.tamano_equipo}`,
    `• Leads/mes:      ${data.volumen_leads}`,
    "",
    "SITUACIÓN ACTUAL",
    `• CRM actual:          ${data.crm_actual}`,
    `• WhatsApp en ventas:  ${data.usa_whatsapp}`,
    `• Tiempo propuesta:    ${data.tiempo_propuesta}`,
    "",
    "PROBLEMA PRINCIPAL",
    `${data.problema_principal}`,
    "",
    "OBJETIVOS",
    Array.isArray(data.objetivo)
      ? data.objetivo.map((o: string) => `• ${o}`).join("\n")
      : `• ${data.objetivo}`,
    "",
    "PRESUPUESTO Y URGENCIA",
    `• Presupuesto:  ${data.presupuesto}`,
    `• Urgencia:     ${data.urgencia}`,
    "",
    "LEAD SCORING",
    `• Score:  ${score}/100`,
    `• Tier:   ${tier.toUpperCase()}`,
    `• Fuente: ${data.como_conociste}`,
    "",
    data.notas
      ? `NOTAS ADICIONALES\n${data.notas}\n`
      : "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    `Enviado: ${new Date().toLocaleString("es-ES", { timeZone: "Europe/Madrid" })}`,
  ];

  return lines.filter((l) => l !== "").join("\n");
}
