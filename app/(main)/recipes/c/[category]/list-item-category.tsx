import React from "react";
import RecipeRowItem from "../../recipe-row-item";
import { listCategoryItems } from "../../service/data.jsx";
const ListItemCategory = () => {
  return (
    <div className="max-w-7xl">
      {listCategoryItems.map((listCategoryItem, index) => {
        return (
          <div key={listCategoryItem.id}>
            <RecipeRowItem recipes={listCategoryItem.recipes} />
          </div>
        );
      })}
    </div>
  );
};

export default ListItemCategory;
