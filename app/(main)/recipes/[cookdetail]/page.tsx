"use client";
import Slider from "./slider";
import BodyRecipe from "./body-recipe";
import CookInfo from "./cook-info";
import ImageSwipe from "./image-swipe";
import { use, useEffect, useState } from "react";
import { fetchRecipeByIdData } from "@/utils/recipe/index";
import { useAuthStore } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
/* eslint-disable @next/next/no-img-element */
export type RecipeDetailType = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  prepTime: number;
  cookTime: number;
  img: string;
  cookingInstruction: string;
  currentRating: number;
  totalRating: number;
  bookmarked: boolean;
  ingredientRecipes: [
    {
      id: number;
      amount: string;
      name: string;
    },
  ];
  otherImageRecipes: [
    {
      id: number;
      img: string;
    },
  ];
  noteRecipes: [
    {
      id: number;
      detail: string;
    },
  ];
  recipeCategories: [
    {
      id: number;
      name: string;
    },
  ];
  ratingRecipes: {
    id: number;
    star: number;
  };
};

const CookDetail = () => {
  const usePathName = usePathname();
  const parts = usePathName.split("/");
  const recipeId = Number(parts[parts.length - 1]);
  const [recipe, setRecipe] = useState<RecipeDetailType>();
  const { sessionToken, user } = useAuthStore((store) => store);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await fetchRecipeByIdData(recipeId!, sessionToken!);
        setRecipe(data);
        console.log(data);
      } catch (error) {
        toast.error("Failed to fetch recipe");
        console.log(error);
      }
    };
    fetchRecipe();
  }, []);
  if (!recipe) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Slider
        img={recipe.img}
        name={recipe.name}
        cookTime={recipe.cookTime}
        prepTime={recipe.prepTime}
      />
      <BodyRecipe recipebody={recipe} />
      <CookInfo
        cookingInstruction={recipe.cookingInstruction}
        noteRecipes={recipe.noteRecipes}
      />
      <ImageSwipe otherImageRecipes={recipe.otherImageRecipes} />
    </>
  );
};

export default CookDetail;
