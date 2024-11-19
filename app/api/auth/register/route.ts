import { getErrorMessage } from "@/lib/helpers/getErrorFunction";
import { generateToken } from "@/lib/helpers/jwt-helper";
import { secondStepRegisterSchema } from "@/lib/schemas/schemas";
import { prisma } from "@/prisma/prisma-client";
import { hash } from "bcrypt";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await secondStepRegisterSchema.safeParseAsync(
      await req.json()
    );

    if (!body.success) {
      return NextResponse.json({ error: body.error.errors }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.data.email,
      },
    });

    if (existingUser) {
      throw new Error("User with this email already exists");
    }

    const hashedPassword = await hash(body.data.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: body.data.email,
        password: hashedPassword,
        fullName: body.data.name,
      },
    });

    const token = generateToken(String(newUser.id));
    cookies().set("auth-token", token, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      sameSite: true,
      secure: true,
    });

    const response = NextResponse.json({
      message: "Login successful",
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    return NextResponse.json({ error: errorMessage }, { status: 400 });
  }
}
