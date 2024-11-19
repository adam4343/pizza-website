"use client";
import { Container } from "@/components/shared/container";
import { Title } from "@/components/shared/title";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, usePathname } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Product, ProductItem } from "@prisma/client";
import { IngredientCarousel } from "@/components/shared/ingredient-carousel";
import { Button } from "@/components/ui/button";
import { IngredientT, TypeItem } from "@/lib/types/types";
import { TProduct } from "@/components/shared/product-cards-group";
import { z } from "zod";
import { Skeleton } from "@/components/ui/skeleton";
import { ingredientSchema } from "@/components/shared/ingredient-card";
import useOfflineCart from "@/lib/stores/useOfflineCart";
import { useOpenCart } from "@/components/shared/cart";
import { ProductCard } from "@/components/shared/product-card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
type stateT = {
  pizzaSize: number;
  pizzaType: number;
};

export function correctSize(size: number): string {
  switch (size) {
    case 20:
      return "Small";
    case 30:
      return "Medium";
    case 40:
      return "Large";
    default:
      return "Unknown Size";
  }
}

export function correctType(type: number): string {
  switch (type) {
    case 1:
      return "Traditional";
    case 2:
      return "Tiny";
    default:
      return "Unknown Type";
  }
}
type ApiResponse = {
  uniqueProduct: TProduct;
  similarProducts: TProduct[];
};
export const ProductPage = () => {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const { addCartItem } = useOfflineCart();
  const editSearchParams = new URLSearchParams(searchParams);
  const [openCart, closeCart] = useOpenCart();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/uniqueProduct",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: params.id }),
          }
        );
        if (!response.ok) throw new Error("Product did not load");
        return (await response.json()) as ApiResponse;
      } catch (e) {
        console.error("Error:", e);
        throw e;
      }
    },
  });

  const pizzaSize = editSearchParams.get("pizzaSize");
  const pizzaType = editSearchParams.get("pizzaType");
  const ingredients = editSearchParams.get("ingredients");

  const selectedCombination = useMemo(() => {
    if (!data) return null;
    const validPizzaSize = z.enum(["20", "30", "40"]).safeParse(pizzaSize);
    const validPizzaType = z.enum(["1", "2"]).safeParse(pizzaType);

    const size = validPizzaSize.success ? Number(validPizzaSize.data) : 20;
    const type = validPizzaType.success ? Number(validPizzaType.data) : 1;

    const foundCombination = data.uniqueProduct.items.find(
      (pizzaVariation) =>
        size === pizzaVariation.size && type === pizzaVariation.pizzaType
    );

    return foundCombination ?? data.uniqueProduct.items[0];
  }, [pizzaSize, pizzaType, data]);

  const totalPrice = useMemo(() => {
    if (!selectedCombination || !data)
      return { total: 0, filteredIngredientItems: [] };
    const combinationPrice = selectedCombination.price;
    let ingredientIdArray: number[] = [];
    try {
      if (ingredients) {
        const parsedArray = ingredientSchema.parse(JSON.parse(ingredients));

        ingredientIdArray = parsedArray;
      }
    } catch (e) {
      ingredientIdArray = [];
    }

    const filteredIngredientItems = data?.uniqueProduct.ingredients.filter(
      (ingredient) => ingredientIdArray.includes(ingredient.id)
    );

    const ingredientTotal = filteredIngredientItems.reduce(
      (acc, ingr) => acc + ingr.price,
      0
    );

    const total = combinationPrice + ingredientTotal;
    return { total, filteredIngredientItems };
  }, [pizzaSize, pizzaType, ingredients, data]);

  if (isLoading)
    return (
      <Container className="p-6">
        <section className="flex flex-col lg:flex-row gap-12 pt-10">
          {/* Product Image */}
          <Skeleton className="rounded-lg h-[300px] sm:h-[400px] lg:h-[500px] w-full lg:min-w-[350px] lg:max-w-[570px]" />

          {/* Product Details */}
          <div className="flex flex-col w-full max-h-[570px]">
            {/* Product Title */}
            <Skeleton className="h-8 w-32 sm:w-48 mb-4" />

            {/* Product Description */}
            <Skeleton className="h-4 w-24 sm:w-32 mb-4" />
            <Skeleton className="h-4 w-full mb-4" />

            {/* Size Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {/* Dough Type Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 mt-4">
              <Skeleton className="h-10 w-full rounded-lg" />
              <Skeleton className="h-10 w-full rounded-lg" />
            </div>

            {/* Ingredients Section */}
            <div className="mt-6">
              <Skeleton className="h-4 w-24 sm:w-32 mb-4" />
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index} className="flex flex-col gap-3 items-center">
                    <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg" />
                    <Skeleton className="h-2 w-10 sm:w-14" />
                    <Skeleton className="h-2 w-10 sm:w-14" />
                  </div>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <Skeleton className="mt-12 h-12 w-full max-w-[200px] sm:max-w-[300px] rounded-lg" />
          </div>
        </section>

        <section className="mt-10">
          <Skeleton className="h-6 w-36 sm:w-48 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Recommended Product Cards */}
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <Skeleton className="w-full h-32 sm:h-48 rounded-lg" />
                <Skeleton className="h-4 w-24 sm:w-32 mt-4" />
                <Skeleton className="h-4 w-16 sm:w-20 mt-1" />
                <Skeleton className="h-10 w-full mt-2 rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      </Container>
    );
  if (error) return <div>Error loading product</div>;

  const pizzaSizes = Array.from(
    new Set(
      data?.uniqueProduct.items
        .map((item: ProductItem) => item.size)
        .filter((type) => type !== null)
    )
  );

  const pizzaTypes = Array.from(
    new Set(
      data?.uniqueProduct.items
        .map((item: ProductItem) => item.pizzaType)
        .filter((type) => type !== null)
    )
  );

  function updateSelection(key: "pizzaSize" | "pizzaType", value: number) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(key, value.toString());
    router.replace(`${pathName}?${newSearchParams.toString()}`);
  }

  return (
    <>
      {data && (
        <Container className="p-4 sm:p-6">
          <section className="flex flex-col lg:flex-row gap-6 sm:gap-12 pt-4 sm:pt-10">
            <div className="w-full lg:w-1/2 bg-secondary rounded-lg flex items-center justify-center p-4">
              <Image
                width={450}
                height={450}
                src={data.uniqueProduct.imageUrl}
                alt={data.uniqueProduct.name}
                className="w-full max-w-[330px]  sm:max-w-[450px] aspect-square object-contain hover:translate-y-1 transition duration-200"
              />
            </div>
            <div className="w-full lg:w-1/2 flex flex-col">
              <Title
                text={data.uniqueProduct.name}
                size="xl"
                className="font-extrabold  "
              />
              <p className="text-sm text-gray-500 pt-2">
                {selectedCombination?.size} cm,{" "}
                {correctType(Number(selectedCombination?.pizzaType))}, $
                {selectedCombination?.price}
              </p>
              <p className="mt-4 text-gray-700">
                {data.uniqueProduct.description}
              </p>

              {data.uniqueProduct.items.length > 1 && (
                <div className="mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap bg-gray-200 rounded-full p-1">
                      {pizzaSizes.map((size, id) => (
                        <button
                          key={id}
                          onClick={() => updateSelection("pizzaSize", size)}
                          className={`flex-1 py-2 text-sm rounded-full transition-colors ${
                            selectedCombination?.size === size
                              ? "bg-white text-black"
                              : "text-gray-600"
                          }`}
                        >
                          {correctSize(size)}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap bg-gray-200 rounded-full p-1">
                      {pizzaTypes.map((type, id) => (
                        <button
                          key={id}
                          onClick={() => updateSelection("pizzaType", type)}
                          className={`flex-1 py-2 rounded-full text-sm transition-colors ${
                            selectedCombination?.pizzaType === type
                              ? "bg-white text-black"
                              : "text-gray-600"
                          }`}
                        >
                          {correctType(type)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <Title
                      text="Ingredients"
                      size="sm"
                      className="font-semibold pb-4"
                    />

                    <div className="flex flex-wrap gap-4">
                      <IngredientCarousel
                        ingredients={data.uniqueProduct.ingredients}
                      />
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={() => {
                  selectedCombination &&
                    addCartItem({
                      ingredients: totalPrice.filteredIngredientItems,
                      product: {
                        ...data.uniqueProduct,
                        item: {
                          id: selectedCombination?.id,
                          price: totalPrice.total,
                          size: selectedCombination?.size,
                          pizzaType: selectedCombination?.pizzaType,
                          productId: selectedCombination?.productId,
                        },
                      },
                      quantity: 1,
                      productItemId: data.uniqueProduct.id,
                    });
                  openCart();
                }}
                className="w-full mt-8 rounded-md h-12 text-base font-semibold"
              >
                Add to cart for ${totalPrice.total}
              </Button>
            </div>
          </section>

          {data.similarProducts && (
            <section className="py-8 sm:py-14">
              <Title
                text="Recommended Products"
                size="lg"
                className="font-extrabold mb-4"
              />
              <Swiper
                navigation={true}
                modules={[Navigation]}
                spaceBetween={16}
                breakpoints={{
                  300: { slidesPerView: 1.5 },
                  640: { slidesPerView: 2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="mySwiper"
              >
                {data.similarProducts?.map((product) => (
                  <SwiperSlide key={product.id}>
                    <ProductCard product={product} item={product.items[0]} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          )}
        </Container>
      )}
    </>
  );
};

export default ProductPage;
