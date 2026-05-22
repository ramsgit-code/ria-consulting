/**
 * Conecta un proyecto Supabase existente por ref o URL.
 *
 * Opcion A — con token (resetea password y configura todo):
 *   SUPABASE_ACCESS_TOKEN=sbp_xxx npx tsx scripts/connect-supabase.ts qbilyhpsiqmflezimafm
 *
 * Opcion B — con password que elegiste al crear el proyecto:
 *   SUPABASE_DB_PASSWORD=tu_password npx tsx scripts/connect-supabase.ts qbilyhpsiqmflezimafm
 */

import { config } from "dotenv";
import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import bcrypt from "bcryptjs";

config({ path: join(process.cwd(), ".env.local") });

const API = "https://api.supabase.com/v1";
const TOKEN = process.env.SUPABASE_ACCESS_TOKEN;
const INPUT = process.argv[2] ?? process.env.SUPABASE_PROJECT_REF ?? "";

function parseRef(input: string): string {
  if (input.includes("supabase.co")) {
    const m = input.match(/https?:\/\/([^.]+)\.supabase\.co/);
    if (m) return m[1];
  }
  return input.trim();
}

const REF = parseRef(INPUT);
if (!REF) {
  console.error("Uso: npx tsx scripts/connect-supabase.ts <project-ref-o-url>");
  process.exit(1);
}

function poolerHost(region: string) {
  const map: Record<string, string> = {
    "eu-west-1": "aws-0-eu-west-1.pooler.supabase.com",
    "eu-west-2": "aws-0-eu-west-2.pooler.supabase.com",
    "eu-central-1": "aws-0-eu-central-1.pooler.supabase.com",
    "us-east-1": "aws-0-us-east-1.pooler.supabase.com",
  };
  return map[region] ?? "aws-0-eu-central-1.pooler.supabase.com";
}

function buildDatabaseUrl(ref: string, password: string, _region?: string) {
  // Conexion directa (fiable para prisma db push y desarrollo local)
  return `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`;
}

function buildPoolerUrl(ref: string, password: string, region: string) {
  const host = poolerHost(region);
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
      if (!content.includes("# Supabase")) {
        content += "\n\n# Supabase\n";
      }
      content += `${line}\n`;
    }
  }

  writeFileSync(envPath, content.trim() + "\n");
}

async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status} ${path}: ${text}`);
  return text ? (JSON.parse(text) as T) : ({} as T);
}

async function main() {
  let password = process.env.SUPABASE_DB_PASSWORD ?? "";
  let region = process.env.SUPABASE_REGION ?? "eu-central-1";

  if (TOKEN) {
    console.log(`Obteniendo proyecto ${REF}...`);
    const project = await api<{ region: string; name: string; status: string }>(
      `/projects/${REF}`
    );
    region = project.region;
    console.log(`Region: ${region}`);

    password = randomBytes(18).toString("base64url");
    console.log("Actualizando password de base de datos...");
    await api(`/projects/${REF}/database/password`, {
      method: "PATCH",
      body: JSON.stringify({ password }),
    });
    console.log("Password actualizada.");
  } else if (!password) {
    console.error(
      "Falta SUPABASE_ACCESS_TOKEN o SUPABASE_DB_PASSWORD.\n" +
        "Token: https://supabase.com/dashboard/account/tokens\n" +
        "Password: la que pusiste al crear el proyecto en Supabase → Settings → Database"
    );
    process.exit(1);
  }

  const databaseUrl = buildDatabaseUrl(REF, password, region);
  const nextAuthSecret =
    process.env.NEXTAUTH_SECRET ?? randomBytes(32).toString("base64");
  const adminPassword =
    process.env.ADMIN_PASSWORD_PLAIN ?? randomBytes(12).toString("base64url");
  const adminHash =
    process.env.ADMIN_PASSWORD_HASH ?? (await bcrypt.hash(adminPassword, 12));

  mergeEnvLocal({
    NEXT_PUBLIC_SUPABASE_URL: `https://${REF}.supabase.co`,
    SUPABASE_PROJECT_REF: REF,
    DATABASE_URL: databaseUrl,
    NEXTAUTH_SECRET: nextAuthSecret,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL ?? "http://localhost:3000",
    ADMIN_EMAIL: process.env.ADMIN_EMAIL ?? "admin@ramiroperez.com",
    ADMIN_PASSWORD_HASH: adminHash,
  });

  console.log("\n.env.local actualizado.");
  console.log("Dashboard:", `https://supabase.com/dashboard/project/${REF}`);

  if (!process.env.ADMIN_PASSWORD_HASH) {
    console.log("\n--- Admin login ---");
    console.log("Email:    admin@ramiroperez.com");
    console.log("Password:", adminPassword);
  }

  if (TOKEN) {
    console.log("\n--- Guarda esta password de DB (por si la necesitas) ---");
    console.log(password);
  }

  console.log("\nCreando tablas en Supabase...");
  execSync("npx prisma db push", {
    stdio: "inherit",
    cwd: process.cwd(),
    env: { ...process.env, DATABASE_URL: databaseUrl },
  });
  console.log("\nListo. Ejecuta: npm run dev");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
