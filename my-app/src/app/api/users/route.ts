import { NextRequest } from "next/server";

import { createUser, getAllUser } from "@/db/queries/user.queries";
import { WriteJSON } from "@/utils/utils";

export async function GET(req: NextRequest) {
    const userList = await getAllUser();
    return WriteJSON(200, userList);
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const newUser = await createUser(body.name, body.email, body.password);
    return WriteJSON(200, newUser);
}