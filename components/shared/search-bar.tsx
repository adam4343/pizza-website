"use client";
import { useRouter } from "next/navigation";
import { Copy, SearchIcon } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { InputProductCard, InputProductCardType } from "./input-product-card";
import { useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "../ui/skeleton";
import { BestsellersSearchItems } from "./bestsellers-search-items";
import { usePathname } from "next/navigation";
export const SearchBar: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productSearchParam = searchParams.get("productSearch");
  const [searchInput, setSearchInput] = useState("");
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, refetch, isRefetching } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await axios.get<InputProductCardType[]>(
        `http://localhost:3000/api/products/?productSearch=${productSearchParam}`
      );
      return response.data;
    },
    enabled: productSearchParam !== null && productSearchParam.length > 0,
  });

  if (error) {
    <div>{error.message}</div>;
  }

  const pathname = usePathname();
  const mySearchParams = new URLSearchParams(pathname);

  function updateSearchParms(query: string) {
    setSearchInput(query);
    const updatedSearchParams = new URLSearchParams(searchParams.toString());
    updatedSearchParams.set("productSearch", query);
    router.replace(`/?${updatedSearchParams.toString()}`);

    refetch();
  }

  return (
    <div className="w-full   ml-8">
      <Dialog
        open={open}
        onOpenChange={(open) => {
          if (!open) {
            if (productSearchParam || productSearchParam === "") {
              setSearchInput("");
              queryClient.setQueryData(["products"], []);
              mySearchParams.delete("productSearch");
              router.replace(pathname);
            }
            setOpen(false);
          } else {
            setOpen(true);
          }
        }}
      >
        <DialogTrigger asChild>
          <form
            className="w-full flex items-center relative    "
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <label
              htmlFor="search-bar"
              className="absolute left-4 cursor-pointer "
            >
              <SearchIcon size={18} className="text-gray-400   " />
            </label>
            <Input
              id="search-bar"
              type="search"
              placeholder="Search pizza..."
              className={`placeholder:text-gray-400 pr-10 bg-[#F9FAFB] max-w-[800px] w-full  text-gray-400 text-[15px] pl-12 border-none rounded-sm h-[46px]`}
            />
          </form>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <form
                className="w-full flex items-center relative  "
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <label
                  htmlFor="search-bar"
                  className="absolute left-4 cursor-pointer "
                >
                  <SearchIcon size={18} className="text-gray-400  " />
                </label>
                <Input
                  value={searchInput}
                  onChange={(e) => {
                    updateSearchParms(e.target.value.trim());
                  }}
                  id="search-bar"
                  type="search"
                  placeholder="Search pizza..."
                  className={`placeholder:text-gray-400 pr-10 bg-[#F9FAFB] ring-0 focus-visible:ring-0 text-gray-400 text-[15px] pl-12 border-none rounded-sm h-[46px]`}
                />
              </form>
              <div className=" py-5">
                <div className="px-3   ">
                  {!isRefetching &&
                    !error &&
                    !data?.length &&
                    !searchInput.trim().length && (
                      <ul className="overflow-y-auto  max-h-[290px] flex-col gap-5 ">
                        <BestsellersSearchItems setOpen={setOpen} />
                      </ul>
                    )}
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

                  {!isRefetching && data && data.length > 0 && (
                    <ul className=" overflow-y-auto max-h-[290px] flex-col flex gap-5 ">
                      {data.map((product) => (
                        <li key={product.id} className="hover:bg-[#FFFAF6]">
                          <Link
                            onClick={() => {
                              setOpen(false);
                            }}
                            href={`/product/${product.id}`}
                          >
                            <InputProductCard inputProduct={product} />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}

                  {!isRefetching && !data?.length && searchInput.length > 1 && (
                    <p>No products found.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
