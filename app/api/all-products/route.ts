import { getErrorMessage } from "@/lib/helpers/getErrorFunction";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const allProducts = await prisma.product.findMany({
      include: {
        ingredients: true,
        items: true,
      },
    });

    return NextResponse.json(allProducts);
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
