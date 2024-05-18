"use client";
import { Button } from "@/components/ui/button";
import { title } from "process";
import Image from "next/image";
import { category } from "@/constants";
import { FaStar } from "react-icons/fa";
import React, { useState } from "react";
import Link from "next/link";

const CategoryRecipes = () => {
  const listCategoryItems = [
    {
      id: 1,
      title: "Featured Recipes",
      detail:
        "Here is Link list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
      categoryURL: "#",
      recipes: [
        {
          id: 1,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 2,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
      ],
    },
    {
      id: 2,
      title: "Featured Recipes",
      detail:
        "Here is Link list of the most popular recipes that people are loving! Try out some of these recipes to find out why everyone is raving about them.",
      categoryURL: "#",
      recipes: [
        {
          id: 1,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          star: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
      ],
    },
  ];
  return (
    <div>
      <div>
        {listCategoryItems.map((listCategoryItem, index) => (
          <div key={listCategoryItem.id}>
            <div className="flex justify-between py-[40px]">
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
                  <Link href="#">View All</Link>
                </Button>
              </div>
            </div>
            {/* img */}
            <div className="grid grid-cols-4 gap-10 my-10">
              {listCategoryItem.recipes.map((recipe, index) => (
                <div
                  key={index}
                  className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[445px]"
                >
                  <div className="relative">
                    <img
                      style={{
                        width: "100%",
                        borderRadius: "15px",
                        height: "100%",
                        overflow: ""
                      }}
                      src={recipe.img}
                      alt="Recipe image"
                    />
                    <div className="absolute bottom-3 left-3 flex-wrap-reverse w-[32px]">
                      {recipe.dietary.map((dietary, index) => (
                        <Button
                          className="my-1"
                          key={index}
                          variant="secondary"
                          size="icon"
                        >
                          <Link href="#">{dietary}</Link>
                        </Button>
                      ))}
                    </div>
                  </div>
                  <p className="text-[18px] font-medium leading-[150%] pl-3 h-[10%] text-[#303033] flex items-center ">
                    {recipe.title}
                  </p>
                  <div className="flex w-full justify-between absolute top-3 px-5">
                    <div>
                      <Button variant="secondary" size="icon">
                        <Link href="#">&#x2605;</Link>
                      </Button>
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
