
import { NextRequest } from "next/server";

import { WriteJSON } from "@/utils/utils"; 

export async function GET(req: NextRequest) {
    req.cookies.set('userId', '1')
    return WriteJSON(200, `login success: ${req.cookies.get('userId')?.value}`);
}
