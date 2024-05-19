import { SignUpSchema } from "@/schemas";
import { z } from "zod";

export const handleRegister = async (data: z.infer<typeof SignUpSchema>) => {
    const { confirmPassword, ...registerData } = data;
    try {
        const result = await fetch(
            "http://localhost:8080/api/v1/auth/register",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...registerData, role: "USER" }),
            }
        ).then(async (res) => {
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
        const resultFromSv = await fetch("/api/auth/", {
            method: "POST",
            body: JSON.stringify(result.payload),
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
    } catch (error) {
        throw new Error("Error while creating account");
    }
};
