import { getUser } from "@/lib/helpers/me";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUser();

    const orders = await prisma.order.findMany({
      where: { userId: user.id },

      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(orders);
  } catch (err) {
    const errorMessage = err || "An unexpected error occurred.";
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
