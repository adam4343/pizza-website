import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing product ID" },
        { status: 400 }
      );
    }

    const uniqueProduct = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        ingredients: true,
        items: true,
      },
    });
    if (!uniqueProduct) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const similarProducts = await prisma.product.findMany({
      where: {
        categoryId: uniqueProduct.categoryId,
        id: { not: parseInt(id) },
      },
      include: {
        ingredients: true,
        items: true,
      },
      take: 6,
    });
    return NextResponse.json({ uniqueProduct, similarProducts });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
