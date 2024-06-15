"use client";
import { ChevronDown, MoveLeft } from "lucide-react";
import { useState } from "react";
import CardRecipe from "../recipes/card-recipe";

const RecipeSavedList = () => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const handleToggleSort = () => {
    setIsSortOpen(!isSortOpen);
  };
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];
  return (
    <div className="max-w-7xl m-auto">
      <div className="flex justify-between items-center py-5 max-w-7xl mx-auto">
        <div>
          <a
            href="/recipes"
            className="inline-flex items-center text-[15px] leading-5 font-semibold"
          >
            <MoveLeft /> <span className="pl-2">Back To Recipe Home</span>
          </a>
        </div>
        <button
          onClick={handleToggleSort}
          className="relative flex justify-end items-center cursor-pointer "
        >
          Sort by
          <ChevronDown width={10} />
          {isSortOpen && (
            <ul
              className={`absolute top-[21px] right-0 transition-opacity duration-3000 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white `}
            >
              {typeSort.map((type, index) => {
                return (
                  <li
                    className="py-1 px-1 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap"
                    key={index}
                  >
                    {type}
                  </li>
                );
              })}
            </ul>
          )}
        </button>
      </div>
      <div className="text-[#303033] text-[22px] font-semibold leading-[30px]">
        Saved recipes
      </div>
      <div className="grid grid-cols-4 gap-5">
        {recipes.map((recipe, index) => (
          <CardRecipe
            userId={user?.id as number}
            id={recipe.id}
            sessionToken={sessionToken!}
            name={recipe.name}
            avgStar={recipe.avgStar}
            img={recipe.img}
            bookmarked={recipe.bookmarked}
            currentRating={recipe.currentRating}
            recipeCategories={recipe.recipeCategories as []}
          />
        ))}
      </div>
    </div>
  );
};

export default RecipeSavedList;
