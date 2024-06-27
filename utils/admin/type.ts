export type AddNewRecipeType = {
    id: number;
    name: string;
    detail: string;
    prepTime: number;
    cookTime: number;
    image: string;
    cookingInstruction: string;
    otherImageRecipes: OtherImageRecipeType[];
    ingredients: IngredientType[];
    notes: NoteRecipeType[];
    topics: TopicRecipeType[];
    categories: CategoryRecipeType[];
  };
  
  export type OtherImageRecipeType = {
    img: string;
  };
  
  export type IngredientType = {
    name: string;
    amount: string;
  };
  
  export type NoteRecipeType = {
    detail: string;
  };
  
  export type TopicRecipeType = {
    name: string;
  };
  
  export type CategoryRecipeType = {
    name: string;
    type: string;
  };