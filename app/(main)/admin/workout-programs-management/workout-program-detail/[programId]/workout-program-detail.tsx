"use client";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/components/providers/auth-provider";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  fetchGetWorkoutProgramDetailById,
  fetchGetRecipeDetailById,
  fetchGetVideoDetailById,
} from "@/utils/admin/fetch";

export type RecipeDetailType = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  totalRating: number;
  prepTime: number;
  cookTime: number;
  img: string;
  cookingInstruction: string;
  createdAt: Date;
  recipeCategories: RecipeCategoryType[];
  noteRecipes: NoteRecipeType[];
  ingredientRecipes: IngredientRecipeType[];
  otherImageRecipes: OtherImageRecipeType[];
  recipeTopics: TopicType[];
};

export type VideoDetailType = {
  id: number;
  name: string;
  url: string;
  featured: boolean;
  videoTopics: TopicType[];
  videoCategories: CategoryType[];
  img: string;
  date: string;
  duration: string;
  description: string;
};

export type ProgramType = {
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
  createdAt: string;
  programTopics: ProgramTopicType[];
  workoutProgramCategories: WorkoutProgramCategoryType[];
  dailyExercises: DailyExerciseType[];
};

type CategoryType = {
  id: number;
  name: string;
};

type TopicType = {
  id: number;
  name: string;
};

type ProgramTopicType = {
  id: number;
  name: string;
};

type WorkoutProgramCategoryType = {
  id: number;
  name: string;
};

type RecipeCategoryType = {
  id: number;
  name: string;
};

type NoteRecipeType = {
  id: number;
  note: string;
};

type IngredientRecipeType = {
  id: number;
  name: string;
  amount: string;
};

type OtherImageRecipeType = {
  id: number;
  img: string;
};

type DailyExerciseType = {
  day: number;
  dailyVideos: DailyVideoType[];
  dailyRecipes: DailyRecipeType[];
};

type DailyVideoType = {
  video: VideoDetailType;
};

type DailyRecipeType = {
  recipe: RecipeType;
  part: string;
};

type RecipeType = {
  id: number;
  name: string;
  img: string;
};

const WorkoutProgramDetail = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const { programId } = useParams();
  const workoutProgramIdNumber = Number(programId);

  const [program, setProgram] = useState<ProgramType | null>(null);
  const [hoveredRecipe, setHoveredRecipe] = useState<RecipeDetailType | null>(
    null
  );
  const [hoveredRecipeId, setHoveredRecipeId] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<VideoDetailType | null>(
    null
  );
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const getProgram = async () => {
      try {
        const data = await fetchGetWorkoutProgramDetailById(
          workoutProgramIdNumber,
          sessionToken!
        );
        data.dailyExercises.sort((a: any, b: any) => a.day - b.day);
        setProgram(data);
      } catch (error) {
        console.error(error);
      }
    };
    getProgram();
  }, [workoutProgramIdNumber, sessionToken]);

  const handleHoverRecipe = async (recipeId: number) => {
    if (hoveredRecipeId !== recipeId) {
      try {
        const recipeDetails = await fetchGetRecipeDetailById(
          recipeId,
          sessionToken!
        );
        setHoveredRecipe(recipeDetails);
        setHoveredRecipeId(recipeId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleHoverVideo = async (videoId: number) => {
    if (hoveredVideoId !== videoId) {
      try {
        const videoDetails = await fetchGetVideoDetailById(
          videoId,
          sessionToken!
        );
        setHoveredVideo(videoDetails);
        setHoveredVideoId(videoId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredRecipe(null);
    setHoveredRecipeId(null);
    setHoveredVideo(null);
    setHoveredVideoId(null);
  };
  if (!program) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12">
      <header className="flex items-center rounded-lg h-16 px-4 border-b shrink-0 md:px-6 bg-slate-700 text-white fixed top-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl z-50">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/admin/workout-programs-management"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <span>Workout Program Detail</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link
            href="/admin/workout-programs-management"
            className="text-lg font-semibold"
          >
            Back
          </Link>
        </div>
      </header>
      <div className="space-y-6 mt-6">
        <div>
          <label className="block font-medium text-lg mb-2">Program Id:</label>
          <span className="text-base">{program.id}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">
            Program Name:
          </label>
          <span className="text-base">{program.name}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">
            Program Type:
          </label>
          <span className="text-base">{program.type}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Equipment:</label>
          <span className="text-base">{program.equipment}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">
            Program Detail:
          </label>
          <span className="text-base">{program.detail}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Total Days:</label>
          <span className="text-base">{program.day}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Time:</label>
          <span className="text-base">{program.time}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Year:</label>
          <span className="text-base">{program.year}</span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Image:</label>
          <img
            src={program.img}
            alt={program.name}
            className="w-32 h-32 object-cover rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Banner:</label>
          <img
            src={program.banner}
            alt={`${program.name} Banner`}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">
            Program Topics:
          </label>
          <span className="text-base">
            {program.programTopics.map((topic) => topic.name).join(", ")}
          </span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Categories:</label>
          <span className="text-base">
            {program.workoutProgramCategories
              .map((category) => category.name)
              .join(", ")}
          </span>
        </div>
        <div>
          <label className="block font-medium text-lg mb-2">Created At:</label>
          <span className="text-base">
            {program.createdAt
              ? new Date(program.createdAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-8 mb-4">Daily Exercises</h2>
      {program.dailyExercises.map((dayState, dayIndex) => (
        <div key={dayIndex} className="mb-8">
          <h3 className="text-xl font-bold mb-4">Day {dayState.day}</h3>
          <div className="mb-4">
            <h4 className="text-lg font-bold mb-2">Videos</h4>
            <div className="grid grid-cols-1 gap-2">
              {dayState.dailyVideos.map((video, videoIndex) => (
                <div key={videoIndex} className="relative flex items-center">
                  {video.video && (
                    <>
                      <img
                        src={video.video.img}
                        alt={video.video.name}
                        className="w-20 h-20 object-cover rounded-md mr-4"
                        onMouseEnter={() => handleHoverVideo(video.video.id)}
                        onMouseLeave={handleMouseLeave}
                        onError={(e) =>
                          (e.currentTarget.src =
                            "/default-image-placeholder.png")
                        }
                      />
                      <div>
                        <span className="text-base font-medium">
                          {video.video.name}
                        </span>
                        <div className="text-sm text-gray-600">
                          {video.video.duration}
                        </div>
                      </div>
                      {hoveredVideo && hoveredVideoId === video.video.id && (
                        <div
                          className="absolute w-full bg-white border border-gray-300 p-4 rounded-lg shadow-lg z-10"
                          style={{
                            bottom: "100%",
                          }}
                        >
                          <h3 className="text-lg font-bold mb-2">
                            {hoveredVideo.name}
                          </h3>
                          <p className="text-sm">{hoveredVideo.description}</p>
                          <p className="text-sm">
                            Duration: {hoveredVideo.duration}
                          </p>
                          <p className="text-sm">
                            Date:{" "}
                            {new Date(hoveredVideo.date).toLocaleDateString()}
                          </p>
                          <p className="text-sm">
                            URL:{" "}
                            <a
                              href={hoveredVideo.url}
                              target="_blank"
                              className="text-blue-500"
                            >
                              {hoveredVideo.url}
                            </a>
                          </p>
                          <p className="text-sm">
                            Featured: {hoveredVideo.featured ? "Yes" : "No"}
                          </p>
                          <p className="text-sm">
                            Categories:{" "}
                            {hoveredVideo.videoCategories
                              .map((category) => category.name)
                              .join(", ")}
                          </p>
                          <p className="text-sm">
                            Topics:{" "}
                            {hoveredVideo.videoTopics
                              .map((topic) => topic.name)
                              .join(", ")}
                          </p>
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          {["morning", "afternoon", "evening"].map((timeOfDay) => (
            <div key={timeOfDay}>
              <h4 className="text-lg font-bold mb-2">
                {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Recipes
              </h4>
              <div className="relative grid grid-cols-1 gap-2">
                {dayState.dailyRecipes
                  .filter((recipe) => recipe.part === timeOfDay)
                  .map((recipe, recipeIndex) => (
                    <div
                      key={recipeIndex}
                      className="relative flex items-center"
                    >
                      {recipe.recipe && (
                        <>
                          <img
                            src={
                              recipe.recipe.img ||
                              "/default-image-placeholder.png"
                            }
                            alt={recipe.recipe.name}
                            className="w-20 h-20 object-cover rounded-md mr-4"
                            onMouseEnter={() =>
                              handleHoverRecipe(recipe.recipe.id)
                            }
                            onMouseLeave={handleMouseLeave}
                            onError={(e) =>
                              (e.currentTarget.src =
                                "/default-image-placeholder.png")
                            }
                          />
                          <span className="text-base">
                            {recipe.recipe.name}
                          </span>
                          {hoveredRecipe &&
                            hoveredRecipeId === recipe.recipe.id && (
                              <div
                                className="absolute w-full bg-white border border-gray-300 p-4 rounded-lg shadow-lg z-10"
                                style={{
                                  bottom: "100%",
                                }}
                              >
                                <h3 className="text-lg font-bold mb-2">
                                  {hoveredRecipe.name}
                                </h3>
                                <p className="text-sm">
                                  {hoveredRecipe.detail}
                                </p>
                                <p className="text-sm">
                                  Avg Star: {hoveredRecipe.avgStar}
                                </p>
                                <p className="text-sm">
                                  Total Ratings: {hoveredRecipe.totalRating}
                                </p>
                                <p className="text-sm">
                                  Prep Time: {hoveredRecipe.prepTime} mins
                                </p>
                                <p className="text-sm">
                                  Cook Time: {hoveredRecipe.cookTime} mins
                                </p>
                                <p className="text-sm">
                                  Created At:{" "}
                                  {new Date(
                                    hoveredRecipe.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                        </>
                      )}
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
