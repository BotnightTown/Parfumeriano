import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const orders = await prisma.orders.findMany({
    where: { CustomerId: Number(session.user.id) },
    include: {
      OrderItems: {
        include: { Products: true },
      },
    },
    orderBy: { OrderDate: "desc" },
  });

  return NextResponse.json(orders);
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { items } = await req.json();
  // items: { productId: number, quantity: number }[]

  if (!items?.length) {
    return NextResponse.json({ error: "Кошик порожній" }, { status: 400 });
  }

  const order = await prisma.$transaction(async (tx) => {
    const newOrder = await tx.orders.create({
      data: {
        CustomerId: Number(session.user.id),
        OrderItems: {
          create: items.map(
            (item: { productId: number; quantity: number }) => ({
              ProductId: item.productId,
              Quantity: item.quantity,
            }),
          ),
        },
      },
      include: {
        OrderItems: { include: { Products: true } },
      },
    });
    return newOrder;
  });

  return NextResponse.json(order, { status: 201 });
}
