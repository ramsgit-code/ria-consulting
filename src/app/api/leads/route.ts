import { NextRequest, NextResponse } from "next/server";
import { calculateScore, getTier, getTags } from "@/lib/lead-scoring";
import { createOrUpdateContact, createOpportunity, buildOpportunityFields } from "@/lib/ghl";

export async function POST(req: NextRequest) {
  let data: Record<string, unknown> = {};

  try {
    data = await req.json();
    console.log("[leads API] Received lead:", { nombre: data.nombre, empresa: data.empresa, email: data.email });

    // 1. Lead scoring
    const score = calculateScore({
      presupuesto:    data.presupuesto    as string,
      urgencia:       data.urgencia       as string,
      volumen_leads:  data.volumen_leads  as string,
      tamano_equipo:  data.tamano_equipo  as string,
      crm_actual:     data.crm_actual     as string,
      sector:         data.sector         as string,
    });

    const tier = getTier(score);
    const tags = getTags({
      presupuesto:    data.presupuesto    as string,
      urgencia:       data.urgencia       as string,
      volumen_leads:  data.volumen_leads  as string,
      tamano_equipo:  data.tamano_equipo  as string,
      crm_actual:     data.crm_actual     as string,
      sector:         data.sector         as string,
      como_conociste: data.como_conociste as string,
      tier,
    });

    console.log("[leads API] Score:", score, "Tier:", tier);
    console.log("[leads API] Env check - API_KEY:", !!process.env.GHL_API_KEY, "LOC_ID:", !!process.env.GHL_LOCATION_ID, "PIPELINE:", !!process.env.GHL_PIPELINE_ID, "STAGE:", !!process.env.GHL_STAGE_NUEVO_LEAD);

    // 2. Parse name
    const [firstName, ...rest] = (data.nombre as string).trim().split(" ");
    const lastName = rest.join(" ");

    // 3. Create or retrieve contact
    const contactRes = await createOrUpdateContact({
      firstName,
      lastName,
      email:   data.email    as string,
      phone:   data.telefono as string,
      website: data.web      as string | undefined,
      source:  data.como_conociste as string,
      tags,
    });

    const contactId: string | undefined = contactRes?.contact?.id;
    console.log("[leads API] Contact ID:", contactId);

    if (!contactId) {
      console.error("[leads API] No contact ID returned:", JSON.stringify(contactRes));
      return NextResponse.json({ ok: true, score, tier, warn: "no contact id" });
    }

    // 4. Create opportunity with all form fields as custom fields
    if (!process.env.GHL_PIPELINE_ID || !process.env.GHL_STAGE_NUEVO_LEAD) {
      console.error("[leads API] MISSING ENV VARS: GHL_PIPELINE_ID or GHL_STAGE_NUEVO_LEAD not set — skipping opportunity");
    } else {
      const opportunityName = `${data.nombre} — ${data.empresa} [${tier.toUpperCase()} · ${score}pts]`;
      const oppRes = await createOpportunity({
        name:            opportunityName,
        pipelineId:      process.env.GHL_PIPELINE_ID,
        pipelineStageId: process.env.GHL_STAGE_NUEVO_LEAD,
        contactId,
        status:          "open",
        customFields:    buildOpportunityFields(data, score, tier),
      });
      console.log("[leads API] Opportunity created:", oppRes?.opportunity?.id);
    }

    console.log("[leads API] Done OK — score:", score, "tier:", tier);
    return NextResponse.json({ ok: true, score, tier });

  } catch (err) {
    console.error("[leads API] ERROR:", err instanceof Error ? err.message : String(err));
    console.error("[leads API] Lead data:", { nombre: data.nombre, empresa: data.empresa, email: data.email });
    return NextResponse.json({ ok: true, fallback: true, error: (err as Error).message });
  }
}
