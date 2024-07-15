import { z } from "zod";

export const AddNewRecipeSchema = z.object({
  name: z.string().nonempty({ message: "Please fill in the recipe name." }),
  detail: z.string().nonempty({ message: "Please fill in the recipe detail." }),
  prepTime: z
    .number()
    .positive({ message: "Please fill in the prep time and ensure it is greater than 0." }),
  cookTime: z
    .number()
    .positive({ message: "Please fill in the cook time and ensure it is greater than 0." }),
  img: z.string().nonempty({ message: "Please upload an image for the recipe." }),
  cookingInstruction: z
    .string()
    .nonempty({ message: "Please fill in the cooking instructions." }),
  ingredientRecipes: z
    .array(
      z.object({
        name: z.string().nonempty({ message: "Ingredient name is required." }),
        amount: z.string().nonempty({ message: "Ingredient amount is required." }),
      })
    )
    .nonempty({ message: "Please fill in all ingredient details." }),
  noteRecipes: z
    .array(
      z.object({
        detail: z.string().nonempty({ message: "Note detail is required." }),
      })
    )
    .nonempty({ message: "Please fill in all note details." }),
  recipeCategories: z.array(z.object({ id: z.string(), name: z.string(), type: z.string() })),
  recipeTopics: z.array(z.object({ id: z.string(), name: z.string() })),
  otherImageRecipes: z
    .array(
      z.object({
        img: z.string().nonempty({ message: "Other image is required." }),
      })
    )
    .max(3, { message: "You can add up to 3 other images." })
    .nonempty({ message: "Please fill in all other image details." }),
});