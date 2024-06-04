import React from "react";
import HeaderInfoSort from "./header-info-sort";
import RecipeSavedList from "./recipe-saved-list";

const SavedRecipe = () => {
  return (
    <div>
      <HeaderInfoSort title="My Recipe Folders" />
      <RecipeSavedList />
    </div>
  );
};
export default SavedRecipe;
