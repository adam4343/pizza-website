import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

export const CartEmpty: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <ShoppingCart className="mx-auto h-24 w-24 text-gray-400" />
        </div>
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">
          Looks like you have not added products in your shopping cart yet! Lets
          fix this.
        </p>
        <Link href="/">
          <Button className="bg-primary hover:bg-orange-600 group text-white font-semibold py-2 px-4 rounded inline-flex items-center">
            Continue shopping
            <ArrowRight className="ml-2 h-4 w-4  duration-300  transition-transform  transform  group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
