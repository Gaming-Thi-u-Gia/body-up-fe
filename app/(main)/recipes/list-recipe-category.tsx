/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import HeaderInfoViewAll from "./header-info-viewall";
import CardRecipe from "./recipe-card";
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchGetEachTopicWith4Recipe } from "@/utils/recipe/fetch";
import { RecipesTopicType } from "@/utils/recipe/type";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

const RecipeCategoryList = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [topicRecipes, setTopicRecipes] = useState<RecipesTopicType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const GetTopicRecipes = async () => {
      try {
        const data = await fetchGetEachTopicWith4Recipe(sessionToken as string);
        setTopicRecipes(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    GetTopicRecipes();
  }, [sessionToken]);

  if (isLoading) {
    return <RecipeCategoryListSkeleton />;
  }

  return (
    <div>
      <Link
        href="/recipes"
        className="inline-flex items-center text-[15px] leading-5 font-semibold"
      >
        <MoveLeft /> <span className="pl-2">Back To Recipe Home</span>
      </Link>
      {topicRecipes.map((topicRecipe, index) => (
        <div key={topicRecipe.id}>
          <HeaderInfoViewAll
            id={topicRecipe.id}
            name={topicRecipe.name}
            description={topicRecipe.description}
          />
          <div className="grid grid-cols-4 gap-5">
            {topicRecipe.recipes.map((recipe, index) => (
              <CardRecipe recipe={recipe} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export const RecipeCategoryListSkeleton = () => {
  return (
    <div>
      <div>
        <HeaderInfoViewAllSkeleton />
        <div className="grid grid-cols-4 gap-5">
          <CardRecipeSkeleton />
          <CardRecipeSkeleton />
          <CardRecipeSkeleton />
          <CardRecipeSkeleton />
        </div>
      </div>
      <div>
        <HeaderInfoViewAllSkeleton />
        <div className="grid grid-cols-4 gap-5">
          <CardRecipeSkeleton />
          <CardRecipeSkeleton />
          <CardRecipeSkeleton />
          <CardRecipeSkeleton />
        </div>
      </div>
    </div>
  );
};

const HeaderInfoViewAllSkeleton = () => {
  return (
    <div className="my-5">
      <div className="h-8 w-1/3 bg-gray-300 rounded-md animate-pulse"></div>
      <div className="h-6 w-1/2 bg-gray-300 rounded-md mt-2 animate-pulse"></div>
    </div>
  );
};

const CardRecipeSkeleton = () => {
  return (
    <div className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px] animate-pulse">
      <div className="relative h-full">
        <div className="h-[87%] w-full rounded-[15px] bg-gray-300"></div>
        <div className="flex flex-col absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse">
          <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
          <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
          <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
        </div>
        <div className="flex w-full justify-between items-center absolute top-3 px-5">
          <div className="h-8 w-12 bg-gray-400 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
        </div>
        <div className="text-[18px] font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center">
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCategoryList;
