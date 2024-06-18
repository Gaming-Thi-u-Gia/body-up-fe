import { RecipeCardType } from "./type";
export const splitName = (name = "") => {
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2);
  }
  const initials = words.map((word) => word.charAt(0));
  return initials.join("").substring(0, 2);
};
export const handleSort = (recipes: RecipeCardType[], type: string) => {
  switch (type) {
    case "Most current":
      return recipes.sort(
        (a, b) =>
          new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
      );
    case "Rating":
      return recipes.sort((a, b) => b.avgStar - a.avgStar);
    case "A to Z":
      return recipes.sort((a, b) => a.name.localeCompare(b.name));
    case "Z to A":
      return recipes.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return recipes;
  }
};
