import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/productMapper";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const brand = searchParams.get("brand");
  const onlySale = searchParams.get("onlySale") === "true";
  const isNew = searchParams.get("isNew") === "true";
  const gender = searchParams.get("gender");

  const products = await prisma.products.findMany({
    where: {
      ...(brand && brand !== "all" ? { Brand: brand } : {}),
      ...(onlySale ? { SalePrice: { not: null } } : {}),
      ...(isNew ? { Year: { gt: 2016 } } : {}),
      ...(gender && gender !== "Unisex" ? { AttrGender: gender } : {}),
    },
    include: {
      ProductCapacities: {
        include: { Capacities: true },
      },
    },
  });

  return NextResponse.json(products.map(mapProduct));
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const product = await prisma.products.create({
    data: {
      Name: body.name,
      Brand: body.brand,
      Year: body.year,
      Description: body.description,
      NormalPrice: body.priceNormal,
      SalePrice: body.priceSale || null,
      ImageMain: body.imageMain,
      ImageList: body.imageList ? JSON.stringify(body.imageList) : null,
      AttrType: body.type || null,
      AttrGender: body.gender || null,
      AttrAroma: body.aroma || null,
      AttrStability: body.stability || null,
      AttrClass: body.classification || null,
      ProductCapacities: {
        create: body.capacity.map((capId: number) => ({
          Capacities: { connect: { Value: capId } },
        })),
      },
    },
  });

  return NextResponse.json(product, { status: 201 });
}
