/* eslint-disable @next/next/no-img-element */
"use client";
import { ChevronDown, MoveLeft } from "lucide-react";
import { useEffect, useState } from "react";
import CardRecipe from "../recipes/recipe-card";
import { useAuthStore } from "@/components/providers/auth-provider";
import { RecipeCardType } from "@/utils/recipe/type";
import Link from "next/link";
import { handleSort } from "@/utils/recipe/handle-data";
import { fetchGetSavedRecipe } from "@/utils/recipe/fetch";
import { set } from "zod";
import InfiniteScroll from "react-infinite-scroll-component";

const RecipeSavedList = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];
  const { sessionToken } = useAuthStore((store) => store);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreRecipe, setHasMoreRecipe] = useState(false);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    getSavedRecipes();
  }, [sessionToken]);

  const getSavedRecipes = async () => {
    try {
      setIsLoading(true);
      const pageSize = 8;
      const data = await fetchGetSavedRecipe(sessionToken!, pageNo, pageSize);
      if (data.totalElements === 0) {
        setHasMoreRecipe(false);
        setIsLoading(false);
      }
      setRecipes((prev) => [...prev, ...data.content]);
      setPageNo((previous) => previous + 1);
      setHasMoreRecipe(!data.last);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="max-w-7xl m-auto">
      <Link
        href="/recipes"
        className="inline-flex items-center text-[15px] leading-5 font-semibold pt-5"
      >
        <MoveLeft /> <span className="pl-2">Back To Recipe Home</span>
      </Link>
      <div className="flex justify-between items-center py-5 max-w-7xl mx-auto">
        <div className="text-[#303033] text-[22px] font-semibold leading-[30px] py-5">
          My saved Recipes
        </div>
        <button
          onClick={() => setIsSortOpen(!isSortOpen)}
          className="relative flex justify-end items-center cursor-pointer "
        >
          Sort by
          <ChevronDown width={10} />
          {isSortOpen && (
            <ul
              className={`absolute top-[21px] right-0 transition-opacity duration-3000 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white `}
            >
              {typeSort.map((type, index) => {
                return (
                  <li
                    className="py-1 px-1 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                    key={index}
                    onClick={() => handleSort(recipes, type)}
                  >
                    {type}
                  </li>
                );
              })}
            </ul>
          )}
        </button>
      </div>

      {isLoading && recipes.length === 0 ? (
        <div>
          <RecipeSavedListSkeleton />
          <RecipeSavedListSkeleton />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={recipes.length}
          next={getSavedRecipes}
          hasMore={hasMoreRecipe}
          loader={<RecipeSavedListSkeleton />}
        >
          <div className="grid grid-cols-4 gap-5">
            {recipes.map((recipe, index) => (
              <CardRecipe recipe={recipe} key={index} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default RecipeSavedList;

export const RecipeSavedListSkeleton = () => {
  return (
    <div className="max-w-7xl m-auto">
      <div className="grid grid-cols-4 gap-5">
        <CardRecipeSkeleton />
        <CardRecipeSkeleton />
        <CardRecipeSkeleton />
        <CardRecipeSkeleton />
      </div>
    </div>
  );
};
const CardRecipeSkeleton = () => {
  return (
    <div className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px] animate-pulse">
      <div className="h-[87%] w-full bg-gray-300 rounded-[15px]"></div>
      <div className="absolute bottom-[calc(13%+12px)] left-3 flex flex-col flex-wrap-reverse">
        <div className="bg-gray-400 h-6 w-12 my-1 rounded"></div>
        <div className="bg-gray-400 h-6 w-12 my-1 rounded"></div>
      </div>
      <div className="flex w-full justify-between items-center absolute top-3 px-5">
        <div className="bg-gray-400 h-6 w-24 rounded"></div>
        <div className="bg-gray-400 h-6 w-6 rounded-full"></div>
      </div>
      <div className="h-[13%] flex items-center pl-3">
        <div className="bg-gray-400 h-6 w-3/4 rounded"></div>
      </div>
    </div>
  );
};
