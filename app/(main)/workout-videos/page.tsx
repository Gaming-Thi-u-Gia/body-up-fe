import HeaderNavWorkoutVideos from './header-nav-workout-videos';
import BodyLatestWorkoutVideos from './body-latest-workout-videos';
import CategoryWorkoutVideos from './category-workout-videos';
const WourkoutVideoPage = () => {
    return (
        <>
        <div className=' max-w-7xl h-full mx-auto'>
            <HeaderNavWorkoutVideos />
            <BodyLatestWorkoutVideos />  
            <CategoryWorkoutVideos  /> 
        </div>
        </>
    );
  };
  export default WourkoutVideoPage;