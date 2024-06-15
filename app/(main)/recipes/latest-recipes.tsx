/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import HeaderInfoSearch from "./header-info-viewall";
import Star from "./star-rating";
import { Heart } from "lucide-react";
import { fetchLatestRecipeData, fetchSendBookmarkRecipe } from "@/utils/recipe";
import { useAuthStore } from "@/components/providers/auth-provider";
import { initialName } from "@/utils/recipe";
import Link from "next/link";
import { toast } from "sonner";
type Recipe = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  img: string;
  currentRating: number;
  bookmarked: boolean;
  recipeCategories: RecipeCategories[];
};

type RecipeCategories = {
  id: number;
  name: string;
};

const LatestRecipes = () => {
  const [listLatestRecipes, setListLatestRecipes] = useState<Recipe[]>([]);
  const { user, sessionToken } = useAuthStore((store) => store);
  const [bookmarks, setBookmarks] = useState<{ [key: number]: boolean }>({});
  useEffect(() => {
    const fetchRecipeLatest = async () => {
      try {
        const data = await fetchLatestRecipeData(sessionToken!);
        setListLatestRecipes(data);
        setBookmarks({
          [data[0].id]: data[0].bookmarked,
          [data[1].id]: data[1].bookmarked,
        });
      } catch (error) {
        console.error("Error while fetching latest recipe:", error);
      }
    };
    fetchRecipeLatest();
  }, [user?.id, sessionToken]);
  const handleBookmark = async (id: number) => {
    try {
      const currentBookmark = bookmarks[id];
      await fetchSendBookmarkRecipe(id, sessionToken!);
      setBookmarks((prevBookmarks) => ({
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
  return (
    <div className=" h-full mx-auto">
      <HeaderInfoSearch name="Latest Recipes" description="" id={1} />
      {listLatestRecipes.length === 2 && (
        <div className="flex gap-5 ">
          {/* Recipe1 */}
          <div className="flex relative gap-5 w-[75%] h-[450px] bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] box-border py-5 px-4">
            <div className="relative">
              <Link href={`/recipes/${listLatestRecipes[0].id}`}>
                <img
                  className="h-[90%] w-[700px] cursor-pointer object-cover rounded-2xl"
                  src={listLatestRecipes[0].img}
                  alt="Recipe image"
                />
              </Link>
              <div className="absolute bottom-[calc(10%+12px)] left-3 flex-wrap-reverse w-[32px]">
                {listLatestRecipes[0].recipeCategories.map(
                  (recipeCategory, index) => (
                    <div className="group" key={index}>
                      <Button
                        className=" my-1 group-hover:hidden visible"
                        variant="secondary"
                        size="icon"
                      >
                        <a href="#">{initialName(recipeCategory.name)}</a>
                      </Button>
                      <Button
                        className=" my-1 group-hover:flex hidden"
                        variant="secondary"
                        size="default"
                      >
                        <a href="#">{recipeCategory.name}</a>
                      </Button>
                    </div>
                  )
                )}
              </div>
            </div>
            <div className="flex-1 ml-10px relative h-[90%]">
              <p className="text-[18px] font-medium leading-[150%] tracking-wide h-[15%] text-[#303033] cursor-pointer">
                <Link href={`/recipes/${listLatestRecipes[0].id}`}>
                  {listLatestRecipes[0].name}
                </Link>
              </p>
              <div className="h-[10%] ">
                <Star
                  id={listLatestRecipes[0].id}
                  avgStar={listLatestRecipes[0].avgStar}
                  currentRating={listLatestRecipes[0].currentRating}
                />
              </div>
              <p className="text-[14px] font-normal leading-[140%] h-[65%] ">
                {listLatestRecipes[0].detail}
              </p>
              <div className="absolute bottom-0 flex h-[10%]  w-full justify-between items-center">
                <Button
                  className="cursor-pointer"
                  variant="primaryOutline"
                  size="default"
                >
                  <Link href={`/recipes/${listLatestRecipes[0].id}`}>
                    View Recipe
                  </Link>
                </Button>
                <Heart
                  className="text-[#000000] cursor-pointer"
                  strokeWidth={1}
                  fill={`${bookmarks[listLatestRecipes[0].id] === false ? "#D5D5D5" : "#FF0000"}`}
                  width={24}
                  height={25}
                  onClick={() => handleBookmark(listLatestRecipes[0].id)}
                />
              </div>
            </div>
          </div>
          {/* Recipe2 */}
          <div className="flex-1 h-[450px] relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer box-border">
            <div className="relative">
              <Link href={`/recipes/${listLatestRecipes[1].id}`}>
                <img
                  className="h-[calc(450px*0.9-24px)] object-cover"
                  src={listLatestRecipes[1].img}
                  alt="Recipe image"
                />
              </Link>
              <div className="absolute bottom-3 left-3 flex-wrap-reverse w-[32px]">
                {listLatestRecipes[1].recipeCategories.map(
                  (recipeCategory, index) => (
                    <div className="group" key={index}>
                      <Button
                        className=" my-1 group-hover:hidden visible"
                        variant="secondary"
                        size="icon"
                      >
                        <a href="#">{initialName(recipeCategory.name)}</a>
                      </Button>
                      <Button
                        className=" my-1 group-hover:flex hidden"
                        variant="secondary"
                        size="default"
                      >
                        <a href="#">{recipeCategory.name}</a>
                      </Button>
                    </div>
                  )
                )}
              </div>
              <div className="flex w-full justify-between absolute top-3 px-5">
                <Star
                  id={listLatestRecipes[1].id}
                  avgStar={listLatestRecipes[1].avgStar}
                  currentRating={listLatestRecipes[1].currentRating}
                />
                <div className="flex">
                  <Heart
                    className="text-[#000000] cursor-pointer"
                    strokeWidth={1}
                    width={24}
                    height={25}
                    fill={`${bookmarks[listLatestRecipes[1].id] === false ? "#D5D5D5" : "#FF0000"}`}
                    onClick={() => handleBookmark(listLatestRecipes[1].id)}
                  />
                </div>
              </div>
            </div>
            <Link
              href={`/recipes/${listLatestRecipes[1].id}`}
              className="flex h-[calc(450px*0.1+24px)] items-center pl-3 text-[18px] font-medium text-[#303033]"
            >
              {listLatestRecipes[1].name}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default LatestRecipes;
