export type StarRatingType = {
  id: number;
  avgStar: number;
  currentRating: number;
};
export type CookInfoType = {
  cookingInstruction: string;
  noteRecipes: [
    {
      id: number;
      detail: string;
    },
  ];
};
export type OtherImageSwipeType = [
  {
    id: number;
    img: string;
  },
];
export type RecipeContentType = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  prepTime: number;
  cookTime: number;
  img: string;
  cookingInstruction: string;
  currentRating: number;
  totalRating: number;
  bookmarked: boolean;
};

export type RecipesNoteType = [
  {
    id: number;
    detail: string;
  },
];
export type RecipesRatingType = [
  {
    id: number;
    star: number;
  },
];
export type RecipesCategoriesType = {
  id: number;
  name: string;
};
export type IngredientRecipesType = [
  {
    id: number;
    amount: string;
    name: string;
  },
];
export type HeaderInfoSortType = {
  name: string;
  description: string;
  typeSort: string[];
  handleSort: (type: string) => void;
};
export type RecipesTopicType = {
  id: number;
  name: string;
  description: string;
  recipes: RecipeCardType[];
};
export type HeaderInfoType = {
  name: string;
  description: string;
  id: number;
};
export type RecipeCardType = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  img: string;
  currentRating: number;
  bookmarked: boolean;
  createAt: Date;
  recipeCategories: RecipeCategories[];
};

export type RecipeCategories = {
  id: number;
  name: string;
};
export type RecipeSilerType = {
  img: string;
  name: string;
  cookTime: number;
  prepTime: number;
};
export type RecipeInformationType = {
  id: number;
  name: string;
  detail: string;
  avgStar: number;
  prepTime: number;
  cookTime: number;
  img: string;
  cookingInstruction: string;
  currentRating: number;
  totalRating: number;
  bookmarked: boolean;
  noteRecipes: RecipesNoteType;
  otherImageRecipes: OtherImageSwipeType;
  recipeCategories: RecipesCategoriesType;
  recipeRating: RecipesRatingType;
  ingredientRecipes: IngredientRecipesType;
};
export type PopularCategoriesType = {
  id: number;
  name: string;
  img: string;
  totalRecipe: number;
};
