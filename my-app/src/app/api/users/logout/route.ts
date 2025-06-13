
import { NextRequest } from "next/server";

import { WriteJSON } from "@/utils/utils";

export async function GET(req: NextRequest) {
    const userId = req.cookies.get('userId');
    console.log(userId?.value);
    req.cookies.clear()
    return WriteJSON(200, "logout success");
}
