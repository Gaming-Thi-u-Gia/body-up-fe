"use client";
import { useEffect, useState } from "react";
import HeaderInfoSort from "./header-info-sort";
import ListRecipe from "./list-recipe";
import { fetchTopicById, handleSort } from "@/utils/recipe";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { RecipeCard } from "../../latest-recipes";

export type TopicType = {
  id: number;
  name: string;
  description: string;
  recipes: RecipeCard[];
};

const Category = () => {
  const pathname = usePathname();
  const parts = pathname.split("=");
  const topicId = parseInt(parts[parts.length - 1], 10);

  const [topic, setTopic] = useState<TopicType | null>(null);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];
  const handleSortChange = (type: string) => {
    if (topic) {
      setTopic({
        ...topic,
        recipes: handleSort(topic.recipes, type),
      });
    }
  };
  useEffect(() => {
    const fetchTopic = async () => {
      try {
        const data = await fetchTopicById(topicId);
        setTopic(data);
      } catch (error) {
        toast.error("Fail to fetch topic", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      }
    };
    fetchTopic();
  }, [topicId]);

  return (
    <div className="max-w-7xl h-full mx-auto mb-10">
      <HeaderInfoSort
        name={topic?.name!}
        description={topic?.description!}
        typeSort={typeSort}
        handleSortChange={handleSortChange}
      />
      <ListRecipe recipes={topic?.recipes!} />
    </div>
  );
};

export default Category;
