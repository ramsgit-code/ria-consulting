import { NextRequest, NextResponse } from "next/server";
import { requireAdminSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const data: { approved?: boolean } = {};
  if (typeof body.approved === "boolean") data.approved = body.approved;

  const item = await prisma.testimonial.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(item);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!(await requireAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  await prisma.testimonial.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
