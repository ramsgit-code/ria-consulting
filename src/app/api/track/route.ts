import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const BOT_PATTERN = /bot|crawl|spider|slurp|facebookexternalhit/i;

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") ?? "";
    if (BOT_PATTERN.test(ua)) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const { path, referrer, sessionId } = await req.json();

    if (!path || !sessionId || typeof path !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    await prisma.pageView.create({
      data: {
        path: path.slice(0, 500),
        referrer: referrer?.slice(0, 500) ?? null,
        sessionId: String(sessionId).slice(0, 100),
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
