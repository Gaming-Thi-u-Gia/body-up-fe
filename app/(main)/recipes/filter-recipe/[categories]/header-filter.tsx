"use client";
import { ChevronDown, CircleX } from "lucide-react";
import { useState } from "react";
import RecipeNavbar from "../../recipe-navbar";
import Link from "next/link";
import { RecipesCategoriesType } from "@/utils/recipe/type";

const HeaderSearch = ({
  totalSearchResult,
  handleSortType,
  recipeCategories,
}: {
  totalSearchResult: number;
  handleSortType: (type: string) => void;
  recipeCategories: RecipesCategoriesType[];
}) => {
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];

  return (
    <div className="max-w-7xl mx-auto">
      <RecipeNavbar />
      <div className="flex">
        <div className="flex-1 bg-white py-4 my-4 flex justify-between items-center px-5 rounded-2xl shadow-md">
          <div className="flex items-center flex-wrap">
            <span className="whitespace-nowrap">
              Showing <b>{totalSearchResult} Recipes</b> Recipes matching
            </span>
            {recipeCategories.map((recipeCatgory, index) => (
              <div
                key={index}
                className="relative flex justify-center items-center px-3 py-1 m-1 rounded-2xl bg-gray-200 text-gray-800 font-bold"
              >
                <span>{recipeCatgory.name}</span>
                <span>
                  <CircleX
                    className="absolute -top-2 -right-2"
                    fill="black"
                    color="white"
                  />
                </span>
              </div>
            ))}
          </div>
          <div>
            <Link href={`/recipes`} className="text-red-500 text-nowrap">
              Remove All Filters
            </Link>
          </div>
        </div>

        <div
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="relative flex justify-end items-center cursor-pointer min-w-[200px]"
        >
          Sort by
          <ChevronDown width={10} />
          {isSortOpen && (
            <ul className="absolute top-[50px] right-0 transition-opacity duration-300 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white shadow-md rounded-lg">
              {typeSort.map((type, index) => (
                <li
                  className="py-2 px-4 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                  key={index}
                  onClick={() => {
                    handleSortType(type);
                    setIsSortOpen(false);
                  }}
                >
                  {type}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderSearch;
