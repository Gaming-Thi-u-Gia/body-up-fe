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
import { useEffect, useState, MouseEvent, FormEvent, ChangeEvent } from "react";
import { TableFilterProgramType, TopicType } from "@/utils/admin/type";
import { fetchAllFilterCategoryWorkoutProgram } from "@/utils/video/category";
import {
  fetchGetAllVideoSelectForAdmin,
  fetchWorkoutCategoryData,
} from "@/utils/video/workoutVideoCollection";
import { useAuthStore } from "@/components/providers/auth-provider";
import {
  fetchGetAllRecipeSelectForAdmin,
  fetchPostWorkoutProgram,
} from "@/utils/admin/fetch";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export type AddNewProgramType = {
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

type ExerciseError = {
  videoError?: string;
  morningRecipeError?: string;
  afternoonRecipeError?: string;
  eveningRecipeError?: string;
};

const AddWorkoutProgram = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const router = useRouter();
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

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [workoutProgramCategories, setWorkoutProgramCategories] = useState<
    TableFilterProgramType[]
  >([]);
  const [videos, setVideos] = useState<VideoType[]>([]);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [errors, setErrors] = useState<Record<string, string | ExerciseError>>({
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

  const [dayStates, setDayStates] = useState<
    {
      dailyVideos: AddNewDailyVideoType[];
      morningRecipes: AddNewDailyRecipeType[];
      afternoonRecipes: AddNewDailyRecipeType[];
      eveningRecipes: AddNewDailyRecipeType[];
    }[]
  >([]);

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

  const handleImageChange = (
    e: ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProgram((prevProgram) => ({
          ...prevProgram,
          [field]: base64String,
        }));
        setErrors((prevErrors) => ({
          ...prevErrors,
          [field]: "",
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (field: string) => {
    setProgram((prevProgram) => ({
      ...prevProgram,
      [field]: "",
    }));
  };

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

  const handleRemoveTopic = (index: number, e: MouseEvent) => {
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
      ?.workoutProgramCategories.find((category) => category.name === value);
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

  const handleRemoveCategory = (type: string, e: MouseEvent) => {
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

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (checkEmptyFields() || checkCategoryAndTopic()) {
        return;
      }

      const newDayStates = Array.from({ length: program.day }, () => ({
        dailyVideos: [{ video: { id: 0, name: "" } }],
        morningRecipes: [{ recipe: { id: 0, name: "" }, part: "morning" }],
        afternoonRecipes: [{ recipe: { id: 0, name: "" }, part: "afternoon" }],
        eveningRecipes: [{ recipe: { id: 0, name: "" }, part: "evening" }],
      }));

      setDayStates(newDayStates);
      setCurrentStep(2);
    }
  };

  const handleAddVideo = (e: MouseEvent, dayIndex: number) => {
    e.preventDefault();
    setDayStates((prevDayStates) => {
      const newDayStates = [...prevDayStates];
      const dayState = newDayStates[dayIndex];
      if (dayState.dailyVideos.length < 4) {
        if (
          dayState.dailyVideos.length === 0 ||
          dayState.dailyVideos[dayState.dailyVideos.length - 1].video.id !== 0
        ) {
          dayState.dailyVideos.push({
            video: { id: 0, name: "" },
          });
          setErrors((prevErrors) => ({
            ...prevErrors,
            dailyExercises: "",
          }));
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
      return newDayStates;
    });
  };

  const handleVideoSelection = (
    dayIndex: number,
    videoIndex: number,
    videoId: number
  ) => {
    const selectedVideo = videos.find((video) => video.id === videoId);
    if (selectedVideo) {
      setDayStates((prevDayStates) => {
        const newDayStates = [...prevDayStates];
        const dayState = newDayStates[dayIndex];
        dayState.dailyVideos[videoIndex] = { video: selectedVideo };
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises: "",
        }));
        return newDayStates;
      });
    }
  };

  const handleRemoveVideo = (
    dayIndex: number,
    videoIndex: number,
    e: MouseEvent
  ) => {
    e.preventDefault();
    setDayStates((prevDayStates) => {
      const newDayStates = [...prevDayStates];
      newDayStates[dayIndex].dailyVideos.splice(videoIndex, 1);
      return newDayStates;
    });
  };

  const handleAddRecipe = (
    e: MouseEvent,
    dayIndex: number,
    part: "morning" | "afternoon" | "evening"
  ) => {
    e.preventDefault();
    setDayStates((prevDayStates) => {
      const newDayStates = [...prevDayStates];
      const dayState = newDayStates[dayIndex];
      const recipeState =
        part === "morning"
          ? dayState.morningRecipes
          : part === "afternoon"
            ? dayState.afternoonRecipes
            : dayState.eveningRecipes;
      if (recipeState.length < 2) {
        if (
          recipeState.length === 0 ||
          recipeState[recipeState.length - 1].recipe.id !== 0
        ) {
          recipeState.push({
            recipe: { id: 0, name: "" },
            part: part,
          });
          setErrors((prevErrors) => ({
            ...prevErrors,
            dailyExercises: "",
          }));
        } else {
          setErrors((prevErrors) => ({
            ...prevErrors,
            dailyExercises:
              "Please select the current recipe before adding a new one.",
          }));
        }
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises:
            "You can only add up to 2 recipes per part of the day.",
        }));
      }
      return newDayStates;
    });
  };

  const handleRecipeSelection = (
    dayIndex: number,
    recipeIndex: number,
    recipeId: number,
    part: "morning" | "afternoon" | "evening"
  ) => {
    const selectedRecipe = recipes.find((recipe) => recipe.id === recipeId);
    if (selectedRecipe) {
      setDayStates((prevDayStates) => {
        const newDayStates = [...prevDayStates];
        const dayState = newDayStates[dayIndex];
        const recipeState =
          part === "morning"
            ? dayState.morningRecipes
            : part === "afternoon"
              ? dayState.afternoonRecipes
              : dayState.eveningRecipes;
        recipeState[recipeIndex] = {
          ...recipeState[recipeIndex],
          recipe: selectedRecipe,
        };
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises: "",
        }));
        return newDayStates;
      });
    }
  };

  const handleRemoveRecipe = (
    dayIndex: number,
    recipeIndex: number,
    part: "morning" | "afternoon" | "evening",
    e: MouseEvent
  ) => {
    e.preventDefault();
    setDayStates((prevDayStates) => {
      const newDayStates = [...prevDayStates];
      const recipeState =
        part === "morning"
          ? newDayStates[dayIndex].morningRecipes
          : part === "afternoon"
            ? newDayStates[dayIndex].afternoonRecipes
            : newDayStates[dayIndex].eveningRecipes;
      recipeState.splice(recipeIndex, 1);
      return newDayStates;
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const updatedDailyExercises = dayStates.map((dayState, dayIndex) => ({
      day: dayIndex + 1,
      dailyVideos: dayState.dailyVideos,
      dailyRecipes: [
        ...dayState.morningRecipes,
        ...dayState.afternoonRecipes,
        ...dayState.eveningRecipes,
      ],
    }));

    let hasError = false;
    const validatedDailyExercises = updatedDailyExercises.map((exercise) => {
      const updatedExercise: AddNewDailyExerciseType & ExerciseError = {
        ...exercise,
      };
      if (
        exercise.dailyVideos.length === 0 ||
        exercise.dailyVideos.some((video) => video.video.id === 0)
      ) {
        updatedExercise.videoError =
          "Each day must have at least one video selected.";
        hasError = true;
      } else {
        updatedExercise.videoError = "";
      }

      const parts: Array<"morning" | "afternoon" | "evening"> = [
        "morning",
        "afternoon",
        "evening",
      ];
      parts.forEach((part) => {
        const partRecipes = exercise.dailyRecipes.filter(
          (r) => r.part === part
        );
        if (
          partRecipes.length === 0 ||
          partRecipes.some((recipe) => recipe.recipe.id === 0)
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
      dailyExercises: validatedDailyExercises,
    }));

    if (hasError) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dailyExercises: "Please fix the errors before submitting.",
      }));
      return;
    } else {
      const finalProgram = {
        ...program,
        dailyExercises: validatedDailyExercises,
      };

      try {
        await postWorkoutProgram(finalProgram);
        router.push("/admin/workout-program-management");
      } catch (error) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          dailyExercises: "Failed to submit program",
        }));
        console.error(error);
      }
    }
  };

  const postWorkoutProgram = async (finalProgram: AddNewProgramType) => {
    try {
      const response = await fetchPostWorkoutProgram(
        finalProgram,
        sessionToken!
      );
      toast.success(response, {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } catch (error) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        dailyExercises: "Failed to submit program",
      }));
      toast.error("Fail To Add New Workout Program", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  const checkEmptyFields = (): boolean => {
    let hasError = false;

    const requiredFields: (keyof AddNewProgramType)[] = [
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

  const checkCategoryAndTopic = (): boolean => {
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

  const getAvailableVideos = (dayIndex: number): VideoType[] => {
    const selectedVideos = dayStates[dayIndex].dailyVideos.map(
      (video) => video.video.id
    );
    return videos.filter((video) => !selectedVideos.includes(video.id));
  };

  const getAvailableRecipes = (
    dayIndex: number,
    part: "morning" | "afternoon" | "evening"
  ): RecipeType[] => {
    const selectedRecipes = [
      ...dayStates[dayIndex].morningRecipes,
      ...dayStates[dayIndex].afternoonRecipes,
      ...dayStates[dayIndex].eveningRecipes,
    ].map((recipe) => recipe.recipe.id);
    return recipes.filter((recipe) => !selectedRecipes.includes(recipe.id));
  };

  return (
    <div className="container mx-auto py-12">
      <header className="bg-black py-4 px-6 flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">Add Workout Program</h1>
        <Link href="/admin">
          <Button variant="secondary" className="text-lg">
            Home
          </Button>
        </Link>
      </header>
      {currentStep === 1 && (
        <>
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("name", e.target.value)
                }
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.toString()}</p>
              )}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("type", e.target.value)
                }
              />
              {errors.type && (
                <p className="text-red-500">{errors.type.toString()}</p>
              )}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("equipment", e.target.value)
                }
              />
              {errors.equipment && (
                <p className="text-red-500">{errors.equipment.toString()}</p>
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
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                  handleInputChange("detail", e.target.value)
                }
              />
              {errors.detail && (
                <p className="text-red-500">{errors.detail.toString()}</p>
              )}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("day", parseInt(e.target.value))
                }
              />
              {errors.day && (
                <p className="text-red-500">{errors.day.toString()}</p>
              )}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("time", e.target.value)
                }
              />
              {errors.time && (
                <p className="text-red-500">{errors.time.toString()}</p>
              )}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("year", parseInt(e.target.value))
                }
              />
              {errors.year && (
                <p className="text-red-500">{errors.year.toString()}</p>
              )}
            </div>
            <div>
              <label htmlFor="img" className="block font-medium mb-2">
                Image
              </label>
              <input
                type="file"
                id="img"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                onChange={(e) => handleImageChange(e, "img")}
              />
              {program.img && (
                <div className="relative mt-4">
                  <img
                    src={program.img}
                    alt="Program Image"
                    className="w-64 h-64 object-cover rounded-md"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveImage("img")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {errors.img && (
                <p className="text-red-500">{errors.img.toString()}</p>
              )}
            </div>
            <div>
              <label htmlFor="banner" className="block font-medium mb-2">
                Banner
              </label>
              <input
                type="file"
                id="banner"
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                onChange={(e) => handleImageChange(e, "banner")}
              />
              {program.banner && (
                <div className="relative mt-4">
                  <img
                    src={program.banner}
                    alt="Program Banner"
                    className="w-64 h-64 object-cover rounded-md"
                  />
                  <Button
                    variant="default"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveImage("banner")}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              )}
              {errors.banner && (
                <p className="text-red-500">{errors.banner.toString()}</p>
              )}
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
                <p className="text-red-500">
                  {errors.programTopics.toString()}
                </p>
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
              {typeof errors.workoutProgramCategories === "string" && (
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
            {dayStates.map((dayState, dayIndex) => (
              <div key={dayIndex} className="mb-8">
                <h3 className="text-xl font-bold mb-4">Day {dayIndex + 1}</h3>
                <div className="mb-4">
                  <h4 className="text-lg font-bold mb-2">Select Videos</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {dayState.dailyVideos.map((video, videoIndex) => (
                      <div key={videoIndex} className="flex items-center">
                        <Select
                          onValueChange={(value) =>
                            handleVideoSelection(
                              dayIndex,
                              videoIndex,
                              parseInt(value)
                            )
                          }
                          value={video.video.id.toString() || ""}
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
                      </div>
                    ))}
                    {errors.dailyExercises &&
                      typeof errors.dailyExercises === "string" && (
                        <p className="text-red-500">{errors.dailyExercises}</p>
                      )}
                    {dayState.dailyVideos.length < 4 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={(e) => handleAddVideo(e, dayIndex)}
                      >
                        <Plus className="w-4 h-4 mr-2" /> Add Video
                      </Button>
                    )}
                  </div>
                  {dayState.dailyVideos.length > 0 &&
                    dayState.dailyVideos[0].video.id === 0 && (
                      <p className="text-red-500 mt-2">
                        {errors.dailyExercises.toString()}
                      </p>
                    )}
                </div>

                {["morning", "afternoon", "evening"].map((timeOfDay) => (
                  <div key={timeOfDay}>
                    <h4 className="text-lg font-bold mb-2">
                      Select{" "}
                      {timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}{" "}
                      Recipes
                    </h4>
                    <div className="grid grid-cols-1 gap-2">
                      {timeOfDay === "morning" &&
                        dayState.morningRecipes.map((recipe, recipeIndex) => (
                          <div key={recipeIndex} className="flex items-center">
                            <Select
                              onValueChange={(value) =>
                                handleRecipeSelection(
                                  dayIndex,
                                  recipeIndex,
                                  parseInt(value),
                                  "morning"
                                )
                              }
                              value={recipe.recipe.id.toString() || ""}
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
                                {getAvailableRecipes(dayIndex, "morning").map(
                                  (recipe) => (
                                    <SelectItem
                                      key={recipe.id}
                                      value={recipe.id.toString()}
                                    >
                                      {recipe.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="default"
                              size="icon"
                              className="ml-2"
                              onClick={(e) =>
                                handleRemoveRecipe(
                                  dayIndex,
                                  recipeIndex,
                                  "morning",
                                  e
                                )
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      {errors[`${timeOfDay}RecipeError`] && (
                        <p className="text-red-500 mt-2">
                          {errors[`${timeOfDay}RecipeError`].toString()}
                        </p>
                      )}
                      {timeOfDay === "afternoon" &&
                        dayState.afternoonRecipes.map((recipe, recipeIndex) => (
                          <div key={recipeIndex} className="flex items-center">
                            <Select
                              onValueChange={(value) =>
                                handleRecipeSelection(
                                  dayIndex,
                                  recipeIndex,
                                  parseInt(value),
                                  "afternoon"
                                )
                              }
                              value={recipe.recipe.id.toString() || ""}
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
                                {getAvailableRecipes(dayIndex, "afternoon").map(
                                  (recipe) => (
                                    <SelectItem
                                      key={recipe.id}
                                      value={recipe.id.toString()}
                                    >
                                      {recipe.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="default"
                              size="icon"
                              className="ml-2"
                              onClick={(e) =>
                                handleRemoveRecipe(
                                  dayIndex,
                                  recipeIndex,
                                  "afternoon",
                                  e
                                )
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      {errors[`${timeOfDay}RecipeError`] && (
                        <p className="text-red-500 mt-2">
                          {errors[`${timeOfDay}RecipeError`].toString()}
                        </p>
                      )}
                      {timeOfDay === "evening" &&
                        dayState.eveningRecipes.map((recipe, recipeIndex) => (
                          <div key={recipeIndex} className="flex items-center">
                            <Select
                              onValueChange={(value) =>
                                handleRecipeSelection(
                                  dayIndex,
                                  recipeIndex,
                                  parseInt(value),
                                  "evening"
                                )
                              }
                              value={recipe.recipe.id.toString() || ""}
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
                                {getAvailableRecipes(dayIndex, "evening").map(
                                  (recipe) => (
                                    <SelectItem
                                      key={recipe.id}
                                      value={recipe.id.toString()}
                                    >
                                      {recipe.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            <Button
                              variant="default"
                              size="icon"
                              className="ml-2"
                              onClick={(e) =>
                                handleRemoveRecipe(
                                  dayIndex,
                                  recipeIndex,
                                  "evening",
                                  e
                                )
                              }
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      {errors[`${timeOfDay}RecipeError`] && (
                        <p className="text-red-500 mt-2">
                          {errors[`${timeOfDay}RecipeError`].toString()}
                        </p>
                      )}
                      {((timeOfDay === "morning" &&
                        dayState.morningRecipes.length < 2) ||
                        (timeOfDay === "afternoon" &&
                          dayState.afternoonRecipes.length < 2) ||
                        (timeOfDay === "evening" &&
                          dayState.eveningRecipes.length < 2)) && (
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
