import { tasks } from "@/db/schema/task.schema";
import { users } from "@/db/schema/user.schema";

export type Task = typeof tasks.$inferSelect;
export type User = typeof users.$inferSelect