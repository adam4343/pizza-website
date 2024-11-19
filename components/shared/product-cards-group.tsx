import React, { useEffect } from "react";
import { ProductCard } from "./product-card";
import { Title } from "./title";
import { useIntersection } from "react-use";
import { useSectionStore } from "@/lib/stores/sectionState";
import { Ingredient, Product, ProductItem } from "@prisma/client";

export type TProduct = Product & {
  items: ProductItem[];
  ingredients: Ingredient[];
};

interface Props {
  className?: string;
  products: TProduct[];
  title: string;
  categoryId: number;
}

export const ProductCardsGroup: React.FC<Props> = ({
  className,
  products,
  title,
  categoryId,
}) => {
  const setActiveId = useSectionStore((state: any) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, { threshold: 0.4 });

  useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [categoryId, intersection?.isIntersecting]);
  console.log("PRODUCTS", products);
  return (
    <div id={title} className={className} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5 mt-6" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-[50px]">
        {products.map((product, id) => (
          <ProductCard
            className="w-full "
            key={id}
            product={product}
            item={product.items[0]}
          />
        ))}
      </div>
    </div>
  );
};
