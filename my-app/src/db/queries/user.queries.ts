"use server"

import { db } from "@/db/drizzle";
import { users } from "@/db/schema/user.schema";

export async function getAllUser() {
    const res = await db
        .select()
        .from(users)
    return res;
}

export async function createUser(name:string, email: string, password: string) {
    const res = await db
        .insert(users)
        .values({
            name, 
            email,
            password,
        })
        .returning({ id: users.id });
    return res;
}