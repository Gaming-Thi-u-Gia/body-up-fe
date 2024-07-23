"use client";

import { useAuthStore } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Heart, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  fetchPostBookmarkRecipe,
  fetchPostRatingRecipe,
} from "@/utils/recipe/fetch";
import {
  RecipeInformationType,
  RecipesCategoriesType,
} from "@/utils/recipe/type";
import Link from "next/link";

const RecipeContent = ({
  recipecontent,
}: {
  recipecontent: RecipeInformationType;
}) => {
  const { sessionToken } = useAuthStore((store) => store);
  const [currentHoverRating, setCurrentHoverRating] = useState<null | number>(
    null
  );
  const [currentRating, setCurentRating] = useState<number>(
    recipecontent.currentRating
  );
  const [currentBookmark, setCurrentBookmark] = useState<boolean>(
    recipecontent.bookmarked
  );
  const [currentAverageStar, setCurrentAverageStar] = useState<number>(
    recipecontent.avgStar
  );
  const [currentTotalRating, setCurrentTotalRating] = useState<number>(
    recipecontent.totalRating
  );

  const handleCurrentBookmark = async () => {
    try {
      const response = await fetchPostBookmarkRecipe(
        recipecontent.id,
        sessionToken!
      );
      setCurrentBookmark(response.bookmarked);
      toast.success("Bookmark Recipe Successfully", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
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

  const handleCurrentRating = async (numberStar: number) => {
    try {
      const response = await fetchPostRatingRecipe(
        recipecontent.id,
        sessionToken!,
        numberStar
      );
      setCurentRating(response.star);
      setCurrentAverageStar(response.avgStar);
      setCurrentTotalRating(response.totalRating);
      toast.success("Rating Recipe Successfully", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } catch (error) {
      console.error("Error sending rating:", error);
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
    <div className="border-b-2 border-[#C4C4C4]">
      <div className="flex m-auto max-w-7xl h-auto box-border">
        <div className="grid grid-cols-2 w-full h-full items-center">
          <div className="w-full h-full border-r-2 border-[#C4C4C4]">
            <div className="mt-[10%]">
              {recipecontent.recipeCategories.map(
                (category: RecipesCategoriesType) => (
                  <Link
                    key={category.id}
                    href={`/recipes/filter-recipe/categoryId${category.id}`}
                    className="inline-flex bg-black text-white rounded-[54px] px-3 py-1 text-[12px] mr-[10px]"
                  >
                    {category.name}
                  </Link>
                )
              )}
            </div>
            <p className="text-[32px] leading-[45px] text-[#303033] my-10">
              {recipecontent.detail}
            </p>
            <div>
              <div className="flex text-[#868A93] text-[13px] items-stretch">
                <div>
                  <span className="cursor-pointer flex">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="star-label">
                        <Star
                          fill={`${(currentHoverRating ?? currentRating) > index ? "#FEE58E" : "#D3D3D3"}`}
                          strokeWidth={0}
                          width={34}
                          onMouseEnter={() => setCurrentHoverRating(index + 1)}
                          onMouseLeave={() => setCurrentHoverRating(null)}
                          onClick={() => handleCurrentRating(index + 1)}
                        />
                      </span>
                    ))}
                  </span>
                  <div className="pl-5">
                    <p>
                      Avg {parseFloat(currentAverageStar.toFixed(2))} stars (
                      {currentTotalRating})
                    </p>
                  </div>
                </div>
                <span>
                  <p>Rate this recipe</p>
                </span>
              </div>
            </div>
            <div className="flex my-10">
              <Button variant="secondary" size="icon">
                <Heart
                  width={24}
                  height={25}
                  strokeWidth={0}
                  fill={currentBookmark === false ? "#D5D5D5" : "#FF0000"}
                  onClick={() => handleCurrentBookmark()}
                />
              </Button>
            </div>
            <img
              className="w-[90%] h-[700px] object-cover mb-[10%]"
              src={recipecontent.img}
              alt={recipecontent.name}
            />
          </div>
          <div className="flex w-full h-full items-center">
            <div className="pl-[15%] pt-[10%]">
              <div>
                <p className="text-[25px] font-bold mb-5">Ingredients</p>
                <div>
                  {recipecontent.ingredientRecipes.map((ingridient) => (
                    <div key={ingridient.id} className="flex py-1">
                      <p className="min-w-20 text-[20px] font-semibold pr-5">
                        {ingridient.amount}
                      </p>
                      <p className="flex-1 text-[20px]">{ingridient.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeContent;
