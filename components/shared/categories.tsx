"use client";
import { cn } from "@/lib/utils";
import { useSectionStore } from "@/lib/stores/sectionState";
import React, { useState } from "react";

interface Props {
  className?: string;
}

const cats = ["Pizzas", "Breakfast", "Snacks", "Coctails", "Coffee"];

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export const Categories: React.FC<Props> = ({ className }) => {
  const [active, setActive] = useState(0);
  const activeId = useSectionStore((state) => state.activeId);
  const setActiveId = useSectionStore((state) => state.setActiveId);
  console.log("Active ID", activeId);
  return (
    <div
      className={cn("bg-gray-50 rounded-2xl inline-flex gap-1 p-1", className)}
    >
      {cats.map((category, id) => (
        <a
          onClick={() => {
            setActiveId(id + 1);
          }}
          className={`flex items-center font-bold h-11 rounded-2xl px-5 transition duration-200 hover:text-primary ${
            activeId === id + 1 &&
            "shadow-md shadow-gray-200 bg-white text-primary"
          }   `}
          href={` #${capitalize(category)}`}
          key={id}
        >
          <button>{category}</button>
        </a>
      ))}
    </div>
  );
};
