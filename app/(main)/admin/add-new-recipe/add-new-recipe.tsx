"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Plus, X } from "lucide-react"
import { IngredientType, NoteRecipeType } from "@/utils/admin/type"
import { fetchGetRecipeTopic, fetchGetTableFilter } from "@/utils/admin/fetch"

export type AddNewRecipeType = {
  name: string;
  detail: string;
  prepTime: number;
  cookTime: number;
  img: string;
  cookingInstruction: string;
  ingredientRecipes: IngredientRecipeType[];
  otherImageRecipes: OtherImageRecipeType[];
  noteRecipes: NoteRecipeType[];
  recipeTopics: TopicType[];
  recipeCategories: RecipeCategoryType[];
}

type TableFilterType = {
  length: number;
  type: string;
  recipeCategories: RecipeCategoryType[];
}

export type IngredientRecipeType = {
  amount: string;
  name: string;
}

export type OtherImageRecipeType = {
  img: string;
}

export type RecipeCategoryType = {
  id: number;
  name: string;
  type: string;
  img: string;
  totalRecipe: number;
}

export type TopicType = {
  id: number;
  name: string;
}

const AddNewRecipe = () => {
  const [recipe, setRecipe] = useState({
    name: "",
    detail: "",
    prepTime: "",
    cookTime: "",
    img: "",
    cookingInstruction: "",
    ingredients: [{ name: "", amount: "" }],
    notes: [{ detail: "" }],
    categorieRecipes: [] as RecipeCategoryType[],
    recipeTopics: [] as TopicType[],
    otherImageRecipes: [] as OtherImageRecipeType[]
  })

  const [topics, setTopics] = useState<TopicType[]>([])
  const [tableFilter, setTableFilter] = useState<TableFilterType[]>([]);
  const [imagePreview, setImagePreview] = useState("")
  const [errors, setErrors] = useState({
    notes: "",
    ingredients: "",
    otherImageRecipes: ""
  })

  useEffect(() => {
    const getTableFilter = async () => {
      try {
        const response = await fetchGetTableFilter();
        const sortedResponse = response
          .sort((a: TableFilterType, b: TableFilterType) =>
            a.type.localeCompare(b.type)
          )
          .map((table: TableFilterType) => ({
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
    }
    getTopics();
  }, [])

  const handleAddNote = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (recipe.notes.some(note => note.detail === "")) {
      setErrors(prevErrors => ({ ...prevErrors, notes: "Please fill in all note details before adding a new note." }))
      return
    }
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      notes: [...prevRecipe.notes, { detail: "" }]
    }))
    setErrors(prevErrors => ({ ...prevErrors, notes: "" }))
  }

  const handleNoteDetailChange = (index: number, detail: string) => {
    const updatedNotes = [...recipe.notes]
    updatedNotes[index].detail = detail
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      notes: updatedNotes
    }))
  }

  const handleRemoveNote = (index: number) => {
    const updatedNotes = [...recipe.notes]
    updatedNotes.splice(index, 1)
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      notes: updatedNotes
    }))
  }

  const handleAddIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (recipe.ingredients.some(ingredient => ingredient.name === "" || ingredient.amount === "")) {
      setErrors(prevErrors => ({ ...prevErrors, ingredients: "Please fill in all ingredient details before adding a new ingredient." }))
      return
    }
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: [...prevRecipe.ingredients, { name: "", amount: "" }]
    }))
    setErrors(prevErrors => ({ ...prevErrors, ingredients: "" }))
  }

  const handleIngredientChange = (index: number, field: keyof IngredientRecipeType, value: string) => {
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients[index][field] = value
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: updatedIngredients
    }))
  }

  const handleRemoveIngredient = (index: number) => {
    const updatedIngredients = [...recipe.ingredients]
    updatedIngredients.splice(index, 1)
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      ingredients: updatedIngredients
    }))
  }

  const handleInputChange = (field: string, value: string) => {
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      [field]: value
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setRecipe(prevRecipe => ({
          ...prevRecipe,
          img: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddOtherImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (recipe.otherImageRecipes.some(image => image.img === "")) {
      setErrors(prevErrors => ({ ...prevErrors, otherImageRecipes: "Please fill in all other image details before adding a new image." }))
      return
    }
    if (recipe.otherImageRecipes.length < 3) {
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        otherImageRecipes: [...prevRecipe.otherImageRecipes, { img: "" }]
      }))
      setErrors(prevErrors => ({ ...prevErrors, otherImageRecipes: "" }))
    }
  }

  const handleOtherImageChange = (index: number, file: File) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      const updatedOtherImages = [...recipe.otherImageRecipes]
      updatedOtherImages[index].img = reader.result as string
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        otherImageRecipes: updatedOtherImages
      }))
    }
    reader.readAsDataURL(file)
  }

  const handleRemoveOtherImage = (index: number) => {
    const updatedOtherImages = [...recipe.otherImageRecipes]
    updatedOtherImages.splice(index, 1)
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      otherImageRecipes: updatedOtherImages
    }))
  }

  const handleCategoryChange = (type: string, value: string) => {
    const selectedCategory = tableFilter
      .find(table => table.type === type)
      ?.recipeCategories.find(category => category.name === value)
    if (selectedCategory) {
      const updatedCategories = recipe.categorieRecipes.filter(category => category.type !== type)
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        categorieRecipes: [...updatedCategories, selectedCategory]
      }))
    }
  }

  const handleRemoveCategory = (type: string) => {
    const updatedCategories = recipe.categorieRecipes.filter(category => category.type !== type)
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      categorieRecipes: updatedCategories
    }))
  }

  const handleTopicChange = (value: string) => {
    const selectedTopic = topics.find(topic => topic.name === value)
    if (selectedTopic && !recipe.recipeTopics.some(topic => topic.id === selectedTopic.id)) {
      setRecipe(prevRecipe => ({
        ...prevRecipe,
        recipeTopics: [...prevRecipe.recipeTopics, selectedTopic]
      }))
    }
  }

  const handleRemoveTopic = (index: number) => {
    const updatedTopics = [...recipe.recipeTopics]
    updatedTopics.splice(index, 1)
    setRecipe(prevRecipe => ({
      ...prevRecipe,
      recipeTopics: updatedTopics
    }))
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log('Recipe submitted:', recipe)
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold mb-8">Add New Recipe</h1>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="block text-lg font-medium mb-2">
            Recipe Name
          </label>
          <input
            type="text"
            id="name"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            placeholder="Enter recipe name"
            value={recipe.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="detail" className="block text-lg font-medium mb-2">
            Recipe Detail
          </label>
          <textarea
            id="detail"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            placeholder="Enter recipe details"
            value={recipe.detail}
            onChange={(e) => handleInputChange("detail", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="prepTime" className="block text-lg font-medium mb-2">
            Prep Time
          </label>
          <input
            type="number"
            id="prepTime"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            placeholder="Enter prep time in minutes"
            value={recipe.prepTime}
            onChange={(e) => handleInputChange("prepTime", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="cookTime" className="block text-lg font-medium mb-2">
            Cook Time
          </label>
          <input
            type="number"
            id="cookTime"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            placeholder="Enter cook time in minutes"
            value={recipe.cookTime}
            onChange={(e) => handleInputChange("cookTime", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="img" className="block text-lg font-medium mb-2">
            Recipe Image
          </label>
          <input
            type="file"
            id="img"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            onChange={handleImageChange}
          />
          {imagePreview && (
            <img src={imagePreview} alt="Recipe" className="mt-4 w-48 h-48 object-cover rounded-md" />
          )}
        </div>
        <div>
          <label htmlFor="cookingInstruction" className="block text-lg font-medium mb-2">
            Cooking Instructions
          </label>
          <textarea
            id="cookingInstruction"
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
            placeholder="Enter cooking instructions"
            value={recipe.cookingInstruction}
            onChange={(e) => handleInputChange("cookingInstruction", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ingredients" className="block text-lg font-medium mb-2">
            Ingredients
          </label>
          <div className="space-y-4">
            {recipe.ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-start gap-4">
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, "name", e.target.value)}
                />
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                  placeholder="Ingredient Amount"
                  value={ingredient.amount}
                  onChange={(e) => handleIngredientChange(index, "amount", e.target.value)}
                />
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveIngredient(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {errors.ingredients && <p className="text-red-500">{errors.ingredients}</p>}
            <div className="flex items-center">
              <Button variant="default" className="ml-auto" onClick={handleAddIngredient}>
                <Plus className="w-4 h-4 mr-2" />
                Add Ingredient
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="notes" className="block text-lg font-medium mb-2">
            Notes
          </label>
          <div className="space-y-4">
            {recipe.notes.map((note, index) => (
              <div key={index} className="flex items-start gap-4">
                <textarea
                  id={`note-${index}`}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                  placeholder="Enter note detail"
                  value={note.detail}
                  onChange={(e) => handleNoteDetailChange(index, e.target.value)}
                />
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveNote(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {errors.notes && <p className="text-red-500">{errors.notes}</p>}
            <div className="flex items-center">
              <Button variant="default" className="ml-auto" onClick={handleAddNote}>
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="otherImageRecipes" className="block text-lg font-medium mb-2">
            Other Images
          </label>
          <div className="space-y-4">
            {recipe.otherImageRecipes.map((image, index) => (
              <div key={index} className="flex items-start gap-4">
                <input
                  type="file"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg"
                  onChange={(e) => handleOtherImageChange(index, e.target.files?.[0] || new File([], ""))}
                />
                {image.img && (
                  <img src={image.img} alt={`Other Image ${index + 1}`} className="mt-4 w-24 h-24 object-cover rounded-md" />
                )}
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveOtherImage(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
            {errors.otherImageRecipes && <p className="text-red-500">{errors.otherImageRecipes}</p>}
            {recipe.otherImageRecipes.length < 3 && (
              <div className="flex items-center">
                <Button variant="default" className="ml-auto" onClick={handleAddOtherImage}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Image
                </Button>
              </div>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="categorieRecipes" className="block text-lg font-medium mb-2">
            Categories
          </label>
          <div className="flex flex-wrap gap-4">
            {tableFilter.map((table) => (
              <div key={table.type} className="flex flex-col items-start space-y-2">
                <label className="block text-lg font-medium">{table.type}</label>
                <Select onValueChange={(value) => handleCategoryChange(table.type, value)}>
                  <SelectTrigger className="w-64 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
                    <SelectValue placeholder={`Select ${table.type} Category`} />
                  </SelectTrigger>
                  <SelectContent>
                    {table.recipeCategories.map(category => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex flex-wrap gap-4 mt-4">
                  {recipe.categorieRecipes.filter(cat => cat.type === table.type).map((category, index) => (
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
        </div>
        <div>
          <label htmlFor="recipeTopics" className="block text-lg font-medium mb-2">
            Topics
          </label>
          <Select onValueChange={handleTopicChange}>
            <SelectTrigger className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-lg">
              <SelectValue placeholder="Select Topics" />
            </SelectTrigger>
            <SelectContent>
              {topics.map(topic => (
                <SelectItem key={topic.id} value={topic.name}>
                  {topic.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="grid grid-cols-3 gap-4 mt-4">
            {recipe.recipeTopics.map((topic, index) => (
              <div key={index} className="bg-gray-100 rounded-md p-4">
                <span className="font-medium">{topic.name}</span>
                <Button variant="default" size="icon" className="ml-auto" onClick={() => handleRemoveTopic(index)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end">
          <Button
            type="submit"
            variant="primary"
            className="text-lg">
            Add Recipe
          </Button>
        </div>
      </form>
    </div>
  )
}

export default AddNewRecipe;
