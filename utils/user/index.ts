import { formSchema } from "@/schemas";
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
    const { firstName, lastName } = data;

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