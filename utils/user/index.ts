export const handleUpdateAvatar = async (
    sessionToken: string,
    image: string
) => {
    const resultFromSv = await fetch("/api/update-avatar/", {
        method: "POST",
        body: JSON.stringify({ base64Img: image }),
        headers: {
            "Content-Type": "application/json",
        },
    }).then(async (res) => {
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
        const res = await fetch("http://localhost:8080/api/v1/avatar", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionToken}`,
            },
            body: JSON.stringify({
                avatar: resultFromSv.payload.results.secure_url,
            }),
        });

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
