/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import HeaderInfoViewAll from "./header-info-viewall";
import CardRecipe from "./card-recipe";
import { fetchRecipeWithTopicData } from "@/utils/recipe/index";
import { useAuthStore } from "@/components/providers/auth-provider";

type TopicRecipes = {
  id: number;
  name: string;
  description: string;
  recipes: Recipe[];
};
export type Recipe = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  img: string;
  currentRating: number;
  bookmarked: boolean;
  recipeCategories: [
    {
      id: number;
      name: string;
    },
  ];
};

const RecipeCategoryList = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [topicRecipes, setTopicRecipes] = useState<TopicRecipes[]>([]);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetchRecipeWithTopicData(sessionToken as string);
        setTopicRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchRecipes();
  }, [sessionToken]);
  return (
    <div>
      {topicRecipes.map((topicRecipe, index) => (
        <div key={topicRecipe.name}>
          <HeaderInfoViewAll
            name={topicRecipe.name}
            description={topicRecipe.description}
            id={topicRecipe.id}
          />
          <div className="grid grid-cols-4 gap-5">
            {topicRecipe.recipes.map((recipe, index) => (
              <CardRecipe recipe={recipe} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default RecipeCategoryList;
