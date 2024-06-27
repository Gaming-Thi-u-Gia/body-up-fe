"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Eye, Pen, Plus, Trash, X, Upload } from "lucide-react";
import { AddNewRecipeType } from "@/utils/admin/type";



const RecipeManagement = () => {
  const [recipes, setRecipes] = useState<AddNewRecipeType[]>([
    {
      id: 1,
      name: "Grilled Chicken Salad",
      detail: "A fresh and healthy salad with grilled chicken, mixed greens, and a zesty vinaigrette.",
      prepTime: 15,
      cookTime: 20,
      image: "/placeholder.svg",
      cookingInstruction:
        "Marinate the chicken, grill until cooked through, slice and add to a bed of mixed greens. Drizzle with vinaigrette.",
        otherImageRecipes: [{ img: "/placeholder.svg" }, { img: "/placeholder.svg" }, { img: "/placeholder.svg" }],
      ingredients: [
        { name: "Chicken Breasts", amount: "4" },
        { name: "Mixed Greens", amount: "6 cups" },
        { name: "Tomatoes", amount: "2" },
        { name: "Cucumber", amount: "1" },
        { name: "Balsamic Vinaigrette", amount: "1/2 cup" },
      ],
      notes: [
        { detail: "Use organic ingredients if possible." },
        { detail: "Marinate the chicken for at least 30 minutes for best flavor." },
      ],
      categories: [{ name: "Salad", type: "Healthy" }],
      topics: [{ name: "Gluten-Free" }, { name: "Low-Carb" }],
    },
    {
      id: 2,
      name: "Beef Stroganoff",
      detail: "A classic comfort food dish with tender beef, mushrooms, and a creamy sauce served over egg noodles.",
      prepTime: 20,
      cookTime: 45,
      image: "/placeholder.svg",
      otherImageRecipes: [{ img: "/placeholder.svg" }],
      cookingInstruction: "Brown the beef, sauté the mushrooms, make the sauce, and serve over cooked egg noodles.",
      ingredients: [
        { name: "Beef Tenderloin", amount: "1 lb" },
        { name: "Mushrooms", amount: "8 oz" },
        { name: "Onion", amount: "1" },
        { name: "Sour Cream", amount: "1 cup" },
        { name: "Egg Noodles", amount: "8 oz" },
      ],
      notes: [
        { detail: "Use high-quality beef for best results." },
        { detail: "Serve with a side of steamed broccoli." },
      ],
      categories: [{ name: "Main Dish", type: "" }],
      topics: [{ name: "Comfort Food" }],
    },
  ]);

  const [selectedRecipe, setSelectedRecipe] = useState<AddNewRecipeType | null>(null);
  const [editingRecipe, setEditingRecipe] = useState<AddNewRecipeType | null>(null);

  const handleAddRecipe = (newRecipe: AddNewRecipeType) => {
    setRecipes([...recipes, newRecipe]);
  };

  const handleUpdateRecipe = (updatedRecipe: AddNewRecipeType) => {
    const updatedRecipes = recipes.map((recipe) => (recipe.id === updatedRecipe.id ? updatedRecipe : recipe));
    setRecipes(updatedRecipes);
    setEditingRecipe(null);
  };

  const handleDeleteRecipe = (id: number) => {
    const updatedRecipes = recipes.filter((recipe) => recipe.id !== id);
    setRecipes(updatedRecipes);
  };

  const handleViewRecipe = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    setSelectedRecipe(recipe || null);
  };

  const handleEditRecipe = (id: number) => {
    const recipe = recipes.find((r) => r.id === id);
    setEditingRecipe(recipe || null);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Manage Recipes</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">{recipe.name}</h2>
              <div className="flex gap-2">
                <Button variant="default" size="icon" onClick={() => handleViewRecipe(recipe.id)}>
                  <Eye className="w-4 h-4" />
                </Button>
                <Button variant="default" size="icon" onClick={() => handleEditRecipe(recipe.id)}>
                  <Pen className="w-4 h-4" />
                </Button>
                <Button variant="default" size="icon" onClick={() => handleDeleteRecipe(recipe.id)}>
                  <Trash className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-gray-600 mb-4">{recipe.detail}</p>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <span className="font-medium">Prep Time:</span> {recipe.prepTime} min
              </div>
              <div>
                <span className="font-medium">Cook Time:</span> {recipe.cookTime} min
              </div>
            </div>
            <img
              src={recipe.image}
              alt={recipe.name}
              width={400}
              height={300}
              className="rounded-lg object-cover w-full"
            />
          </div>
        ))}
      </div>
      {selectedRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">{selectedRecipe.name}</h2>
              <Button variant="default" size="icon" onClick={() => setSelectedRecipe(null)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">{selectedRecipe.detail}</p>
                <div className="flex items-center gap-4 mb-4">
                  <div>
                    <span className="font-medium">Prep Time:</span> {selectedRecipe.prepTime} min
                  </div>
                  <div>
                    <span className="font-medium">Cook Time:</span> {selectedRecipe.cookTime} min
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Ingredients</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {selectedRecipe.ingredients.map((ingredient, index) => (
                    <li key={index}>
                      {ingredient.name} - {ingredient.amount}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <img
                  src={selectedRecipe.image}
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
                <h3 className="text-lg font-bold mb-2 mt-4">Cooking Instructions</h3>
                <p>{selectedRecipe.cookingInstruction}</p>
                <h3 className="text-lg font-bold mb-2 mt-4">Notes</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {selectedRecipe.notes.map((note, index) => (
                    <li key={index}>{note.detail}</li>
                  ))}
                </ul>
                <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.categories.map((category, index) => (
                    <div key={index} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                      {category.name}
                    </div>
                  ))}
                </div>
                <h3 className="text-lg font-bold mb-2 mt-4">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.topics.map((topic, index) => (
                    <div key={index} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
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
              <Button variant="default" size="icon" onClick={() => setEditingRecipe(null)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleUpdateRecipe(editingRecipe);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    id="name"
                    value={editingRecipe.name}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="detail">Detail</Label>
                  <Textarea
                    id="detail"
                    value={editingRecipe.detail}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, detail: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="prepTime">Prep Time (minutes)</Label>
                  <Input
                    type="number"
                    id="prepTime"
                    value={editingRecipe.prepTime}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, prepTime: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="cookTime">Cook Time (minutes)</Label>
                  <Input
                    type="number"
                    id="cookTime"
                    value={editingRecipe.cookTime}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, cookTime: parseInt(e.target.value) })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="text"
                      id="image"
                      value={editingRecipe.image}
                      onChange={(e) => setEditingRecipe({ ...editingRecipe, image: e.target.value })}
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
                    value={editingRecipe.cookingInstruction}
                    onChange={(e) => setEditingRecipe({ ...editingRecipe, cookingInstruction: e.target.value })}
                    required
                  />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Ingredients</h3>
              <div className="space-y-4">
                {editingRecipe.ingredients.map((ingredient, index) => (
                  <div key={index} className="grid grid-cols-[1fr_1fr_auto] gap-4">
                    <Input
                      type="text"
                      placeholder="Ingredient Name"
                      value={ingredient.name}
                      onChange={(e) => {
                        const updatedIngredients = [...editingRecipe.ingredients];
                        updatedIngredients[index].name = e.target.value;
                        setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                      }}
                      required
                    />
                    <Input
                      type="text"
                      placeholder="Amount"
                      value={ingredient.amount}
                      onChange={(e) => {
                        const updatedIngredients = [...editingRecipe.ingredients];
                        updatedIngredients[index].amount = e.target.value;
                        setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                      }}
                      required
                    />
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => {
                        const updatedIngredients = [...editingRecipe.ingredients];
                        updatedIngredients.splice(index, 1);
                        setEditingRecipe({ ...editingRecipe, ingredients: updatedIngredients });
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="default"
                  onClick={() => {
                    setEditingRecipe({
                      ...editingRecipe,
                      ingredients: [...editingRecipe.ingredients, { name: "", amount: "" }],
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Ingredient
                </Button>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Notes</h3>
              <div className="space-y-4">
                {editingRecipe.notes.map((note, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto] gap-4">
                    <Textarea
                      placeholder="Note"
                      value={note.detail}
                      onChange={(e) => {
                        const updatedNotes = [...editingRecipe.notes];
                        updatedNotes[index].detail = e.target.value;
                        setEditingRecipe({ ...editingRecipe, notes: updatedNotes });
                      }}
                      required
                    />
                    <Button
                      variant="default"
                      size="icon"
                      onClick={() => {
                        const updatedNotes = [...editingRecipe.notes];
                        updatedNotes.splice(index, 1);
                        setEditingRecipe({ ...editingRecipe, notes: updatedNotes });
                      }}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="default"
                  onClick={() => {
                    setEditingRecipe({
                      ...editingRecipe,
                      notes: [...editingRecipe.notes, { detail: "" }],
                    });
                  }}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Note
                </Button>
              </div>
              <h3 className="text-lg font-bold mb-2 mt-4">Additional Images</h3>
              <div className="space-y-4">
                {editingRecipe.otherImageRecipes.map((image, index) => (
                  <div key={index} className="grid grid-cols-[1fr_auto_auto] gap-4">
                    <Input
                      type="text"
                      placeholder="Image URL"
                      value={image.img}
                      onChange={(e) => {
                        const updatedImages = [...editingRecipe.otherImageRecipes];
                        updatedImages[index].img = e.target.value;
                        setEditingRecipe({ ...editingRecipe, otherImageRecipes: updatedImages });
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
                        const updatedImages = [...editingRecipe.otherImageRecipes];
                        updatedImages.splice(index, 1);
                        setEditingRecipe({ ...editingRecipe, otherImageRecipes: updatedImages });
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
                      setEditingRecipe({
                        ...editingRecipe,
                        otherImageRecipes: [...editingRecipe.otherImageRecipes, { img: "" }],
                      });
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Image
                  </Button>
                )}
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
