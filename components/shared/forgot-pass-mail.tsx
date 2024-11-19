import React, { useState } from "react";
import { TForgotSteps } from "./forgot-pass";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { forgotMailSchema } from "@/lib/schemas/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import { TAuthSteps } from "./auth-dialog";

type TEmailForgot = z.infer<typeof forgotMailSchema>;

export const ForgotPassMail = ({
  currentStep,
  setCurrentStep,
  payload,
  setPayload,
  stepForgotPass,
  setForgotPass,
}: {
  currentStep: TAuthSteps;
  setCurrentStep: (currentStep: TAuthSteps) => void;
  payload: {
    email: string;
    otp: string;
    password: string;
  };
  setPayload: (payload: {
    email: string;
    otp: string;
    password: string;
  }) => void;
  stepForgotPass: TForgotSteps;
  setForgotPass: (stepForgotPass: TForgotSteps) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<TEmailForgot>({
    resolver: zodResolver(forgotMailSchema),
  });

  const formSubmit: SubmitHandler<TEmailForgot> = async (data) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            step: "email",
            payload: {
              email: data.email,
            },
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "An error occurred");
        return;
      }
      setPayload({
        ...payload,
        email: data.email,
      });
      setForgotPass("otp");
    } catch (e) {
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={form.handleSubmit(formSubmit)}>
        <div className="space-y-2 pb-3">
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

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              setCurrentStep("login");
            }}
            type="button"
            className="flex items-center text-primary text-sm hover:underline"
          >
            <ArrowLeft className="mr-1" size={16} /> Back to login
          </button>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          className="w-full text-md bg-primary hover:bg-orange-600 text-white"
        >
          Send code
        </Button>
      </form>
    </>
  );
};
