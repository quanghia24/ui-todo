import { NextRequest } from "next/server";

import { removeTask, updateTask } from "@/db/queries/task.queries";
import { WriteError, WriteJSON } from "@/utils/utils";

export async function GET(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const taskId = params.id;

    return WriteJSON(200, `Fetching post ${taskId}`);
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const taskId = params.id;
    const body = await req.json()
    if(!body.title && !body.description && body.status === undefined && body.urgent === undefined && body.important === undefined) {
        return WriteError(422, Error(`need at least one field`))
    }

    const res = await updateTask(taskId, body.title, body.description, body.status, body.urgent, body.important)
    return WriteJSON(200, res)
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    const taskId = params.id;
    const res = await removeTask(taskId);
    return WriteJSON(202, `task ${res[0].id} has been removed`);
}