export const fetchAllFilterCategory = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/videoTable`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchGetVideoByCategories = async (
    categoryIds: string[],
    sessionToken: string | undefined,
    pageNo: number,
    pageSize: number
  ) => {
    try {
      let url = `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/category?`;

      if (categoryIds.length > 0) {
        categoryIds.forEach((categoryId, index) => {
          url += `categoryIds=${categoryId}${index < categoryIds.length - 1 ? '&' : ''}`;
        });
      }

      url += `${categoryIds.length > 0 ? '&' : ''}pageNo=${pageNo}&pageSize=${pageSize}`;

      const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(sessionToken ? { 'Authorization': `Bearer ${sessionToken}` } : {})
      };

      const response = await fetch(url, {
        method: "GET",
        headers: headers,
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error(`Error when attempting to fetch videos by categories: ${error}`);
    }
  };


  export const fetchAllFilterCategoryWorkoutProgram = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/workoutTable`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchGetWorkoutByCategories = async (
  categoryIds: string[],
  pageNo: number,
  pageSize: number
) => {
  try {
    let url = `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/category-workout-program?`;

    if (categoryIds.length > 0) {
      categoryIds.forEach((categoryId, index) => {
        url += `categoryIds=${categoryId}${index < categoryIds.length - 1 ? '&' : ''}`;
      });
    }

    url += `${categoryIds.length > 0 ? '&' : ''}pageNo=${pageNo}&pageSize=${pageSize}`;

    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error when attempting to fetch videos by categories: ${error}`);
  }
};

