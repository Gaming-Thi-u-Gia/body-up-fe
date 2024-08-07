"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pen, Plus, Trash, X } from "lucide-react";
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
import { toast } from "sonner";

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
  const [searchQuery, setSearchQuery] = useState("");

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
    setPageNo(0);
    setRecipes([]);
    getRecipes(0, searchQuery);
  }, [searchQuery]);
  useEffect(() => {
    if (pageNo > 0) getRecipes(pageNo, searchQuery);
  }, [pageNo]);

  const getRecipes = async (page: number, query: string) => {
    try {
      setIsLoading(true);
      const pageSize = 8;
      const data = await fetchGetRecipes(page, pageSize, query, sessionToken!);
      if (data.totalElements === 0) {
        setHasMoreRecipe(false);
        setIsLoading(false);
      }
      const sortedData = data.content.sort((a: any, b: any) => b.id - a.id);
      setRecipes((prev) =>
        page === 0 ? sortedData : [...prev, ...sortedData]
      );
      setHasMoreRecipe(!data.last);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setPageNo(0);
    setRecipes([]);
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
      toast.success(response, {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    } catch (error) {
      toast.error("Error When Updating Recipe", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
    }
  };

  const handleDeleteRecipe = async (id: number) => {
    const isConfirmed = window.confirm(
      `Are you sure you want to delete the recipe with ID ${id}?`
    );
    if (!isConfirmed) return;

    try {
      const response = await fetchDeleteRecipe(id, sessionToken!);
      toast.success(response, {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
      const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
      setRecipes(updatedRecipes);
    } catch (error) {
      toast.error("Error When Deleting Recipe", {
        description: `${new Date().toLocaleString()}`,
        action: {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      });
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
      if (!selectedRecipe || selectedRecipe.id !== recipeId) {
        setSelectedRecipe(data);
      }
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

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    field: string,
    index?: number
  ) => {
    event.preventDefault();
    event.stopPropagation();

    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (editingRecipe) {
          if (field === "img") {
            setEditingRecipe((prevRecipe) => ({
              ...prevRecipe!,
              img: reader.result as string,
            }));
          } else if (field === "otherImageRecipes" && index !== undefined) {
            const updatedOtherImages = [...editingRecipe.otherImageRecipes];
            updatedOtherImages[index].img = reader.result as string;
            setEditingRecipe((prevRecipe) => ({
              ...prevRecipe!,
              otherImageRecipes: updatedOtherImages,
            }));
          }
        }
      };
      reader.onerror = () => {
        toast.error("Error reading file. Please try again", {
          description: `${new Date().toLocaleString()}`,
          action: {
            label: "Close",
            onClick: () => console.log("Close"),
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (field: string, newItem: any) => {
    if (editingRecipe) {
      const updatedField = [...(editingRecipe as any)[field], newItem];
      setEditingRecipe({ ...editingRecipe, [field]: updatedField });
    }
  };

  const handleRemoveItem = (field: string, index: number) => {
    if (editingRecipe) {
      const updatedField = [...(editingRecipe as any)[field]];
      if (updatedField.length > 1) {
        updatedField.splice(index, 1);
        setEditingRecipe({ ...editingRecipe, [field]: updatedField });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editingRecipe) {
      handleUpdateRecipe(editingRecipe);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <header className="flex items-center rounded-lg h-16 px-4 border-b shrink-0 md:px-6 bg-slate-700 text-white fixed top-[60px] left-1/2 transform -translate-x-1/2 w-full max-w-screen-2xl z-50">
        <nav className="flex-col hidden gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            prefetch={false}
          >
            <span>Recipe Management</span>
          </Link>
        </nav>
        <div className="ml-auto">
          <Link href="/admin" className="text-lg font-semibold">
            Home
          </Link>
        </div>
      </header>
      <div className="flex mt-10 items-center">
        <Input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search recipes..."
          className="w-full p-2 border border-gray-300 rounded-l-md"
        />
        <Button
          onClick={clearSearch}
          className="bg-transparent border border-gray-300 text-gray-500 hover:text-red-500 p-2 rounded-r-md focus:outline-none"
        >
          Clear
        </Button>
      </div>
      {isLoading && recipes.length === 0 ? (
        <div>
          <ListRecipeCategorySkeleton />
          <ListRecipeCategorySkeleton />
        </div>
      ) : (
        <div>
          <InfiniteScroll
            dataLength={recipes.length}
            next={() => setPageNo(pageNo + 1)}
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
            <form onSubmit={handleSubmit}>
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
                  <Label htmlFor="img">Image</Label>
                  <Input
                    type="file"
                    id="img"
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    onChange={(e) => handleFileChange(e, "img")}
                  />
                  {editingRecipe.img && (
                    <img
                      src={editingRecipe.img}
                      alt="Recipe"
                      className="mt-2 rounded-lg"
                      width={400}
                      height={300}
                    />
                  )}
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
                    {editingRecipe.ingredientRecipes.length > 1 && (
                      <Button
                        variant="default"
                        size="icon"
                        type="button"
                        onClick={() =>
                          handleRemoveItem("ingredientRecipes", index)
                        }
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="default"
                  type="button"
                  onClick={() =>
                    handleAddItem("ingredientRecipes", { name: "", amount: "" })
                  }
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
                    {editingRecipe.noteRecipes.length > 1 && (
                      <Button
                        variant="default"
                        size="icon"
                        type="button"
                        onClick={() => handleRemoveItem("noteRecipes", index)}
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button
                  variant="default"
                  type="button"
                  onClick={() => handleAddItem("noteRecipes", { detail: "" })}
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
                      type="file"
                      id={`upload-other-img-${index}`}
                      className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      onChange={(e) =>
                        handleFileChange(e, "otherImageRecipes", index)
                      }
                    />
                    {editingRecipe.otherImageRecipes.length > 1 && (
                      <Button
                        variant="default"
                        size="icon"
                        type="button"
                        onClick={() =>
                          handleRemoveItem("otherImageRecipes", index)
                        }
                      >
                        <Trash className="w-4 h-4" />
                      </Button>
                    )}
                    {image.img && (
                      <img
                        src={image.img}
                        alt={`Additional ${index + 1}`}
                        className="mt-2 rounded-lg"
                        width={200}
                        height={150}
                      />
                    )}
                  </div>
                ))}
                {editingRecipe.otherImageRecipes.length < 3 && (
                  <Button
                    variant="default"
                    type="button"
                    onClick={() =>
                      handleAddItem("otherImageRecipes", { img: "" })
                    }
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
                              type="button"
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
                      type="button"
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
    <div className="bg-white rounded-lg shadow-md px-6 pb-6 animate-pulse">
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
