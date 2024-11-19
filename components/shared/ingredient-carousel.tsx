"use client";
import React from "react";
import { Navigation } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { IngredientCard } from "./ingredient-card";
import { IngredientT } from "@/lib/types/types";
interface Props {
  ingredients: IngredientT[];
}

export const IngredientCarousel: React.FC<Props> = ({ ingredients }) => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      breakpoints={{
        300: { slidesPerView: 2.5 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
      className="mySwiper w-full max-w-[732px]   "
    >
      {ingredients.map((ingredient) => (
        <SwiperSlide key={ingredient.id} className="w-full">
          <IngredientCard ingredient={ingredient} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
