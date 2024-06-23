"use client";
import { useEffect, useState } from "react";
import HeaderInfoSort from "./header-info-sort";
import ListRecipe from "./list-recipe";
import { usePathname } from "next/navigation";
import { handleSort as sortRecipes } from "@/utils/recipe/handle-data";
import { fetchGetTopicRecipeById } from "@/utils/recipe/fetch";
import { RecipesTopicType, RecipeCardType } from "@/utils/recipe/type";
import RecipeNavbar from "../../recipe-navbar";
import { useAuthStore } from "@/components/providers/auth-provider";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";

const Category = () => {
  const pathname = usePathname();
  const parts = pathname.split("=");
  const topicId = parseInt(parts[parts.length - 1], 10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreRecipe, setHasMoreRecipe] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [topic, setTopic] = useState<RecipesTopicType>({
    id: 0,
    name: "",
    description: "",
    recipes: [],
  });
  const { sessionToken } = useAuthStore((store) => store);
  const typeSort = ["Most current", "Rating", "A to Z", "Z to A"];

  const handleSort = (type: string) => {
    if (topic) {
      setTopic((prevTopic) => ({
        ...prevTopic,
        recipes: sortRecipes(prevTopic.recipes, type),
      }));
    }
  };

  useEffect(() => {
    getTopic();
  }, [sessionToken]);

  const getTopic = async () => {
    try {
      setIsLoading(true);
      const pageSize = 4;
      const data = await fetchGetTopicRecipeById(
        topicId,
        pageNo,
        pageSize,
        sessionToken!
      );
      if (data.totalElements === 0) {
        setHasMoreRecipe(false);
        setIsLoading(false);
      } else {
        setTopic((previousTopic) => ({
          ...previousTopic,
          ...data,
          id: data.content.id,
          name: data.content.name,
          description: data.content.description,
          recipes: [...(previousTopic?.recipes || []), ...data.content.recipes],
        }));
        setPageNo((prev) => prev + 1);
        setHasMoreRecipe(!data.last);
      }
    } catch (error) {
      console.error("Error fetching topic:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-7xl h-full mx-auto mb-10">
      <RecipeNavbar />
      {isLoading && topic.recipes.length === 0 ? (
        <div>
          <HeaderInfoSortSkeleton />
          <ListRecipeSkeleton />
        </div>
      ) : (
        <>
          <HeaderInfoSort
            name={topic.name}
            description={topic.description}
            typeSort={typeSort}
            handleSort={handleSort}
          />
          <InfiniteScroll
            dataLength={topic.recipes.length}
            next={getTopic}
            hasMore={hasMoreRecipe}
            loader={<ListRecipeSkeleton />}
          >
            <ListRecipe recipes={topic.recipes} />
          </InfiniteScroll>
        </>
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
        <CardRecipeSkeleton />
        <CardRecipeSkeleton />
        <CardRecipeSkeleton />
        <CardRecipeSkeleton />
      </div>
    </div>
  );
};

const CardRecipeSkeleton = () => {
  return (
    <div className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px] animate-pulse">
      <div className="relative h-full">
        <div className="h-[87%] w-full rounded-[15px] bg-gray-300"></div>
        <div className="flex flex-col absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse">
          <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
          <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
          <div className="my-1 h-8 w-8 bg-gray-400 rounded-full"></div>
        </div>
        <div className="flex w-full justify-between items-center absolute top-3 px-5">
          <div className="h-8 w-12 bg-gray-400 rounded-full"></div>
          <div className="h-8 w-8 bg-gray-400 rounded-full"></div>
        </div>
        <div className="text-[18px] font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center">
          <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
        </div>
      </div>
    </div>
  );
};
