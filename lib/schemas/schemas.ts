import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, { message: "Email must be at least 3 characters long" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const firstStepRegisterSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  name: z.string().min(4, "Name must be at least 4 characters"),
});

export const secondStepRegisterSchema = firstStepRegisterSchema
  .extend({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, {
      message: "Confirm Password must be same as password",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const forgotMailSchema = z.object({
  email: z.string().email("Please provide a valid email"),
});

export const forgotPassSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm Password must be the same as password" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
