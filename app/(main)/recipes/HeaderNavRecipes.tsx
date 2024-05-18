"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const HeaderNavRecipes = () => {
  const titleRecipes = [
    "View all Collections",
    "Latest Recipes",
    "Featured Recipes",
    "Trending Recipes",
    "Budget Meals",
    "Easy Breakfast Ideas",
    "Healthy Dessert Recipes",
    "Quick And Easy Recipes",
    "Healthy Snacks Ideas",
    "Healthy Drinks Recipes",
    "Easy Vegan Recipes",
    "Healthy Pancakes Recipes",
    "Party Food Recipes",
  ];
  function handleOnOrOfCategories() {
    const currentCate = document.getElementById('current__cate');
    const listCate = document.getElementById('list__cate');
    if (listCate) listCate.classList.toggle('hidden');
  }
  return (
    <div className="border-b border-[#E3E4EB]">
      <div className="  h-full mx-auto flex py-[20px] justify-between items-center">
        <div className="py-[5px] relative">
          <Button id="current__cate" onClick={handleOnOrOfCategories} variant="secondary" className="px-5" size="default">
            Browse By Collection
            <Image width={15} height={14} src="/more.svg" alt="More" />
          </Button>
          <div id="list__cate" className="hidden mt-2 absolute bg-white z-10 rounded-[15px] w-[220px]">
            <ul >
              {titleRecipes.map((title, index) => {
                return (
                  <li className="pl-3 py-[5px] hover:text-[gray] hover:bg-slate-400" key={index}>
                    {title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="flex h-8">
          <div className="group  inline-flex">
            <span className="group-hover:opacity-0 group-hover:invisible transition-opacity duration-500 ease-in-out">
              <Button
                variant="defaultOutline"
                size="default"
              ><Image width={20} height={20} src="/search.svg" alt="More" />
                Search
              </Button>
            </span>
            <span className="inline-flex group-hover:w-[240px] items-center group-hover:opacity-100 transition-all ease-in-out duration-1000 relative w-0 opacity-0 rounded-[15px]">
              <Image className="absolute left-0 cursor-pointer  " width={20} height={20} src="/search.svg" alt="More" />
              <input
                className="pl-5 w-full rounded-[15px]"
                placeholder="Search"
              />
            </span>
          </div>
          <div>
            <Button
              className="bg-transparent mr-1 cursor-not-allowed"
              variant="disabled"
              size="default"
            >
              <Image width={20} height={20} src="/heart.svg" alt="More" />
              Saved Recipes
            </Button>
          </div>
          <div>
            <Button variant="default" size="default">
              <Image width={20} height={20} src="/filter.svg" alt="More" />{" "}
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderNavRecipes;
