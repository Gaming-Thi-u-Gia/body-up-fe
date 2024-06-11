/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Star from "./star-rating";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  userId: number;
  id: number;
  img: string;
  recipeCategories: RecipeCategories[];
  name: string;
  avgStar: number;
  listBookmarkRecipesForUser: any;
};
type RecipeCategories = {
  id: number;
  name: string;
  type: string;
};
const CardRecipe = ({
  userId,
  id,
  img,
  recipeCategories,
  name,
  avgStar,
  listBookmarkRecipesForUser,
}: Props) => {
  const initialName = (recipeCategory: string) => {
    const words = recipeCategory.trim().split(" ");
    if (words.length === 1) {
      return words[0].substring(0, 2);
    } else {
      return words.slice(0, 2).join("");
    }
  };
  return (
    <>
      <Link href={`/recipes/${id}`}>
        <div
          key={id}
          className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]"
        >
          <div className="relative h-full">
            <img
              className="h-[87%] w-full rounded-[15px] object-cover"
              src={img}
              alt="Recipe image"
            />
            <div className="absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse w-[32px]">
              {recipeCategories.map((recipeCategory, index) => (
                <Button
                  className="my-1"
                  key={index}
                  variant="secondary"
                  size="icon"
                >
                  <a href="#">{initialName(recipeCategory.name)}</a>
                </Button>
              ))}
            </div>
            <div className="flex w-full justify-between items-center absolute top-3 px-5">
              <Star avgStar={avgStar} />
              <div className="flex">
                <Button className="mr-4" variant="secondary" size="icon">
                  <Image width={20} height={20} src="/add.svg" alt="add" />
                </Button>
                <Button variant="secondary" size="icon">
                  <Heart width={20} />
                </Button>
              </div>
            </div>
            <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
              {name}
            </p>
          </div>
        </div>
      </Link>
    </>
  );
};

export default CardRecipe;
