"use client";
import { fetchGetRecipeByName } from "@/utils/recipe/fetch";
import BodySearch from "./body-search";
import HeaderSearch from "./header-search";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/components/providers/auth-provider";
import { usePathname } from "next/navigation";
import { RecipeCardType } from "@/utils/recipe/type";
import { handleSort } from "@/utils/recipe/handle-data";

const Search = () => {
  const [recipes, setRecipes] = useState<RecipeCardType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const pathName = usePathname();
  const parts = pathName.split("=");
  const recipeName = parts[parts.length - 1];
  const { sessionToken } = useAuthStore((store) => store);

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!recipeName) {
        toast.error("Recipe Name Not Exists", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      } else {
        try {
          const data = await fetchGetRecipeByName(recipeName, sessionToken!);
          setRecipes(data.recipes);
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
    fetchRecipes();
  }, [recipeName, sessionToken]);

  const handleSortType = (type: string) => {
    const sortedRecipes = handleSort(recipes, type);
    setRecipes([...sortedRecipes]);
  };

  return (
    <div>
      <HeaderSearch
        totalSearchResult={recipes.length}
        handleSortType={handleSortType}
      />
      <BodySearch recipes={recipes} isLoading={isLoading} />
    </div>
  );
};

export default Search;
