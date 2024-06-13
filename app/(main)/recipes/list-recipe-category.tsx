/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import HeaderInfoViewAll from "./header-info-viewall";
import CardRecipe from "./cart-recipe";
import {
  fetchListBookMarkRecipeData,
  fetchRecipeData,
} from "@/utils/recipe/index";
import { useAuthStore } from "@/components/providers/auth-provider";
import { toast } from "sonner";
type listRecipes = {
  id: number;
  name: string;
  avgStar: number;
  prepTime: string;
  img: string;
  recipeCategories: ListRecipeCategories[];
};
type ListRecipeCategories = {
  id: number;
  name: string;
  type: string;
};
type TopicRecipes = {
  id: number;
  topic: string;
  name: string;
  recipes: listRecipes[];
};
type ListBookmarkRecipeForUser = {
  id: number;
  bookmarkRecipes: bookmarkRecipes[];
};
type bookmarkRecipes = {
  id: number;
};

const RecipeCategoryList = () => {
  const { user, sessionToken } = useAuthStore((store) => store);
  const [topicRecipes, setTopicRecipes] = useState<TopicRecipes[]>([]);
  const [listBookmarkRecipesForUser, setListBookmarkRecipesForUser] = useState<
    ListBookmarkRecipeForUser[]
  >([]);

  console.log(sessionToken);
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await fetchRecipeData();
        setTopicRecipes(data);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchBookmarkRecipe = async () => {
      try {
        const data = await fetchListBookMarkRecipeData(
          user?.id as number,
          sessionToken as string
        );
        setListBookmarkRecipesForUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchBookmarkRecipe();
    fetchRecipes();
  }, [user?.id, sessionToken]);

  return (
    <div>
      {topicRecipes.map((topicRecipe, index) => (
        <div key={topicRecipe.name}>
          <HeaderInfoViewAll name={topicRecipe.name} id={topicRecipe.id} />
          <div className="grid grid-cols-4 gap-5">
            {topicRecipe.recipes.map((recipe, index) => (
              <CardRecipe
                key={recipe.id}
                userId={user?.id as number}
                id={recipe.id}
                img={recipe.img}
                recipeCategories={recipe.recipeCategories as []}
                name={recipe.name}
                avgStar={recipe.avgStar}
                listBookmarkRecipesForUser={listBookmarkRecipesForUser}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCategoryList;
