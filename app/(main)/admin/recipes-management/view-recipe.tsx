import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ViewRecipe = ({ recipe, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{recipe.name}</h2>
          <Button variant="default" size="icon" onClick={onClose}>
            <X className="w-6 h-6" />
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-600 mb-4">{recipe.detail}</p>
            <div className="flex flex-col justify-between  gap-4 mb-4 m-h-[50px]">
              <div>
                <span className="font-medium">ID:</span> {recipe.id}
              </div>
              <div>
                <span className="font-medium">Created At:</span> {recipe.createAt.toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium">Average Rating:</span> {recipe.avgStar}
              </div>
              <div>
                <span className="font-medium">Total Ratings:</span> {recipe.totalRating}
                <Button variant="default" className="ml-2" onClick={() => alert('Display list of raters here.')}>
                  View Raters
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <div>
                <span className="font-medium">Prep Time:</span> {recipe.prepTime} min
              </div>
              <div>
                <span className="font-medium">Cook Time:</span> {recipe.cookTime} min
              </div>
            </div>
            <h3 className="text-lg font-bold mb-2">Ingredients</h3>
            <ul className="list-disc pl-6 space-y-2">
              {recipe.ingredientRecipes.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name} - {ingredient.amount}
                </li>
              ))}
            </ul>
            <h3 className="text-lg font-bold mb-2 mt-4">Notes</h3>
            <ul className="list-disc pl-6 space-y-2">
              {recipe.recipeNotes.map((note, index) => (
                <li key={index}>{note.detail}</li>
              ))}
            </ul>
          </div>
          <div>
            <img
              src={recipe.img}
              alt={recipe.name}
              width={600}
              height={400}
              className="rounded-lg object-cover w-full"
            />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {recipe.otherImageRecipes.map((img, index) => (
                <img
                  key={index}
                  src={img.img}
                  alt={`${recipe.name} ${index + 1}`}
                  width={200}
                  height={150}
                  className="rounded-lg object-cover w-full"
                />
              ))}
            </div>
            <h3 className="text-lg font-bold mb-2 mt-4">Cooking Instructions</h3>
            <p>{recipe.cookingInstruction}</p>
            <h3 className="text-lg font-bold mb-2 mt-4">Categories</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.recipeCategories.map((category, index) => (
                <div key={index} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {category.name}
                </div>
              ))}
            </div>
            <h3 className="text-lg font-bold mb-2 mt-4">Topics</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.recipeTopics.map((topic, index) => (
                <div key={index} className="bg-gray-100 rounded-md px-3 py-1 text-sm font-medium">
                  {topic.name}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRecipe;
