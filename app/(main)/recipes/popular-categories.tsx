/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { fetchPopularCategoryData } from "@/utils/recipe";
type PopularCategories = {
  id: number;
  name: string;
  img: string;
  totalRecipe: number;
}[];
const PopularCategories = () => {
  const [popularCategories, setPopularCategories] = useState<PopularCategories>(
    []
  );
  useEffect(() => {
    const fetchPopularCategory = async () => {
      try {
        const data = await fetchPopularCategoryData();
        setPopularCategories(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPopularCategory();
  }, []);
  console.log(popularCategories);
  return (
    <div>
      <div>
        <p className="text-[#303033] text-[22px] font-semibold leading-[30px] pt-5">
          Popular Categories
        </p>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-5 h-[95px] box-border my-5">
          {popularCategories.map((category, index) => (
            <div
              key={index}
              className="flex h-full items-center bg-white rounded-[15px] border border-[#EFF0F4]  cursor-pointer "
            >
              <img
                className="h-full w-[95px] rounded-[15px] object-cover"
                src={category.img!}
                alt="pupular food"
              />
              <div className="flex-1 pl-2">
                <p className="text-[#303033] text-[18px] font-medium leading-[140%] pb-1 ">
                  {category.name}
                </p>
                <p className="text-[14px] font-normal leading-[140%]">
                  {category.totalRecipe} recipes
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;
