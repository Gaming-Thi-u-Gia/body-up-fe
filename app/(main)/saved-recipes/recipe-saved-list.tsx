import React from "react";
import RowRecipeItem from "../recipes/recipe-row-item";

import { listCategoryItems } from "../recipes/service/data.jsx";
const RecipeSavedList = () => {
  return (
    <div className="max-w-7xl m-auto">
      <div>
        {listCategoryItems.map((listCategoryItem, index) => (
          <div key={listCategoryItem.id}>
            <RowRecipeItem recipes={listCategoryItem.recipes} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeSavedList;
