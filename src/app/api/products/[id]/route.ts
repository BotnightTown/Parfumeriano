import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { mapProduct } from "@/lib/productMapper";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const product = await prisma.products.findUnique({
    where: { ProductId: Number(id) },
    include: {
      ProductCapacities: { include: { Capacities: true } },
    },
  });

  if (!product)
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(mapProduct(product));
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const body = await req.json();

  await prisma.productCapacities.deleteMany({
    where: { ProductId: Number(id) },
  });

  const product = await prisma.products.update({
    where: { ProductId: Number(id) },
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

  return NextResponse.json(product);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const productId = Number(id);

  await prisma.$transaction(async (tx) => {
    await tx.productCapacities.deleteMany({
      where: { ProductId: productId },
    });

    await tx.orderItems.deleteMany({
      where: { ProductId: productId },
    });

    await tx.products.delete({
      where: { ProductId: productId },
    });
  });

  return NextResponse.json({ success: true });
}
