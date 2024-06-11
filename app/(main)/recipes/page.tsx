import NavbarRecipes from "./navbar-recipes";
import LatestRecipes from "./latest-recipes";
import PopularCategories from "./popular-categories";
import RecipeCategoryList from "./list-recipe-category";

const page = () => {
  return (
    <>
      <div className=" max-w-7xl h-full mx-auto mb-10">
        <NavbarRecipes />
        <LatestRecipes />
        <PopularCategories />
        <RecipeCategoryList />
      </div>
    </>
  );
};
export default page;
