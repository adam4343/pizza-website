"use client";
import React, { useState } from "react";
import { TForgotSteps } from "./forgot-pass";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { TAuthSteps } from "./auth-dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { forgotPassSchema } from "@/lib/schemas/schemas";

type TForgotPass = z.infer<typeof forgotPassSchema>;
export const ForgotPassLast = ({
  stepForgotPass,
  setForgotPass,
  currentStep,
  setCurrentStep,
  payload,
  setPayload,
}: {
  payload: {
    email: string;
    otp: string;
    password: string;
  };
  currentStep: TAuthSteps;
  setCurrentStep: (currentStep: TAuthSteps) => void;
  setPayload: (payload: {
    email: string;
    otp: string;
    password: string;
  }) => void;
  stepForgotPass: TForgotSteps;
  setForgotPass: (stepForgotPass: TForgotSteps) => void;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const mutation = useMutation({
    mutationKey: ["password"],
    mutationFn: async (data: TForgotPass) => {
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
              step: "password",
              payload: {
                email: payload.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
              },
            }),
          }
        );
        if (!res.ok) {
          const errorData = await res.json();
          toast.error(errorData.error || "An error occurred");
          return;
        }
      } catch (e) {
        toast.error("Network error");
      } finally {
        setIsLoading(false);
      }
    },
    onSuccess: () => {
      toast.success("Your password has been successfully changed!");
      setTimeout(() => {
        setCurrentStep("login");
      }, 300);
    },
    onError: (error) => {
      toast.error(
        error.message || "An unexpected error occurred. Please try again."
      );
    },
  });    
  const form = useForm<TForgotPass>({
    resolver: zodResolver(forgotPassSchema),
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
          loading={isLoading}
          className="w-full text-md bg-primary hover:bg-orange-600 text-white"
        >
          Change Password
        </Button>
      </form>
    </>
  );
};
