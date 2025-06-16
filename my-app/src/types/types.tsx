import { tasks } from "@/db/schema/task.schema";

export type Task = typeof tasks.$inferSelect;