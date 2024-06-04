/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import HeaderInfoViewAll from "./header-info-viewall";
import { listCategoryItems } from "./service/data.jsx";
import RecipeRowItem from "./recipe-row-item";

const RecipeCategoryList = () => {
  return (
    <div>
      {listCategoryItems.map((listCategoryItem, index) => (
        <div key={listCategoryItem.id}>
          <HeaderInfoViewAll
            title={listCategoryItem.title}
            detail={listCategoryItem.detail}
          />
          <RecipeRowItem recipes={listCategoryItem.recipes} />
        </div>
      ))}
    </div>
  );
};

export default RecipeCategoryList;
