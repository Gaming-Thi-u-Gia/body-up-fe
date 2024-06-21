/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HeaderInfoSearch from "./header-info-viewall";
import Star from "./star-rating";
import { Heart } from "lucide-react";
import { useAuthStore } from "@/components/providers/auth-provider";
import Link from "next/link";
import { toast } from "sonner";
import {
  fetchGetRecipeLatest,
  fetchPostBookmarkRecipe,
} from "@/utils/recipe/fetch";
import { splitName } from "@/utils/recipe/handle-data";
import { RecipeCardType } from "@/utils/recipe/type";

const RecipesLatest = () => {
  const [listLatestRecipes, setListLatestRecipes] = useState<RecipeCardType[]>(
    []
  );
  const { sessionToken } = useAuthStore((store) => store);
  const [currentBookmarks, setCurrentBookmarks] = useState<{
    [key: number]: boolean;
  }>({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const getRecipeLatest = async () => {
      try {
        setIsLoading(true);
        const data = await fetchGetRecipeLatest(sessionToken!);
        setListLatestRecipes(data);
        setCurrentBookmarks({
          [data[0].id]: data[0].bookmarked,
          [data[1].id]: data[1].bookmarked,
        });
      } catch (error) {
        console.error("Error while fetching latest recipe:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getRecipeLatest();
  }, [sessionToken]);
  const handleBookmark = async (id: number) => {
    try {
      const currentBookmark = currentBookmarks[id];
      await fetchPostBookmarkRecipe(id, sessionToken!);
      setCurrentBookmarks((prevBookmarks) => ({
        ...prevBookmarks,
        [id]: !currentBookmark,
      }));
      toast.success(
        `${!currentBookmark ? "Bookmark success fully" : "Delete Bookmark Successfully"} `
      );
    } catch (error) {
      toast.error("Please login account", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };
  if (isLoading) {
    return (
      <div>
        <HeaderInfoSearch name="Latest Recipes" description="" id={0} />
        <LatestRecipesSkeleton />
      </div>
    );
  } else {
    return (
      <div className="max-w-7xl m-auto">
        <HeaderInfoSearch name="Latest Recipes" description="" id={0} />
        {listLatestRecipes.length === 2 && (
          <div className="flex gap-5 ">
            {/* Recipe1 */}
            <div className="flex justify-between relative gap-5 w-[75%] h-[450px] bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] box-border py-5 px-4">
              <div className="relative">
                <Link href={`/recipes/${listLatestRecipes[0].id}`}>
                  <img
                    className="h-[90%] w-[700px] cursor-pointer object-cover rounded-2xl"
                    src={listLatestRecipes[0].img}
                    alt="Recipe image"
                  />
                </Link>
                <div className="flex flex-col absolute bottom-[calc(10%+12px)] left-3 ">
                  {listLatestRecipes[0].recipeCategories.map(
                    (recipeCategory, index) => (
                      <div className="group" key={index}>
                        <Button
                          className=" my-1 group-hover:hidden visible"
                          variant="secondary"
                          size="icon"
                        >
                          <Link
                            href={`/recipes/filter-recipe/categoryId${recipeCategory.id}`}
                          >
                            <span>{splitName(recipeCategory.name)}</span>
                          </Link>
                        </Button>
                        <Button
                          className=" my-1 group-hover:flex hidden"
                          variant="secondary"
                          size="default"
                        >
                          <Link
                            href={`/recipes/filter-recipe/categoryId${recipeCategory.id}`}
                          >
                            <span>{recipeCategory.name}</span>
                          </Link>
                        </Button>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex-1 ml-10px h-[90%]">
                <p className="text-[18px] font-medium leading-[150%] tracking-wide h-[15%] text-[#303033] cursor-pointer">
                  <Link href={`/recipes/${listLatestRecipes[0].id}`}>
                    <span>{listLatestRecipes[0].name}</span>
                  </Link>
                </p>
                <div className="h-[10%] ">
                  <Star
                    id={listLatestRecipes[0].id}
                    avgStar={parseFloat(
                      listLatestRecipes[0].avgStar.toFixed(2)
                    )}
                    currentRating={listLatestRecipes[0].currentRating}
                  />
                </div>
                <div className="line-clamp-[10] text-ellipsis">
                  <p>{listLatestRecipes[0].detail}</p>
                </div>

                <div className="flex justify-between items-center text-[14px] font-normal leading-[140%] pt-5">
                  <Button
                    className="cursor-pointer"
                    variant="primaryOutline"
                    size="default"
                  >
                    <Link href={`/recipes/${listLatestRecipes[0].id}`}>
                      <span>View Recipe</span>
                    </Link>
                  </Button>
                  <Heart
                    className="text-[#000000] cursor-pointer"
                    strokeWidth={1}
                    fill={`${currentBookmarks[listLatestRecipes[0].id] === false ? "#D5D5D5" : "#FF0000"}`}
                    width={24}
                    height={25}
                    onClick={() => handleBookmark(listLatestRecipes[0].id)}
                  />
                </div>
              </div>
            </div>
            {/* Recipe2 */}
            <div className="bg-white border-solid border-[1px] border-[#E9E9EF] cursor-pointer rounded-2xl flex flex-col">
              <div className="relative">
                <Link href={`/recipes/${listLatestRecipes[1].id}`}>
                  <img
                    className="h-[calc(450px*0.9-24px)] object-cover rounded-2xl"
                    src={listLatestRecipes[1].img}
                    alt="Recipe image"
                  />
                </Link>
                <div className="absolute flex flex-col bottom-3 left-3 flex-wrap-reverse">
                  {listLatestRecipes[1].recipeCategories.map(
                    (recipeCategory, index) => (
                      <div className="group" key={index}>
                        <Button
                          className="my-1 group-hover:hidden visible"
                          variant="secondary"
                          size="icon"
                        >
                          <Link
                            href={`/recipes/filter-recipe/categoryId${recipeCategory.id}`}
                          >
                            <span>{splitName(recipeCategory.name)}</span>
                          </Link>
                        </Button>
                        <Button
                          className="my-1 group-hover:flex hidden"
                          variant="secondary"
                          size="default"
                        >
                          <Link
                            href={`/recipes/filter-recipe/categoryId${recipeCategory.id}`}
                          >
                            <span>{recipeCategory.name}</span>
                          </Link>
                        </Button>
                      </div>
                    )
                  )}
                </div>

                <div className="absolute top-3 px-5 flex w-full justify-between">
                  <Star
                    id={listLatestRecipes[1].id}
                    avgStar={parseFloat(
                      listLatestRecipes[1].avgStar.toFixed(2)
                    )}
                    currentRating={listLatestRecipes[1].currentRating}
                  />
                  <Heart
                    className="text-[#000000] cursor-pointer"
                    strokeWidth={1}
                    width={24}
                    height={25}
                    fill={`${
                      currentBookmarks[listLatestRecipes[1].id] === false
                        ? "#D5D5D5"
                        : "#FF0000"
                    }`}
                    onClick={() => handleBookmark(listLatestRecipes[1].id)}
                  />
                </div>
              </div>
              <div className=" flex item-center justify-center items-center h-16">
                <Link
                  className="text-[18px] font-medium text-[#303033]"
                  href={`/recipes/${listLatestRecipes[1].id}`}
                >
                  {listLatestRecipes[1].name}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
};

export default RecipesLatest;
const LatestRecipesSkeleton = () => {
  return (
    <div className="max-w-7xl h-full mx-auto">
      <div className="flex gap-5">
        <div className="flex relative gap-5 w-[75%] h-[450px] bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] box-border py-5 px-4 animate-pulse">
          <div className="relative">
            <div className="h-[90%] w-[700px] bg-gray-300 cursor-pointer object-cover rounded-2xl"></div>
            <div className="flex flex-col absolute bottom-[calc(10%+12px)] left-3">
              <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
              <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex-1 ml-10px h-[90%] flex flex-col justify-between space-y-2">
            <div className="h-[15%] bg-gray-300 rounded-md"></div>
            <div className="h-[10%] w-10 bg-gray-300 rounded-md"></div>
            <div className="flex flex-col h-[65%] justify-between">
              <div className="h-8 w-full bg-gray-300 rounded-md"></div>
              <div className="h-8 w-full bg-gray-300 rounded-md "></div>
              <div className="h-8 w-full bg-gray-300 rounded-md "></div>
              <div className="h-8 w-full bg-gray-300 rounded-md "></div>
            </div>
            <div className="flex h-[10%] w-full justify-between items-center">
              <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-10 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-white border-solid border-[1px] border-[#E9E9EF] cursor-pointer rounded-2xl animate-pulse">
          <div className="relative">
            <div className="h-[calc(450px*0.9-24px)] bg-gray-300 object-cover rounded-2xl"></div>
            <div className="absolute flex flex-col bottom-3 left-3 flex-wrap-reverse">
              <div className="my-1 h-8 w-8 bg-slate-400 rounded-full"></div>
              <div className="my-1 h-8 w-8 bg-slate-400 rounded-full"></div>
            </div>
            <div className="absolute top-3 px-5 flex w-full justify-between">
              <div className="h-8 w-24 bg-slate-400 rounded-md"></div>
              <div className="h-8 w-10 bg-slate-400 rounded-full"></div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center h-16">
            <div className="h-8 w-32 bg-slate-300 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
