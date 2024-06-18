import React from "react";
import CardRecipe from "../../recipe-card";
import { RecipeCardType } from "@/utils/recipe/type";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

const ListRecipe = ({ recipes }: { recipes: RecipeCardType[] }) => {
  if (!recipes) {
    return <div>Loading...</div>;
  }
  console.log(recipes);
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
