import { db } from "@/db/drizzle";
import { tasks } from "@/db/schema/task.schema";


import { eq } from "drizzle-orm";

export async function getAllTaskBelongToUserId(userId: number) {
    let data = null;
    return data;
}  
