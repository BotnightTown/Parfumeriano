import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type BrandStats = {
  Brand: string;
  ProductCount: number;
  AvgPrice: number;
  MinPrice: number;
  MaxPrice: number;
  SaleCount: number;
  TotalOrders: number;
  TotalRevenue: number;
};

export async function GET() {
  const result = await prisma.$queryRaw<BrandStats[]>`
    SELECT 
      p.Brand,
      COUNT(DISTINCT p.ProductId)                           AS ProductCount,
      ROUND(AVG(p.NormalPrice), 2)                          AS AvgPrice,
      MIN(p.NormalPrice)                                    AS MinPrice,
      MAX(p.NormalPrice)                                    AS MaxPrice,
      COUNT(DISTINCT CASE WHEN p.SalePrice IS NOT NULL 
            THEN p.ProductId END)                           AS SaleCount,
      (
        SELECT COUNT(*)
        FROM OrderItems oi
        JOIN Orders o ON oi.OrderId = o.OrderId
        WHERE oi.ProductId IN (
          SELECT ProductId FROM Products WHERE Brand = p.Brand
        )
      )                                                     AS TotalOrders,
      (
        SELECT ISNULL(SUM(dbo.GetProductFinalPrice(oi.ProductId, oi.Quantity)), 0)
        FROM OrderItems oi
        JOIN Orders o ON oi.OrderId = o.OrderId
        WHERE oi.ProductId IN (
          SELECT ProductId FROM Products WHERE Brand = p.Brand
        )
      )                                                     AS TotalRevenue
    FROM Products p
    GROUP BY p.Brand
    ORDER BY TotalOrders DESC
  `;

  return NextResponse.json(
    result.map((row) => ({
      brand: row.Brand,
      productCount: Number(row.ProductCount),
      avgPrice: Number(row.AvgPrice),
      minPrice: Number(row.MinPrice),
      maxPrice: Number(row.MaxPrice),
      saleCount: Number(row.SaleCount),
      totalOrders: Number(row.TotalOrders),
      totalRevenue: Number(row.TotalRevenue),
    })),
  );
}
