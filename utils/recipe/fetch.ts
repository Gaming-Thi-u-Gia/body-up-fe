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
export const fetchGetEachTopicWith4Recipe = async (sessionToken: string) => {
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

export const fetchGetBookmarkRecipeList = async (sessionToken: string) => {
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
export const fetchGetRecipeById = async (
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
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while getting bookmark recipe for user: ${error}`);
  }
};
export const fetchGetRatingRecipe = async (
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
export const fetchPostRatingRecipe = async (
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
export const fetchPostBookmarkRecipe = async (
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
    throw new Error(`Error while send bookmar recipe`);
  }
};
export const fetchGetTopicRecipeById = async (
  topicId: number,
  sessionToken: string | undefined
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/topic-recipe/topicId?topicId=${topicId}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
    };

    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error while get all recipe by topic id`);
  }
};
export const fetchGetPopularCategoryRecipe = async () => {
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
export const fetchGetRecipeLatest = async (
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
export const fetchGetSavedRecipe = async (sessionToken: string | undefined) => {
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
    throw new Error(`Error while get saved recipes`);
  }
};
export const fetchGetRecipeByName = async (
  recipeName: string,
  sessionToken: string | undefined
) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/name?recipeName=${recipeName}`;
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error when get search by name`);
  }
};
export const fetchGetTableFilter = async () => {
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
export const fetchGetRecipeByCategories = async (
  categoryIds: string[],
  sessionToken: string | undefined
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/category?`;
    if (categoryIds.length > 0) {
      categoryIds.forEach((categoryId) => {
        url += `categoryIds=${categoryId}&`;
      });
    }
    console.log(url);
    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...(sessionToken && { Authorization: `Bearer ${sessionToken}` }),
    };
    const response = await fetch(url, {
      method: "GET",
      headers: headers,
    });
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Error when get search by name`);
  }
};
