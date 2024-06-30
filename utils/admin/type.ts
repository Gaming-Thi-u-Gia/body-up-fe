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
};
export type NoteRecipeType = {
  detail: string;
};
export type TableFilterRecipeType = {
  length: number;
  type: string;
  recipeCategories: RecipeCategoryType[];
};
export type TableFilterVideoType = {
  length: number;
  type: string;
  videoCategories: VideoCategoryType[];
};

export type IngredientRecipeType = {
  amount: string;
  name: string;
};

export type OtherImageRecipeType = {
  img: string;
};

export type RecipeCategoryType = {
  id: number;
  name: string;
  type: string;
  img: string;
  totalRecipe: number;
};
export type VideoCategoryType = {
  id: number;
  name: string;
  type: string;
};

export type TopicType = {
  id: number;
  name: string;
};
export type AddNewVideoType = {
  name: string;
  url: string;
  isFeatured: boolean;
  videoTopics: TopicType[];
  videoCategories: VideoCategoryType[];
};
export type RecipeDetailType = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  prepTime: number;
  cookTime: number;
  totalRating: number;
  img: string;
  cookingInstruction: string;
  createAt: Date;
  ingredientRecipes: IngredientRecipeType[];
  otherImageRecipes: OtherImageRecipeType[];
  noteRecipes: NoteRecipeType[];
  recipeTopics: TopicType[];
  recipeCategories: RecipeCategoryType[];
};
