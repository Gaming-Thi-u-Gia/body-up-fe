import HeaderInfoSort from "./header-info-sort";
import RecipeCategoryList from "../../list-recipe-category";
const page = () => {
  return (
    <div className=" max-w-7xl h-full mx-auto mb-10">
      <HeaderInfoSort title="Trendingceipes" detail="hi" />
      <RecipeCategoryList />
    </div>
  );
};

export default page;
