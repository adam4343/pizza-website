import { getErrorMessage } from "@/lib/helpers/getErrorFunction";
import { firstStepRegisterSchema } from "@/lib/schemas/schemas";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = firstStepRegisterSchema.parse(await req.json());

    const foundUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!foundUser) {
      throw new Error("This email has been already taken");
    }
    return NextResponse.json("Account with this email was found");
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
