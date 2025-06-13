// Database schema definitions

import { relations } from "drizzle-orm";
import { varchar, pgTable, uuid, uniqueIndex } from "drizzle-orm/pg-core" 

import { tasks } from "./task.schema";

export const users = pgTable(
    "users", 
    {
        id: uuid().primaryKey().unique().defaultRandom(),
        name: varchar().notNull(),
        email: varchar().unique().notNull(),
        password: varchar().notNull(),
    },
);

export const usersRelation = relations(users, ({ many }) => ({
    tasks: many(tasks),
}));
