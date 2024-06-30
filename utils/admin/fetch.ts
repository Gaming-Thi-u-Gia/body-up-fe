import { EditableRecipeType } from "@/app/(main)/admin/recipes-management/recipe-management";
import { AddNewRecipeType, AddNewVideoType } from "./type";

export const fetchGetTotalElements = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/dashboard`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail To Get Total Elements`);
  }
};
export const fetchGetMonthlyUserCount = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/monthly-user-count`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Fail To Get Monthly User Count`);
  }
};
export const fetchGetRecipeTopic = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/topic-recipe/all`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching data recipe collection`);
  }
};
export const fetchGetTableFilterRecipe = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/recipe-category/table`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
export const fetchPostRecipe = async (
  recipe: AddNewRecipeType,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/create-recipe`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(recipe),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching post recipe`);
  }
};
export const fetchPostVideo = async (
  video: AddNewVideoType,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/create-video`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(video),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching post recipe`);
  }
};
export const fetchGetRecipes = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-recipe?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};

export const fetchGetRecipeDetailById = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/recipe-detail?recipeId=${recipeId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
export const fetchPutRecipe = async (
  sessionToken: string,
  updatedRecipe: EditableRecipeType
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/update-recipe`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify(updatedRecipe),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update the recipe");
    }
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while updating the recipe`);
  }
};
export const fetchDeleteRecipe = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/delete?recipeId=${recipeId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.text();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
export const fetchGetUser = async (
  pageNo: number,
  pageSize: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/admin/list-user?pageNo=${pageNo}&pageSize=${pageSize}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get table filter`);
  }
};
