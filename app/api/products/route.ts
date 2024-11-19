import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const searchParam = new URL(request.url).searchParams;
    let products = [];

    if (!searchParam.has("productSearch")) {
      products = await prisma.product.findMany();
    } else {
      const productName = searchParam.get("productSearch")!.trim();

      const startsWithProducts = await prisma.product.findMany({
        where: {
          name: {
            startsWith: productName,
            mode: "insensitive",
          },
        },
        include: {
          items: true,
        },
      });

  
      const containsProducts = await prisma.product.findMany({
        where: {
          name: {
            contains: productName,
            mode: "insensitive",
          },
          id: {
            notIn: startsWithProducts.map((product) => product.id),
          },
        },
        include: {
          items: true,
        },
      });

      products = [...startsWithProducts, ...containsProducts];

      if (!products.length) {
        return NextResponse.json({ message: "No products found" });
      }
    }

    return NextResponse.json(products);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message });
    }
  }
}
