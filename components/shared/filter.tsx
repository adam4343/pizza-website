"use client";
import React, { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Title } from "./title";
import { FilterCheckbox } from "./filter-checkbox";
import { Input } from "../ui/input";
import { RangeSlider } from "./range-slider";
import { CheckboxIngridients } from "./checkbox-ingridients";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { Button } from "../ui/button";
import { Toaster, toast } from "sonner";
export function useFilter() {
  const searchParams = useSearchParams();
  const newSearchParams = new URLSearchParams(searchParams);
  const router = useRouter();
  function setFilterParams<T extends keyof TFilter>(key: T, value: TFilter[T]) {
    try {
      const filterString = newSearchParams.get("filter");
      if (filterString) {
        const filter = filterSchema.parse(JSON.parse(filterString));
        if (Object.keys(filter).includes(key)) {
          const keyValue = filter[key];
          if (Array.isArray(keyValue) && typeof value === "string") {
            if (keyValue?.includes(value)) {
              // @ts-ignore
              filter[key] = keyValue.filter((item) => item !== value);
            } else {
              // @ts-ignore
              filter[key] = [...keyValue, value];
            }
            newSearchParams.set("filter", JSON.stringify(filter));
          } else {
            newSearchParams.set(
              "filter",
              JSON.stringify({ ...filter, [key]: value })
            );
          }
          router.replace(`?${newSearchParams.toString()}`);
        } else {
          newSearchParams.set(
            "filter",
            JSON.stringify({ ...filter, [key]: value })
          );
          router.replace(`?${newSearchParams.toString()}`);
        }
      }

      router.replace(`?filter=${JSON.stringify({ [key]: value })}`);
    } catch (err) {
      newSearchParams.set("filter", JSON.stringify({ [key]: value }));

      router.replace(`?${newSearchParams.toString()}`);
    }
  }
  return setFilterParams;
}

type FilterProps = {
  className?: string;
  refetch: () => void;
};
const filterSchema = z
  .object({
    ingredients: z.array(z.string()).optional().default([]),
    maxPrice: z.coerce.number().min(0).max(1900).optional().default(1900),
    minPrice: z.coerce.number().min(0).max(1900).optional().default(0),
  })
  .partial();

export type TFilter = z.infer<typeof filterSchema>;

export const Filter: React.FC<React.PropsWithChildren<FilterProps>> = ({
  className,
  refetch,
  children,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);
  const updateFilter = useFilter();
  const filtersParams = searchParams.get("filter");
  const [formData, setFormData] = React.useState<TFilter>({
    ingredients: [],
    maxPrice: 1900,
    minPrice: 0,
  });
  useEffect(() => {
    if (filtersParams) {
      try {
        const parsedFilters = JSON.parse(filtersParams);

        const validatedFilters = filterSchema.parse(parsedFilters);

        setFormData({
          ingredients: validatedFilters.ingredients,
          maxPrice: validatedFilters.maxPrice,
          minPrice: validatedFilters.minPrice,
        });
      } catch (e) {
        if (e instanceof z.ZodError) {
          e.errors.forEach((error) => {
            toast.error(`Validation error: ${error.message}`);
          });
        } else {
          console.error("Error parsing filtersParams:", e);
          toast.error("Error in searchParams");
        }
      }
    }
  }, [filtersParams]);
  return (
    <form
      action=""
      onSubmit={(e) => {
        e.preventDefault();
        if (
          (!formData.ingredients || formData.ingredients.length === 0) &&
          formData.maxPrice === 1900 &&
          formData.minPrice === 0
        ) {
          toast.error("Choose a filter before applying");
          return;
        }

        updatedSearchParams.set("filter", JSON.stringify(formData));

        router.replace(`/?${updatedSearchParams}`);
        refetch();
      }}
    >
      <div className={cn("w-[244px] mt-8", className)}>
        <Title text="Filters" className="font-bold mb-5 " />

        {/* price slider */}
        <div className="  mt-5 border-y-2 border-gray-100  py-4 ">
          <Title
            text="Price from & to:"
            size="xs"
            className="font-semibold mb-3"
          />
          <div className="flex gap-3 mb-5">
            <Input
              type="number"
              min={0}
              max={formData.maxPrice ?? 1900}
              value={formData.minPrice ?? 0}
              onChange={(e) => {
                const newMinPrice = parseInt(e.target.value, 10) || 0;
                setFormData({ ...formData, minPrice: newMinPrice });
              }}
            />
            <Input
              type="number"
              min={formData.minPrice ?? 0}
              max={1900}
              value={formData.maxPrice ?? 1900}
              onChange={(e) => {
                const newMaxPrice = parseInt(e.target.value, 10) || 1900;
                setFormData({ ...formData, maxPrice: newMaxPrice });
              }}
            />
          </div>
          <RangeSlider
            min={0}
            max={1900}
            step={1}
            value={[formData.minPrice ?? 0, formData.maxPrice ?? 1900]}
            onValueChange={(range) => {
              setFormData({
                ...formData,
                minPrice: range[0],
                maxPrice: range[1],
              });
            }}
          />
        </div>

        {/* Ingridients checkboxes */}
        <div className=" pt-5">
          <Title text="Ingridients:" size="xs" className="font-semibold mb-3" />
          <CheckboxIngridients
            formData={formData}
            setFormData={setFormData}
            limit={6}
            defaultItems={[
              {
                text: "Cheese",
                value: "1",
                checked: false,
              },

              {
                text: "Onions",
                value: "2",
                checked: false,
              },
              {
                text: "Pickles",
                value: "3",
                checked: false,
              },
              {
                text: "Letus",
                value: "4",
                checked: false,
              },
              {
                text: "Chedar",
                value: "5",
                checked: false,
              },
              {
                text: "Tomato",
                value: "6",
                checked: false,
              },
            ]}
            allItems={[
              {
                text: "Cheese",
                value: "1",
                checked: false,
              },

              {
                text: "Onions",
                value: "2",
                checked: false,
              },
              {
                text: "Pickles",
                value: "3",
                checked: false,
              },
              {
                text: "Letus",
                value: "4",
                checked: false,
              },
              {
                text: "Chedar",
                value: "5",
                checked: false,
              },
              {
                text: "Tomato",
                value: "6",
                checked: false,
              },
              {
                text: "Jalapeno",
                value: "7",
                checked: false,
              },
              {
                text: "Garlic",
                value: "8",
                checked: false,
              },
            ]}
          />
        </div>
        <Button type="submit" className="mt-5">
          Apply
        </Button>
      </div>
    </form>
  );
};
