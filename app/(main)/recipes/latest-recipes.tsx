"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import HeaderInfoSearch from "./header-info-viewall";
import Star from "./star-rating";
import { Heart } from "lucide-react";
import { usePathname } from "next/navigation";

const LatestRecipes = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const pathname = usePathname();
  const listLastestRecipes = [
    {
      id_food: 1,
      title:
        "One Pot Rice Cooker Frid Rice dsadsa dsadsa ádsadd sadsadsa ewqeeeeeeeeeeeeeeeeeeeewqewq da",
      avgStar: 4,
      details:
        "Who says sweet potato is only for Autumn? Boost your breakfast nutrition with these delicious sweet potato pancakes, topped with crunchy roasted pecans, banana and a healthier chocolate syrup. You’d think you’re having dessert for breakfast!",
      dietary: ["Vg", "DF", "LF"],
      img: "/recipe1.png",
    },
    {
      id_food: 2,
      title: "Once pot rice Cooker Fried Rice",
      avgStar: 4.2,
      details:
        "Who says sweet potato is only for Autumn? Boost your breakfast nutrition with these delicious sweet potato pancakes, topped with crunchy roasted pecans, banana and a healthier chocolate syrup. You’d think you’re having dessert for breakfast!",
      dietary: ["LF"],
      img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6200d5a52e702a81e5803c59%2Fimages%2Fbaked-avocado-eggs-1675831846729-cover.jpeg&w=1920&q=90",
    },
  ];

  return (
    <div>
      <HeaderInfoSearch title="Latest Recipes" detail={""} />
      <div className="flex gap-5">
        {/* Recipe left */}
        <div className="flex relative gap-5 w-3/4 bg-white border border-gray-200 rounded-lg box-border py-5 px-4">
          <div className="relative">
            <a href={`/recipes/${listLastestRecipes[0].id_food}`}>
              <Image
                width={900 * 0.75}
                height={450 * 0.9}
                className="cursor-pointer object-cover"
                src="/recipe1.png"
                alt="Recipe image"
              />
            </a>
            <div className="absolute bottom-[calc(10%+12px)] left-3 flex-wrap-reverse w-[32px]">
              {listLastestRecipes[0].dietary.map((dietary, index) => (
                <Button
                  className="my-1"
                  key={index}
                  variant="secondary"
                  size="icon"
                >
                  <a href="#">{dietary}</a>
                </Button>
              ))}
            </div>
          </div>
          <div className="w-1/4 ml-2 relative h-[90%]">
            <a
              href="#"
              className="text-[18px] font-medium leading-[150%] h-[5%] text-[#303033]"
            >
              <p className=" text-ellipsis line-clamp-2">
                <a href={`/recipes/${listLastestRecipes[0].id_food}`}>
                  {listLastestRecipes[0].title}
                </a>
              </p>
            </a>
            <div className="h-[10%] ">
              <Star avgStar={listLastestRecipes[0].avgStar} />
            </div>
            <p className="text-[14px] font-normal leading-[140%] h-[65%]">
              {listLastestRecipes[0].details}
            </p>
            <div className="absolute bottom-0 flex h-10 w-full justify-between items-center">
              <Button
                className="cursor-pointer"
                variant="primaryOutline"
                size="default"
              >
                <a href={`/recipes/${listLastestRecipes[0].id_food}`}>
                  View reicpe
                </a>
              </Button>
              <Image
                className="text-black cursor-pointer"
                width={24}
                height={25}
                src="/heart.svg"
                alt="hert"
              />
            </div>
          </div>
        </div>
        {/* Recipe right */}
        <div className="flex-1 min-h-[450px] relative bg-white border border-gray-200 rounded-lg cursor-pointer box-border">
          <div className="relative">
            <Image
              width={450}
              height={0}
              className="h-[calc(450px*0.9-24px)] object-cover rounded-t-[15px]"
              src="/recipe1.png"
              alt="Recipe image"
            />
            <div className="absolute bottom-3 left-3 flex-wrap-reverse w-[32px]">
              {listLastestRecipes[1].dietary.map((dietary, index) => (
                <Button
                  className="my-1"
                  key={index}
                  variant="secondary"
                  size="icon"
                >
                  <a href="#">{dietary}</a>
                </Button>
              ))}
            </div>
            <div className="flex w-full justify-between absolute top-3 px-5">
              <Star avgStar={listLastestRecipes[1].avgStar} />
              <div className="flex">
                <Button variant="secondary" size="icon">
                  <Heart width={25} />
                </Button>
              </div>
            </div>
          </div>
          <a className="flex h-[calc(450px*0.1+24px)] items-center pl-3 text-lg font-medium text-gray-800">
            <p className="text-ellipsis line-clamp-2">
              {listLastestRecipes[0].title}
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default LatestRecipes;
