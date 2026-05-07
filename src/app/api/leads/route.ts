import { NextRequest, NextResponse } from "next/server";
import { calculateScore, getTier, getTags } from "@/lib/lead-scoring";
import { createOrUpdateContact, createOpportunity, addNoteToContact, buildFormNote } from "@/lib/ghl";

export async function POST(req: NextRequest) {
  let data: Record<string, unknown> = {};

  try {
    data = await req.json();

    // 1. Lead scoring
    const score = calculateScore({
      presupuesto: data.presupuesto as string,
      urgencia: data.urgencia as string,
      volumen_leads: data.volumen_leads as string,
      tamano_equipo: data.tamano_equipo as string,
      crm_actual: data.crm_actual as string,
      sector: data.sector as string,
    });

    const tier = getTier(score);
    const tags = getTags({
      presupuesto: data.presupuesto as string,
      urgencia: data.urgencia as string,
      volumen_leads: data.volumen_leads as string,
      tamano_equipo: data.tamano_equipo as string,
      crm_actual: data.crm_actual as string,
      sector: data.sector as string,
      como_conociste: data.como_conociste as string,
      tier,
    });

    // 2. Parse name
    const [firstName, ...rest] = (data.nombre as string).trim().split(" ");
    const lastName = rest.join(" ");

    // 3. Create contact in GHL
    const contactRes = await createOrUpdateContact({
      firstName,
      lastName,
      email: data.email as string,
      phone: data.telefono as string,
      website: data.web as string | undefined,
      source: data.como_conociste as string,
      tags,
    });

    const contactId: string | undefined = contactRes?.contact?.id;

    if (!contactId) {
      console.error("[leads API] Contact created but no ID returned:", JSON.stringify(contactRes));
      return NextResponse.json({ ok: true, score, tier, warn: "no contact id" });
    }

    // 4. Add note with ALL form fields — visible when opening the contact/opportunity
    const note = buildFormNote(data, score, tier);
    await addNoteToContact(contactId, note);

    // 5. Create opportunity
    if (!process.env.GHL_PIPELINE_ID || !process.env.GHL_STAGE_NUEVO_LEAD) {
      console.warn("[leads API] GHL_PIPELINE_ID or GHL_STAGE_NUEVO_LEAD not set — skipping opportunity");
    } else {
      const opportunityName = `${data.nombre} — ${data.empresa} [${tier.toUpperCase()} ${score}pts]`;

      await createOpportunity({
        name: opportunityName,
        pipelineId: process.env.GHL_PIPELINE_ID,
        pipelineStageId: process.env.GHL_STAGE_NUEVO_LEAD,
        contactId,
        status: "open",
      });
    }

    return NextResponse.json({ ok: true, score, tier });

  } catch (err) {
    // Log full error details to Vercel logs — helps debug API key / config issues
    console.error("[leads API] ERROR:", err instanceof Error ? err.message : String(err));
    console.error("[leads API] Data received:", JSON.stringify({
      nombre: data.nombre,
      empresa: data.empresa,
      email: data.email,
      sector: data.sector,
    }));

    // Still return 200 so the user sees the thank-you screen
    // Check Vercel logs to debug the actual GHL error
    return NextResponse.json({ ok: true, fallback: true, error: (err as Error).message });
  }
}
