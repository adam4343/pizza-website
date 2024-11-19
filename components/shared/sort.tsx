import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  className?: string;
}

export const Sort: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "bg-gray-50 h-[52px] px-3 inline-flex items-center gap-2 rounded-2xl cursor-pointer",
        className
      )}
    >
      <ArrowUpDown size={16} />
      <b>Sort by:</b>
      <b className="text-primary">popular</b>
    </div>
  );
};
