"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import {
  fetchRatingRecipeData,
  fetchSendBookmarkRecipe,
  fetchSendRatingRecipe,
} from "@/utils/recipe";
import { Heart } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type Props = {
  recipeId: number;
  name: string;
  avgStar: number;
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
  totalRating: number;
  bookmarkUsers: {
    id: number;
  }[];
};

const Info = ({
  recipeId,
  avgStar,
  recipeCategories,
  ingredientRecipes,
  name,
  img,
  totalRating,
  bookmarkUsers,
}: Props) => {
  const [hover, setHover] = useState<null | number>(null);
  const { user, sessionToken } = useAuthStore((store) => store);
  const [currentRating, setCurrentRating] = useState<number>(0);
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  useEffect(() => {
    const fetchRatingRecipe = async () => {
      if (!user) return;
      try {
        const data = await fetchRatingRecipeData(
          user.id!,
          recipeId,
          sessionToken!
        );
        setCurrentRating(data);
        toast.success("Successfully fetched rating data");
      } catch (error) {
        toast.error("Failed to fetch rating data");
      }
    };
    fetchRatingRecipe();
  }, []);

  const handleRating = async (newRating: number) => {
    console.log("newRating", newRating);
    if (!user) {
      redirect("/login");
      return;
    }
    try {
      setCurrentRating(newRating);
      await fetchSendRatingRecipe(recipeId, user.id!, newRating, sessionToken!);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to submit rating");
    }
  };
  const handleBookmark = async () => {
    if (!user) {
      redirect("/login");
      return;
    }
    try {
      await fetchSendBookmarkRecipe(recipeId, user.id!, sessionToken!);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to submit bookmark");
    }
  };
  useEffect(() => {
    if (!user) return;
    const isBookmarked = bookmarkUsers.some(
      (bookmarkUser) => bookmarkUser.id === user.id
    );
    setIsBookmarked(isBookmarked);
  }, [bookmarkUsers, user]);
  console.log("isBookmarked", isBookmarked);
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
              {name}
            </p>
            <div>
              <div className="flex text-[#868A93] text-[13px] items-stretch">
                <div>
                  <span className="cursor-pointer">
                    {[...Array(5)].map((_, index) => (
                      <span key={index} className="star-label">
                        <span
                          className={`text-[34px] ${
                            (hover ?? currentRating) > index
                              ? "text-[#FEE58E]"
                              : "text-[#D3D3D3]"
                          }`}
                          onMouseEnter={() => setHover(index + 1)}
                          onMouseLeave={() => setHover(null)}
                          onClick={() => handleRating(index + 1)}
                        >
                          &#9733;
                        </span>
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
                  strokeWidth={1}
                  fill={isBookmarked ? "#FF0000" : "#000000"}
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
                <div className="text-[18px]">
                  {ingredientRecipes.map((ing) => (
                    <div key={ing.id} className="flex py-1">
                      <p className="min-w-20">{ing.amount}</p>
                      <p className="flex-1">{ing.name}</p>
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

export default Info;
