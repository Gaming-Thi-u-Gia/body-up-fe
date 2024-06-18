"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { fetchGetRecipeById } from "@/utils/recipe/fetch";
import RecipeSlider from "./recipe-slider";
import RecipeContent from "./recipe-content";
import CookingDirection from "./cooking-direction";
import OtherImageSwipe from "./other-image-swipe";
import { RecipeInformationType } from "@/utils/recipe/type";
/* eslint-disable @next/next/no-img-element */

const RecipeInfomation = () => {
  const usePathName = usePathname();
  const parts = usePathName.split("/");
  const { sessionToken } = useAuthStore((store) => store);
  const recipeId = Number(parts[parts.length - 1]);
  const [recipe, setRecipe] = useState<RecipeInformationType>();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchGetRecipeById(recipeId!, sessionToken!);
        setRecipe(data);
      } catch (error) {
        toast.error("Failure to fetch Recipe", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    };
    getRecipe();
  }, []);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <RecipeSlider
        img={recipe.img}
        name={recipe.name}
        cookTime={recipe.cookTime}
        prepTime={recipe.prepTime}
      />
      <RecipeContent recipecontent={recipe} />
      <CookingDirection
        cookingInstruction={recipe.cookingInstruction}
        noteRecipes={recipe.noteRecipes}
      />
      <OtherImageSwipe otherImageRecipes={recipe.otherImageRecipes} />
    </>
  );
};

export default RecipeInfomation;
