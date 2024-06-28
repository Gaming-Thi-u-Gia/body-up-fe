import { z } from 'zod';

export const IngredientRecipeTypeSchema = z.object({
  name: z.string().min(1, "Ingredient name is required"),
  amount: z.string().min(1, "Ingredient amount is required"),
});

export const NoteRecipeTypeSchema = z.object({
  detail: z.string().min(1, "Note detail is required"),
});

export const OtherImageRecipeTypeSchema = z.object({
  img: z.string().url("Must be a valid URL"),
});

export const RecipeCategoryTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Category name is required"),
  type: z.string().min(1, "Category type is required"),
});

export const TopicTypeSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Topic name is required"),
});

 const AddNewRecipeTypeSchema = z.object({
  name: z.string().min(1, "Recipe name is required"),
  detail: z.string().min(1, "Recipe detail is required"),
  prepTime: z.number().positive("Prep time must be a positive number"),
  cookTime: z.number().positive("Cook time must be a positive number"),
  img: z.string().url("Must be a valid URL"),
  cookingInstruction: z.string().min(1, "Cooking instruction is required"),
  ingredientRecipes: z.array(IngredientRecipeTypeSchema).nonempty("At least one ingredient is required"),
  noteRecipes: z.array(NoteRecipeTypeSchema).nonempty("At least one note is required"),
  recipeCategories: z.array(RecipeCategoryTypeSchema),
  recipeTopics: z.array(TopicTypeSchema),
  otherImageRecipes: z.array(OtherImageRecipeTypeSchema).max(3, "You can add up to 3 images"),
});