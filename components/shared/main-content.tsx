"use client";
import React from "react";
import { Filter } from "./filter";
import { Skeleton } from "../ui/skeleton";
import { ProductCardsGroup, TProduct } from "./product-cards-group";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export const MainContent = () => {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter") || "";

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["products", filterParam],
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/api/all-products`, {
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }

      const products = (await response.json()) as TProduct[];

      const types = {
        Pizzas: products.filter((item) => item.categoryId === 1),
        Breakfast: products.filter((item) => item.categoryId === 2),
        Snacks: products.filter((item) => item.categoryId === 3),
        Coctails: products.filter((item) => item.categoryId === 4),
        Coffee: products.filter((item) => item.categoryId === 5),
      };

      return types;
    },
  });

  if (isLoading) {
    return (
      <div className="flex gap-8">
        <div className="w-[244px] mt-8">
          <Skeleton className="h-6 w-24 mb-5" />
          <Skeleton className="h-7 w-full mb-5" />
          <Skeleton className="h-5 w-full mb-5" />
          <Skeleton className="h-8 w-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="flex flex-col max-h-[485px] h-full justify-between max-w-[285px]"
            >
              <Skeleton className="w-[245px] h-[245px]" />
              <div className="mt-3">
                <Skeleton className="h-5 w-2/3 mb-2" />
                <Skeleton className="h-3 w-full mb-1" />
                <Skeleton className="h-3 w-5/6" />
              </div>
              <div className="mt-4 flex items-center justify-between">
                <Skeleton className="h-5 w-16" />
                <Skeleton className="h-8 w-20" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="gap-10 flex flex-col justify-between lg:flex-row px-5">
      <Filter refetch={refetch} />
      <div>
        {data && (
          <div>
            {Object.entries(data).map(([key, value], index) => (
              <ProductCardsGroup
                key={index}
                categoryId={index + 1}
                products={value}
                title={key}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
