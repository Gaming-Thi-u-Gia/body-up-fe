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
  const pathName = usePathname();
  const parts = pathName.split("=");
  const recipeName = parts[parts.length - 1];
  const { sessionToken } = useAuthStore((store) => store);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasMoreRecipe, setHasMoreRecipe] = useState(false);
  const [totalSearchResult, setTotalSearchResult] = useState(0);

  useEffect(() => {
    GetRecipesSearch();
  }, [sessionToken]);
  const GetRecipesSearch = async () => {
    try {
      const pageSize = 4;
      setIsLoading(true);
      const data = await fetchGetRecipeByName(
        recipeName,
        sessionToken!,
        pageNo,
        pageSize
      );
      if (data.totalElements === 0) {
        setHasMoreRecipe(false);
        setIsLoading(false);
      }
      setRecipes((previousRecipes) => [...previousRecipes, ...data.content]);
      setTotalSearchResult(data.totalElements);
      console.log(data);
      setPageNo((prev) => prev + 1);
      setHasMoreRecipe(!data.last);
    } catch (error) {
      toast.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleSortType = (type: string) => {
    const sortedRecipes = handleSort(recipes, type);
    setRecipes([...sortedRecipes]);
  };

  return (
    <div>
      <HeaderSearch
        totalSearchResult={totalSearchResult}
        handleSortType={handleSortType}
      />
      <BodySearch
        recipes={recipes}
        isLoading={isLoading}
        hasMoreRecipe={hasMoreRecipe}
        GetRecipesSearch={GetRecipesSearch}
      />
    </div>
  );
};

export default Search;
