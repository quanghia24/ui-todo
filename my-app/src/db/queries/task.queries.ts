'use server'

import { eq, sql, asc, desc } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema/task.schema"; 

export async function getAllTasksBelongToUserId(userId: string) {
    let res = await db
        .select()
        .from(tasks)
        .where(eq(tasks.authId, userId))
        .orderBy(asc(tasks.status), desc(tasks.urgent), desc(tasks.important), desc(tasks.updatedAt));
    return res;
}  

export async function createNewTask(userId: string, title: string, description = "") {
    let res = await db
        .insert(tasks)
        .values({
            title,
            description,
            authId: userId,
        })
        .returning()
    return res[0];
}

export async function updateTask(taskId: string, title: string, description: string, status: boolean, urgent: boolean, important: boolean) {
    const setClause: Record<string, any> = { updatedAt: sql`NOW()` };
    if(title !== undefined) setClause.title = title;
    if(description !== undefined) setClause.description = description;
    if(status !== undefined) setClause.status = status;
    if(urgent !== undefined) setClause.urgent = urgent;
    if(important !== undefined) setClause.important = important;

    let res = await db
        .update(tasks)
        .set(setClause)
        .where(eq(tasks.id, taskId))
        .returning();
    return res;
}

export async function removeTask(taskId: string) {
    let res = await db
        .delete(tasks)
        .where(eq(tasks.id, taskId))
        .returning({ id: tasks.id });
    return res;
}