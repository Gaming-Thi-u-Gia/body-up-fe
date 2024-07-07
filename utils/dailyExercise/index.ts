export const getAllDay = async (sessionToken: string, id: string) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/getAllDay?workoutProgramId=${id}`,
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

export const markDailyChallenge = async (sessionToken: string, id: number) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/markChallengeAsCompleted?challengeId=${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        return null;
    }
    return { status: 200, payload: "Success" };
};

export const markVideoDailyChallenge = async (
    sessionToken: string,
    id: number
) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_V1}/userChallenge/updateDailyVideoStatus?dailyVideoId=${id}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
        }
    );
    if (!res.ok) {
        return null;
    }
    return { status: 200, payload: "Success" };
};
