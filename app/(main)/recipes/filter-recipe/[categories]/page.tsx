"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchGetRecipeByCategories } from "@/utils/recipe/fetch";
import { handleSort } from "@/utils/recipe/handle-data";
import {
  RecipeCardType,
  RecipeCategories,
  RecipesCategoriesType,
} from "@/utils/recipe/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderFilter from "./header-filter";
import BodyFilter from "./body-filter";
import { set } from "zod";

const Page = () => {
  const [recipeCategory, setRecipeCategory] = useState<RecipeCategories[]>([]);
  const params = useParams();
  const { categories } = params;
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const { sessionToken } = useAuthStore((store) => store);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMoreRecipe, setHasMoreRecipe] = useState<boolean>(false);
  const [pageNo, setPageNo] = useState<number>(0);
  const [totalFilterResult, setTotalFilterResult] = useState(0);
  let parts: string[] = [];
  if (typeof categories === "string") {
    parts = categories.split("categoryId");
  } else {
    console.log("categories is not a string");
  }

  useEffect(() => {
    getRecipeByCategories();
  }, [sessionToken]);
  const getRecipeByCategories = async () => {
    if (parts.length < 2) {
      toast.error("Categories Not Exists", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
      return;
    } else {
      try {
        const sizePage = 8;
        const data = await fetchGetRecipeByCategories(
          parts.slice(1),
          sessionToken!,
          pageNo,
          sizePage
        );
        if (data.totalElements === 0) {
          setHasMoreRecipe(false);
          setIsLoading(false);
        }
        setRecipeCategory((prev) => [
          ...prev,
          ...data.content.recipeCategories.filter(
            (
              category: RecipesCategoriesType,
              index: number,
              self: RecipesCategoriesType[]
            ) =>
              index === self.findIndex((c) => c.id === category.id) &&
              !prev.some((prevCategory) => prevCategory.id === category.id)
          ),
        ]);

        setRecipes((prev) => [...prev, ...data.content.recipes]);
        setTotalFilterResult(data.totalElements);
        setPageNo((previous) => previous + 1);
        setHasMoreRecipe(!data.last);
      } catch (error) {
        toast.error("Fail to get recipe by categories", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSortType = (type: string) => {
    const sortedRecipes = handleSort(recipes, type);
    setRecipes([...sortedRecipes]);
  };

  return (
    <div>
      <HeaderFilter
        totalSearchResult={totalFilterResult}
        handleSortType={handleSortType}
        recipeCategories={recipeCategory}
      />
      <BodyFilter
        recipes={recipes}
        isLoading={isLoading}
        hasMoreRecipe={hasMoreRecipe}
        getRecipeByCategories={getRecipeByCategories}
      />
    </div>
  );
};

export default Page;
