/**
 * Prospecting Agent — Ramiro Perez
 *
 * Busca empresas objetivo, las puntua y genera mensajes de outreach
 * personalizados listos para enviar por email o LinkedIn.
 *
 * Uso:
 *   npx tsx scripts/prospecting-agent.ts
 *   npx tsx scripts/prospecting-agent.ts --sector=clinicas --pais=españa --n=10
 *
 * Output: /scripts/output/prospects-YYYY-MM-DD.json + prospects-YYYY-MM-DD.csv
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

config({ path: path.join(process.cwd(), ".env.local") });

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Config ──────────────────────────────────────────────────────────────────

const RAMIRO_CONTEXT = `
Eres el agente de prospecting de Ramiro Perez, especialista en automatizacion comercial.

Ramiro vende estos sistemas:
A) Lead Qualification System — para negocios con 10+ leads/mes que pierden tiempo con leads malos
B) Proposal Automation System — para negocios que tardan mas de 1 dia en enviar propuestas
C) WhatsApp + CRM Automation — para negocios donde WhatsApp es canal principal sin sistema

Clientes ideales:
- Clinicas / centros medicos / hospitales privados
- Empresas de eventos, catering, wedding planners
- Academias, cursos online, formacion profesional
- Agencias de marketing, consultoras, despachos profesionales
- Inmobiliarias, promotoras
- Empresas con equipo comercial de 2-20 personas

Precio: entre 1.500€ y 8.000€ por proyecto
Geografía: España, Mexico, Colombia, Argentina, cualquier pais hispanohablante + Portugal + internacionales en ingles

Tono de los mensajes: directo, sin humo, orientado a negocio.
No usar palabras como: sinergia, disruptivo, innovador, potenciar, impulsar.
Hablar de resultados concretos, no de tecnologia.
`;

interface Prospect {
  empresa: string;
  sector: string;
  pais: string;
  descripcion: string;
  problema_probable: string;
  score: number; // 1-10
  razon_score: string;
  email_subject: string;
  email_body: string;
  linkedin_message: string;
  whatsapp_message: string;
  buscar_en: string; // donde buscarlos
}

interface SearchParams {
  sector: string;
  pais: string;
  n: number;
}

async function generateProspects(params: SearchParams): Promise<Prospect[]> {
  console.log(`\nBuscando ${params.n} prospects en: ${params.sector} / ${params.pais}`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 8000,
    messages: [
      {
        role: "user",
        content: `${RAMIRO_CONTEXT}

Genera ${params.n} empresas prospects reales y especificas del sector "${params.sector}" en "${params.pais}".

Para cada prospect:
- Usa nombres de empresas REALES o muy plausibles (no inventadas genéricas)
- Identifica su problema comercial probable basandote en su tipo de negocio
- Genera mensajes de outreach personalizados para CADA empresa (no genericos)
- El email debe ser corto: max 5 lineas, directo al problema especifico de esa empresa
- El mensaje de LinkedIn: max 3 lineas, conversacional
- El WhatsApp: 2 lineas max, como si fueras un conocido

Responde SOLO con un array JSON valido, sin texto adicional:
[
  {
    "empresa": "nombre real de la empresa",
    "sector": "${params.sector}",
    "pais": "${params.pais}",
    "descripcion": "que hacen en 1 linea",
    "problema_probable": "problema comercial especifico que probablemente tienen",
    "score": 8,
    "razon_score": "por que es un buen prospect",
    "email_subject": "asunto del email de prospecting",
    "email_body": "cuerpo del email (max 5 lineas, personalizado para esta empresa)",
    "linkedin_message": "mensaje de conexion en LinkedIn (max 3 lineas)",
    "whatsapp_message": "mensaje de WhatsApp si tienes el numero (max 2 lineas)",
    "buscar_en": "Google Maps / LinkedIn / web directa / directorio especifico"
  }
]`,
      },
    ],
  });

  const raw = (response.content[0] as { text: string }).text.trim();
  const jsonMatch = raw.match(/\[[\s\S]*\]/);
  if (!jsonMatch) throw new Error("Claude no devolvio JSON valido");

  return JSON.parse(jsonMatch[0]);
}

function saveOutput(prospects: Prospect[], params: SearchParams) {
  const outputDir = path.join(process.cwd(), "scripts", "output");
  fs.mkdirSync(outputDir, { recursive: true });

  const date = new Date().toISOString().split("T")[0];
  const baseName = `prospects-${params.sector.replace(/\s+/g, "-")}-${date}`;

  // JSON completo
  const jsonPath = path.join(outputDir, `${baseName}.json`);
  fs.writeFileSync(jsonPath, JSON.stringify(prospects, null, 2), "utf-8");

  // CSV para copiar/pegar en Google Sheets o Notion
  const csvHeaders = "empresa,sector,pais,score,problema_probable,email_subject,buscar_en\n";
  const csvRows = prospects
    .map((p) =>
      [p.empresa, p.sector, p.pais, p.score, `"${p.problema_probable}"`, `"${p.email_subject}"`, p.buscar_en].join(",")
    )
    .join("\n");
  const csvPath = path.join(outputDir, `${baseName}.csv`);
  fs.writeFileSync(csvPath, csvHeaders + csvRows, "utf-8");

  // Markdown legible con todos los mensajes
  const mdLines = [
    `# Prospects — ${params.sector} / ${params.pais}`,
    `Generado: ${new Date().toLocaleString("es-ES")}`,
    `Total: ${prospects.length} prospects`,
    "",
    "---",
    "",
    ...prospects
      .sort((a, b) => b.score - a.score)
      .map(
        (p) => `## ${p.empresa} · Score: ${p.score}/10

**Sector:** ${p.sector} | **Pais:** ${p.pais}
**Que hacen:** ${p.descripcion}
**Problema probable:** ${p.problema_probable}
**Por que es buen prospect:** ${p.razon_score}
**Donde buscarlos:** ${p.buscar_en}

### Email
**Asunto:** ${p.email_subject}

${p.email_body}

### LinkedIn
${p.linkedin_message}

### WhatsApp
${p.whatsapp_message}

---`
      ),
  ];
  const mdPath = path.join(outputDir, `${baseName}.md`);
  fs.writeFileSync(mdPath, mdLines.join("\n"), "utf-8");

  return { jsonPath, csvPath, mdPath };
}

async function main() {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY no configurada");
    process.exit(1);
  }

  // Parse args: --sector=clinicas --pais=españa --n=10
  const args = process.argv.slice(2);
  const get = (key: string, def: string) =>
    args.find((a) => a.startsWith(`--${key}=`))?.split("=")[1] ?? def;

  const params: SearchParams = {
    sector: get("sector", "clinicas y centros medicos privados"),
    pais: get("pais", "España"),
    n: parseInt(get("n", "10")),
  };

  const prospects = await generateProspects(params);
  const files = saveOutput(prospects, params);

  // Summary en consola
  console.log(`\n✓ ${prospects.length} prospects generados\n`);
  console.log("Top 5 por score:");
  prospects
    .sort((a, b) => b.score - a.score)
    .slice(0, 5)
    .forEach((p) => {
      console.log(`  ${p.score}/10  ${p.empresa} — ${p.problema_probable}`);
    });

  console.log(`\nArchivos guardados:`);
  console.log(`  Markdown: ${files.mdPath}`);
  console.log(`  CSV:      ${files.csvPath}`);
  console.log(`  JSON:     ${files.jsonPath}`);
  console.log(`\nPara el siguiente sector:`);
  console.log(`  npx tsx scripts/prospecting-agent.ts --sector="empresas de eventos" --pais="Mexico" --n=15`);
}

main().catch(console.error);
