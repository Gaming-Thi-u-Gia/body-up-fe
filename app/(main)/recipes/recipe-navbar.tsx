"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useRouter } from "next/navigation";
import { fetchGetRecipeTopic } from "@/utils/recipe/fetch";
import FilterRecipe from "./filter-recipes";

type TopicRecipeType = {
  id: number;
  topic: string;
  name: string;
};

const RecipeNavbar = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [searchRecipeName, setRecipeSearch] = useState<string>("");
  const [recipeTopics, setRecipeTopics] = useState<TopicRecipeType[]>([]);
  const [isShowFilterTable, setIsShowFilterTable] = useState<boolean>(false);

  useEffect(() => {
    const getTopicRecipes = async () => {
      try {
        const data = await fetchGetRecipeTopic();
        setRecipeTopics([
          { id: -1, topic: "View All Collection", name: "View All Collection" },
          { id: 0, topic: "Latest Recipes", name: "Latest Recipes" },
          ...data,
        ]);
      } catch (error) {
        toast.error("Failed to fetch recipe collections");
      }
    };
    getTopicRecipes();
  }, []);

  const router = useRouter();
  const [showTopicCollection, setShowTopicCollection] =
    useState<boolean>(false);

  return (
    <div>
      <div className="max-w-7xl h-full mx-auto flex py-[20px] justify-between items-center border-b border-gray-300">
        <div className="h-full relative">
          <Button
            color="bg-black"
            id="current__cate"
            onClick={() => setShowTopicCollection(!showTopicCollection)}
            variant="secondary"
            className="px-[14px]"
            size="default"
          >
            Browse By Collection
            <Image width={15} height={14} src="/more.svg" alt="More" />
          </Button>
          <ul
            className={`transition-all duration-300 ease-in-out overflow-hidden mt-2 absolute bg-white z-10 rounded-[6px] leading-[22px] ${
              showTopicCollection
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {recipeTopics.map((recipeTopic, index) => (
              <li
                className="py-[5px] px-5 hover:text-[#000000d9] hover:bg-[#F7F7F7] cursor-pointer whitespace-nowrap text-[14px]"
                key={index}
              >
                <Link href={`/recipes/c/id=${recipeTopic.id}`}>
                  {recipeTopic.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex h-8">
          <div className="group inline-flex h-full">
            <span className="group-hover:opacity-0 group-hover:invisible transition-opacity duration-500 ease-in-out h-full">
              <Button variant="defaultOutline" size="default">
                <Image width={20} height={20} src="/search.svg" alt="More" />
                Search
              </Button>
            </span>
            <span
              onMouseEnter={(e) =>
                e.currentTarget.querySelector("input")?.focus()
              }
              className="relative inline-flex group-hover:w-[240px] items-center group-hover:opacity-100 transition-all ease-in-out duration-1000 h-full rounded-[15px] w-0 opacity-0"
            >
              <Image
                className="absolute left-[2px] cursor-pointer"
                width={20}
                height={20}
                src="/search.svg"
                alt="More"
                onClick={() =>
                  router.push(`/recipes/search/recipeName=${searchRecipeName}`)
                }
              />
              <input
                className="pl-5 w-full rounded-[15px] border-2 border-black"
                placeholder="Search"
                onChange={(e) => setRecipeSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    router.push(
                      `/recipes/search/recipeName=${searchRecipeName}`
                    );
                  }
                }}
              />
            </span>
          </div>
          <div>
            {sessionToken ? (
              <Link href={`/saved-recipes`}>
                <Button
                  className="bg-transparent mr-1"
                  variant="default"
                  size="default"
                >
                  <Image width={20} height={20} src="/heart.svg" alt="More" />
                  Saved Recipes
                </Button>
              </Link>
            ) : (
              <div className="group relative cursor-not-allowed">
                <Button
                  className="bg-transparent mr-1"
                  variant="disabled"
                  size="default"
                  disabled
                >
                  <Image width={20} height={20} src="/heart.svg" alt="More" />
                  Saved Recipes
                </Button>
                <div className="group-hover:flex absolute bg-white p-2 rounded-[25px] transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                  Login or Register for an account to save recipes
                </div>
              </div>
            )}
          </div>
          <div>
            <Button
              variant={`${isShowFilterTable ? "active" : "default"}`}
              size="default"
              onClick={() => setIsShowFilterTable(!isShowFilterTable)}
            >
              <Image width={20} height={20} src="/filter.svg" alt="More" />{" "}
              Filter
            </Button>
          </div>
        </div>
      </div>
      {
        <FilterRecipe
          isShowTableFilter={isShowFilterTable}
          setIsShowFilterTable={setIsShowFilterTable}
        />
      }
    </div>
  );
};

export default RecipeNavbar;
