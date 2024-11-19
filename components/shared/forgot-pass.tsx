"use client";
import React, { useState } from "react";
import { ForgotPassMail } from "./forgot-pass-mail";
import { ForgotPassOTP } from "./forgot-pass-otp";
import { ForgotPassLast } from "./forgot-pass-last";
import { TAuthSteps } from "./auth-dialog";

export type TForgotSteps = "email" | "otp" | "password";

const steps = {
  email: ForgotPassMail,
  otp: ForgotPassOTP,
  password: ForgotPassLast,
};

export const ForgotPass = ({
  currentStep,
  setCurrentStep,
}: {
  currentStep: TAuthSteps;
  setCurrentStep: (currentStep: TAuthSteps) => void;
}) => {
  const [stepForgotPass, setForgotPass] = useState<TForgotSteps>("email");
  const [payload, setPayload] = useState({
    email: "",
    otp: "",
    password: "",
  });
  const Current = steps[stepForgotPass];
  function correctHeading(step: TForgotSteps) {
    switch (step) {
      case "email":
        return "Forgot your password?";
      case "otp":
        return "OTP code verification";
      case "password":
        return "Enter new password";
    }
  }
  return (
    <>
      <h2 className="text-2xl font-bold pb-3">
        {correctHeading(stepForgotPass)}
      </h2>
      <Current
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        payload={payload}
        setPayload={setPayload}
        stepForgotPass={stepForgotPass}
        setForgotPass={setForgotPass}
      />
    </>
  );
};
