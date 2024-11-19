"use client";
import React from "react";
import Image from "next/image";

interface ProductItem {
  id: number;
  price: number;
  size: number;
  pizzaType: number;
  productId: number;
}

export interface InputProductCardType {
  name: string;
  id: number;
  imageUrl: string;
  items: ProductItem[];
}

interface Props {
  inputProduct: InputProductCardType;
}

export const InputProductCard: React.FC<Props> = ({ inputProduct }) => {
  const lowestPrice = Math.min(...inputProduct.items.map((item) => item.price));
  return (
    <div className=" ">
      <div className=" hover:bg-[#FFFAF6] cursor-pointer">
        <div className="flex items-center gap-5 w-full pl-3 ">
          <Image
            width={40}
            height={40}
            src={inputProduct.imageUrl}
            alt={inputProduct.name}
          />
          <h3>{inputProduct.name}</h3>
          <p>${lowestPrice}</p>
        </div>
      </div>
    </div>
  );
};
