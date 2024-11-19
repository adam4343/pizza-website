"use client";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { useRouter, useSearchParams } from "next/navigation";
import { TFilter } from "./filter";

export interface FilterChecboxProps {
  text: string;
  value: string;
  formData: TFilter;
  setFormData: (formData: TFilter) => void;
  checked?: boolean;
  onCheckedChange?: (change: boolean) => void;
  endAdornment?: React.ReactNode;
  name?: string;
}
export const FilterCheckbox: React.FC<FilterChecboxProps> = ({
  formData,
  setFormData,
  text,
  value,
  name,
}) => {
  function handleCheck() {
    if (!name) return;
    debugger;
    const isChecked = formData.ingredients?.includes(name) || false;

    if (isChecked) {
      const updatedIngredients =
        formData.ingredients?.filter((ingredient) => ingredient !== name) || [];
      setFormData({ ...formData, ingredients: updatedIngredients });
    } else {
      setFormData({
        ...formData,
        ingredients: [...(formData.ingredients || []), name],
      });
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Checkbox
        name={name}
        checked={name ? formData.ingredients?.includes(name) : false}
        onCheckedChange={handleCheck}
        value={value}
        className="rounded-[8px] w-6 h-6"
        id={`checkbox-${name}-${value}`}
      />
      <label
        htmlFor={`checkbox-${name}-${value}`}
        className="leading-none cursor-pointer flex-1"
      >
        {text}
      </label>
    </div>
  );
};
