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
import { firstStepRegisterSchema } from "@/lib/schemas/schemas";

type TRegisterStepOne = z.infer<typeof firstStepRegisterSchema>;

export const RegisterStepOne = ({
  registerStep,
  setRegisterStep,
}: {
  registerStep: TRegisterSteps;
  setRegisterStep: (currentStep: TRegisterSteps) => void;
}) => {
  const form = useForm<TRegisterStepOne>({
    resolver: zodResolver(firstStepRegisterSchema),
  });
  const mutation = useMutation({
    mutationKey: ["email"],
    mutationFn: async (data: TRegisterStepOne) => {
      const res = await fetch("http://localhost:3000/api/auth/register-check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data,
        }),
      });
    },
    onError: (e) => {
      toast.error(e.message);
      console.error("Error is", e);
    },
    onSuccess: () => {
      setRegisterStep("password");
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
            <Label htmlFor="username">Username</Label>
            <div className="relative">
              <Input
                {...form.register("name")}
                id="username"
                placeholder="Username"
                error={form.formState.errors.name?.message}
              />
            </div>
          </div>
          <div>
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
        </div>

        <Button
          type="submit"
          className="w-full text-md bg-primary hover:bg-orange-600 text-white"
        >
          Next
        </Button>
      </form>
    </>
  );
};
