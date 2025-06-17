'use server'

import { db } from "@/db/drizzle";
import { posts } from "@/db/schema/blog.schema"; 
import { InsertPostPayload } from "@/types/types";
import { eq } from "drizzle-orm"; 

export async function getAllPost() {
	return await db
		.select()
		.from(posts)
		.orderBy(posts.createdAt);
}

export async function getPostById(id: string) {
	if (!id) return undefined;
	const res = await db
		.select()
		.from(posts)
		.where(eq(posts.id, id))
		.limit(1); 
	return res[0];
}

export async function createNewPost(newPost: InsertPostPayload) {
	const res = await db
		.insert(posts)
		.values({
			title: newPost.title,
			description: newPost.description,
			authId: newPost.authId,
			mood: newPost.mood,
		})
		.returning();
	return res[0];
}