"use client";
import React, { FormEvent, useEffect, useState } from "react";
import { TForgotSteps } from "./forgot-pass";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

export const ForgotPassOTP = ({
  payload,
  setPayload,
  stepForgotPass,
  setForgotPass,
}: {
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
  const [inputValue, setInputValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(5);
  const [isActive, setIsActive] = useState(true);

  async function submitOTP(e: FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await fetch(
        "http://localhost:3000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            step: "otp",
            payload: {
              email: payload.email,
              otp: inputValue,
            },
          }),
        }
      );
      if (!res.ok) {
        const body = await res.json();
        toast.error(body.error);
        return;
      }
      setForgotPass("password");
    } catch (e) {
      console.error("Error is ", e);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const handleReset = () => {
    setTimeLeft(5);
    setIsActive(true);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  async function resetCallOTP() {
    try {
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
              email: payload.email,
            },
          }),
        }
      );
    } catch (e) {
      console.error("Error is ", e);
    }
  }

  return (
    <>
      {" "}
      <form className="space-y-4" onSubmit={submitOTP}>
        <InputOTP
          value={inputValue}
          onChange={(e) => setInputValue(e)}
          maxLength={6}
        >
          <InputOTPGroup className="flex gap-2">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />

            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>

        <div className="flex items-center gap-2  mb-6">
          <p className="">{formatTime(timeLeft)}</p>
          {timeLeft === 0 && (
            <button
              onClick={resetCallOTP}
              className="text-primary hover:underline"
            >
              Resend Code
            </button>
          )}
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          loading={isLoading}
          className="w-full text-md bg-primary hover:bg-orange-600 text-white"
        >
          Submit code
        </Button>
      </form>
    </>
  );
};
