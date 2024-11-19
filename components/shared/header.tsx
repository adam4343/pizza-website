import { cn } from "@/lib/utils";
import React from "react";
import { Container } from "./container";
import Image from "next/image";
import { ArrowRight, ShoppingCart, User } from "lucide-react";
import { Button } from "../ui/button";
import { SearchBar } from "./search-bar";
import Link from "next/link";
import Cart from "./cart";
import { AuthDialog } from "./auth-dialog";

interface Props {
  className?: string;
}

export const Header: React.FC<Props> = ({ className }) => {
  return (
    <header className={cn("border border-b py-8 bg-white", className)}>
      <Container className="flex items-center gap-5 justify-between">
        {/* left part */}
        <Link href={"/"} className="flex items-center gap-4 cursor-pointer">
          <div className="w-[35px] aspect-[1] relative min-w-[35px]">
            <Image alt="logo" fill src={"/logo.png"} />
          </div>
          <div className="flex flex-col gap-1 min-w-[160px]  ">
            <h3 className="font-black text-2xl uppercase">Dodo Pizza</h3>
            <p className="text-gray-400 text-sm leading-3">
              Cant get any tastier
            </p>
          </div>
        </Link>
        <div className="hidden md:block flex-grow max-w-md">
          <SearchBar />
        </div>

        {/* right part */}
        <div className="flex items-center gap-3">
          <AuthDialog />
          <Cart />
        </div>
      </Container>
    </header>
  );
};
