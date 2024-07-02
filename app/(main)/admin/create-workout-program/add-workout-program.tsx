"use client";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { TableFilterProgramType, TopicType } from "@/utils/admin/type";
import { fetchAllFilterCategoryWorkoutProgram } from "@/utils/video/category";
import {
  fetchGetAllVideoSelectForAdmin,
  fetchWorkoutProgramWithTopicData,
} from "@/utils/video/workoutVideoCollection";
import { useAuthStore } from "@/components/providers/auth-provider";
import { fetchGetAllRecipeSelectForAdmin } from "@/utils/admin/fetch";

type AddNewProgramType = {
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
  dailyRecipes: {
    morning: AddNewDailyRecipeType[];
    afternoon: AddNewDailyRecipeType[];
    evening: AddNewDailyRecipeType[];
  };
};

type AddNewDailyVideoType = {
  video: VideoType;
};

type AddNewDailyRecipeType = {
  recipe: RecipeType;
};

type RecipeType = {
  id: number;
  name: string;
};

type VideoType = {
  id: number;
  name: string;
};

const AddWorkoutProgram = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [program, setProgram] = useState<AddNewProgramType>({
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

  const [currentStep, setCurrentStep] = useState(1);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [workoutProgramCategories, setWorkoutProgramCategories] = useState<
    TableFilterProgramType[]
  >([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [errors, setErrors] = useState({
    name: "",
    type: "",
    equipment: "",
    detail: "",
    day: "",
    time: "",
    year: "",
    img: "",
    banner: "",
    programTopics: "",
    workoutProgramCategories: "",
    dailyExercises: "",
  });

  const handleInputChange = (field: string, value: string | number) => {
    setProgram((prevProgram) => ({
      ...prevProgram,
      [field]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [field]: "",
    }));
  };

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await fetchWorkoutProgramWithTopicData();
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
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.error(error);
      }
    };
    getVideos();
  }, []);

  useEffect(() => {
    const getRecipes = async () => {
      try {
        const data = await fetchGetAllRecipeSelectForAdmin(sessionToken!);
        console.log(data);
        setRecipes(data);
      } catch (error) {
        console.error(error);
      }
    };
    getRecipes();
  }, []);

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
            workoutProgramCategories: category.workoutCategories.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          }));
        setWorkoutProgramCategories(sortedResponse);
      } catch (error) {
        console.error(error);
      }
    };

    getProgramCategories();
  }, []);

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find((topic) => topic.name === value);
    if (
      selectedTopic &&
      !program.programTopics.some((topic) => topic.id === selectedTopic.id)
    ) {
      setProgram((prevProgram) => ({
        ...prevProgram,
        programTopics: [...prevProgram.programTopics, selectedTopic],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        programTopics: "",
      }));
    }
  };

  const handleRemoveTopic = (index: number, e: React.MouseEvent) => {
    e.preventDefault();
    const updatedTopics = [...program.programTopics];
    updatedTopics.splice(index, 1);
    setProgram((prevProgram) => ({
      ...prevProgram,
      programTopics: updatedTopics,
    }));
  };

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = workoutProgramCategories
      .find((category) => category.type === type)
      ?.workoutCategories.find((category) => category.name === value);
    if (selectedCategory) {
      const updatedWorkoutProgramCategories =
        program.workoutProgramCategories.filter(
          (category) => category.type !== type
        );
      setProgram((prevProgram) => ({
        ...prevProgram,
        workoutProgramCategories: [
          ...updatedWorkoutProgramCategories,
          { ...selectedCategory, type },
        ],
      }));
      setErrors((prevErrors) => ({
        ...prevErrors,
        workoutProgramCategories: "",
      }));
    }
  };

  const handleRemoveCategory = (type: string, e: React.MouseEvent) => {
    e.preventDefault();
    const updatedWorkoutProgramCategories =
      program.workoutProgramCategories.filter(
        (category) => category.type !== type
      );
    setProgram((prevProgram) => ({
      ...prevProgram,
      workoutProgramCategories: updatedWorkoutProgramCategories,
    }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (checkEmptyFields() || checkCategoryAndTopic()) {
        return;
      }
      const exercises: AddNewDailyExerciseType[] = Array.from(
        { length: program.day },
        (_, dayIndex) => ({
          day: dayIndex + 1,
          dailyVideos: [],
          dailyRecipes: {
            morning: [],
            afternoon: [],
            evening: [],
          },
        })
      );
      setProgram((prevProgram) => ({
        ...prevProgram,
        dailyExercises: exercises,
      }));
      setCurrentStep(2);
    }
  };

  const handleAddVideo = (e: React.MouseEvent, dayIndex: number) => {
    e.preventDefault();
    setProgram((prevProgram) => {
      const newExercises = [...prevProgram.dailyExercises];
      const currentDay = newExercises[dayIndex];

      if (currentDay.dailyVideos.length < 4) {
        if (
          currentDay.dailyVideos.length === 0 ||
          currentDay.dailyVideos[currentDay.dailyVideos.length - 1].video.id !==
            0
        ) {
          currentDay.dailyVideos.push({
            video: { id: 0, name: "" },
          });
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            dailyExercises:
              "Please select the current video before adding a new one.",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises: "You can only add up to 4 videos per day.",
        }));
      }

      return { ...prevProgram, dailyExercises: newExercises };
    });
  };

  const handleVideoSelection = (
    dayIndex: number,
    videoIndex: number,
    videoId: number
  ) => {
    setProgram((prevProgram) => {
      const newExercises = [...prevProgram.dailyExercises];
      const selectedVideo = videos.find((video) => video.id === videoId);

      if (
        selectedVideo &&
        !newExercises.some((exercise) =>
          exercise.dailyVideos.some((v) => v.video.id === videoId)
        )
      ) {
        newExercises[dayIndex].dailyVideos[videoIndex] = {
          video: selectedVideo,
        };
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises: "This video is already selected.",
        }));
      }
      return { ...prevProgram, dailyExercises: newExercises };
    });
  };

  const handleRemoveVideo = (
    dayIndex: number,
    videoIndex: number,
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setProgram((prevProgram) => {
      const newExercises = [...prevProgram.dailyExercises];
      newExercises[dayIndex].dailyVideos.splice(videoIndex, 1);
      return { ...prevProgram, dailyExercises: newExercises };
    });
  };

  const handleAddRecipe = (
    e: React.MouseEvent,
    dayIndex: number,
    part: "morning" | "afternoon" | "evening"
  ) => {
    e.preventDefault();
    setProgram((prevProgram) => {
      const newExercises = [...prevProgram.dailyExercises];
      const currentDay = newExercises[dayIndex];

      if (
        currentDay.dailyRecipes[part].length === 0 ||
        currentDay.dailyRecipes[part][currentDay.dailyRecipes[part].length - 1]
          .recipe.id !== 0
      ) {
        currentDay.dailyRecipes[part].push({
          recipe: { id: 0, name: "" },
        });
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises:
            "Please select the current recipe before adding a new one.",
        }));
      }

      return { ...prevProgram, dailyExercises: newExercises };
    });
  };

  const handleRecipeSelection = (
    dayIndex: number,
    recipeIndex: number,
    recipeId: number,
    part: "morning" | "afternoon" | "evening"
  ) => {
    setProgram((prevProgram) => {
      const newExercises = [...prevProgram.dailyExercises];
      const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
      if (selectedRecipe) {
        newExercises[dayIndex].dailyRecipes[part][recipeIndex] = {
          recipe: selectedRecipe,
        };
      }
      return { ...prevProgram, dailyExercises: newExercises };
    });
  };

  const handleRemoveRecipe = (
    dayIndex: number,
    recipeIndex: number,
    part: "morning" | "afternoon" | "evening",
    e: React.MouseEvent
  ) => {
    e.preventDefault();
    setProgram((prevProgram) => {
      const newExercises = [...prevProgram.dailyExercises];
      newExercises[dayIndex].dailyRecipes[part].splice(recipeIndex, 1);
      return { ...prevProgram, dailyExercises: newExercises };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(program);

    let hasError = false;
    const updatedDailyExercises = program.dailyExercises.map((exercise) => {
      const updatedExercise = { ...exercise };
      if (
        exercise.dailyVideos.length === 0 ||
        exercise.dailyVideos.some((video) => video.video.id === 0)
      ) {
        updatedExercise["videoError"] =
          "Each day must have at least one video selected.";
        hasError = true;
      } else {
        updatedExercise["videoError"] = "";
      }

      ["morning", "afternoon", "evening"].forEach((part) => {
        if (
          exercise.dailyRecipes[part as "morning" | "afternoon" | "evening"]
            .length === 0 ||
          exercise.dailyRecipes[
            part as "morning" | "afternoon" | "evening"
          ].some((recipe) => recipe.recipe.id === 0)
        ) {
          updatedExercise[`${part}RecipeError`] =
            `Each part of the day must have at least one recipe selected.`;
          hasError = true;
        } else {
          updatedExercise[`${part}RecipeError`] = "";
        }
      });

      return updatedExercise;
    });

    setProgram((prevProgram) => ({
      ...prevProgram,
      dailyExercises: updatedDailyExercises,
    }));

    if (hasError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dailyExercises: "Please fix the errors before submitting.",
      }));
      return;
    }

    try {
      console.log("Program submitted successfully!", program);
      // Perform the submit action here
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dailyExercises: "Failed to submit program",
      }));
      console.error(error);
    }
  };

  const checkEmptyFields = () => {
    let hasError = false;

    const requiredFields = [
      "name",
      "type",
      "equipment",
      "detail",
      "day",
      "time",
      "year",
      "img",
      "banner",
      "programTopics",
      "workoutProgramCategories",
    ];

    requiredFields.forEach((field) => {
      if (!program[field]) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: `Please fill in the ${field}.`,
        }));
        hasError = true;
      }
    });

    return hasError;
  };

  const checkCategoryAndTopic = () => {
    let hasError = false;

    if (program.programTopics.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        programTopics: "Please select at least one topic.",
      }));
      hasError = true;
    }

    if (program.workoutProgramCategories.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        workoutProgramCategories: "Please select at least one category.",
      }));
      hasError = true;
    }

    return hasError;
  };

  const getAvailableVideos = (dayIndex: number) => {
    const selectedVideos = program.dailyExercises.flatMap((exercise) =>
      exercise.dailyVideos.map((video) => video.video.id)
    );
    return videos.filter((video) => !selectedVideos.includes(video.id));
  };

  const getAvailableRecipes = (
    dayIndex: number,
    part: "morning" | "afternoon" | "evening"
  ) => {
    const selectedRecipes = program.dailyExercises[dayIndex].dailyRecipes[
      part
    ].map((recipe) => recipe.recipe.id);
    return recipes.filter((recipe) => !selectedRecipes.includes(recipe.id));
  };

  return (
    <div className="container mx-auto py-12">
      {currentStep === 1 && (
        <>
          <h1 className="text-3xl font-bold mb-8">Add Workout Program</h1>
          <form className="space-y-6" onSubmit={handleNextStep}>
            <div>
              <label htmlFor="name" className="block font-medium mb-2">
                Program Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter program name"
                value={program.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
              {errors.name && <p className="text-red-500">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="type" className="block font-medium mb-2">
                Type
              </label>
              <input
                type="text"
                id="type"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter type"
                value={program.type}
                onChange={(e) => handleInputChange("type", e.target.value)}
              />
              {errors.type && <p className="text-red-500">{errors.type}</p>}
            </div>
            <div>
              <label htmlFor="equipment" className="block font-medium mb-2">
                Equipment
              </label>
              <input
                type="text"
                id="equipment"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter equipment"
                value={program.equipment}
                onChange={(e) => handleInputChange("equipment", e.target.value)}
              />
              {errors.equipment && (
                <p className="text-red-500">{errors.equipment}</p>
              )}
            </div>
            <div>
              <label htmlFor="detail" className="block font-medium mb-2">
                Detail
              </label>
              <textarea
                id="detail"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter program detail"
                value={program.detail}
                onChange={(e) => handleInputChange("detail", e.target.value)}
              />
              {errors.detail && <p className="text-red-500">{errors.detail}</p>}
            </div>
            <div>
              <label htmlFor="day" className="block font-medium mb-2">
                Number of Days
              </label>
              <input
                type="number"
                id="day"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter number of days"
                value={program.day}
                onChange={(e) =>
                  handleInputChange("day", parseInt(e.target.value))
                }
              />
              {errors.day && <p className="text-red-500">{errors.day}</p>}
            </div>
            <div>
              <label htmlFor="time" className="block font-medium mb-2">
                Time
              </label>
              <input
                type="text"
                id="time"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter time"
                value={program.time}
                onChange={(e) => handleInputChange("time", e.target.value)}
              />
              {errors.time && <p className="text-red-500">{errors.time}</p>}
            </div>
            <div>
              <label htmlFor="year" className="block font-medium mb-2">
                Year
              </label>
              <input
                type="number"
                id="year"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter year"
                value={program.year}
                onChange={(e) =>
                  handleInputChange("year", parseInt(e.target.value))
                }
              />
              {errors.year && <p className="text-red-500">{errors.year}</p>}
            </div>
            <div>
              <label htmlFor="img" className="block font-medium mb-2">
                Image
              </label>
              <input
                type="text"
                id="img"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter image URL"
                value={program.img}
                onChange={(e) => handleInputChange("img", e.target.value)}
              />
              {errors.img && <p className="text-red-500">{errors.img}</p>}
            </div>
            <div>
              <label htmlFor="banner" className="block font-medium mb-2">
                Banner
              </label>
              <input
                type="text"
                id="banner"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter banner URL"
                value={program.banner}
                onChange={(e) => handleInputChange("banner", e.target.value)}
              />
              {errors.banner && <p className="text-red-500">{errors.banner}</p>}
            </div>
            <div>
              <label className="block font-medium mb-2">Program Topics</label>
              <div className="grid grid-cols-2 gap-4">
                <Select onValueChange={handleTopicChange}>
                  <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                    <SelectValue placeholder="Select Program Topics" />
                  </SelectTrigger>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic.id} value={topic.name}>
                        {topic.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {program.programTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-md p-4 flex items-center"
                  >
                    <span className="font-medium">{topic.name}</span>
                    <Button
                      variant="default"
                      size="icon"
                      className="ml-auto"
                      onClick={(e) => handleRemoveTopic(index, e)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              {errors.programTopics && (
                <p className="text-red-500">{errors.programTopics}</p>
              )}
            </div>
            <div>
              <label className="block font-medium mb-2">
                Program Categories
              </label>
              <div className="grid grid-cols-2 gap-4">
                {workoutProgramCategories.map((category) => (
                  <div
                    key={category.type}
                    className="flex flex-col items-start space-y-2"
                  >
                    <label className="block text-lg font-medium">
                      {category.type}
                    </label>
                    <Select
                      onValueChange={(value) =>
                        handleCategoryChange(category.type, value)
                      }
                    >
                      <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                        <SelectValue
                          placeholder={`Select ${category.type} Category`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {category.workoutProgramCategories.map(
                          (subCategory) => (
                            <SelectItem
                              key={subCategory.id}
                              value={subCategory.name}
                            >
                              {subCategory.name}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-3 gap-4 mt-4">
                      {program.workoutProgramCategories
                        .filter((cat) => cat.type === category.type)
                        .map((filteredCategory, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 rounded-md p-4 flex items-center space-x-2"
                          >
                            <span className="font-medium">
                              {filteredCategory.name}
                            </span>
                            <Button
                              variant="default"
                              size="icon"
                              onClick={(e) =>
                                handleRemoveCategory(filteredCategory.type, e)
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
              {errors.workoutProgramCategories && (
                <p className="text-red-500">
                  {errors.workoutProgramCategories}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button type="submit" variant="primary" className="text-lg">
                Next
              </Button>
            </div>
          </form>
        </>
      )}

      {currentStep === 2 && (
        <>
          <h1 className="text-3xl font-bold mb-8">Select Videos and Recipes</h1>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {program.dailyExercises.map((exercise, dayIndex) => (
              <div key={dayIndex} className="mb-8">
                <h3 className="text-xl font-bold mb-4">Day {exercise.day}</h3>
                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-2">Select Videos</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {exercise.dailyVideos.map((video, videoIndex) => (
                      <div key={videoIndex} className="flex items-center">
                        <Select
                          onValueChange={(value) =>
                            handleVideoSelection(
                              dayIndex,
                              videoIndex,
                              parseInt(value)
                            )
                          }
                          value={video.video.id || ""}
                        >
                          <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                            <SelectValue>
                              {videos.find((v) => v.id === video.video.id)
                                ?.name || "Select Video"}
                            </SelectValue>
                          </SelectTrigger>
                          <SelectContent>
                            {getAvailableVideos(dayIndex).map((video) => (
                              <SelectItem
                                key={video.id}
                                value={video.id.toString()}
                              >
                                {video.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {exercise.dailyVideos.length > 1 && (
                          <Button
                            variant="default"
                            size="icon"
                            className="ml-2"
                            onClick={(e) =>
                              handleRemoveVideo(dayIndex, videoIndex, e)
                            }
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {exercise["videoError"] && (
                      <p className="text-red-500">{exercise["videoError"]}</p>
                    )}
                    {exercise.dailyVideos.length < 4 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => handleAddVideo(e, dayIndex)}
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Video
                      </Button>
                    )}
                  </div>
                </div>
                {["morning", "afternoon", "evening"].map((timeOfDay) => (
                  <div key={timeOfDay}>
                    <h4 className="text-lg font-bold mb-2">
                      Select{" "}
                      {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}{" "}
                      Recipes
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {exercise.dailyRecipes[timeOfDay].map(
                        (recipe, recipeIndex) => (
                          <div key={recipeIndex} className="flex items-center">
                            <Select
                              onValueChange={(value) =>
                                handleRecipeSelection(
                                  dayIndex,
                                  recipeIndex,
                                  parseInt(value),
                                  timeOfDay as
                                    | "morning"
                                    | "afternoon"
                                    | "evening"
                                )
                              }
                              value={recipe.recipe.id || ""}
                            >
                              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                                <SelectValue>
                                  {recipes.find(
                                    (r) => r.id === recipe.recipe.id
                                  )?.name ||
                                    `Select ${timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)} Recipe`}
                                </SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableRecipes(
                                  dayIndex,
                                  timeOfDay as
                                    | "morning"
                                    | "afternoon"
                                    | "evening"
                                ).map((recipe) => (
                                  <SelectItem
                                    key={recipe.id}
                                    value={recipe.id.toString()}
                                  >
                                    {recipe.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {exercise.dailyRecipes[timeOfDay].length > 1 && (
                              <Button
                                variant="default"
                                size="icon"
                                className="ml-2"
                                onClick={(e) =>
                                  handleRemoveRecipe(
                                    dayIndex,
                                    recipeIndex,
                                    timeOfDay as
                                      | "morning"
                                      | "afternoon"
                                      | "evening",
                                    e
                                  )
                                }
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        )
                      )}
                      {exercise[`${timeOfDay}RecipeError`] && (
                        <p className="text-red-500">
                          {exercise[`${timeOfDay}RecipeError`]}
                        </p>
                      )}
                      {exercise.dailyRecipes[timeOfDay].length < 2 && (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={(e) =>
                            handleAddRecipe(
                              e,
                              dayIndex,
                              timeOfDay as "morning" | "afternoon" | "evening"
                            )
                          }
                        >
                          <Plus className="w-4 h-4 mr-2" /> Add{" "}
                          {timeOfDay.charAt(0).toUpperCase() +
                            timeOfDay.slice(1)}{" "}
                          Recipe
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
                {errors.dailyExercises && (
                  <p className="text-red-500">{errors.dailyExercises}</p>
                )}
              </div>
            ))}
            <div className="flex justify-between">
              <Button
                variant="secondary"
                className="text-lg"
                onClick={() => setCurrentStep(1)}
              >
                Back
              </Button>
              <Button type="submit" variant="primary" className="text-lg">
                Finish
              </Button>
            </div>
          </form>
        </>
      )}
    </div>
  );
};

export default AddWorkoutProgram;
