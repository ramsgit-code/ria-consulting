/**
 * Blog Auto-Publisher Agent
 *
 * Genera articulos de blog con Claude y los publica como archivos MDX
 * en el proyecto Next.js automaticamente.
 *
 * Uso:
 *   npx tsx scripts/blog-agent.ts
 *   npx tsx scripts/blog-agent.ts --topic "como automatizar whatsapp empresa"
 *
 * Para automatizar: añadir a cron o GitHub Actions (ver abajo)
 */

import Anthropic from "@anthropic-ai/sdk";
import * as fs from "fs";
import * as path from "path";
import { config } from "dotenv";

// Carga .env.local automaticamente
config({ path: path.join(process.cwd(), ".env.local") });

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// ─── Topics queue — edita esta lista para programar articulos ────────────────
const TOPIC_QUEUE = [
  "como automatizar el seguimiento de leads sin perder tiempo",
  "que es go high level y para que sirve en ventas",
  "lead scoring automatico: como filtrar leads buenos de malos",
  "propuestas comerciales automaticas: guia practica",
  "whatsapp business para ventas: como montar un sistema real",
  "crm para freelances y agencias: que usar y como configurarlo",
  "como cualificar leads automaticamente con formularios inteligentes",
  "funnel de captacion b2b: estructura que convierte",
];

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  content: string;
}

async function generateBlogPost(topic: string): Promise<BlogPost> {
  console.log(`\n Generando articulo sobre: "${topic}"`);

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 4000,
    messages: [
      {
        role: "user",
        content: `Eres el ghostwriter de Ramiro Perez, especialista en automatizacion comercial, CRM y sistemas de captacion de leads.

Escribe un articulo de blog en ESPANOL sobre: "${topic}"

CONTEXTO DE MARCA:
- Ramiro vende: Lead Qualification Systems, Proposal Automation, WhatsApp + CRM Automation
- Herramientas principales: Go High Level, WhatsApp Business, integraciones API
- Clientes: Hospital Capilar (clinica), Eventos Barcelona, Hermetic
- Tono: profesional, directo, orientado a negocio — sin humo ni jerga de startup

FORMATO DE RESPUESTA (JSON estricto, sin texto extra):
{
  "slug": "url-del-articulo-en-kebab-case",
  "title": "Titulo del articulo (max 65 chars)",
  "description": "Meta description SEO (max 155 chars)",
  "tags": ["tag1", "tag2", "tag3"],
  "content": "Contenido completo en Markdown..."
}

ESTRUCTURA DEL ARTICULO:
- Intro directa (2-3 frases, sin relleno)
- H2: El problema real
- H2: La solucion practica (con ejemplos concretos)
- H2: Como implementarlo paso a paso
- H2: Resultado que puedes esperar
- CTA final: invitar a solicitar diagnostico en /diagnostico
- Longitud: 800-1200 palabras
- Sin listas de 10 puntos genericas. Ejemplos reales y concretos.`,
      },
    ],
  });

  const raw = (response.content[0] as { text: string }).text.trim();
  const jsonMatch = raw.match(/\{[\s\S]*\}/);
  if (!jsonMatch) throw new Error("Claude no devolvio JSON valido");

  const parsed = JSON.parse(jsonMatch[0]);
  return {
    ...parsed,
    date: new Date().toISOString().split("T")[0],
  };
}

function writeMDXFile(post: BlogPost): string {
  const blogDir = path.join(process.cwd(), "src", "content", "blog");
  fs.mkdirSync(blogDir, { recursive: true });

  const frontmatter = `---
title: "${post.title}"
description: "${post.description}"
date: "${post.date}"
tags: [${post.tags.map((t) => `"${t}"`).join(", ")}]
---

`;

  const filePath = path.join(blogDir, `${post.slug}.mdx`);
  fs.writeFileSync(filePath, frontmatter + post.content, "utf-8");
  return filePath;
}

async function main() {
  const topicArg = process.argv.find((a) => a.startsWith("--topic="))?.split("=")[1];
  const topic = topicArg || TOPIC_QUEUE[Math.floor(Math.random() * TOPIC_QUEUE.length)];

  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY no esta configurada");
    process.exit(1);
  }

  const post = await generateBlogPost(topic);
  const filePath = writeMDXFile(post);

  console.log(`\nArticulo generado:`);
  console.log(`  Titulo:  ${post.title}`);
  console.log(`  Slug:    ${post.slug}`);
  console.log(`  Archivo: ${filePath}`);
  console.log(`  Tags:    ${post.tags.join(", ")}`);
  console.log(`\nPara publicar: git add . && git commit -m "blog: ${post.title}" && git push`);
}

main().catch(console.error);
