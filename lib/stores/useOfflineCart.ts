import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { CartItem, ProductItem, Ingredient, Product } from "@prisma/client";

export type TCartItem = Omit<
  CartItem,
  "createdAt" | "updatedAt" | "cartId" | "id"
> & {
  product: Product & { item: ProductItem };
} & {
  ingredients: Ingredient[];
};

type OfflineCartType = {
  cartItems: TCartItem[];
  addCartItem: (cartItem: TCartItem) => void;
  removeCartItem: (cartItem: TCartItem) => void;
  decreaseCartItem: (cartItem: TCartItem) => void;
  updateCartItem: (cartId: number, data: Partial<TCartItem>) => void;
  reset: () => void;
};

const useOfflineCart = create<OfflineCartType>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addCartItem: (cartItem) => {
        set((state) => {
          const cartItems = [...state.cartItems];
          const foundIndex = cartItems.findIndex((item) => {
            return (
              item.productItemId === cartItem.productItemId &&
              item.ingredients
                .map((x) => x.id)
                .sort()
                .join(",") ===
                cartItem.ingredients
                  .map((x) => x.id)
                  .sort()
                  .join(",")
            );
          });

          if (foundIndex !== -1) {
            cartItems[foundIndex].quantity += 1;
          } else {
            cartItems.push({ ...cartItem, quantity: 1 });
          }

          return { cartItems };
        });
      },

      decreaseCartItem: (cartItem) => {
        set((state) => {
          const cartItems = [...state.cartItems];
          const foundIndex = cartItems.findIndex((item) => {
            return (
              item.productItemId === cartItem.productItemId &&
              item.ingredients
                .map((x) => x.id)
                .sort()
                .join(",") ===
                cartItem.ingredients
                  .map((x) => x.id)
                  .sort()
                  .join(",")
            );
          });

          if (foundIndex !== -1) {
            const foundCartItem = cartItems[foundIndex];

            foundCartItem.quantity -= 1;

            if (foundCartItem.quantity <= 0) {
              cartItems.splice(foundIndex, 1);
            } else {
              cartItems[foundIndex] = foundCartItem;
            }

            return { cartItems };
          }

          return state;
        });
      },

      removeCartItem: (cartItem) => {
        const cartItemsArr = get().cartItems;

        const filteredArray = cartItemsArr.filter(
          (item) => item.productItemId !== cartItem.productItemId
        );

        set({
          cartItems: filteredArray,
        });
      },
      updateCartItem: (productId, data) => {
        // find the cartItem from cartItems
        const cartItemsArr = get().cartItems;

        const foundIndex = cartItemsArr.findIndex(
          (item) => item.productItemId === productId
        );
        const updatedItem = {
          ...cartItemsArr[foundIndex],
          data,
        };
        cartItemsArr[foundIndex] = updatedItem;

        set({
          cartItems: cartItemsArr,
        });
      },
      reset: () => {
        set({
          cartItems: [],
        });
      },
    }),
    {
      name: "offline-cart",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useOfflineCart;
