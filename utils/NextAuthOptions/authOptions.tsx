import { JWT } from "next-auth/jwt";
import GoogleProvider from "next-auth/providers/google";

const CliendID = process.env.GOOGLE_CLIENT_ID as string;
const ClientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

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
    jwt: {
        async encode({ token }: { token: JWT }) {
            return token.accessToken;
        },
        async decode({ token }: { token: JWT }) {
            return token.accessToken;
        },
    },
    callbacks: {
        async signIn({
            profile,
            user,
        }: {
            account: any;
            profile: any;
            user: any;
        }): Promise<boolean> {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_PUBLIC_API_AUTH}/logingoogle`,
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
            console.log(profile);
            const data = await res.json();
            user.accessToken = data.token;
            return true;
        },
        async jwt({
            token,
            user,
            account,
        }: {
            token: any;
            user: any;
            account: any;
        }) {
            if (account) {
                token.accessToken = user.accessToken;
            }
            return token;
        },
    },
    cookies: {
        sessionToken: {
            name: `sessionToken`,
            options: {
                httpOnly: true,
                sameSite: "lax",
                path: "/",
                secure: true,
            },
        },
    },
};
