import { RecipeCardType } from "@/utils/recipe/type";
import ListRecipe from "../../c/[category]/list-recipe";

const BodySearch = ({
  recipes,
  isLoading,
}: {
  isLoading: boolean;
  recipes: RecipeCardType[];
}) => {
  return (
    <div className="max-w-7xl mx-auto">
      {isLoading ? <SkeletonListRecipe /> : <ListRecipe recipes={recipes} />}
    </div>
  );
};

export default BodySearch;

const SkeletonCardRecipe = () => {
  return (
    <div className="relative bg-white border-solid border-[1px] border-[#E9E9EF] rounded-[15px] cursor-pointer h-[425px] animate-pulse">
      <div className="h-[87%] w-full bg-gray-300 rounded-[15px]"></div>
      <div className="absolute bottom-[calc(13%+12px)] left-3 flex flex-col flex-wrap-reverse">
        <div className="bg-gray-400 h-6 w-12 my-1 rounded"></div>
        <div className="bg-gray-400 h-6 w-12 my-1 rounded"></div>
      </div>
      <div className="flex w-full justify-between items-center absolute top-3 px-5">
        <div className="bg-gray-400 h-6 w-24 rounded"></div>
        <div className="bg-gray-400 h-6 w-6 rounded-full"></div>
      </div>
      <div className="h-[13%] flex items-center pl-3">
        <div className="bg-gray-400 h-6 w-3/4 rounded"></div>
      </div>
    </div>
  );
};

const SkeletonListRecipe = () => {
  return (
    <div className="grid grid-cols-4 gap-5">
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
      <SkeletonCardRecipe />
    </div>
  );
};
