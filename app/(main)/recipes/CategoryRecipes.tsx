/* eslint-disable @next/next/no-img-element */
"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { category } from "@/constants";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";
import { Link } from "lucide-react";

const CategoryRecipes = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const initialName = (name = '') => {
    const words = name.trim().split(' ');
    const initials = words.map(word => word.charAt(0));
    return initials.join('').substring(0, 2);
  }
  const listCategoryItems = [
    {
      id: 1,
      title: "Featured Recipes",
      detail:
        "Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
      categoryURL: "#",
      recipes: [
        {
          id: 1,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 2,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
      ],
    },
    {
      id: 2,
      title: "Featured Recipes",
      detail:
        "Here is a list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
      categoryURL: "#",
      recipes: [
        {
          id: 1,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
        },
      ],
    },
  ];
  return (
    <div>
      <div>
        {listCategoryItems.map((listCategoryItem, index) => (
          <div key={listCategoryItem.id}>
            <div className="flex justify-between py-10">
              <div>
                <text className="text-[#303033] text-[22px] font-semibold leading-[30px]">
                  {listCategoryItem.title}
                </text>
                <p className="text-[14px] font-normal leading-[140%] h-[50%]">
                  {listCategoryItem.detail}
                </p>
              </div>
              <div>
                <Button variant="primaryOutline" size="default">
                  <a href="#">View All</a>
                </Button>
              </div>
            </div>
            {/* img */}
            <div className="grid grid-cols-4 gap-5">
              {listCategoryItem.recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[450px]"
                >
                  <div className="relative h-full">
                    <img
                      className="h-[87%] w-full rounded-[15px]"
                      src={recipe.img}
                      alt="Recipe image"
                    />
                    <div className="absolute bottom-[calc(13%+12px)] left-3 flex-wrap-reverse w-[32px]">
                      {recipe.dietary.map((dietary, index) => (
                        <Button
                          className="my-1"
                          key={index}
                          variant="secondary"
                          size="icon"
                        >
                          <a href="#">{initialName(dietary)}</a>
                        </Button>
                      ))}
                    </div>
                    <div className="flex w-full justify-between absolute top-3 px-5">
                      <div className='group inline-flex cursor-pointer text-[#D5D5D5]' >
                        <span className={`group-hover:opacity-100 group-hover:w-auto w-0 transition-all opacity-0 flex bg-[#EEF1F2] rounded-[15px] `} >
                          {
                            [...Array(5)].map((star, index) => {
                              const currentRating = index + 1;
                              return (
                                <span key={currentRating} className='star-label'>
                                  <span
                                    className={`text-[25px] px-1 ${currentRating <= (hover || rating) ? 'text-[#ffc107]' : ''}`}
                                    onMouseEnter={() => setHover(currentRating)}
                                    onMouseLeave={() => setHover(0)}
                                    onClick={() => setRating(currentRating)}
                                  >
                                    &#9733;
                                  </span>
                                </span>
                              );
                            })
                          }
                        </span>
                        <span className='group-hover:opacity-0 group-hover:w-0 bg-[#EEF1F2] rounded-[15px] px-2 text-[25px]'>
                          &#9733;
                        </span>

                      </div>
                      <div className="flex">
                        <Button className="mr-4" variant="secondary" size="icon">
                          <Image
                            width={20}
                            height={20}
                            src="/add.svg"
                            alt="add"
                          />
                        </Button>
                        <Button variant="secondary" size="icon">
                          <Image
                            width={24}
                            height={25}
                            src="/heart.svg"
                            alt="heart"
                          />
                        </Button>
                      </div>
                    </div>
                    <p className="text-[18px]  font-medium leading-[150%] pl-3 h-[13%] text-[#303033] flex items-center ">
                      {recipe.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRecipes;
