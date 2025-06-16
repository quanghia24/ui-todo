import { auth0 } from "@/lib/auth0";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

function delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

export async function GET(req: NextRequest) {
    const session = await auth0.getSession();
    const cookieStore = await cookies();
    const sub = await session?.user.sub;
    console.log(sub);
    console.log(sub);
    console.log(sub);
    console.log(sub);
    console.log(sub);
    console.log(sub);
    cookieStore.set('user_sub', sub!);
    if (!sub) {
        return NextResponse.redirect(new URL('/nah', req.url))
    }
    return NextResponse.redirect(new URL('/todos', req.url))
}