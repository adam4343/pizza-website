"use client";
import { Container } from "@/components/shared/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import useOfflineCart from "@/lib/stores/useOfflineCart";
import { useOpenCart } from "@/components/shared/cart";
import { useSearchParams } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import CartItem from "@/components/shared/cart-item";

import { CartEmpty } from "@/components/shared/cart-empty";

const checkoutSchema = z.object({
  name: z.string().min(3, "Name is too short"),
  surname: z.string().min(3, "Surname is too short"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^[0-9]{12}$/, "Phone number must be 10 digits"),
  address: z.string().min(3, "Address is too short"),
  note: z.string().optional(),
});

type TCheckoutSchema = z.infer<typeof checkoutSchema>;

export default function Component() {
  const router = useRouter();
  const form = useForm<TCheckoutSchema>({
    resolver: zodResolver(checkoutSchema),
    mode: "all",
  });

  const errors = form.formState.errors;
  const searchParams = useSearchParams();
  const { cartItems } = useOfflineCart();
  const [openCart, setOpenCart] = useOpenCart();
  const isOpen = searchParams.get("cart-open") === "true";

  const totalPrice = useMemo(() => {
    return cartItems.reduce(
      (acc, cartItem) => acc + cartItem.product.item.price * cartItem.quantity,
      0
    );
  }, [cartItems]);

  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(cartItems.length);

  const shippingPrice = 5;
  const tax = (totalPrice * 0.12).toFixed(2);
  const updatedTotalPrice = totalPrice + shippingPrice + Number(tax);

  useEffect(() => {
    setQuantity(cartItems.length);
  }, [cartItems.length]);

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await fetch("http://localhost:3000/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          products: cartItems.map((item) => ({
            id: String(item.product.id),
            items: item.product.item
              ? [{ id: String(item.product.item.id) }]
              : [],
            ingredients: item.ingredients.map((ingredient) =>
              String(ingredient.id)
            ),
          })),
          address: form.getValues().address,
          fullName: form.getValues().name,
          email: form.getValues().email,
          phone: form.getValues().phone,
          comment: form.getValues().note || "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to place the order.");
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Order placed successfully!");
      router.push("/order-history");
    },
    onError: () => {
      toast.error("You must be logged in to place an order.");
    },
  });

  if (typeof window !== "undefined" && cartItems.length === 0) {
    return <CartEmpty />;
  }

  const submitForm = () => {
    mutate();
  };

  return (
    <div
      style={{ maxHeight: "100vh - 114px" }}
      className=" w-full overflow-y-hidden bg-[#fdfdfd]"
    >
      <Container className="pt-8">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit(() => submitForm())(e);
          }}
        >
          <div className="mx-auto ">
            <h1 className="mb-6 text-2xl font-bold">Checkout your order</h1>

            <div className="grid gap-6 lg:grid-cols-[1fr,380px]">
              <div className="space-y-6">
                {/* Cart Section */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">1. Your Cart</h2>
                    <div className="flex items-center justify-between gap-4">
                      <ul className="flex flex-col gap-2 w-full max-h-[330px] overflow-y-auto">
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
                  </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                      2. Personal Information
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <Label htmlFor="firstName">Name</Label>
                        <Input
                          {...form.register("name")}
                          id="firstName"
                          placeholder="Name"
                          error={errors.name?.message}
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Surname</Label>

                        <Input
                          {...form.register("surname")}
                          id="lastName"
                          error={errors.surname?.message}
                          placeholder="Surname"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-Mail</Label>
                        <Input
                          error={errors.email?.message}
                          id="email"
                          type="email"
                          {...form.register("email")}
                          placeholder="Email"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          error={errors.phone?.message}
                          {...form.register("phone")}
                          id="phone"
                          type="tel"
                          placeholder="+359 878 39 123"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Delivery Address */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-4 text-lg font-semibold">
                      3. Shipping Address
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Your address</Label>
                        <Input
                          error={errors.address?.message}
                          {...form.register("address")}
                          id="address"
                          placeholder="Varna, ul. Ivan Vazov 24"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="comment">Note for the order</Label>
                        <textarea
                          {...form.register("note")}
                          className="resize-none h-24 max-h-48 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
                          id="comment"
                          rows={4}
                          placeholder="Additional Note"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Order Summary */}
              <div className="h-fit lg:sticky lg:top-6">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="mb-1 text-lg font-semibold">Total:</h2>
                    <span className="pb-4 font-extrabold text-2xl">
                      {updatedTotalPrice.toFixed(2)}$
                    </span>
                    <div className="space-y-2 mt-5  border-t pt-4">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shopping Cart</span>
                        <span>{totalPrice}$</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax</span>
                        <span>{tax} $</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Shipping</span>
                        <span>{shippingPrice} $</span>
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="mt-6 w-full bg-primary text-md font-bold hover:bg-orange-600"
                      disabled={isPending}
                    >
                      {isPending ? "Processing..." : "Order"}
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </Container>
    </div>
  );
}
