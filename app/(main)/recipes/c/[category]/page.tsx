"use client";
import { useEffect, useState } from "react";
import HeaderInfoSort from "./header-info-sort";
import ListRecipe from "./list-recipe";
import { fetchTopicById } from "@/utils/recipe";
import { usePathname } from "next/navigation";
import { parse } from "path";
import { toast } from "sonner";
export type Topic = {
  id: number;
  name: string;
  recipes: Recipes[];
};
type Recipes = {
  id: number;
  name: string;
  avgStar: number;
  prepTime: string;
  cookDetail: string;
  img: string;
  recipeCategories: RecipeCategories[];
};
type RecipeCategories = {
  id: number;
  name: string;
  type: string;
};
const Category = () => {
  const usePathName = usePathname();
  const parts = usePathName.split("=");
  const topicId = parseInt(parts[parts.length - 1]);
  console.log(parts);
  console.log(topicId);
  const [topic, setTopic] = useState<Topic>();
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const data = await fetchTopicById(topicId);
        setTopic(data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch Topic");
      }
    };
    fetchTopic(), [];
  }, []);
  return (
    <div className=" max-w-7xl h-full mx-auto mb-10">
      <HeaderInfoSort name={topic?.name!} />
      <ListRecipe recipes={topic?.recipes!} />
    </div>
  );
};

export default Category;
