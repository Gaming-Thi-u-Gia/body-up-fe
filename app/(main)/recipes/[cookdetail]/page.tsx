"use client";
import { title } from "process";
import Slider from "./slider";
import Info from "./Info";
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
  avgStar: number;
  prepTime: number;
  cookTime: number;
  img: string;
  cookDetail: string;
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
  topics: [
    {
      id: number;
      topic: string;
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
  bookmarkUsers: {
    id: number;
  }[];
};

const CookDetail = () => {
  const usePathName = usePathname();
  const parts = usePathName.split("/");
  const recipeId = Number(parts[parts.length - 1]);
  const [recipe, setRecipe] = useState<Recipe>();
  console.log(recipe);
  console.log(recipeId);
  const images = [
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
    "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
  ];

  const { sessionToken } = useAuthStore((store) => store);
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const data = await fetchRecipeByIdData(recipeId, sessionToken!);
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
      <Info
        recipeId={recipeId}
        avgStar={recipe.avgStar}
        name={recipe.name}
        recipeCategories={recipe.recipeCategories}
        noteRecipes={recipe.noteRecipes}
        ingredientRecipes={recipe.ingredientRecipes}
        img={recipe.img}
        totalRating={recipe.ratingRecipes.length}
        bookmarkUsers={recipe.bookmarkUsers}
      />
      <CookInfo
        cookDetail={recipe.cookDetail}
        noteRecipes={recipe.noteRecipes}
      />
      <ImageSwipe otherImageRecipes={recipe.otherImageRecipes} />
    </>
  );
};

export default CookDetail;
