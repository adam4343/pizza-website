"use client";
import React, { useEffect, useMemo, useState } from "react";
import useOfflineCart, { TCartItem } from "@/lib/stores/useOfflineCart";
import Image from "next/image";
import { correctType } from "@/app/product/[id]/page";
import { Button } from "../ui/button";
import { Plus, Trash, X } from "lucide-react";

interface Props {
  cartItem: TCartItem;
  quantity: number;
  setQuantity: (quantity: number) => void;
  price: number;
  setPrice: (price: number) => void;
}

const CartItem: React.FC<Props> = ({
  cartItem,
  price,
  quantity,
  setPrice,
  setQuantity,
}) => {
  const { addCartItem, decreaseCartItem, removeCartItem } = useOfflineCart();

  const itemPrice = useMemo(() => {
    return cartItem.quantity * cartItem.product.item.price;
  }, [cartItem.quantity]);

  return (
    <div className="bg-white ">
      {cartItem && (
        <div className="  p-4 border-b border-gray-200">
          <div className="flex flex-col gap-3 relative">
            <div
              role="button"
              onClick={() => {
                removeCartItem(cartItem);
              }}
              className="absolute top-0 right-0 cursor-pointer"
            >
              <Trash size={16} className="text-gray-400" />
            </div>

            <div className="flex   gap-5 w-full ">
              {cartItem.product?.imageUrl ? (
                <Image
                  width={64}
                  height={64}
                  src={cartItem.product.imageUrl}
                  alt={cartItem.product.name || "Product Image"}
                  className="w-16 h-16 rounded"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded" />
              )}

              <div className="">
                <h3 className="text-[17px]  font-bold">
                  {cartItem.product?.name || "Product Name"}
                </h3>
                <p className="text-xs text-gray-500">
                  {cartItem.product?.categoryId === 1 ? (
                    <>
                      {cartItem.product?.item.size
                        ? `${cartItem.product.item.size} cm`
                        : "N/A"}
                      ,{" "}
                      {cartItem.product?.item.pizzaType
                        ? `${correctType(
                            cartItem.product.item.pizzaType
                          )} style`
                        : "N/A"}
                    </>
                  ) : (
                    <></>
                  )}
                </p>

                {cartItem.product?.categoryId === 1 &&
                  (cartItem.ingredients.length > 0 ? (
                    <p className="text-xs text-gray-500 line-clamp-2 max-w-[70%]">
                      +{" "}
                      {cartItem.ingredients
                        .map((ingredient) => ingredient.name)
                        .join(", ")}
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500  ">
                      No additional ingredients.
                    </p>
                  ))}
              </div>
            </div>

            <hr className="border-t border-gray-300 pb-2" />

            <div className="flex justify-between w-full">
              <p className="text-[15px] font-bold">
                {cartItem.product?.item.price ? `${itemPrice}$` : "N/A"}
              </p>

              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant={"outline"}
                  className="h-[28px] w-[10px] text-[25px] border rounded"
                  onClick={() => {
                    decreaseCartItem(cartItem);
                  }}
                >
                  -
                </Button>
                <span className="text-sm font-bold">{cartItem.quantity}</span>
                <Button
                  type="button"
                  onClick={() => {
                    addCartItem(cartItem);
                  }}
                  variant={"outline"}
                  className="h-[28px]  w-[10px] text-[20px] border rounded"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
