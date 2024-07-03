"use client";
import { useEffect, useState } from "react";
import { TableFilterProgramType, TopicType } from "@/utils/admin/type";
import { fetchAllFilterCategoryWorkoutProgram } from "@/utils/video/category";
import {
  fetchGetAllVideoSelectForAdmin,
  fetchWorkoutCategoryData,
} from "@/utils/video/workoutVideoCollection";
import { useAuthStore } from "@/components/providers/auth-provider";
import {
  fetchGetAllRecipeSelectForAdmin,
  fetchGetWorkoutProgramDetailById,
} from "@/utils/admin/fetch";
import { useParams } from "next/navigation";
import Link from "next/link";

export type ViewProgramType = {
  id: number;
  name: string;
  type: string;
  equipment: string;
  detail: string;
  day: number;
  time: string;
  year: number;
  img: string;
  banner: string;
  programTopics: ProgramTopicType[];
  workoutProgramCategories: WorkoutProgramCategoryType[];
  dailyExercises: AddNewDailyExerciseType[];
};

type WorkoutProgramCategoryType = {
  id: number;
  name: string;
  type: string;
};

type ProgramTopicType = {
  id: number;
  name: string;
};

type AddNewDailyExerciseType = {
  day: number;
  dailyVideos: AddNewDailyVideoType[];
  dailyRecipes: AddNewDailyRecipeType[];
};

type AddNewDailyVideoType = {
  video: VideoType;
};

type AddNewDailyRecipeType = {
  recipe: RecipeType;
  part: string;
};

type RecipeType = {
  id: number;
  name: string;
};

type VideoType = {
  id: number;
  name: string;
};

const WorkoutProgramDetail = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const { programId } = useParams();
  const workoutProgramIdNumber = Number(programId);

  const [program, setProgram] = useState<ViewProgramType>({
    id: workoutProgramIdNumber,
    name: "",
    type: "",
    equipment: "",
    detail: "",
    day: 0,
    time: "",
    year: 0,
    img: "",
    banner: "",
    programTopics: [],
    workoutProgramCategories: [],
    dailyExercises: [],
  });

  const [topics, setTopics] = useState<TopicType[]>([]);
  const [workoutProgramCategories, setWorkoutProgramCategories] = useState<
    TableFilterProgramType[]
  >([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [dayStates, setDayStates] = useState<
    {
      dailyVideos: AddNewDailyVideoType[];
      morningRecipes: AddNewDailyRecipeType[];
      afternoonRecipes: AddNewDailyRecipeType[];
      eveningRecipes: AddNewDailyRecipeType[];
    }[]
  >([]);

  useEffect(() => {
    const getProgram = async () => {
      try {
        const data = await fetchGetWorkoutProgramDetailById(
          workoutProgramIdNumber,
          sessionToken!
        );
        setProgram(data);

        const initialDayStates = Array.from({ length: data.day }, (_, i) => ({
          dailyVideos: data.dailyExercises[i]?.dailyVideos || [],
          morningRecipes:
            data.dailyExercises[i]?.dailyRecipes.filter(
              (r: any) => r.part === "morning"
            ).length > 0
              ? data.dailyExercises[i]?.dailyRecipes.filter(
                  (r: any) => r.part === "morning"
                )
              : [],
          afternoonRecipes:
            data.dailyExercises[i]?.dailyRecipes.filter(
              (r: any) => r.part === "afternoon"
            ).length > 0
              ? data.dailyExercises[i]?.dailyRecipes.filter(
                  (r: any) => r.part === "afternoon"
                )
              : [],
          eveningRecipes:
            data.dailyExercises[i]?.dailyRecipes.filter(
              (r: any) => r.part === "evening"
            ).length > 0
              ? data.dailyExercises[i]?.dailyRecipes.filter(
                  (r: any) => r.part === "evening"
                )
              : [],
        }));

        setDayStates(initialDayStates);
      } catch (error) {
        console.error(error);
      }
    };
    getProgram();
  }, [workoutProgramIdNumber, sessionToken]);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await fetchWorkoutCategoryData();
        setTopics(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTopics();
  }, []);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const data = await fetchGetAllVideoSelectForAdmin(sessionToken!);
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getVideos();
  }, [sessionToken]);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchGetAllRecipeSelectForAdmin(sessionToken!);
        setRecipes(data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipes();
  }, [sessionToken]);

  useEffect(() => {
    const getProgramCategories = async () => {
      try {
        const response = await fetchAllFilterCategoryWorkoutProgram();
        const sortedResponse = response
          .sort((a: TableFilterProgramType, b: TableFilterProgramType) =>
            a.type.localeCompare(b.type)
          )
          .map((category: TableFilterProgramType) => ({
            ...category,
            workoutProgramCategories: category.workoutCategories.sort(
              (a: any, b: any) => a.name.localeCompare(b.name)
            ),
          }));
        setWorkoutProgramCategories(sortedResponse);
      } catch (error) {
        console.error(error);
      }
    };
    getProgramCategories();
  }, []);

  return (
    <div className="container mx-auto py-12">
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6 bg-black text-white">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <span>Workout Program Detail</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link
            href="/admin/workout-program-management"
            className="text-lg font-semibold"
          >
            Home
          </Link>
        </div>
      </header>
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Program Name</label>
          <p>{program.name}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Type</label>
          <p>{program.type}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Equipment</label>
          <p>{program.equipment}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Detail</label>
          <p>{program.detail}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Number of Days</label>
          <p>{program.day}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Time</label>
          <p>{program.time}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Year</label>
          <p>{program.year}</p>
        </div>
        <div>
          <label className="block font-medium mb-2">Image</label>
          {program.img && (
            <img
              src={program.img}
              alt="Program Image"
              className="w-64 h-64 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Banner</label>
          {program.banner && (
            <img
              src={program.banner}
              alt="Program Banner"
              className="w-64 h-64 object-cover rounded-md"
            />
          )}
        </div>
        <div>
          <label className="block font-medium mb-2">Program Topics</label>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {program.programTopics.map((topic, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-md p-4 flex items-center"
              >
                <span className="font-medium">{topic.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <label className="block font-medium mb-2">Program Categories</label>
          <div className="grid grid-cols-2 gap-4">
            {program.workoutProgramCategories.map((category, index) => (
              <div
                key={index}
                className="bg-gray-100 rounded-md p-4 flex items-center space-x-2"
              >
                <span className="font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Daily Exercises</h2>
      {dayStates.map((dayState, dayIndex) => (
        <div key={dayIndex} className="mb-8">
          <h3 className="text-xl font-bold mb-4">Day {dayIndex + 1}</h3>
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2">Videos</h4>
            <div className="grid grid-cols-1 gap-2">
              {dayState.dailyVideos.map((video, videoIndex) => (
                <div key={videoIndex} className="flex items-center">
                  <p>{videos.find((v) => v.id === video.video.id)?.name}</p>
                </div>
              ))}
            </div>
          </div>

          {["morning", "afternoon", "evening"].map((timeOfDay) => (
            <div key={timeOfDay}>
              <h4 className="text-lg font-bold mb-2">
                {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Recipes
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {timeOfDay === "morning" &&
                  dayState.morningRecipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex} className="flex items-center">
                      <p>
                        {recipes.find((r) => r.id === recipe.recipe.id)?.name}
                      </p>
                    </div>
                  ))}
                {timeOfDay === "afternoon" &&
                  dayState.afternoonRecipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex} className="flex items-center">
                      <p>
                        {recipes.find((r) => r.id === recipe.recipe.id)?.name}
                      </p>
                    </div>
                  ))}
                {timeOfDay === "evening" &&
                  dayState.eveningRecipes.map((recipe, recipeIndex) => (
                    <div key={recipeIndex} className="flex items-center">
                      <p>
                        {recipes.find((r) => r.id === recipe.recipe.id)?.name}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default WorkoutProgramDetail;
