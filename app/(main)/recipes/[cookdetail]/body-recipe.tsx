"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  fetchRatingRecipeData,
  fetchSendBookmarkRecipe,
  fetchSendRatingRecipe,
} from "@/utils/recipe";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  recipeId: number;
  name: string;
  detail: string;
  bookmarked: boolean;
  avgStar: number;
  totalRating: number;
  currentRating: number;
  ingredientRecipes: {
    id: number;
    amount: string;
    name: string;
  }[];
  recipeCategories: {
    id: number;
    name: string;
  }[];
  img: string;
  noteRecipes: {
    id: number;
    detail: string;
  }[];
};

const BodyRecipe = ({
  recipeId,
  avgStar,
  recipeCategories,
  ingredientRecipes,
  currentRating,
  name,
  detail,
  img,
  totalRating,
  bookmarked,
}: Props) => {
  const [hover, setHover] = useState<null | number>(null);
  const [bookmark, setBookmark] = useState<boolean>(bookmarked);
  const [rating, setRating] = useState<number>(currentRating);
  const { user, sessionToken } = useAuthStore((store) => store);
  console.log(currentRating);
  const handleBookmark = async () => {
    try {
      await fetchSendBookmarkRecipe(recipeId, user?.id!, sessionToken!);
      setBookmark(!bookmark);
      toast.success(
        `${!bookmark ? "Book mark success fully" : "Delete Bookmark Successfully"} `
      );
    } catch (error) {
      console.log("Loi SendFeedbback");
    }
  };
  const handleRating = async (numberStar: number) => {
    try {
      await fetchSendRatingRecipe(
        recipeId,
        user?.id!,
        sessionToken!,
        numberStar
      );
      setRating(numberStar);
      toast.success("Rating Successfully");
    } catch (error) {
      console.log("Loi SendFeedbback");
    }
  };
  return (
    <div className="border-b-2 border-[#C4C4C4]">
      <div className="flex m-auto max-w-7xl h-auto box-border">
        <div className="grid grid-cols-2 w-full h-full items-center">
          <div className="w-full h-full border-r-2 border-[#C4C4C4]">
            <div className="mt-[10%]">
              {recipeCategories.map((category) => (
                <a
                  key={category.id}
                  href="#"
                  className="inline-flex bg-black text-white rounded-[54px] px-3 py-1 text-[12px] mr-[10px]"
                >
                  {category.name}
                </a>
              ))}
            </div>
            <p className="text-[32px] leading-[45px] text-[#303033] my-10">
              {detail}
            </p>
            <div>
              <div className="flex text-[#868A93] text-[13px] items-stretch">
                <div>
                  <span className="cursor-pointer flex">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="star-label">
                        <Star
                          fill={`${(hover ?? rating) > index ? "#FEE58E" : "#D3D3D3"}`}
                          strokeWidth={0}
                          width={34}
                          onMouseEnter={() => setHover(index + 1)}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => handleRating(index + 1)}
                        />
                      </span>
                    ))}
                  </span>
                  <div className="pl-5">
                    <p>
                      Avg {avgStar} stars ({totalRating})
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
                  fill={bookmark === false ? "#D5D5D5" : "#FF0000"}
                  onClick={() => handleBookmark()}
                />
              </Button>
            </div>
            <img
              className="w-[90%] h-[700px] object-cover mb-[10%]"
              src={img}
              alt={name}
            />
          </div>
          <div className="flex w-full h-full items-center">
            <div className="pl-[15%] pt-[10%]">
              <div>
                <p className="text-[25px] font-bold mb-5">Ingredients</p>
                <div>
                  {ingredientRecipes.map((ing) => (
                    <div key={ing.id} className="flex py-1">
                      <p className="min-w-20 text-[20px] font-semibold pr-5">
                        {ing.amount}
                      </p>
                      <p className="flex-1 text-[20px]">{ing.name}</p>
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

export default BodyRecipe;
