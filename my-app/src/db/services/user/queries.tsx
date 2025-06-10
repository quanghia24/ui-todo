// Reusable query functions
import { db } from "@/db/drizzle"
import { users } from "@/db/schema/user.schema"
import { eq } from "drizzle-orm"
 
export async function getAllUsers() {
    return await db.select().from(users);
};

export function getUserById(userId: string) {
    return db.select().from(users).where(eq(users.id, userId));
}