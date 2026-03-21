import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customer = await prisma.customers.findUnique({
    where: { CustomerId: Number(session.user.id) },
    select: { Name: true, Email: true, role: true },
  });

  if (!customer)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(customer);
}

export async function PUT(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim())
    return NextResponse.json(
      { error: "Ім'я не може бути порожнім" },
      { status: 400 },
    );

  const customer = await prisma.customers.update({
    where: { CustomerId: Number(session.user.id) },
    data: { Name: name.trim() },
    select: { Name: true, Email: true, role: true },
  });

  return NextResponse.json(customer);
}
