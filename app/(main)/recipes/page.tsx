import NavbarRecipes from "./NavbarRecipes";
import LatestRecipes from "./LatestRecipes";
import PopularCategories from "./PopularCategories";
import CategoryRecipes from "./RecipeCategoryList";
const page = () => {
  return (
    <>
      <div className=" max-w-7xl h-full mx-auto">
        <NavbarRecipes />
        <LatestRecipes />
        <PopularCategories />
        <CategoryRecipes />
      </div>
    </>
  );
};
export default page;
