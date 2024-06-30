"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pen, Plus, Trash, X, Upload } from "lucide-react";
import {
  RecipeDetailType,
  TableFilterRecipeType,
  TopicType,
} from "@/utils/admin/type";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  fetchDeleteRecipe,
  fetchGetRecipeDetailById,
  fetchGetRecipes,
  fetchGetRecipeTopic,
  fetchGetTableFilterRecipe,
  fetchPutRecipe,
} from "@/utils/admin/fetch";
import { useAuthStore } from "@/components/providers/auth-provider";
import InfiniteScroll from "react-infinite-scroll-component";

export type EditableRecipeType = Omit<
  RecipeDetailType,
  "avgStar" | "createAt" | "totalRating"
>;

const RecipeManagement = () => {
  const { sessionToken } = useAuthStore((store) => store);
  const [recipes, setRecipes] = useState<RecipeDetailType[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetailType | null>(
    null
  );
  const [editingRecipe, setEditingRecipe] = useState<EditableRecipeType | null>(
    null
  );
  const [topics, setTopics] = useState<TopicType[]>([]);
  const [tableFilter, setTableFilter] = useState<TableFilterRecipeType[]>([]);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMoreRecipe, setHasMoreRecipe] = useState(false);

  useEffect(() => {
    const getTableFilter = async () => {
      try {
        const response = await fetchGetTableFilterRecipe();
        const sortedResponse = response
          .sort((a: TableFilterRecipeType, b: TableFilterRecipeType) =>
            a.type.localeCompare(b.type)
          )
          .map((table: TableFilterRecipeType) => ({
            ...table,
            recipeCategories: table.recipeCategories.sort((a, b) =>
              a.name.localeCompare(b.name)
            ),
          }));
        setTableFilter(sortedResponse);
      } catch (error) {
        console.error(error);
      }
    };
    getTableFilter();
  }, []);

  useEffect(() => {
    const getTopics = async () => {
      try {
        const data = await fetchGetRecipeTopic();
        setTopics(data);
      } catch (error) {
        console.error(error);
      }
    };
    getTopics();
  }, []);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    try {
      setIsLoading(true);
      const pageSize = 8;
      const data = await fetchGetRecipes(pageNo, pageSize, sessionToken!);
      console.log(data.content);
      if (data.totalElements === 0) {
        setHasMoreRecipe(false);
        setIsLoading(false);
      }
      setRecipes((prev) => [...prev, ...data.content]);
      setPageNo((previous) => previous + 1);
      setHasMoreRecipe(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateRecipe = async (updatedRecipe: EditableRecipeType) => {
    try {
      const response = await fetchPutRecipe(sessionToken!, updatedRecipe);
      const updatedRecipes = recipes.map((recipe) =>
        recipe.id === updatedRecipe.id
          ? { ...recipe, ...updatedRecipe }
          : recipe
      );
      setRecipes(updatedRecipes);
      setEditingRecipe(null);
      setSelectedRecipe(null);
      console.log(response);
    } catch (error) {
      console.error("Error while updating the recipe:");
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the recipe with ID ${id}?`
    );
    if (!isConfirmed) return;

    try {
      const response = await fetchDeleteRecipe(id, sessionToken!);
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      console.log(response);
      setRecipes(updatedRecipes);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleViewRecipe = async (recipeId: number) => {
    try {
      const data = await fetchGetRecipeDetailById(recipeId, sessionToken!);
      setSelectedRecipe(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleEditRecipe = async (recipeId: number) => {
    try {
      const data = await fetchGetRecipeDetailById(recipeId, sessionToken!);
      const { id, avgStar, createAt, totalRating, ...editableFields } = data;
      setEditingRecipe({ id, ...editableFields });
      setSelectedRecipe(data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleFieldChange = (field: string, value: any) => {
    if (editingRecipe) {
      setEditingRecipe({ ...editingRecipe, [field]: value });
    }
  };

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = tableFilter
      .find((table) => table.type === type)
      ?.recipeCategories.find((category) => category.name === value);
    if (selectedCategory && editingRecipe) {
      const updatedCategories = editingRecipe.recipeCategories.filter(
        (category) => category.type !== type
      );
      setEditingRecipe({
        ...editingRecipe,
        recipeCategories: [...updatedCategories, selectedCategory],
      });
    }
  };

  const handleRemoveCategory = (type: string) => {
    if (editingRecipe) {
      const updatedCategories = editingRecipe.recipeCategories.filter(
        (category) => category.type !== type
      );
      setEditingRecipe({
        ...editingRecipe,
        recipeCategories: updatedCategories,
      });
    }
  };

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find((topic) => topic.name === value);
    if (
      selectedTopic &&
      editingRecipe &&
      !editingRecipe.recipeTopics.some((topic) => topic.id === selectedTopic.id)
    ) {
      setEditingRecipe({
        ...editingRecipe,
        recipeTopics: [...editingRecipe.recipeTopics, selectedTopic],
      });
    }
  };

  const handleRemoveTopic = (index: number) => {
    if (editingRecipe) {
      const updatedTopics = [...editingRecipe.recipeTopics];
      updatedTopics.splice(index, 1);
      setEditingRecipe({
        ...editingRecipe,
        recipeTopics: updatedTopics,
      });
    }
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Manage Recipes</h1>

      {isLoading && recipes.length === 0 ? (
        <div>
          <ListRecipeCategorySkeleton />
          <ListRecipeCategorySkeleton />
        </div>
      ) : (
        <div>
          <InfiniteScroll
            dataLength={recipes.length}
            next={getRecipes}
            hasMore={hasMoreRecipe}
            loader={<ListRecipeCategorySkeleton />}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {recipes.map((recipe) => (
                <div
                  key={recipe.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold">{recipe.name}</h2>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => handleViewRecipe(recipe.id)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => handleEditRecipe(recipe.id)}
                      >
                        <Pen className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="default"
                        size="icon"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 line-clamp-[7] overflow-hidden">
                    {recipe.detail}
                  </p>
                  <div className="flex items-center gap-4 mb-4">
                    <div>
                      <span className="font-medium">Avg Star:</span>{" "}
                      {recipe.avgStar}
                    </div>
                  </div>
                  <img
                    src={recipe.img}
                    alt={recipe.name}
                    width={400}
                    height={300}
                    className="rounded-lg object-cover w-full"
                  />
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      )}

      {selectedRecipe && !editingRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
              <Button
                variant="default"
                size="icon"
                onClick={() => setSelectedRecipe(null)}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">{selectedRecipe.detail}</p>
                <div className="flex flex-col justify-between  gap-4 mb-4 m-h-[50px]">
                  <div>
                    <span className="font-medium">ID:</span> {selectedRecipe.id}
                  </div>
                  <div>
                    <span className="font-medium">Created At:</span>{" "}
                    {new Date(selectedRecipe.createAt).toLocaleDateString()}
                  </div>
                  <div>
                    <span className="font-medium">Average Rating:</span>{" "}
                    {selectedRecipe.avgStar}
                  </div>
                  <div>
                    <span className="font-medium">Total Ratings:</span>{" "}
                    {selectedRecipe.totalRating}
                    <Button
                      variant="default"
                      className="ml-2"
                      onClick={() => alert("Display list of raters here.")}
                    >
                      View Raters
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <span className="font-medium">Prep Time:</span>{" "}
                    {selectedRecipe.prepTime} min
                  </div>
                  <div>
                    <span className="font-medium">Cook Time:</span>{" "}
                    {selectedRecipe.cookTime} min
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Ingredients</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {selectedRecipe.ingredientRecipes.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name} - {ingredient.amount}
                    </li>
                  ))}
                </ul>
                <h3 className="text-lg font-bold mb-2 mt-4">Notes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {selectedRecipe.noteRecipes.map((note, index) => (
                    <li key={index}>{note.detail}</li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src={selectedRecipe.img}
                  alt={selectedRecipe.name}
                  width={600}
                  height={400}
                  className="rounded-lg object-cover w-full"
                />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {selectedRecipe.otherImageRecipes.map((img, index) => (
                    <img
                      key={index}
                      src={img.img}
                      alt={`${selectedRecipe.name} ${index + 1}`}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover w-full"
                    />
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2 mt-4">
                  Cooking Instructions
                </h3>
                <p>{selectedRecipe.cookingInstruction}</p>
                <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.recipeCategories.map((category, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium"
                    >
                      {category.name}
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2 mt-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.recipeTopics.map((topic, index) => (
                    <div
                      key={index}
                      className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium"
                    >
                      {topic.name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {editingRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Edit Recipe</h2>
              <Button
                variant="default"
                size="icon"
                onClick={() => {
                  setEditingRecipe(null);
                  setSelectedRecipe(null);
                }}
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingRecipe) {
                  handleUpdateRecipe(editingRecipe);
                }
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={editingRecipe.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="detail">Detail</Label>
                  <Textarea
                    id="detail"
                    value={editingRecipe.detail}
                    onChange={(e) =>
                      handleFieldChange("detail", e.target.value)
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input
                    type="number"
                    id="prepTime"
                    value={editingRecipe.prepTime}
                    onChange={(e) =>
                      handleFieldChange("prepTime", parseInt(e.target.value))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                  <Input
                    type="number"
                    id="cookTime"
                    value={editingRecipe.cookTime}
                    onChange={(e) =>
                      handleFieldChange("cookTime", parseInt(e.target.value))
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="img">Image URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      id="img"
                      value={editingRecipe.img}
                      onChange={(e) => handleFieldChange("img", e.target.value)}
                      required
                    />
                    <Button variant="default" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div>
                  <Label htmlFor="cookingInstruction">
                    Cooking Instruction
                  </Label>
                  <Textarea
                    id="cookingInstruction"
                    value={editingRecipe.cookingInstruction}
                    onChange={(e) =>
                      handleFieldChange("cookingInstruction", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Ingredients</h3>
              <div className="space-y-4">
                {editingRecipe.ingredientRecipes.map((ingredient, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_1fr_auto] gap-4"
                  >
                    <Input
                      type="text"
                      placeholder="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => {
                        const updatedIngredients = [
                          ...editingRecipe.ingredientRecipes,
                        ];
                        updatedIngredients[index].name = e.target.value;
                        handleFieldChange(
                          "ingredientRecipes",
                          updatedIngredients
                        );
                      }}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(e) => {
                        const updatedIngredients = [
                          ...editingRecipe.ingredientRecipes,
                        ];
                        updatedIngredients[index].amount = e.target.value;
                        handleFieldChange(
                          "ingredientRecipes",
                          updatedIngredients
                        );
                      }}
                      required
                    />
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => {
                        const updatedIngredients = [
                          ...editingRecipe.ingredientRecipes,
                        ];
                        updatedIngredients.splice(index, 1);
                        handleFieldChange(
                          "ingredientRecipes",
                          updatedIngredients
                        );
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="default"
                  onClick={() => {
                    handleFieldChange("ingredientRecipes", [
                      ...editingRecipe.ingredientRecipes,
                      { name: "", amount: "" },
                    ]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Notes</h3>
              <div className="space-y-4">
                {editingRecipe.noteRecipes.map((note, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                    <Textarea
                      placeholder="Note"
                      value={note.detail}
                      onChange={(e) => {
                        const updatedNotes = [...editingRecipe.noteRecipes];
                        updatedNotes[index].detail = e.target.value;
                        handleFieldChange("noteRecipes", updatedNotes);
                      }}
                      required
                    />
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => {
                        const updatedNotes = [...editingRecipe.noteRecipes];
                        updatedNotes.splice(index, 1);
                        handleFieldChange("noteRecipes", updatedNotes);
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="default"
                  onClick={() => {
                    handleFieldChange("noteRecipes", [
                      ...editingRecipe.noteRecipes,
                      { detail: "" },
                    ]);
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Additional Images</h3>
              <div className="space-y-4">
                {editingRecipe.otherImageRecipes.map((image, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[1fr_auto_auto] gap-4"
                  >
                    <Input
                      type="text"
                      placeholder="Image URL"
                      value={image.img}
                      onChange={(e) => {
                        const updatedImages = [
                          ...editingRecipe.otherImageRecipes,
                        ];
                        updatedImages[index].img = e.target.value;
                        handleFieldChange("otherImageRecipes", updatedImages);
                      }}
                      required
                    />
                    <Button variant="default" size="icon">
                      <Upload className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => {
                        const updatedImages = [
                          ...editingRecipe.otherImageRecipes,
                        ];
                        updatedImages.splice(index, 1);
                        handleFieldChange("otherImageRecipes", updatedImages);
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                {editingRecipe.otherImageRecipes.length < 3 && (
                  <Button
                    variant="default"
                    onClick={() => {
                      handleFieldChange("otherImageRecipes", [
                        ...editingRecipe.otherImageRecipes,
                        { img: "" },
                      ]);
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                )}
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
              <div className="grid grid-cols-2 gap-4">
                {tableFilter.map((table) => (
                  <div
                    key={table.type}
                    className="flex flex-col items-start space-y-2"
                  >
                    <Label className="block text-lg font-medium">
                      {table.type}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleCategoryChange(table.type, value)
                      }
                    >
                      <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                        <SelectValue
                          placeholder={`Select ${table.type} Category`}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {table.recipeCategories.map((category) => (
                          <SelectItem key={category.id} value={category.name}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {editingRecipe.recipeCategories
                        .filter((cat) => cat.type === table.type)
                        .map((category, index) => (
                          <div
                            key={index}
                            className="bg-gray-100 rounded-md p-4 flex items-center space-x-2"
                          >
                            <span className="font-medium">{category.name}</span>
                            <Button
                              variant="default"
                              size="icon"
                              onClick={() =>
                                handleRemoveCategory(category.type)
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
              <h3 className="text-lg font-bold mb-2 mt-4">Topics</h3>
              <Select onValueChange={handleTopicChange}>
                <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                  <SelectValue placeholder="Select Topics" />
                </SelectTrigger>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.name}>
                      {topic.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {editingRecipe.recipeTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="bg-gray-100 rounded-md p-4 flex items-center"
                  >
                    <span className="font-medium">{topic.name}</span>
                    <Button
                      variant="default"
                      size="icon"
                      className="ml-auto"
                      onClick={() => handleRemoveTopic(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Button type="submit" variant="primary" className="mt-8">
                Update Recipe
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipeManagement;

const ListRecipeCategorySkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 my-5">
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
      <RecipeCardSkeleton />
    </div>
  );
};
const RecipeCardSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-col space-y-2 w-full">
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
          <div className="h-8 bg-gray-300 rounded w-1/2"></div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
          <div className="h-6 w-6 bg-gray-300 rounded-full"></div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-full"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="space-y-3 mb-4">
        <div className="h-6 bg-gray-300 rounded w-2/3"></div>
      </div>
      <div className="h-[350px] bg-gray-300 rounded-lg w-full mb-4"></div>
    </div>
  );
};
