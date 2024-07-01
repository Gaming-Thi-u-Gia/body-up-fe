import { UploadPhotoSchema, formSchema } from "@/schemas";
import { z } from "zod";

export const handleUpdateAvatar = async (
    sessionToken: string,
    image: string
) => {
    const resultFromSv = await fetch(
        `${process.env.NEXT_PUBLIC_API}/update-avatar/`,
        {
            method: "POST",
            body: JSON.stringify({ base64Img: image }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (res) => {
        const payload = await res.json();
        const datas = {
            status: res.status,
            payload,
        };
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return datas;
    });
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/avatar`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    avatar: resultFromSv.payload.results.secure_url,
                }),
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const payload = await res.json();
        const data = {
            status: res.status,
            payload,
        };
        return data;
    } catch (error) {
        console.error(error);
    }
    return resultFromSv;
};

export const handleUpdateProfileUser = async (
    data: z.infer<typeof formSchema>,
    sessionToken: string
) => {
    const { firstName, lastName, bio } = data;

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/profile`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
                firstName,
                lastName,
                bio,
            }),
        }
    );
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};
export const deleteAvatar = async (sessionToken: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/avatar`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};
//PROGRESS PHOTO
export const getAllProgressPhoto = async (
    sessionToken: string,
    photoAngle?: string
) => {
    let path =
        photoAngle !== "all"
            ? `getProgressPhotoByPhotoAngle?photoAngle=${photoAngle}`
            : "getProgressPhoto";
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/${path}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};

export const getAllProgressPhotoByUserId = async (
    userId: number,
    photoAngle?: string
) => {
    let path =
        photoAngle !== "all"
            ? `getPhotoByUserIdAndPhotoAngle?userId=${userId}&photoAngle=${photoAngle}`
            : `getPhotoByUserId?userId=${userId}`;
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/${path}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    if (!res.ok) {
        return;
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};

//Add new progress photo
export const addProgressPhoto = async (
    sessionToken: string,
    data: z.infer<typeof UploadPhotoSchema>,
    img: string
) => {
    const resultFromSv = await fetch(
        `${process.env.NEXT_PUBLIC_API}/upload-progress-photo/`,
        {
            method: "POST",
            body: JSON.stringify({ base64Img: img }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (res) => {
        const payload = await res.json();
        const datas = {
            status: res.status,
            payload,
        };
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return datas;
    });
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/addProgressPhoto`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: resultFromSv.payload.results.secure_url,
                }),
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const payload = await res.json();
        const finalRes = {
            status: res.status,
            payload,
        };
        return finalRes;
    } catch (error) {
        console.error(error);
    }
    return resultFromSv;
};

export const deletePhoto = async (
    sessionToken: string,
    progressPhotoId: number
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/deleteUserProgressPhotoById?progressPhotoId=${progressPhotoId}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    return res;
};

export const getProgressPhotoById = async (
    sessionToken: string,
    progressPhotoId: number
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/getProgressPhotoById?progressPhotoId=${progressPhotoId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};

export const updateProgreePhoto = async (
    sessionToken: string,
    data: z.infer<typeof UploadPhotoSchema>,
    img: string,
    progressPhotoId: number
) => {
    const resultFromSv = await fetch(
        `${process.env.NEXT_PUBLIC_API}/upload-progress-photo/`,
        {
            method: "POST",
            body: JSON.stringify({ base64Img: img }),
            headers: {
                "Content-Type": "application/json",
            },
        }
    ).then(async (res) => {
        const payload = await res.json();
        const datas = {
            status: res.status,
            payload,
        };
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return datas;
    });
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/updateUserProgressPhoto?progressPhotoId=${progressPhotoId}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${sessionToken}`,
                },
                body: JSON.stringify({
                    ...data,
                    imgUrl: resultFromSv.payload.results.secure_url,
                }),
            }
        );

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const payload = await res.json();
        const finalRes = {
            status: res.status,
            payload,
        };
        return finalRes;
    } catch (error) {
        console.error(error);
    }
    return resultFromSv;
};

export const getUserByUserName2 = async (username2: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/user/getUserByUsername2?username2=${username2}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};
export const getUncompletedChallenge = async (sessionToken: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/getUncompletedChallenge`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
            cache: "no-cache",
        }
    );
    if (!res.ok) {
        return null;
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};

export const getVideoChallenge = async (
    sessionToken: string,
    day: string,
    workoutProgramId: number
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/getDailyVideoByDay?day=${day}&workoutProgramId=${workoutProgramId}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        return null;
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};

export const getAllWorkoutProgram = async (sessionToken: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/getAllWorkoutPrograms`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        return null;
    }
    const payload = await res.json();
    const result = {
        status: res.status,
        payload,
    };
    return result;
};

export const getFirstUncompleted = async (sessionToken: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/getFirstUncompletedChallenge`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        return null;
    }
    const payload = await res.json();
    return payload;
};

export const getAllCompleted = async (sessionToken: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/getCompletedChallenge`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        return null;
    }
    const payload = await res.json();
    return payload;
};

export const markFinishChallenge = async (
    sessionToken: string,
    challengeId: number
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/markCompletedUserChallenge?challengeId=${challengeId}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
};
