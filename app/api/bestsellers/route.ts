import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
  try {
    const bestSellers = await prisma.product.findMany({
      include: {
        items: true,
      },
      take: 4,
    });
    return NextResponse.json(bestSellers);
  } catch (e) {
    if (e instanceof Error) {
      return NextResponse.json({ error: e.message });
    } else {
      return NextResponse.json({ error: "Something happend!" });
    }
  }
}
