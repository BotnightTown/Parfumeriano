import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const existing = await prisma.customers.findUnique({
    where: { Email: email },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Email вже використовується" },
      { status: 400 },
    );
  }

  const hashed = await bcrypt.hash(password, 10);

  const customer = await prisma.customers.create({
    data: { Name: name, Email: email, Password: hashed, role: "user" },
  });

  return NextResponse.json({ id: customer.CustomerId }, { status: 201 });
}
