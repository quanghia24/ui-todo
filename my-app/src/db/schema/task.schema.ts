import { relations } from "drizzle-orm";
import { pgTable, varchar, boolean, timestamp, uuid } from "drizzle-orm/pg-core";

import { users } from "./user.schema"; 
import { foreignKey } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
    id: uuid("id").primaryKey().unique().defaultRandom(), 
    title: varchar("title").notNull(),
    description: varchar("description").notNull(),
    status: boolean().default(false).notNull(),
    urgent: boolean().default(false).notNull(),
    important: boolean().default(false).notNull(),
    userId: uuid("user_id").notNull(),
    createdAt: timestamp().defaultNow(),
    updatedAt: timestamp().defaultNow(),
}, (table) => [
    foreignKey({
        name: "user_fk",
        columns: [table.userId],
        foreignColumns: [users.id],
    })
    .onDelete("cascade")
    .onUpdate("cascade")
]);

export const tasksRelations = relations(tasks, ({ one }) => ({
    user: one(users, {
        fields: [tasks.userId],
        references: [users.id]
    }) 
}))

