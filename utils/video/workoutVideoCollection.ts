export const fetchVideoCategoryData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicForVideo`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
};

export const fetchWorkoutCategoryData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicForWorkout`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
};

export const fetchWorkoutProgramData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getAllWorkoutProgram`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchLatestWorkoutProgramData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getLatestWorkoutPrograms`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchWorkoutProgramDataById = async (id: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getWorkoutProgramById?id=${id}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data; // Make sure data is an array of WorkoutProgramById objects
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchWorkoutProgramDataByTopic = async (topicId: number) => {
    if (!topicId || typeof topicId !== 'number') {
        console.error("fetchWorkoutProgramDataByTopic was called without a valid topicId.");
        return [];  // Ensure no further processing happens
    }

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getWorkoutProgramByTopic?topicId=${topicId}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}   

export const fetchWorkoutProgramWithTopicData = async (pageNo: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutProgram?pageNo=${pageNo}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchWorkoutProgramWithTopicByTopicIdData = async (topicId: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutProgramById?topicId=${topicId}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchVideoWithTopicByTopicIdData = async (topicId: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getVideoByTopic?topicId=${topicId}`
        );
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
};

export const fetchVideoWithTopicData = async (sessionToken: string | undefined) => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
        ...(sessionToken && { Authorization: `Bearer ${sessionToken} `}),
      };
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutVideo`,
            {
                method: "GET",
                headers: headers,
              }
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}


export const fetchSearchProgramData = async (name: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/searchWorkoutProgram?name=${name}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchBookmarkVideo = async (userId: number, url: string, sessionToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getBookmark?userId=${userId}&url=${url}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error while sending bookmark video request:", error);
        throw error;
    }
};

export const fetchDataBookmarkVideoByUser = async (sessionToken: string) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getWorkoutVideoWithBookmark`, {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error while sending bookmark video request:", error);
        throw error;
    }
};



export const fetchSearchVideoData = async (name: string) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/searchVideo?name=${name}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}

export const fetchDailyExerciseData = async (workoutProgramId: number, selectDay: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getVideosByDay?workoutProgramId=${workoutProgramId}&day=${selectDay}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }  
}

export const fetchLastTestVideo = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getVideoLatest`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }  
}

export const fetchDailyRecipeExerciseData = async (workoutProgramId: number, selectDay: number) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/recipe/ingredient-recipe/getRecipesByDay?workoutProgramId=${workoutProgramId}&day=${selectDay}`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }  
}




