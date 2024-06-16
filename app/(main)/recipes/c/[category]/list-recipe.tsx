import React from "react";
import CardRecipe from "../../card-recipe";
import { useAuthStore } from "@/components/providers/auth-provider";
import { RecipeCard } from "../../latest-recipes";

const ListRecipe = ({ recipes }: { recipes: RecipeCard[] }) => {
  const { user } = useAuthStore((store) => store);

  if (!recipes) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-4 gap-5">
        {recipes.map((recipe) => (
          <CardRecipe recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default ListRecipe;
