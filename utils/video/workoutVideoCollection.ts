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

export const fetchWorkoutProgramWithTopicData = async () => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/workout-video/getTopicWithWorkoutProgram`
        );
        console.log(process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1);

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching video category data:", error);
        return [];
    }
}



