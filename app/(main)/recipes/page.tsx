import HeaderNavRecipes from './HeaderNavRecipes';
import BodyLatestRecipes from './BodyLatestRecipes';
import PopularCategories from './PopularCategories';
import CategoryRecipes from './CategoryRecipes';
const page = () => {
    return (
        <>
        <div className=' max-w-7xl h-full mx-auto'>
            <HeaderNavRecipes />
            <BodyLatestRecipes />     
            <PopularCategories />
            <CategoryRecipes />  
        </div>
        </>
    );
  };
  export default page;