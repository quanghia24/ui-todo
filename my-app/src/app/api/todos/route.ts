import { NextRequest, NextResponse } from "next/server";

import { WriteError, WriteJSON } from "@/utils/utils";
import { getAllTasksBelongToUserId, createNewTask } from "@/db/queries/task.queries";


export async function GET(req: NextRequest) { 
    const searchParams = req.nextUrl.searchParams;

    const userId = searchParams.get('userId');
    
    if (!userId) {
        return NextResponse.redirect(`/`);
    }

    const todoList = await getAllTasksBelongToUserId(userId);
    if (!todoList) {
        return WriteJSON(404, { error: "No todos found for this user." });
    }
    return WriteJSON(200, todoList);
}

export async function POST(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get('userId');
    if (!userId) {
        return NextResponse.redirect(`/`);
    }

    const body = await req.json();
    if (!body.title) {
        return WriteError(400, Error("Title and description are required."));
    }

    const res = await createNewTask(userId, body.title, body.description);
    return WriteJSON(201, res);
}