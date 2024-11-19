import { useEffect, useMemo, useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShoppingCart, X } from "lucide-react";
import { Title } from "./title";
import Link from "next/link";
import CartItem from "./cart-item";
import useOfflineCart from "@/lib/stores/useOfflineCart";
import { Sheet, SheetContent } from "../ui/sheet";
import { useSearchParams, useRouter } from "next/navigation";
import { CartEmpty } from "./cart-empty";

export function useOpenCart() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = new URLSearchParams(searchParams);

  function openCart() {
    params.set("cart-open", "true");
    router.push(`?${params.toString()}`);
  }

  function closeCart() {
    params.delete("cart-open");
    router.push(`?${params.toString()}`);
  }

  return [openCart, closeCart] as const;
}

export default function Cart() {
  const searchParams = useSearchParams();
  const [openCart, closeCart] = useOpenCart();
  const isOpen = searchParams.get("cart-open") === "true";

  const { cartItems } = useOfflineCart();

  const totalPrice = useMemo(() => {
    // get all prices
    const initialValue = 0;
    const total = cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.item.price * cartItem.quantity,
      initialValue
    );
    return total;
  }, [cartItems]);

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(cartItems.length);

  useEffect(() => {
    setQuantity(cartItems.length);
  }, [cartItems.length]);
  return (
    <>
      <Button onClick={() => openCart()} className="group relative">
        <b>{totalPrice}$</b>
        <span className="h-full mx-3 bg-white/30 w-[1px]"></span>
        <div className="flex items-center gap-1 group-hover:opacity-0 transition duration-300">
          <ShoppingCart size={16} />
          <b>{quantity}</b>
        </div>
        <ArrowRight
          size={20}
          className=" absolute  right-5 group-hover:opacity-100 transition duration-300 group-hover:translate-x-0 -translate-x-4  opacity-0"
        />
      </Button>

      <Sheet
        open={isOpen}
        onOpenChange={(open) => {
          if (open) {
            openCart();
          } else {
            closeCart();
          }
        }}
      >
        <SheetContent className="p-0  !max-w-md bg-gray-100">
          <div className=" p-4 w-full">
            <h3 className="text-xl leading-7 flex gap-1 font-light">
              <span className="font-bold">{cartItems.length} products</span>
              in the cart
            </h3>
          </div>

          <div className="flex-1 ">
            <ul className="flex flex-col gap-2 overflow-y-auto max-h-[calc(100vh-200px)]">
              {cartItems.length === 0 && <CartEmpty />}
              {cartItems.length > 0
                ? cartItems.map((cartItem) => (
                    <li key={cartItem.productItemId}>
                      <CartItem
                        quantity={quantity}
                        setQuantity={setQuantity}
                        price={price}
                        setPrice={setPrice}
                        cartItem={cartItem}
                      />
                    </li>
                  ))
                : "No product Found"}
            </ul>
          </div>
          <button
            onClick={closeCart}
            aria-hidden={!isOpen}
            className={`absolute top-1/2  -translate-y-1/2 right-[470px] aria-hidden:hidden transition-all duration-300 hover:rotate-180`}
          >
            <X size={45} className="text-white" />
          </button>
          <div className="bg-white absolute bottom-0 w-full">
            <div className="p-6">
              <div className="w-full items-center flex justify-between pb-4">
                <p className="text-lg">Total: </p>

                <span className="font-bold text-lg">{totalPrice}$</span>
              </div>

              <Link href={"/checkout"}>
                <Button className=" w-full h-[45px] text-base">
                  Complete Order
                </Button>
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
