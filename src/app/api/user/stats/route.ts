import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const customerId = Number(session.user.id);

  const result = await prisma.$queryRaw<
    { OrderCount: number; TotalSpent: number }[]
  >`
    DECLARE @OrderCount INT;
    DECLARE @TotalSpent DECIMAL(10, 2);

    EXEC GetOrderStats
      @CustomerId = ${customerId},
      @OrderCount = @OrderCount OUTPUT,
      @TotalSpent = @TotalSpent OUTPUT;

    SELECT @OrderCount AS OrderCount, @TotalSpent AS TotalSpent;
  `;

  const stats = result[0] ?? { OrderCount: 0, TotalSpent: 0 };

  return NextResponse.json({
    orderCount: Number(stats.OrderCount),
    totalSpent: Number(stats.TotalSpent),
  });
}
