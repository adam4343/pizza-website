"use client";
import axios from "axios";
import React, { useMemo, useState } from "react";
import { InputProductCardType } from "./input-product-card";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
export const BestsellersSearchItems = ({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) => {
  const { data, isRefetching, error } = useQuery({
    queryKey: ["best-seller-products"],
    queryFn: getBestSellers,
  });

  if (error) {
    <div>{error.message}</div>;
  }

  const lowestPrice = useMemo(() => {
    if (!data) return 0;
    const prices = data
      .map((product) => product.items.map((item) => item.price))
      .flat();

    return Math.min(...prices);
  }, [data]);

  return (
    <div className="flex flex-col gap-5 ">
      {isRefetching && (
        <div className="flex flex-col items-start gap-5 w-full pl-3 ">
          <div className="w-80% flex items-center gap-3  pl-3 ">
            <Skeleton className=" w-[40px]  aspect-square " />
            <Skeleton className="h-5 w-[120px] " />
            <Skeleton className="h-5 w-[50px] " />
          </div>
          <div className="w-80% flex items-center gap-3  pl-3 ">
            <Skeleton className=" w-[40px]  aspect-square " />
            <Skeleton className="h-5 w-[120px] " />
            <Skeleton className="h-5 w-[50px] " />
          </div>
          <div className="w-80% flex items-center gap-3  pl-3 ">
            <Skeleton className=" w-[40px]  aspect-square " />
            <Skeleton className="h-5 w-[120px] " />
            <Skeleton className="h-5 w-[50px] " />
          </div>
        </div>
      )}
      {!isRefetching &&
        data &&
        data.length > 0 &&
        data?.slice(0, 4).map((product) => (
          <li key={product.id} className="hover:bg-[#FFFAF6]">
            <Link
              onClick={() => {
                setOpen(false);
              }}
              href={`/product/${product.id}`}
            >
              <div className=" ">
                <div className=" hover:bg-[#FFFAF6] cursor-pointer">
                  <div className="flex items-center gap-5 w-full pl-3  ">
                    <Image
                      width={40}
                      height={40}
                      src={product.imageUrl}
                      alt={product.name}
                    />
                    <h3>{product.name}</h3>
                    <p>${lowestPrice}</p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        ))}
    </div>
  );
};

async function getBestSellers() {
  try {
    const products = await axios.get("http://localhost:3000/api/bestsellers");
    return products.data as InputProductCardType[];
  } catch (e) {
    console.error("Error is ", e);
  }
}
