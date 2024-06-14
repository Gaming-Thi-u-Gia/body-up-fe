"use client";
import { title } from "process";
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
type Recipe = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  prepTime: string;
  cookTime: string;
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
  const [recipe, setRecipe] = useState<Recipe>();
  const { sessionToken, user } = useAuthStore((store) => store);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await fetchRecipeByIdData(
          recipeId!,
          user?.id,
          sessionToken!
        );
        setRecipe(data);
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
      <BodyRecipe
        recipeId={recipeId}
        avgStar={recipe.avgStar}
        name={recipe.name}
        detail={recipe.detail}
        currentRating={recipe.currentRating}
        recipeCategories={recipe.recipeCategories}
        noteRecipes={recipe.noteRecipes}
        ingredientRecipes={recipe.ingredientRecipes}
        img={recipe.img}
        totalRating={recipe.totalRating}
        bookmarked={recipe.bookmarked}
      />
      <CookInfo
        cookingInstruction={recipe.cookingInstruction}
        noteRecipes={recipe.noteRecipes}
      />
      <ImageSwipe otherImageRecipes={recipe.otherImageRecipes} />
    </>
  );
};

export default CookDetail;
