import { getErrorMessage } from "@/lib/helpers/getErrorFunction";
import { prisma } from "@/prisma/prisma-client";
import { hash } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from "zod";

const forgotPassSchema = z
  .object({
    step: z.enum(["email", "otp", "password"]),
    payload: z.object({
      email: z.string().email(),
      otp: z.string().optional(),
      password: z.string().optional(),
      confirmPassword: z.string().optional(),
    }),
  })
  .superRefine((val, ctx) => {
    if (val.step === "password") {
      if (!val.payload.password || val.payload.password.length < 6) {
        ctx.addIssue({
          code: "custom",
          path: ["payload", "password"],
          message: "Password should be at least 6 characters",
        });
      }
      if (val.payload.password !== val.payload.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          path: ["payload", "confirmPassword"],
          message: "Passwords do not match",
        });
      }
    }
  });

export async function POST(req: Request) {
  try {
    const body = forgotPassSchema.parse(await req.json());

    const existingUser = await prisma.user.findUnique({
      where: {
        email: body.payload.email,
      },
    });

    if (!existingUser) {
      throw new Error("Please enter existing user email");
    }
    if (body.step === "email") {
      const otp = generateOtp();

      await prisma.verificationCode.deleteMany({
        where: {
          userId: existingUser.id,
        },
      });
      await prisma.verificationCode.create({
        data: {
          code: otp,
          expiredAt: new Date(Date.now() + 5 * 60 * 1000),
          userId: existingUser.id,
        },
      });
      return NextResponse.json({ message: "OTP sent successfully" });
    }

    if (body.step === "otp") {
      const otp = body.payload.otp;

      const existingOTP = await prisma.verificationCode.findFirst({
        where: {
          code: otp,
          user: {
            email: body.payload.email,
          },
        },
      });

      if (!existingOTP) {
        throw new Error("Wrong OTP, please enter the correct one");
      }

      if (existingOTP.expiredAt < new Date()) {
        throw new Error("Your OTP has expired, please request a new one");
      }
      return NextResponse.json("Successfully going to next step");
    }

    if (body.step === "password") {
      const newPassword = body.payload.password ?? "";
      const hashedPass = await hash(newPassword, 10);

      await prisma.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPass },
      });
      return NextResponse.json({ message: "Password changed successfully" });
    }
  } catch (e) {
    const errorMessage = getErrorMessage(e);
    return NextResponse.json(errorMessage, { status: 400 });
  }
}
function generateOtp() {
  const sixDigits = Math.floor(100000 + Math.random() * 900000);
  return sixDigits.toString();
}
