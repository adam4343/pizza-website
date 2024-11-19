"use client";
import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Mail, User, Lock } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Register } from "./register";
import { Login } from "./login";
import { ForgotPass } from "./forgot-pass";

export type TAuthSteps = "login" | "register" | "forgot-pass";

// when we open  auth open should be triggered

const useOpenAuth = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);

  function openAuth() {
    updatedSearchParams.set("auth-open", "true");
    router.replace(`?${updatedSearchParams}`);
  }

  function closeAuth() {
    updatedSearchParams.delete("auth-open");
    router.replace(`?${updatedSearchParams}`);
  }

  return [openAuth, closeAuth];
};

export const AuthDialog: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<TAuthSteps>("login");
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const [openAuth, closeAuth] = useOpenAuth();
  const isOpen = !!searchParams.get("auth-open");
  const authPages = {
    login: Login,
    register: Register,
    "forgot-pass": ForgotPass,
  };
  let Current = authPages[currentStep];
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (open) {
          openAuth();
        } else {
          closeAuth();
          setTimeout(() => {
            setCurrentStep("login");
          }, 300);
        }
      }}
    >
      <DialogTrigger asChild>
        <span className="inline-flex">
          <Button
            variant="outline"
            className="flex items-center gap-1 font-semibold"
          >
            <User size={16} />
            Log in
          </Button>
        </span>
      </DialogTrigger>
      <DialogContent className="p-6  shadow-lg rounded-lg ">
        <Current setCurrentStep={setCurrentStep} currentStep={currentStep} />
      </DialogContent>
    </Dialog>
  );
};
