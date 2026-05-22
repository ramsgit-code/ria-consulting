import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { getAnalyticsSummary, type AnalyticsPeriod } from "@/lib/analytics";

export async function GET(req: NextRequest) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const days = Number(req.nextUrl.searchParams.get("days") ?? 30) as AnalyticsPeriod;
  const period: AnalyticsPeriod = [7, 30, 90].includes(days) ? days : 30;

  const data = await getAnalyticsSummary(period);
  return NextResponse.json(data);
}
