import beforeAfter from "/public/before-after.png";
import foods from "/public/foods.png";
import todayWorkout from "/public/today-workout.png";
import todayWorkoutRun from "/public/today-workout-run.png";
import Image from "next/image";
import Feature from "./feature";
export const FeatureSticker = () => {
  return (
    <div className=" bg-[#f3f3f3] w-[40%]">
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 text-[17px]">
        <p>Create an account to access features such as</p>
        <Feature
          backGround="bg-login-pattern1"
          strong="Today’s Workout Completed!"
          text="Track your daily workouts and your progress on your fitness journey"
          img={todayWorkout}
        />
        <Feature
          backGround="bg-login-pattern2"
          strong="Teamwork Makes the Dream Work:"
          text="Join a team challenge to motivate one another and work out together"
          img={todayWorkoutRun}
        />
        <Feature
          backGround="bg-login-pattern1"
          strong="Picture Perfect!"
          text="Add photos and create collages to see your progress visually"
          img={beforeAfter}
        />
        <Feature
          backGround="bg-login-pattern3"
          strong="Meal Planning Pro:"
          text="Save and organize all of your favorite recipes"
          img={foods}
        />
      </div>
    </div>
  );
};
