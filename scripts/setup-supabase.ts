/**
 * Crea un proyecto Supabase nuevo y configura .env.local
 *
 * Uso:
 *   SUPABASE_ACCESS_TOKEN=sbp_xxx npx tsx scripts/setup-supabase.ts
 *
 * Token: https://supabase.com/dashboard/account/tokens
 */

import { config } from "dotenv";
import { randomBytes } from "crypto";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { join } from "path";
import bcrypt from "bcryptjs";

config({ path: join(process.cwd(), ".env.local") });

const API = "https://api.supabase.com/v1";
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const PROJECT_NAME = process.env.SUPABASE_PROJECT_NAME ?? "captacion-rami";
const REGION = process.env.SUPABASE_REGION ?? "eu-west-1";

function authHeaders() {
  if (!TOKEN) {
    console.error("Falta SUPABASE_ACCESS_TOKEN");
    console.error("Genera uno en: https://supabase.com/dashboard/account/tokens");
    process.exit(1);
  }
  return {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  };
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: { ...authHeaders(), ...init?.headers },
  });
  const text = await res.text();
  if (!res.ok) {
    throw new Error(`${res.status} ${path}: ${text}`);
  }
  return text ? (JSON.parse(text) as T) : ({} as T);
}

type Org = { id: string; name: string };
type Project = {
  id: string;
  ref: string;
  name: string;
  status: string;
  region: string;
};

async function waitForActive(ref: string, maxAttempts = 40) {
  for (let i = 0; i < maxAttempts; i++) {
    const project = await api<Project>(`/projects/${ref}`);
    console.log(`  Estado: ${project.status} (${i + 1}/${maxAttempts})`);
    if (project.status === "ACTIVE_HEALTHY") return project;
    await new Promise((r) => setTimeout(r, 15000));
  }
  throw new Error("Timeout esperando proyecto ACTIVE_HEALTHY");
}

function poolerUrl(ref: string, password: string, region: string) {
  const host = `aws-0-${region.replace("eu-west-1", "eu-central-1")}.pooler.supabase.com`;
  return `postgresql://postgres.${ref}:${encodeURIComponent(password)}@${host}:6543/postgres?pgbouncer=true`;
}

function mergeEnvLocal(updates: Record<string, string>) {
  const envPath = join(process.cwd(), ".env.local");
  let content = existsSync(envPath) ? readFileSync(envPath, "utf-8") : "";

  for (const [key, value] of Object.entries(updates)) {
    const line = `${key}=${value}`;
    const regex = new RegExp(`^${key}=.*$`, "m");
    if (regex.test(content)) {
      content = content.replace(regex, line);
    } else {
      content += content.endsWith("\n") || content === "" ? "" : "\n";
      content += `\n# Supabase (auto)\n${line}\n`;
    }
  }

  writeFileSync(envPath, content.trim() + "\n");
  console.log("Actualizado:", envPath);
}

async function main() {
  console.log("1. Listando organizaciones...");
  const orgs = await api<Org[]>("/organizations");
  if (!orgs.length) throw new Error("No hay organizaciones en tu cuenta Supabase");
  const org = orgs[0];
  console.log(`   Usando: ${org.name} (${org.id})`);

  const dbPassword = randomBytes(16).toString("base64url");
  console.log(`2. Creando proyecto "${PROJECT_NAME}" en ${REGION}...`);

  const created = await api<Project>("/projects", {
    method: "POST",
    body: JSON.stringify({
      organization_id: org.id,
      name: PROJECT_NAME,
      region: REGION,
      db_pass: dbPassword,
    }),
  });

  console.log(`   Ref: ${created.ref}`);
  console.log("3. Esperando que el proyecto este listo...");
  const project = await waitForActive(created.ref);

  const databaseUrl = poolerUrl(project.ref, dbPassword, project.region);
  const nextAuthSecret = randomBytes(32).toString("base64");
  const adminPassword = randomBytes(12).toString("base64url");
  const adminHash = await bcrypt.hash(adminPassword, 12);

  mergeEnvLocal({
    DATABASE_URL: databaseUrl,
    NEXTAUTH_SECRET: nextAuthSecret,
    NEXTAUTH_URL: "http://localhost:3000",
    ADMIN_EMAIL: "admin@ramiroperez.com",
    ADMIN_PASSWORD_HASH: adminHash,
  });

  console.log("\n--- Proyecto creado ---");
  console.log("Dashboard:", `https://supabase.com/dashboard/project/${project.ref}`);
  console.log("DATABASE_URL: configurada en .env.local");
  console.log("\n--- Admin (guarda esto) ---");
  console.log("Email:    admin@ramiroperez.com");
  console.log("Password:", adminPassword);
  console.log("\nSiguiente paso:");
  console.log("  npx prisma db push");
  console.log("  npm run dev");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
