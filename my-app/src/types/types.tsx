import { posts } from "@/db/schema/blog.schema";
import { tasks } from "@/db/schema/task.schema";

export type Task = typeof tasks.$inferSelect;

export type Post = typeof posts.$inferSelect;
export type InsertPostPayload = typeof posts.$inferInsert;