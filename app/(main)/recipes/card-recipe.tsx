/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import StarRating from "./star-rating";
import { Heart } from "lucide-react";
import Link from "next/link";
import { fetchSendBookmarkRecipe, initialName } from "@/utils/recipe";
import { useState } from "react";
import { useAuthStore } from "@/components/providers/auth-provider";
import { toast } from "sonner";
import { RecipeCard } from "./latest-recipes";

const CardRecipe = ({ recipe }: { recipe: RecipeCard }) => {
  const [bookmark, setBookmark] = useState<boolean>(recipe.bookmarked);
  const { sessionToken } = useAuthStore((store) => store);
  const handleBookmark = async () => {
    try {
      await fetchSendBookmarkRecipe(recipe.id, sessionToken!);
      setBookmark(!bookmark);
      toast.success(
        `${!bookmark ? "Book mark success fully" : "Delete Bookmark Successfully"} `,
        {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        }
      );
    } catch (error) {
      toast.error("Please login account", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };
  return (
    <>
      <div
        key={recipe.id}
        className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]"
      >
        <div className="relative h-full">
          <Link href={`/recipes/${recipe.id}`}>
            <img
              className="h-[87%] w-full rounded-[15px] object-cover"
              src={recipe.img}
              alt="Recipe image"
            />
          </Link>
          <div className="flex flex-col absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse">
            {recipe.recipeCategories.map((recipeCategory, index) => (
              <div className="group" key={index}>
                <Button
                  className=" my-1 group-hover:hidden visible"
                  variant="secondary"
                  size="icon"
                >
                  <a href="#">{initialName(recipeCategory.name)}</a>
                </Button>
                <Button
                  className=" my-1 group-hover:flex hidden"
                  variant="secondary"
                  size="default"
                >
                  <a href="#">{recipeCategory.name}</a>
                </Button>
              </div>
            ))}
          </div>

          <div className="flex w-full justify-between items-center absolute top-3 px-5">
            <StarRating
              id={recipe.id}
              avgStar={recipe.avgStar}
              currentRating={recipe.currentRating}
            />
            <div className="flex">
              <Button variant="secondary" size="icon">
                <Heart
                  className="text-[#000000] cursor-pointer"
                  strokeWidth={1}
                  width={24}
                  height={25}
                  fill={`${bookmark === false ? "#D5D5D5" : "#FF0000"}`}
                  onClick={() => handleBookmark()}
                />
              </Button>
            </div>
          </div>
          <Link href={`/recipes/${recipe.id}`}>
            <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
              {recipe.name}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardRecipe;
