import { NextRequest } from "next/server";

export function GET(r: NextRequest) {
    
    return new Response("ID header is missing", { status: 400 });
    
}