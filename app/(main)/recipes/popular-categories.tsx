"use client";
import { fetchGetPopularCategoryRecipe } from "@/utils/recipe/fetch";
import { PopularCategoriesType } from "@/utils/recipe/type";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PopularCategories = () => {
  const [popularCategories, setPopularCategories] = useState<
    PopularCategoriesType[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPopularCategory = async () => {
      try {
        const data = await fetchGetPopularCategoryRecipe();
        setPopularCategories(data);
        setPopularCategories((popularCategory) =>
          [...popularCategory].sort((a, b) => a.name.localeCompare(b.name))
        );
      } catch (error) {
        toast.error("Failure to fetch Popular Categories", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } finally {
        setIsLoading(false);
      }
    };
    fetchPopularCategory();
  }, []);


  
  if (isLoading) {
    return (
      <div className="max-w-7xl flex flex-col mx-auto">
        <div>
          <p className=" text-[#303033] text-[22px] font-semibold leading-[30px] pt-5">
            Popular Categories
          </p>
        </div>
        <div className="grid grid-cols-4 gap-5 h-[95px] box-border my-5">
          <PopularCategoriesSkeleton />
          <PopularCategoriesSkeleton />
          <PopularCategoriesSkeleton />
          <PopularCategoriesSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto flex-col">
      <div>
        <p className="text-[#303033] text-[22px] font-semibold leading-[30px] pt-5">
          Popular Categories
        </p>
      </div>
      <div>
        <div className="grid grid-cols-4 gap-5 h-[95px] box-border my-5">
          {popularCategories.map((category, index) => (
            <Link
              key={index}
              className="flex h-full items-center bg-white rounded-[15px] border border-[#EFF0F4] cursor-pointer"
              href={`/recipes/filter-recipe/categoryId${category.id}`}
            >
              <img
                className="h-full w-[95px] rounded-[15px] object-cover"
                src={category.img}
                alt="popular food"
              />
              <div className="flex-1 pl-2">
                <p className="text-[#303033] text-[18px] font-medium leading-[140%] pb-1">
                  {category.name}
                </p>
                <p className="text-[14px] font-normal leading-[140%]">
                  {category.totalRecipe} recipes
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const PopularCategoriesSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto flex h-full items-center bg-white rounded-[15px] border border-[#EFF0F4] animate-pulse">
      <div className="h-full w-[95px] bg-gray-300 rounded-[15px]"></div>
      <div className="flex-1 pl-2">
        <div className="h-[20px] w-[70%] bg-gray-300 rounded-md mb-1"></div>
        <div className="h-[16px] w-[50%] bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
};

export default PopularCategories;
