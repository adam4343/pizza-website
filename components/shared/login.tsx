import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { Register } from "./register";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/lib/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { TAuthSteps } from "./auth-dialog";

type TLoginSchema = z.infer<typeof loginSchema>;

export const Login = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: TAuthSteps;
  setCurrentStep: (currentStep: TAuthSteps) => void;
}) => {
  const router = useRouter();
  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const mutation = useMutation({
    mutationFn: async (data: TLoginSchema) => {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });
      if (res.ok) {
        return await res.json();
      } else {
        const errorData = await res.json();
        throw new Error(
          errorData.message || "Failed to log in. Please try again."
        );
      }
    },
    onSuccess: () => {
      toast.success("You have been logged in successfully");
      setTimeout(() => {
        form.reset();
      }, 1000);

      router.push("/");
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    },
  });
  const errors = form.formState.errors;
  return (
    <>
      <h2 className="text-2xl font-bold pb-3">Enter your account</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit((data) => {
            mutation.mutate(data);
          })(e);
        }}
        className="space-y-4"
      >
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Input
              {...form.register("email")}
              id="email"
              type="email"
              placeholder="example@email.com"
              error={form.formState.errors.email?.message}
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              {...form.register("password")}
              id="password"
              type="password"
              placeholder="••••••••"
              error={form.formState.errors.password?.message}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => {
              setCurrentStep("forgot-pass");
            }}
            className="text-sm text-primary  hover:underline"
          >
            Forgot your password?
          </button>
        </div>
        <Button
          type="submit"
          className="w-full text-md bg-primary hover:bg-orange-600 text-white"
        >
          Log in
        </Button>
      </form>
      <div className="mt-4 text-center text-sm flex items-center gap-1 justify-center text-gray-600">
        Don't have an account?
        <button
          type="button"
          onClick={() => {
            setCurrentStep("register");
          }}
          className="text-primary hover:underline"
        >
          Register
        </button>
      </div>
    </>
  );
};
