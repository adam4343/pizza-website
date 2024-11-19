"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { User } from "lucide-react";
import { RegisterStepOne } from "./register-step-one";
import { z } from "zod";
import { RegisterStepTwo } from "./register-step-two";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  firstStepRegisterSchema,
  secondStepRegisterSchema,
} from "@/lib/schemas/schemas";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { TAuthSteps } from "./auth-dialog";
export type TRegisterSteps = "email" | "password";

export const Register = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: TAuthSteps;
  setCurrentStep: (currentStep: TAuthSteps) => void;
}) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [registerStep, setRegisterStep] = useState<TRegisterSteps>("email");
  const resetFormOne = useForm({
    resolver: zodResolver(firstStepRegisterSchema),
  }).reset;
  const resetFormTwo = useForm({
    resolver: zodResolver(secondStepRegisterSchema),
  }).reset;

  return (
    <>
      <h2 className="text-2xl font-bold pb-3">Sign Up </h2>
      {registerStep === "email" ? (
        <RegisterStepOne
          registerStep={registerStep}
          setRegisterStep={setRegisterStep}
        />
      ) : (
        <RegisterStepTwo
          registerStep={registerStep}
          setRegisterStep={setRegisterStep}
        />
      )}
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => {
            setCurrentStep("login");
          }}
          className="text-primary hover:underline"
        >
          Login
        </button>
      </div>
    </>
  );
};
