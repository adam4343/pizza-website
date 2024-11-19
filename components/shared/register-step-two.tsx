"use client";
import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import { TRegisterSteps } from "./register";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  firstStepRegisterSchema,
  secondStepRegisterSchema,
} from "@/lib/schemas/schemas";
import { useRouter } from "next/navigation";

type TRegisterStepTwo = z.infer<typeof secondStepRegisterSchema>;

export const RegisterStepTwo = ({
  registerStep,
  setRegisterStep,
}: {
  registerStep: TRegisterSteps;
  setRegisterStep: (currentStep: TRegisterSteps) => void;
}) => {
  const route = useRouter();
  const form = useForm<TRegisterStepTwo>({
    resolver: zodResolver(secondStepRegisterSchema),
  });
  const mutation = useMutation({
    mutationKey: ["email"],
    mutationFn: async (data: TRegisterStepTwo) => {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data,
        }),
        credentials: "include",
      });
    },
    onError: (e) => {
      toast.error(e.message);
      console.error("Error is", e);
    },
    onSuccess: () => {
      toast.success("Your account has been succesfully created!");
      setTimeout(() => {
        route.push("/");
      }, 1000);
    },
  });

  return (
    <>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit((data) => mutation.mutate(data))();
        }}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                {...form.register("password")}
                id="password"
                placeholder="Password"
                error={form.formState.errors.password?.message}
              />
            </div>
          </div>
          <div>
            <Label htmlFor="confirm-pass">Confirm Password</Label>
            <div className="relative">
              <Input
                {...form.register("confirmPassword")}
                id="confirm-pass"
                type="password"
                placeholder="Confirm Password"
                error={form.formState.errors.confirmPassword?.message}
              />
            </div>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full text-md bg-primary hover:bg-orange-600 text-white"
        >
          Create Account
        </Button>
      </form>
    </>
  );
};
