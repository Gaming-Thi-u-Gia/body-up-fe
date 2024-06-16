"use client";
import { handleSort, fetchGetSearchByNameData } from "@/utils/recipe";
import { useEffect, useState } from "react";
import React from "react";
import { toast } from "sonner";
import { useParams, usePathname } from "next/navigation";
import { useAuthStore } from "@/components/providers/auth-provider";
import NavbarRecipes from "../../navbar-recipes";
import { RecipeCard } from "../../latest-recipes";
import { List } from "lucide-react";
import ListRecipe from "../../c/[category]/list-recipe";

type TopicRecipe = {
  id: number;
  topic: string;
  name: string;
};
const HeaderSearch = () => {
  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];
  const pathName = usePathname();
  const parts = pathName.split("=");
  const recipeName = parts[parts.length - 1];
  console.log(recipeName);
  const { sessionToken } = useAuthStore((store) => store);
  const handleSortChange = (type: string) => {
    if (recipes) {
      setRecipes([...handleSort(recipes, type)]);
    }
  };

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
          console.log(recipeName);
          const data = await fetchGetSearchByNameData(
            recipeName as string,
            sessionToken as string
          );
          setRecipes(data);
          console.log(data);
        } catch (error) {
          toast.error("Failt To Fetch Recipe", {
            description: `${new Date().toLocaleString()}`,
            action: {
              label: "Close",
              onClick: () => console.log("Close"),
            },
          });
        }
      }
    };
    fetchRecipes();
  }, [recipeName]);

  return (
    <div className="max-w-7xl mx-auto">
      <NavbarRecipes />
      <ListRecipe recipes={recipes} />
    </div>
  );
};

export default HeaderSearch;
