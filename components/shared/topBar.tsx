import { cn } from "@/lib/utils";
import React from "react";
import { Sort } from "./sort";
import { Categories } from "./categories";
import { Container } from "./container";

interface Props {
  className?: string;
}

export const TopBar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between sticky shadow-lg py-5 shadow-black/5 z-10 bg-white top-0",
        className
      )}
    >
      <Container className="flex  w-full justify-between">
        <Categories />
        <Sort />
      </Container>
    </div>
  );
};
