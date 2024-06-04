import React from "react";
import { listCategoryItems } from "../service/data";
import RecipeRowItem from "../recipe-row-item";
const Recommend = () => {
  return (
    <div className="max-w-7xl m-auto py-20">
      <p className="text-[26px] font-medium leading-[50px]">
        Recommended Recipes
      </p>
      <RecipeRowItem recipes={listCategoryItems[0].recipes} />
    </div>
  );
};

export default Recommend;
