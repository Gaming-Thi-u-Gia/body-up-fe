"use client"
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X, Upload, Plus, Trash } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { AddNewRecipeType, TableFilterRecipeType, TopicType } from "@/utils/admin/type";
import { useState } from "react";



const EditRecipe = ({ editingRecipe, tableFilter, topics, onUpdateRecipe, onCancel }: EditRecipeProps) => {
  const [localRecipe, setLocalRecipe] = useState<AddNewRecipeType>(editingRecipe);

  const handleFieldChange = (field: string, value: any) => {
    setLocalRecipe({ ...localRecipe, [field]: value });
  };

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = tableFilter
      .find((table) => table.type === type)
      ?.recipeCategories.find((category) => category.name === value);
    if (selectedCategory) {
      const updatedCategories = localRecipe.recipeCategories.filter(
        (category) => category.type !== type
      );
      setLocalRecipe({
        ...localRecipe,
        recipeCategories: [...updatedCategories, selectedCategory],
      });
    }
  };

  const handleRemoveCategory = (type: string) => {
    const updatedCategories = localRecipe.recipeCategories.filter(
      (category) => category.type !== type
    );
    setLocalRecipe({
      ...localRecipe,
      recipeCategories: updatedCategories,
    });
  };

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find((topic) => topic.name === value);
    if (selectedTopic && !localRecipe.recipeTopics.some((topic) => topic.id === selectedTopic.id)) {
      setLocalRecipe({
        ...localRecipe,
        recipeTopics: [...localRecipe.recipeTopics, selectedTopic],
      });
    }
  };

  const handleRemoveTopic = (index: number) => {
    const updatedTopics = [...localRecipe.recipeTopics];
    updatedTopics.splice(index, 1);
    setLocalRecipe({
      ...localRecipe,
      recipeTopics: updatedTopics,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateRecipe(localRecipe);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">Edit Recipe</h2>
          <Button variant="default" size="icon" onClick={onCancel}>
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
                value={localRecipe.name}
                onChange={(e) => handleFieldChange("name", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="detail">Detail</Label>
              <Textarea
                id="detail"
                value={localRecipe.detail}
                onChange={(e) => handleFieldChange("detail", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="prepTime">Prep Time (minutes)</Label>
              <Input
                type="number"
                id="prepTime"
                value={localRecipe.prepTime}
                onChange={(e) => handleFieldChange("prepTime", parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="cookTime">Cook Time (minutes)</Label>
              <Input
                type="number"
                id="cookTime"
                value={localRecipe.cookTime}
                onChange={(e) => handleFieldChange("cookTime", parseInt(e.target.value))}
                required
              />
            </div>
            <div>
              <Label htmlFor="img">Image URL</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="text"
                  id="img"
                  value={localRecipe.img}
                  onChange={(e) => handleFieldChange("img", e.target.value)}
                  required
                />
                <Button variant="default" size="icon">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="cookingInstruction">Cooking Instruction</Label>
              <Textarea
                id="cookingInstruction"
                value={localRecipe.cookingInstruction}
                onChange={(e) => handleFieldChange("cookingInstruction", e.target.value)}
                required
              />
            </div>
          </div>
          <h3 className="text-lg font-bold mb-2 mt-4">Ingredients</h3>
          <div className="space-y-4">
            {localRecipe.ingredientRecipes.map((ingredient, index) => (
              <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                <Input
                  type="text"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => {
                    const updatedIngredients = [...localRecipe.ingredientRecipes];
                    updatedIngredients[index].name = e.target.value;
                    handleFieldChange("ingredientRecipes", updatedIngredients);
                  }}
                  required
                />
                <Input
                  type="text"
                  placeholder="Amount"
                  value={ingredient.amount}
                  onChange={(e) => {
                    const updatedIngredients = [...localRecipe.ingredientRecipes];
                    updatedIngredients[index].amount = e.target.value;
                    handleFieldChange("ingredientRecipes", updatedIngredients);
                  }}
                  required
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => {
                    const updatedIngredients = [...localRecipe.ingredientRecipes];
                    updatedIngredients.splice(index, 1);
                    handleFieldChange("ingredientRecipes", updatedIngredients);
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
                  ...localRecipe.ingredientRecipes,
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
            {localRecipe.recipeNotes.map((note, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                <Textarea
                  placeholder="Note"
                  value={note.detail}
                  onChange={(e) => {
                    const updatedNotes = [...localRecipe.recipeNotes];
                    updatedNotes[index].detail = e.target.value;
                    handleFieldChange("recipeNotes", updatedNotes);
                  }}
                  required
                />
                <Button
                  variant="default"
                  size="icon"
                  onClick={() => {
                    const updatedNotes = [...localRecipe.recipeNotes];
                    updatedNotes.splice(index, 1);
                    handleFieldChange("recipeNotes", updatedNotes);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="default"
              onClick={() => {
                handleFieldChange("recipeNotes", [...localRecipe.recipeNotes, { detail: "" }]);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Note
            </Button>
          </div>
          <h3 className="text-lg font-bold mb-2 mt-4">Additional Images</h3>
          <div className="space-y-4">
            {localRecipe.otherImageRecipes.map((image, index) => (
              <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-4">
                <Input
                  type="text"
                  placeholder="Image URL"
                  value={image.img}
                  onChange={(e) => {
                    const updatedImages = [...localRecipe.otherImageRecipes];
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
                    const updatedImages = [...localRecipe.otherImageRecipes];
                    updatedImages.splice(index, 1);
                    handleFieldChange("otherImageRecipes", updatedImages);
                  }}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {localRecipe.otherImageRecipes.length < 3 && (
              <Button
                variant="default"
                onClick={() => {
                  handleFieldChange("otherImageRecipes", [
                    ...localRecipe.otherImageRecipes,
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
              <div key={table.type} className="flex flex-col items-start space-y-2">
                <Label className="block text-lg font-medium">{table.type}</Label>
                <Select onValueChange={(value) => handleCategoryChange(table.type, value)}>
                  <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                    <SelectValue placeholder={`Select ${table.type} Category`} />
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
                  {localRecipe.recipeCategories.filter((cat) => cat.type === table.type).map((category, index) => (
                    <div key={index} className="bg-gray-100 rounded-md p-4 flex items-center space-x-2">
                      <span className="font-medium">{category.name}</span>
                      <Button variant="default" size="icon" onClick={() => handleRemoveCategory(category.type)}>
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
            {localRecipe.recipeTopics.map((topic, index) => (
              <div key={index} className="bg-gray-100 rounded-md p-4 flex items-center">
                <span className="font-medium">{topic.name}</span>
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveTopic(index)}>
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
  );
};

export default EditRecipe;
