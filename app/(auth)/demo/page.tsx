import { cookies } from "next/headers";

const DemoPage = async () => {
    const cookieStore = cookies();
    const sessionToken = cookieStore.get("sessionToken");
    console.log(sessionToken);
    const result = await fetch("http://localhost:8080/api/v1/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken?.value}`,
        },
    }).then(async (res) => {
        const payload = await res.json();
        const data = {
            status: res.status,
            payload,
        };
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        return data;
    });
    console.log("result", result);
    return (
        <div>{result.payload?.lastName + " " + result.payload?.firstName}</div>
    );
};

export default DemoPage;
