import { getErrorMessage } from "@/lib/helpers/getErrorFunction";
import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";
import { z } from "zod";
import * as bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { generateToken } from "@/lib/helpers/jwt-helper";
import { loginSchema } from "@/lib/schemas/schemas";

export async function POST(req: Request) {
  try {
    const body = loginSchema.parse(await req.json());

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!existingUser) {
      throw new Error("An account with that email does not exist");
    }

    const passwordMatch = await bcrypt.compare(
      body.password,
      existingUser.password
    );

    if (passwordMatch) {
      cookies().set("auth-token", generateToken(String(existingUser.id)), {
        httpOnly: true,
        secure: true,
        expires: new Date(Date.now() + 1 * 60 * 60 * 1000),
        sameSite: true,
      });
      return NextResponse.json({ message: "Success" });
    } else {
      throw new Error("Invalid credentials, try again!");
    }
  } catch (error) {
    return NextResponse.json(getErrorMessage(error), { status: 400 });
  }
}
