import React from "react";
import CardRecipe from "../../cart-recipe";
import { useAuthStore } from "@/components/providers/auth-provider";

type RecipeCategories = {
  id: number;
  name: string;
  type: string;
};

type Recipe = {
  id: number;
  name: string;
  avgStar: number;
  prepTime: string;
  cookDetail: string;
  img: string;
  recipeCategories: RecipeCategories[];
};

type Recipes = Recipe[];

const ListRecipe = ({ recipes }: { recipes: Recipes }) => {
  const { user } = useAuthStore((store) => store);

  if (!recipes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <CardRecipe
            userId={user?.id as number}
            key={recipe.id}
            id={recipe.id}
            img={recipe.img}
            recipeCategories={recipe.recipeCategories}
            name={recipe.name}
            avgStar={recipe.avgStar}
            listBookmarkRecipesForUser={null}
          />
        ))}
      </div>
    </div>
  );
};

export default ListRecipe;
