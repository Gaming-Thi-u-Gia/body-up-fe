/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Star from "./star-rating";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { initialName } from "@/utils/recipe";

export type Props = {
  userId: number;
  id: number;
  img: string;
  recipeCategories: RecipeCategories[];
  name: string;
  avgStar: number;
  bookmarked: boolean;
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
  bookmarked,
}: Props) => {
  return (
    <>
      <div
        key={id}
        className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px]"
      >
        <div className="relative h-full">
          <Link href={`/recipes/${id}`}>
            <img
              className="h-[87%] w-full rounded-[15px] object-cover"
              src={img}
              alt="Recipe image"
            />
          </Link>
          <div className="flex flex-col absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse">
            {recipeCategories.map((recipeCategory, index) => (
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
            <Star avgStar={avgStar} />
            <div className="flex">
              <Button variant="secondary" size="icon">
                <Heart
                  className="text-[#000000] cursor-pointer"
                  strokeWidth={1}
                  width={24}
                  height={25}
                  fill={`${bookmarked === false ? "#D5D5D5" : "#FF0000"}`}
                />
              </Button>
            </div>
          </div>
          <Link href={`/recipes/${id}`}>
            <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
              {name}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default CardRecipe;
