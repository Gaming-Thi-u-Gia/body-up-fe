import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const privatePaths = [
    "/my-fitness-journey",
    "/settings/preferences",
    "/email-and-password",
    "/subscription",
];
const authPaths = ["/login", "/signup"];
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const sessionToken = cookies().get("sessionToken")?.value;
    if (
        privatePaths.some((path) => pathname.startsWith(path)) &&
        !sessionToken
    ) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    if (authPaths.some((path) => pathname.startsWith(path)) && sessionToken)
        return NextResponse.redirect(new URL("/program", request.url));
    return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        "/my-fitness-journey",
        "/settings/preferences",
        "/email-and-password",
        "/subscription",
        "/login",
        "/signup",
    ],
};
