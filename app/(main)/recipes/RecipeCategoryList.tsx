/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import CategoryItemHeader from "./HeaderInfoSearch";
import CategoryRecipesItemsDisplay from "./CardRecipe";

const RecipeCategoryList = () => {
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
          avgStar: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 2,
          title: "Baked Avocado Eggs",
          avgStar: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          avgStar: 4,
          dietary: ["V g", "D F", "L F"],
          img: "https://dominofilm.vn/uploads/albums/2019/01/photo_5c495cf04fcea.jpg",
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          avgStar: 4,
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
          avgStar: 3,
          dietary: ["Vg", "DF", "LF"],
          img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
        },
        {
          id: 3,
          title: "Baked Avocado Eggs",
          avgStar: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
        },
        {
          id: 4,
          title: "Baked Avocado Eggs",
          avgStar: 4,
          dietary: ["Vg", "DF", "LF"],
          img: "https://chloeting.com/_next/image?url=https%3A%2F%2Fstatic.chloeting.com%2Frecipes%2F6458633750181861834e8f59%2Fimages%2Fone-pot-rice-cooker-fried-rice-1683514169461-cover.jpeg&w=1920&q=90",
        },
      ],
    },
  ];
  return (
    <div>
      {listCategoryItems.map((listCategoryItem, index) => (
        <div key={listCategoryItem.id}>
          <CategoryItemHeader
            title={listCategoryItem.title}
            detail={listCategoryItem.detail}
          />
          <div className="grid grid-cols-4 gap-5">
            {listCategoryItem.recipes.map((recipe, index) => (
              <CategoryRecipesItemsDisplay
                key={recipe.id}
                index={index}
                img={recipe.img}
                dietary={recipe.dietary as []}
                title={recipe.title}
                avgStar={recipe.avgStar}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeCategoryList;
