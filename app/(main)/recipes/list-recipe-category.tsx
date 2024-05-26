/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import HeaderInfoViewAll from "./header-info-viewall";
import CardRecipes from "./card-recipes";
import { listCategoryItems } from "./service/data";
const RecipeCategoryList = () => {
  return (
    <div>
      {listCategoryItems.map((listCategoryItem, index) => (
        <div key={listCategoryItem.id}>
          <HeaderInfoViewAll
            title={listCategoryItem.title}
            detail={listCategoryItem.detail}
          />
          <div className="grid grid-cols-4 gap-5">
            {listCategoryItem.recipes.map((recipe, index) => (
              <CardRecipes
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
