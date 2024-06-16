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
  recipes: [];
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
        <div key={topicRecipe.id}>
          <HeaderInfoViewAll
            id={topicRecipe.id}
            name={topicRecipe.name}
            description={topicRecipe.description}
          />
          <div className="grid grid-cols-4 gap-5">
            {topicRecipe.recipes.map((recipe, index) => (
              <CardRecipe recipe={recipe} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default RecipeCategoryList;
