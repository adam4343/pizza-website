"use client";
import React, { useEffect, useMemo, useState } from "react";
import { IngredientT } from "@/lib/types/types";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { z } from "zod";
import { useRouter } from "next/navigation";

export const ingredientSchema = z.coerce.number().array();

interface Props {
  ingredient: IngredientT;
}

export const IngredientCard: React.FC<Props> = ({ ingredient }) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const ingredients = searchParams.get("ingredients");
  console.log(searchParams);
  // onClick -> update the searchParams to store an array of ingredients ids

  function handleClick() {
    let ingredientsArray: number[] = [];
    if (ingredients) {
      try {
        const validated = ingredientSchema.parse(JSON.parse(ingredients));
        if (validated.includes(ingredient.id)) {
          const index = validated.indexOf(ingredient.id);
          validated.splice(index, 1);
          ingredientsArray = validated;
        } else {
          ingredientsArray = [...validated, ingredient.id];
        }
      } catch {
        ingredientsArray.push(ingredient.id);
      }
    } else {
      ingredientsArray.push(ingredient.id);
    }

    const value = JSON.stringify(ingredientsArray);
    const currentUrl = new URL(window.location.href);
    const currentParams = new URLSearchParams(currentUrl.search);
    currentParams.set("ingredients", value);
    router.replace(`?${currentParams.toString()}`);
  }

  // to get if this ingredient is selected or not, use a useMemo and find it
  const selectedIngredient = useMemo(() => {
    if (!ingredients) return false;
    try {
      const ingredientsArray = ingredientSchema.parse(JSON.parse(ingredients));
      if (ingredientsArray.includes(ingredient.id)) return true;
      return false;
    } catch {
      return false;
    }
  }, [ingredients]);
  //
  return (
    <div
      role="button"
      onClick={handleClick}
      className={`cursor-pointer flex flex-col items-center justify-between z-50 rounded-lg max-w-[130px] h-[193px] p-2 pb-3 ${
        selectedIngredient && "border border-primary"
      }`}
    >
      <Image
        src={ingredient.imageUrl}
        alt={ingredient.name}
        width={110}
        height={110}
        className=" w-[110px] aspect-square mb-1"
      />

      <h3 className="font-medium  text-xs mb-1 text-center  ">
        {ingredient.name}
      </h3>
      <p className="text-sm font-bold ">{ingredient.price} $</p>
    </div>
  );
};
