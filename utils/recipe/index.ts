export const fetchTopicRecipeData = async () => {
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
export const fetchRecipeWithTopicData = async (sessionToken: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/topic-recipe/topic`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while fetching data recipe collection`);
  }
};
export const fetchToggleRecipe = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/bookmark-recipe/toggle?recipeId=${recipeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while toggle recipe`);
  }
};
export const fetchListBookMarkRecipeData = async (sessionToken: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/bookmark-recipe`,
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
    throw new Error(`Error while get bookmark recipe for user`);
  }
};
export const fetchRecipeByIdData = async (
  recipeId: number,
  sessionToken: string | undefined
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/id?recipeId=${recipeId}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while getting bookmark recipe for user: ${error}`);
  }
};
export const fetchRatingRecipeData = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/recipe-rating?recipeId=${recipeId}`,
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
    throw new Error(`Error while get rating recipe`);
  }
};
export const fetchSendRatingRecipe = async (
  recipeId: number,
  sessionToken: string,
  rating: number
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/recipe-rating/rating?recipeId=${recipeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
        body: JSON.stringify({ star: rating }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while send rating recipe`);
  }
};
export const fetchSendBookmarkRecipe = async (
  recipeId: number,
  sessionToken: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/bookmark-recipe/toggle?recipeId=${recipeId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while send rating recipe`);
  }
};
export const fetchTopicById = async (topicId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/topic-recipe/topicId?topicId=${topicId}`,
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
    throw new Error(`Error while get all recipe by topic id`);
  }
};
export const fetchPopularCategoryData = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/recipe-category/popular`,
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
    throw new Error(`Error while get popular category`);
  }
};
export const fetchLatestRecipeData = async (
  sessionToken: string | undefined
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/latest`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get latest recipes`);
  }
};
export const fetchSavedRecipeData = async (
  sessionToken: string | undefined
) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
  };
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/saved-recipe`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get latest recipes`);
  }
};
export const initialName = (name = "") => {
  const words = name.trim().split(" ");
  if (words.length === 1) {
    return words[0].substring(0, 2);
  }
  const initials = words.map((word) => word.charAt(0));
  return initials.join("").substring(0, 2);
};
