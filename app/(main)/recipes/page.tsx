// import PopularCategories from "./popular-categories";
// import RecipeCategoryList from "./list-recipe-category";
// import RecipesLatest from "./latest-recipes";
// import RecipeNavbar from "./recipe-navbar";
import FilterRecipe from "./filter-recipes";

const page = () => {
  return (
    <>
      <div className=" h-full mx-auto mb-10">
        {/* <RecipeNavbar />
        <RecipesLatest />
        <PopularCategories />
        <RecipeCategoryList /> */}
        <FilterRecipe />
      </div>
    </>
  );
};

export default page;
