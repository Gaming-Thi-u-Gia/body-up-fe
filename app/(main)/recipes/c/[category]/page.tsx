"use client";
import { useEffect, useState } from "react";
import HeaderInfoSort from "./header-info-sort";
import ListRecipe from "./list-recipe";
import { usePathname } from "next/navigation";
import { toast } from "sonner";
import { handleSort as sortRecipes } from "@/utils/recipe/handle-data";
import { fetchGetTopicRecipeById } from "@/utils/recipe/fetch";
import { RecipesTopicType } from "@/utils/recipe/type";
import RecipeNavbar from "../../recipe-navbar";
import { useAuthStore } from "@/components/providers/auth-provider";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Category = () => {
  const pathname = usePathname();
  const parts = pathname.split("=");
  const topicId = parseInt(parts[parts.length - 1], 10);
  const { sessionToken } = useAuthStore((store) => store);

  const [topic, setTopic] = useState<RecipesTopicType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];

  const handleSort = (type: string) => {
    if (topic) {
      setTopic({
        ...topic,
        recipes: sortRecipes(topic.recipes, type),
      });
    }
  };

  useEffect(() => {
    const getTopic = async () => {
      try {
        const data = await fetchGetTopicRecipeById(topicId, sessionToken!);
        setTopic(data);
        setIsLoading(false);
        console.log(data);
      } catch (error) {
        toast.error("Fail to fetch topic", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
        setIsLoading(false);
      }
    };
    getTopic();
  }, [topicId]);

  return (
    <div className="max-w-7xl h-full mx-auto mb-10">
      <RecipeNavbar />
      {isLoading ? (
        <>
          <HeaderInfoSortSkeleton />
          <ListRecipeSkeleton />
        </>
      ) : (
        topic && (
          <>
            <HeaderInfoSort
              name={topic.name}
              description={topic.description}
              typeSort={typeSort}
              handleSort={handleSort}
            />
            <ListRecipe recipes={topic.recipes} />
          </>
        )
      )}
    </div>
  );
};

export default Category;
const HeaderInfoSortSkeleton = () => {
  return (
    <div>
      <Link
        href="/recipes"
        className="inline-flex items-center text-[15px] leading-5 font-semibold"
      >
        <MoveLeft /> <span className="pl-2">Back To Recipe Home</span>
      </Link>
      <div className="flex justify-between items-center py-5">
        <div className="max-w-2xl">
          <div className="h-[30px] bg-gray-200 w-[200px] mb-2"></div>
          <div className="h-[20px] bg-gray-200 w-[150px]"></div>
        </div>
        <div className="flex flex-col text-[14px] justify-center items-center">
          <div className="relative flex justify-end items-center cursor-pointer">
            <div className="h-[20px] bg-gray-200 w-[50px]"></div>
            <Image
              className="ml-1"
              width={10}
              height={10}
              src="/moredown.svg"
              alt="sort"
            />
            <ul className="absolute top-[21px] right-0 transition-opacity duration-300 ease-in-out z-[10] cursor-pointer whitespace-nowrap bg-white shadow-lg">
              <li className="py-1 px-2 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap bg-gray-200"></li>
              <li className="py-1 px-2 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap bg-gray-200"></li>
              <li className="py-1 px-2 hover:text-[#000000d9] hover:bg-[#F7F7F7] whitespace-nowrap bg-gray-200"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
const ListRecipeSkeleton = () => {
  return (
    <div className="max-w-7xl">
      <div className="grid grid-cols-4 gap-5">
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
        <RecipeCardSkeleton />
      </div>
    </div>
  );
};
const RecipeCardSkeleton = () => {
  return (
    <div className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]">
      <div className="relative h-full">
        <div className="h-[87%] w-full rounded-[15px] bg-gray-200"></div>
        <div className="absolute bottom-[calc(13%+12px)] left-3">
          <div className="my-1 h-[20px] w-[100px] bg-gray-200"></div>
          <div className="my-1 h-[20px] w-[100px] bg-gray-200"></div>
        </div>
        <div className="flex w-full justify-between items-center absolute top-3 px-5">
          <div className="h-[20px] w-[100px] bg-gray-200"></div>
          <div className="flex">
            <div className="h-[25px] w-[25px] bg-gray-200 rounded-full"></div>
          </div>
        </div>
        <div className="h-[13%] text-[18px] font-medium leading-[150%] pl-3 bg-gray-200"></div>
      </div>
    </div>
  );
};
