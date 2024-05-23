import GoogleProvider from "next-auth/providers/google";
const CliendID = "";
const ClientSecret = "";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: CliendID,
            clientSecret: ClientSecret,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async signIn({
            account,
            profile,
        }: {
            account: any;
            profile: any;
        }): Promise<boolean> {
            const res = await fetch(
                "http://localhost:8080/api/v1/auth/logingoogle",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: profile.email,
                        given_name: profile.given_name,
                        family_name: profile.family_name,
                        picture: profile.picture,
                    }),
                }
            );
            const data = await res.json();
            const resultFromSv = await fetch(
                "http://localhost:3000/api/auth/",
                {
                    method: "POST",
                    body: JSON.stringify(data.token),
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
                console.log(datas);
                return datas;
            });
            return true;
        },
    },
};
