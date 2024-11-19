"use client";
import React from "react";
import Image from "next/image";
import { Title } from "./title";
import Link from "next/link";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import useOfflineCart from "@/lib/stores/useOfflineCart";
import { ProductItem } from "@prisma/client";
import { TProduct } from "./product-cards-group";
import { useOpenCart } from "./cart";

interface ProductCardType {
  item?: ProductItem;
  product: TProduct;
  className?: string;
}

export const ProductCard: React.FC<ProductCardType> = ({
  item,
  className,
  product,
}) => {
  const offlineCart = useOfflineCart();
  const [openCart, closeCart] = useOpenCart();
  return (
    <div className={className}>
      <Link
        href={`/product/${product.id}`}
        className="flex flex-col max-h-[485px] h-full justify-between md:max-w-[285px] "
      >
        <div className="flex flex-col gap-2  w-full">
          {" "}
          <div className="p-6 flex items-center bg-secondary rounded-lg md:h-[260px] justify-center w-full relative  ">
            <Image
              width={215}
              height={215}
              src={product.imageUrl}
              alt={`product-${product.name}`}
              className="w-[215px] h-[215px] hover:translate-y-1 transition duration-200"
            />
          </div>
          <div>
            <Title
              size="sm"
              className="font-bold mb-1 mt-3 "
              text={product.name}
            />
            <p className="text-gray-400 text-sm mt-2 line-clamp-2 ">
              {product.description}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center  gap-1 ">
            <span className="text-lg">from</span>
            <b className="text-[20px]">{item?.price} </b>
            <b className="text-[17px]">$</b>
          </div>
          <Button
            variant={"secondary"}
            className="text-base text-[15px] group flex items-center font-bold gap-1"
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              if (item) {
                offlineCart.addCartItem({
                  ingredients: [],
                  product: {
                    ...product,
                    item: item,
                  },
                  quantity: 1,
                  productItemId: item.id,
                });
              }
              openCart();
            }}
          >
            <Plus
              size={20}
              className="text-primary transform transform-translate duration-300 group-hover:rotate-180"
            />
            Add
          </Button>
        </div>
      </Link>
    </div>
  );
};
