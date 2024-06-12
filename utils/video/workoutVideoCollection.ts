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


