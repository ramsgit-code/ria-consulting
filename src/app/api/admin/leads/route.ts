import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tier = req.nextUrl.searchParams.get("tier");
  const limit = Math.min(Number(req.nextUrl.searchParams.get("limit") ?? 50), 100);

  const leads = await prisma.leadSubmission.findMany({
    where: tier ? { tier } : undefined,
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return NextResponse.json(leads);
}
