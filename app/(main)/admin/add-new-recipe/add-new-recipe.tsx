"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, X } from "lucide-react"

export function AddNewRecipe() {
  const [nodeRecipe, setNodeRecipe] = useState(new Set())
  const [notes, setNotes] = useState([])
  const [ingredients, setIngredients] = useState([{ name: "", amount: "" }])
  const handleAddNote = () => {
    setNotes([...notes, { detail: "" }])
  }
  const handleNoteDetailChange = (index, detail) => {
    const updatedNotes = [...notes]
    updatedNotes[index].detail = detail
    setNotes(updatedNotes)
  }
  const handleRemoveNote = (index) => {
    const updatedNotes = [...notes]
    updatedNotes.splice(index, 1)
    setNotes(updatedNotes)
  }
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", amount: "" }])
  }
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients[index][field] = value
    setIngredients(updatedIngredients)
  }
  const handleRemoveIngredient = (index) => {
    const updatedIngredients = [...ingredients]
    updatedIngredients.splice(index, 1)
    setIngredients(updatedIngredients)
  }
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">Add New Recipe</h1>
      <form className="space-y-6">
        <div>
          <label htmlFor="name" className="block font-medium mb-2">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter recipe name"
          />
        </div>
        <div>
          <label htmlFor="detail" className="block font-medium mb-2">
            Recipe Detail
          </label>
          <textarea
            id="detail"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter recipe details"
          />
        </div>
        <div>
          <label htmlFor="prepTime" className="block font-medium mb-2">
            Prep Time
          </label>
          <input
            type="number"
            id="prepTime"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter prep time in minutes"
          />
        </div>
        <div>
          <label htmlFor="cookTime" className="block font-medium mb-2">
            Cook Time
          </label>
          <input
            type="number"
            id="cookTime"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter cook time in minutes"
          />
        </div>
        <div>
          <label htmlFor="img" className="block font-medium mb-2">
            Recipe Image
          </label>
          <input
            type="text"
            id="img"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter image URL"
          />
        </div>
        <div>
          <label htmlFor="cookingInstruction" className="block font-medium mb-2">
            Cooking Instructions
          </label>
          <textarea
            id="cookingInstruction"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Enter cooking instructions"
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block font-medium mb-2">
            Ingredients
          </label>
          <div className="space-y-4">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start gap-4">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Ingredient Amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                />
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveIngredient(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center">
              <Button variant="default" className="ml-auto" onClick={handleAddIngredient}>
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="otherImages" className="block font-medium mb-2">
            Other Images
          </label>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              id="otherImageUrl"
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Enter image URL"
            />
            <div className="flex items-center">
              <Button variant="default" className="ml-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Image
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 rounded-md p-4">
              <img src="/placeholder.svg" alt="Other Image 1" width={100} height={100} className="object-cover" />
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <img src="/placeholder.svg" alt="Other Image 2" width={100} height={100} className="object-cover" />
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <img src="/placeholder.svg" alt="Other Image 3" width={100} height={100} className="object-cover" />
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block font-medium mb-2">
            Notes
          </label>
          <div className="space-y-4">
            {notes.map((note, index) => (
              <div key={index} className="flex items-start gap-4">
                <textarea
                  id={`note-${index}`}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter note detail"
                  value={note.detail}
                  onChange={(e) => handleNoteDetailChange(index, e.target.value)}
                />
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveNote(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            <div className="flex items-center">
              <Button variant="default" className="ml-auto" onClick={handleAddNote}>
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="categories" className="block font-medium mb-2">
            Categories
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="appetizer">Appetizer</SelectItem>
                <SelectItem value="main-dish">Main Dish</SelectItem>
                <SelectItem value="dessert">Dessert</SelectItem>
                <SelectItem value="salad">Salad</SelectItem>
                <SelectItem value="soup">Soup</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Button variant="default" className="ml-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Appetizer</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Main Dish</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Dessert</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="topics" className="block font-medium mb-2">
            Topics
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Select>
              <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500">
                <SelectValue placeholder="Select Topics" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="healthy">Healthy</SelectItem>
                <SelectItem value="vegetarian">Vegetarian</SelectItem>
                <SelectItem value="gluten-free">Gluten-Free</SelectItem>
                <SelectItem value="low-carb">Low-Carb</SelectItem>
                <SelectItem value="quick-and-easy">Quick and Easy</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center">
              <Button variant="default" className="ml-auto">
                <Plus className="w-4 h-4 mr-2" />
                Add Topic
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 mt-4">
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Healthy</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Vegetarian</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="bg-gray-100 rounded-md p-4">
              <span className="font-medium">Gluten-Free</span>
              <Button variant="default" size="icon" className="ml-auto">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-primary-500 text-white px-6 py-2 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Add Recipe
          </Button>
        </div>
      </form>
    </div>
  )
}