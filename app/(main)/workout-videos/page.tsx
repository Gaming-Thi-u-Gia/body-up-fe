'use client';

import HeaderNavWorkoutVideos from './header-nav-workout-videos';
import BodyLatestWorkoutVideos from './body-latest-workout-videos';
import CategoryWorkoutVideos from './category-workout-videos';
const WourkoutVideoPage = () => {

    const handleCategoryChange = (categoryName: string) => {
        console.log("Category Name:", categoryName);
    };

    return (
        <>
        <div className=' max-w-7xl h-full mx-auto'>
            <HeaderNavWorkoutVideos onCategoryChange={handleCategoryChange}/>
            <BodyLatestWorkoutVideos />  
            <CategoryWorkoutVideos  /> 
        </div>
        </>
    );
  };
  export default WourkoutVideoPage;