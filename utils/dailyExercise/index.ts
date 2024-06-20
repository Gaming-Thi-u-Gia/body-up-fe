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
