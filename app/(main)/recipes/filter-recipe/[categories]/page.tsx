"use client";
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchGetRecipeByCategories } from "@/utils/recipe/fetch";
import { handleSort } from "@/utils/recipe/handle-data";
import { RecipeCardType } from "@/utils/recipe/type";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import HeaderFilter from "./header-filter";
import BodyFilter from "./body-filter";

const Page = () => {
  const params = useParams();
  const { categories } = params;
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const { sessionToken } = useAuthStore((store) => store);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  let parts: string[] = [];
  if (typeof categories === "string") {
    parts = categories.split("categoryId");
  } else {
    console.log("categories is not a string");
  }

  useEffect(() => {
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
          const response = await fetchGetRecipeByCategories(
            parts.slice(1),
            sessionToken!
          );
          console.log(response);
          setRecipes(response);
        } catch (error) {
          toast.error("Fail to Fetch Recipe", {
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
    getRecipeByCategories();
  }, [sessionToken]);

  const handleSortType = (type: string) => {
    const sortedRecipes = handleSort(recipes, type);
    setRecipes([...sortedRecipes]);
  };

  return (
    <div>
      <HeaderFilter
        totalSearchResult={recipes.length}
        handleSortType={handleSortType}
      />
      <BodyFilter recipes={recipes} isLoading={isLoading} />
    </div>
  );
};

export default Page;
