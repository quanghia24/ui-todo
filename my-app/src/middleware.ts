import { NextResponse, type NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function middleware(req: NextRequest) { 
    const res = await auth0.middleware(req);
    if (!res) {
        return NextResponse.redirect(new URL('/not-found', req.url))
    }
    // Get the session
    const session = await auth0.getSession(req);
    if (!session) {
        if (req.nextUrl.pathname.startsWith("/todos")) {
            return NextResponse.redirect(new URL('/auth/login', req.url))
        }
        return res;
    }

    console.log(`User ${session.user.sub} accessed ${req.nextUrl.pathname}`);

    return res;
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
        "/_next/data/:path*/not-found.json",
    ],
};
